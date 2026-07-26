export type TransactionType = "income" | "expense" | "transfer";
export type CategoryType = "income" | "expense";
export type NotificationTone = "info" | "warning" | "success";
export type ReportInterval = "daily" | "weekly" | "monthly" | "yearly";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  plan: string;
  avatarFallback: string;
}

export interface Wallet {
  id: string;
  userId: string;
  name: string;
  balance: number;
  icon: string;
  color: string;
  createdAt: string;
}

export interface Category {
  id: string;
  userId: string;
  name: string;
  type: CategoryType;
  icon: string;
  color: string;
}

export interface Transaction {
  id: string;
  userId: string;
  walletId: string;
  categoryId: string;
  amount: number;
  note: string;
  transactionDate: string;
  type: TransactionType;
  createdAt: string;
}

export interface EnrichedTransaction extends Transaction {
  walletName: string;
  categoryName: string;
  categoryColor: string;
}

export interface Budget {
  id: string;
  userId: string;
  categoryId: string;
  limitAmount: number;
  period: string;
}

export interface BudgetProgress {
  id: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  limitAmount: number;
  spentAmount: number;
  remainingAmount: number;
  utilization: number;
  status: "healthy" | "warning" | "exceeded";
  period: string;
}

export interface GoalContribution {
  id: string;
  goalId: string;
  amount: number;
  contributedAt: string;
}

export interface FinancialGoal {
  id: string;
  userId: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  contributions: GoalContribution[];
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  body: string;
  isRead: boolean;
  tone: NotificationTone;
  dueAt: string;
}

export interface SummaryMetric {
  label: string;
  value: number;
  delta: string;
  accent: string;
}

export interface CashFlowPoint {
  label: string;
  income: number;
  expense: number;
  savings: number;
}

export interface CategoryBreakdownPoint {
  name: string;
  value: number;
  color: string;
}

export interface WalletInsight {
  id: string;
  name: string;
  balance: number;
  color: string;
  icon: string;
  share: number;
}

export interface DashboardSnapshot {
  user: AppUser | null;
  summary: SummaryMetric[];
  cashFlow: CashFlowPoint[];
  categoryBreakdown: CategoryBreakdownPoint[];
  recentTransactions: EnrichedTransaction[];
  budgets: BudgetProgress[];
  goals: FinancialGoal[];
  notifications: NotificationItem[];
  wallets: WalletInsight[];
}

export interface ReportSnapshot {
  interval: ReportInterval;
  cashFlow: CashFlowPoint[];
  categoryBreakdown: CategoryBreakdownPoint[];
  topExpenseCategories: CategoryBreakdownPoint[];
  totalIncome: number;
  totalExpense: number;
  netSavings: number;
  transactionCount: number;
}

export interface FinanceRepositorySnapshot {
  user: AppUser | null;
  wallets: Wallet[];
  categories: Category[];
  transactions: Transaction[];
  budgets: Budget[];
  goals: FinancialGoal[];
  notifications: NotificationItem[];
}

export interface ActionResponse {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
}

