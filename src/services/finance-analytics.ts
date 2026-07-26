import type {
  Budget,
  BudgetProgress,
  CashFlowPoint,
  Category,
  CategoryBreakdownPoint,
  DashboardSnapshot,
  EnrichedTransaction,
  FinancialGoal,
  FinanceRepositorySnapshot,
  NotificationItem,
  ReportInterval,
  ReportSnapshot,
  SummaryMetric,
  Transaction,
  WalletInsight
} from "@/types/finance";

function startOfCurrentMonth() {
  return new Date("2026-07-01T00:00:00.000Z");
}

function normalizePercentage(value: number) {
  return Number.isFinite(value) ? Math.min(Math.max(value, 0), 100) : 0;
}

export function enrichTransactions(
  transactions: Transaction[],
  wallets: FinanceRepositorySnapshot["wallets"],
  categories: Category[]
) {
  return transactions.map<EnrichedTransaction>((transaction) => {
    const wallet = wallets.find((item) => item.id === transaction.walletId);
    const category = categories.find((item) => item.id === transaction.categoryId);

    return {
      ...transaction,
      walletName: wallet?.name ?? "Unknown wallet",
      categoryName: category?.name ?? "Unknown category",
      categoryColor: category?.color ?? "#94a3b8"
    };
  });
}

export function buildBudgetProgress(
  budgets: Budget[],
  categories: Category[],
  transactions: Transaction[]
) {
  return budgets.map<BudgetProgress>((budget) => {
    const category = categories.find((item) => item.id === budget.categoryId);
    const spentAmount = transactions
      .filter((transaction) => {
        const budgetMonth = budget.period;
        const transactionMonth = transaction.transactionDate.slice(0, 7);
        return transaction.categoryId === budget.categoryId && transactionMonth === budgetMonth;
      })
      .reduce((total, transaction) => total + transaction.amount, 0);

    const utilization = normalizePercentage((spentAmount / budget.limitAmount) * 100);
    const remainingAmount = budget.limitAmount - spentAmount;
    const status =
      spentAmount > budget.limitAmount
        ? "exceeded"
        : spentAmount > budget.limitAmount * 0.8
          ? "warning"
          : "healthy";

    return {
      id: budget.id,
      categoryId: budget.categoryId,
      categoryName: category?.name ?? "Unknown category",
      categoryColor: category?.color ?? "#10b981",
      limitAmount: budget.limitAmount,
      spentAmount,
      remainingAmount,
      utilization,
      status,
      period: budget.period
    };
  });
}

export function buildCategoryBreakdown(
  transactions: Transaction[],
  categories: Category[]
) {
  const expenseTransactions = transactions.filter((transaction) => transaction.type === "expense");
  const categoryTotals = new Map<string, number>();

  expenseTransactions.forEach((transaction) => {
    categoryTotals.set(
      transaction.categoryId,
      (categoryTotals.get(transaction.categoryId) ?? 0) + transaction.amount
    );
  });

  return [...categoryTotals.entries()]
    .map<CategoryBreakdownPoint>(([categoryId, value]) => {
      const category = categories.find((item) => item.id === categoryId);
      return {
        name: category?.name ?? "Unknown category",
        value,
        color: category?.color ?? "#10b981"
      };
    })
    .sort((left, right) => right.value - left.value);
}

export function buildCashFlowSeries(transactions: Transaction[]) {
  const map = new Map<string, CashFlowPoint>();

  transactions.forEach((transaction) => {
    const key = transaction.transactionDate.slice(0, 7);
    const existing = map.get(key) ?? { label: key, income: 0, expense: 0, savings: 0 };

    if (transaction.type === "income") {
      existing.income += transaction.amount;
    }

    if (transaction.type === "expense") {
      existing.expense += transaction.amount;
    }

    existing.savings = existing.income - existing.expense;
    map.set(key, existing);
  });

  return [...map.values()].sort((left, right) => left.label.localeCompare(right.label));
}

export function buildSummaryMetrics(
  wallets: FinanceRepositorySnapshot["wallets"],
  transactions: Transaction[]
) {
  const totalBalance = wallets.reduce((total, wallet) => total + wallet.balance, 0);
  const monthStart = startOfCurrentMonth();
  const currentMonthTransactions = transactions.filter(
    (transaction) => new Date(transaction.transactionDate) >= monthStart
  );
  const totalIncome = currentMonthTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);
  const totalExpense = currentMonthTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);
  const savings = totalIncome - totalExpense;

  return [
    {
      label: "Total Balance",
      value: totalBalance,
      delta: "Across 4 wallets",
      accent: "from-emerald-500/20 to-emerald-500/5"
    },
    {
      label: "Income",
      value: totalIncome,
      delta: "July 2026 inflow",
      accent: "from-teal-500/20 to-teal-500/5"
    },
    {
      label: "Expense",
      value: totalExpense,
      delta: "July 2026 burn",
      accent: "from-amber-500/20 to-amber-500/5"
    },
    {
      label: "Savings",
      value: savings,
      delta: "Net monthly cash",
      accent: "from-cyan-500/20 to-cyan-500/5"
    }
  ] satisfies SummaryMetric[];
}

export function buildWalletInsights(wallets: FinanceRepositorySnapshot["wallets"]) {
  const totalBalance = wallets.reduce((total, wallet) => total + wallet.balance, 0);

  return wallets
    .map<WalletInsight>((wallet) => ({
      id: wallet.id,
      name: wallet.name,
      balance: wallet.balance,
      color: wallet.color,
      icon: wallet.icon,
      share: totalBalance === 0 ? 0 : (wallet.balance / totalBalance) * 100
    }))
    .sort((left, right) => right.balance - left.balance);
}

export function buildDashboardSnapshot(snapshot: FinanceRepositorySnapshot): DashboardSnapshot {
  const enrichedTransactions = enrichTransactions(
    snapshot.transactions,
    snapshot.wallets,
    snapshot.categories
  );

  return {
    user: snapshot.user,
    summary: buildSummaryMetrics(snapshot.wallets, snapshot.transactions),
    cashFlow: buildCashFlowSeries(snapshot.transactions),
    categoryBreakdown: buildCategoryBreakdown(snapshot.transactions, snapshot.categories).slice(0, 5),
    recentTransactions: enrichedTransactions.slice(0, 6),
    budgets: buildBudgetProgress(snapshot.budgets, snapshot.categories, snapshot.transactions),
    goals: snapshot.goals,
    notifications: snapshot.notifications,
    wallets: buildWalletInsights(snapshot.wallets)
  };
}

function sliceSeriesByInterval(series: CashFlowPoint[], interval: ReportInterval) {
  if (interval === "daily") {
    return series.slice(-1);
  }

  if (interval === "weekly") {
    return series.slice(-2);
  }

  if (interval === "monthly") {
    return series.slice(-6);
  }

  return series;
}

export function buildReportSnapshot(
  snapshot: FinanceRepositorySnapshot,
  interval: ReportInterval
): ReportSnapshot {
  const cashFlow = sliceSeriesByInterval(buildCashFlowSeries(snapshot.transactions), interval);
  const categoryBreakdown = buildCategoryBreakdown(snapshot.transactions, snapshot.categories);
  const totalIncome = snapshot.transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);
  const totalExpense = snapshot.transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  return {
    interval,
    cashFlow,
    categoryBreakdown,
    topExpenseCategories: categoryBreakdown.slice(0, 4),
    totalIncome,
    totalExpense,
    netSavings: totalIncome - totalExpense,
    transactionCount: snapshot.transactions.length
  };
}

export function sortNotifications(notifications: NotificationItem[]) {
  return [...notifications].sort((left, right) => {
    if (left.isRead !== right.isRead) {
      return Number(left.isRead) - Number(right.isRead);
    }

    return new Date(right.dueAt).getTime() - new Date(left.dueAt).getTime();
  });
}

export function sortGoals(goals: FinancialGoal[]) {
  return [...goals].sort(
    (left, right) => new Date(left.deadline).getTime() - new Date(right.deadline).getTime()
  );
}

