import type {
  AppUser,
  Budget,
  Category,
  FinancialGoal,
  NotificationItem,
  Transaction,
  Wallet
} from "@/types/finance";

export const demoUser: AppUser = {
  id: "demo-user",
  name: "Alya Putri",
  email: "alya@fintrack.app",
  plan: "Personal Pro",
  avatarFallback: "AP"
};

export const demoWallets: Wallet[] = [
  {
    id: "wallet-cash",
    userId: demoUser.id,
    name: "Cash",
    balance: 1850000,
    icon: "Wallet",
    color: "#10b981",
    createdAt: "2026-01-03T08:00:00.000Z"
  },
  {
    id: "wallet-bca",
    userId: demoUser.id,
    name: "BCA Main",
    balance: 11250000,
    icon: "Landmark",
    color: "#0f766e",
    createdAt: "2026-01-03T08:00:00.000Z"
  },
  {
    id: "wallet-gopay",
    userId: demoUser.id,
    name: "GoPay",
    balance: 730000,
    icon: "Smartphone",
    color: "#22c55e",
    createdAt: "2026-02-13T08:00:00.000Z"
  },
  {
    id: "wallet-credit",
    userId: demoUser.id,
    name: "Travel Card",
    balance: 3400000,
    icon: "CreditCard",
    color: "#14b8a6",
    createdAt: "2026-03-02T08:00:00.000Z"
  }
];

export const demoCategories: Category[] = [
  {
    id: "cat-salary",
    userId: demoUser.id,
    name: "Salary",
    type: "income",
    icon: "BadgeDollarSign",
    color: "#10b981"
  },
  {
    id: "cat-freelance",
    userId: demoUser.id,
    name: "Freelance",
    type: "income",
    icon: "BriefcaseBusiness",
    color: "#0f766e"
  },
  {
    id: "cat-food",
    userId: demoUser.id,
    name: "Food & Drink",
    type: "expense",
    icon: "UtensilsCrossed",
    color: "#22c55e"
  },
  {
    id: "cat-bills",
    userId: demoUser.id,
    name: "Bills",
    type: "expense",
    icon: "ReceiptText",
    color: "#f59e0b"
  },
  {
    id: "cat-transport",
    userId: demoUser.id,
    name: "Transport",
    type: "expense",
    icon: "CarFront",
    color: "#3b82f6"
  },
  {
    id: "cat-health",
    userId: demoUser.id,
    name: "Health",
    type: "expense",
    icon: "HeartPulse",
    color: "#ef4444"
  },
  {
    id: "cat-shopping",
    userId: demoUser.id,
    name: "Shopping",
    type: "expense",
    icon: "ShoppingBag",
    color: "#8b5cf6"
  },
  {
    id: "cat-savings",
    userId: demoUser.id,
    name: "Savings",
    type: "expense",
    icon: "PiggyBank",
    color: "#14b8a6"
  }
];

export const demoTransactions: Transaction[] = [
  {
    id: "txn-001",
    userId: demoUser.id,
    walletId: "wallet-bca",
    categoryId: "cat-salary",
    amount: 14000000,
    note: "Salary July",
    transactionDate: "2026-07-01T08:00:00.000Z",
    type: "income",
    createdAt: "2026-07-01T08:00:00.000Z"
  },
  {
    id: "txn-002",
    userId: demoUser.id,
    walletId: "wallet-bca",
    categoryId: "cat-freelance",
    amount: 2650000,
    note: "UI audit project",
    transactionDate: "2026-07-05T13:00:00.000Z",
    type: "income",
    createdAt: "2026-07-05T13:00:00.000Z"
  },
  {
    id: "txn-003",
    userId: demoUser.id,
    walletId: "wallet-gopay",
    categoryId: "cat-food",
    amount: 165000,
    note: "Coffee meetings",
    transactionDate: "2026-07-06T09:20:00.000Z",
    type: "expense",
    createdAt: "2026-07-06T09:20:00.000Z"
  },
  {
    id: "txn-004",
    userId: demoUser.id,
    walletId: "wallet-bca",
    categoryId: "cat-bills",
    amount: 780000,
    note: "Electricity & internet",
    transactionDate: "2026-07-08T07:00:00.000Z",
    type: "expense",
    createdAt: "2026-07-08T07:00:00.000Z"
  },
  {
    id: "txn-005",
    userId: demoUser.id,
    walletId: "wallet-cash",
    categoryId: "cat-transport",
    amount: 210000,
    note: "Fuel & parking",
    transactionDate: "2026-07-10T17:30:00.000Z",
    type: "expense",
    createdAt: "2026-07-10T17:30:00.000Z"
  },
  {
    id: "txn-006",
    userId: demoUser.id,
    walletId: "wallet-bca",
    categoryId: "cat-shopping",
    amount: 920000,
    note: "Desk accessories",
    transactionDate: "2026-07-13T10:00:00.000Z",
    type: "expense",
    createdAt: "2026-07-13T10:00:00.000Z"
  },
  {
    id: "txn-007",
    userId: demoUser.id,
    walletId: "wallet-bca",
    categoryId: "cat-savings",
    amount: 3500000,
    note: "Emergency fund transfer",
    transactionDate: "2026-07-15T11:45:00.000Z",
    type: "transfer",
    createdAt: "2026-07-15T11:45:00.000Z"
  },
  {
    id: "txn-008",
    userId: demoUser.id,
    walletId: "wallet-credit",
    categoryId: "cat-health",
    amount: 450000,
    note: "Medical checkup",
    transactionDate: "2026-07-17T08:10:00.000Z",
    type: "expense",
    createdAt: "2026-07-17T08:10:00.000Z"
  },
  {
    id: "txn-009",
    userId: demoUser.id,
    walletId: "wallet-bca",
    categoryId: "cat-food",
    amount: 310000,
    note: "Groceries",
    transactionDate: "2026-07-21T12:00:00.000Z",
    type: "expense",
    createdAt: "2026-07-21T12:00:00.000Z"
  },
  {
    id: "txn-010",
    userId: demoUser.id,
    walletId: "wallet-gopay",
    categoryId: "cat-transport",
    amount: 89000,
    note: "Ride hailing",
    transactionDate: "2026-07-23T10:00:00.000Z",
    type: "expense",
    createdAt: "2026-07-23T10:00:00.000Z"
  },
  {
    id: "txn-011",
    userId: demoUser.id,
    walletId: "wallet-bca",
    categoryId: "cat-freelance",
    amount: 1800000,
    note: "Workshop speaking fee",
    transactionDate: "2026-06-15T10:00:00.000Z",
    type: "income",
    createdAt: "2026-06-15T10:00:00.000Z"
  },
  {
    id: "txn-012",
    userId: demoUser.id,
    walletId: "wallet-bca",
    categoryId: "cat-bills",
    amount: 780000,
    note: "Electricity & internet",
    transactionDate: "2026-06-08T07:00:00.000Z",
    type: "expense",
    createdAt: "2026-06-08T07:00:00.000Z"
  }
];

export const demoBudgets: Budget[] = [
  {
    id: "budget-food",
    userId: demoUser.id,
    categoryId: "cat-food",
    limitAmount: 2500000,
    period: "2026-07"
  },
  {
    id: "budget-bills",
    userId: demoUser.id,
    categoryId: "cat-bills",
    limitAmount: 1000000,
    period: "2026-07"
  },
  {
    id: "budget-transport",
    userId: demoUser.id,
    categoryId: "cat-transport",
    limitAmount: 750000,
    period: "2026-07"
  },
  {
    id: "budget-shopping",
    userId: demoUser.id,
    categoryId: "cat-shopping",
    limitAmount: 850000,
    period: "2026-07"
  }
];

export const demoGoals: FinancialGoal[] = [
  {
    id: "goal-emergency",
    userId: demoUser.id,
    title: "Emergency Fund",
    targetAmount: 30000000,
    currentAmount: 17800000,
    deadline: "2026-12-31T17:00:00.000Z",
    contributions: [
      {
        id: "goal-contrib-001",
        goalId: "goal-emergency",
        amount: 3500000,
        contributedAt: "2026-07-15T11:45:00.000Z"
      },
      {
        id: "goal-contrib-002",
        goalId: "goal-emergency",
        amount: 2000000,
        contributedAt: "2026-06-15T10:00:00.000Z"
      }
    ]
  },
  {
    id: "goal-japan",
    userId: demoUser.id,
    title: "Japan Trip 2027",
    targetAmount: 22000000,
    currentAmount: 9200000,
    deadline: "2027-03-20T17:00:00.000Z",
    contributions: [
      {
        id: "goal-contrib-003",
        goalId: "goal-japan",
        amount: 1200000,
        contributedAt: "2026-07-10T10:00:00.000Z"
      }
    ]
  }
];

export const demoNotifications: NotificationItem[] = [
  {
    id: "notif-001",
    userId: demoUser.id,
    title: "Budget hampir habis",
    body: "Budget Shopping sudah terpakai 108% pada Juli 2026.",
    isRead: false,
    tone: "warning",
    dueAt: "2026-07-24T10:00:00.000Z"
  },
  {
    id: "notif-002",
    userId: demoUser.id,
    title: "Tagihan internet jatuh tempo",
    body: "Pembayaran internet berikutnya jatuh tempo pada 28 Juli 2026.",
    isRead: false,
    tone: "info",
    dueAt: "2026-07-28T09:00:00.000Z"
  },
  {
    id: "notif-003",
    userId: demoUser.id,
    title: "Goal emergency fund melaju stabil",
    body: "Kamu sudah mencapai 59% dari target dana darurat.",
    isRead: true,
    tone: "success",
    dueAt: "2026-07-20T09:00:00.000Z"
  }
];

