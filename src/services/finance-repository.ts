import { demoBudgets, demoCategories, demoGoals, demoNotifications, demoTransactions, demoWallets } from "@/lib/demo-data";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type {
  AppUser,
  Budget,
  Category,
  FinancialGoal,
  FinanceRepositorySnapshot,
  NotificationItem,
  Transaction,
  Wallet
} from "@/types/finance";

interface WalletRow {
  id: string;
  user_id: string;
  name: string;
  balance: number;
  icon: string | null;
  color: string | null;
  created_at: string | null;
}

interface CategoryRow {
  id: string;
  user_id: string;
  name: string;
  type: "income" | "expense";
  icon: string | null;
  color: string | null;
}

interface TransactionRow {
  id: string;
  user_id: string;
  wallet_id: string;
  category_id: string;
  amount: number;
  note: string | null;
  transaction_date: string;
  type: "income" | "expense" | "transfer";
  created_at: string | null;
}

interface BudgetRow {
  id: string;
  user_id: string;
  category_id: string;
  limit_amount: number;
  period: string;
}

interface GoalRow {
  id: string;
  user_id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  deadline: string;
}

interface NotificationRow {
  id: string;
  user_id: string;
  title: string;
  body: string;
  is_read: boolean;
  due_at: string | null;
}

function mapWallet(row: WalletRow): Wallet {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    balance: row.balance,
    icon: row.icon ?? "Wallet",
    color: row.color ?? "#10b981",
    createdAt: row.created_at ?? new Date().toISOString()
  };
}

function mapCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    type: row.type,
    icon: row.icon ?? "Tag",
    color: row.color ?? "#10b981"
  };
}

function mapTransaction(row: TransactionRow): Transaction {
  return {
    id: row.id,
    userId: row.user_id,
    walletId: row.wallet_id,
    categoryId: row.category_id,
    amount: row.amount,
    note: row.note ?? "",
    transactionDate: row.transaction_date,
    type: row.type,
    createdAt: row.created_at ?? row.transaction_date
  };
}

function mapBudget(row: BudgetRow): Budget {
  return {
    id: row.id,
    userId: row.user_id,
    categoryId: row.category_id,
    limitAmount: row.limit_amount,
    period: row.period
  };
}

function mapGoal(row: GoalRow): FinancialGoal {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    targetAmount: row.target_amount,
    currentAmount: row.current_amount,
    deadline: row.deadline,
    contributions: []
  };
}

function mapNotification(row: NotificationRow): NotificationItem {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    body: row.body,
    isRead: row.is_read,
    tone: row.is_read ? "success" : "info",
    dueAt: row.due_at ?? new Date().toISOString()
  };
}

async function resolveContext() {
  if (!isSupabaseConfigured()) {
    return {
      mode: "demo" as const,
      user: null
    };
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return {
      mode: "demo" as const,
      user: null
    };
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      mode: "empty" as const,
      user: null
    };
  }

  return {
    mode: "live" as const,
    supabase,
    user: {
      id: user.id,
      email: user.email ?? ""
    }
  };
}

export async function getFinanceSnapshot(currentUser: AppUser | null): Promise<FinanceRepositorySnapshot> {
  const context = await resolveContext();

  if (context.mode === "demo") {
    return {
      user: currentUser,
      wallets: demoWallets,
      categories: demoCategories,
      transactions: demoTransactions,
      budgets: demoBudgets,
      goals: demoGoals,
      notifications: demoNotifications
    };
  }

  if (context.mode === "empty") {
    return {
      user: null,
      wallets: [],
      categories: [],
      transactions: [],
      budgets: [],
      goals: [],
      notifications: []
    };
  }

  const { supabase, user } = context;

  const [walletsResult, categoriesResult, transactionsResult, budgetsResult, goalsResult, notificationsResult] =
    await Promise.all([
      supabase.from("wallets").select("*").eq("user_id", user.id).order("created_at", { ascending: true }),
      supabase.from("categories").select("*").eq("user_id", user.id).order("name", { ascending: true }),
      supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("transaction_date", { ascending: false })
        .limit(50),
      supabase.from("budgets").select("*").eq("user_id", user.id),
      supabase.from("financial_goals").select("*").eq("user_id", user.id),
      supabase.from("notifications").select("*").eq("user_id", user.id).order("is_read", { ascending: true })
    ]);

  return {
    user: currentUser,
    wallets: (walletsResult.data as WalletRow[] | null)?.map(mapWallet) ?? [],
    categories: (categoriesResult.data as CategoryRow[] | null)?.map(mapCategory) ?? [],
    transactions: (transactionsResult.data as TransactionRow[] | null)?.map(mapTransaction) ?? [],
    budgets: (budgetsResult.data as BudgetRow[] | null)?.map(mapBudget) ?? [],
    goals: (goalsResult.data as GoalRow[] | null)?.map(mapGoal) ?? [],
    notifications: (notificationsResult.data as NotificationRow[] | null)?.map(mapNotification) ?? []
  };
}
