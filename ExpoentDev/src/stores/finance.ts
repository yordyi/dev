import { create } from 'zustand'
import type { StateCreator } from 'zustand'

export interface Transaction {
  id: string
  date: string
  description: string
  category: string
  amount: number
  account: string
  tags: string[]
}

interface PaginationState {
  page: number
  pageSize: number
  total: number
}

interface FilterState {
  dateRange?: { from: Date; to: Date }
  type?: 'income' | 'expense' | 'all'
  category?: string
  account?: string
  search?: string
  categories?: string[]
  accounts?: string[]
  amountRange?: {
    min?: number
    max?: number
  }
  advancedSearch?: {
    amountMin?: number
    amountMax?: number
    description?: string
    tags?: string[]
    categories?: string[]
  }
}

interface SortState {
  field: keyof Transaction | null
  direction: 'asc' | 'desc'
}

interface BudgetCategory {
  id: string
  name: string
  budget: number
  spent: number
}

interface Account {
  id: string
  name: string
  type: 'bank' | 'cash' | 'alipay' | 'wechat' | 'other'
  balance: number
  icon?: string
}

interface FinanceStore {
  transactions: Transaction[]
  isLoading: boolean
  pagination: PaginationState
  filter: FilterState
  sort: SortState
  budgets: BudgetCategory[]
  statistics: {
    totalIncome: number
    totalExpense: number
    totalBalance: number
    monthlyStats: Record<string, { income: number; expense: number; balance: number }>
    categoryStats: Record<string, { income: number; expense: number }>
  }
  accounts: Account[]
  currentAccount: string | 'all' // 'all' 表示显示所有账户
  
  // Actions
  addTransaction: (transaction: Transaction) => void
  deleteTransaction: (id: string) => void
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  setFilter: (filter: Partial<FilterState>) => void
  setSort: (field: keyof Transaction) => void
  updateBudget: (id: string, budget: number) => void
  calculateBudgetSpent: () => void
  calculateStatistics: () => void
  resetData: () => void
  addAccount: (account: Omit<Account, 'balance'>) => void
  updateAccount: (id: string, data: Partial<Account>) => void
  deleteAccount: (id: string) => void
  setCurrentAccount: (id: string | 'all') => void
  calculateAccountBalances: () => void

  // 初始状态
  resetAllData: () => void

  // 同步所有数据
  syncAllData: () => void
}

const initialStatistics = {
  totalIncome: 0,
  totalExpense: 0,
  totalBalance: 0,
  monthlyStats: {},
  categoryStats: {},
}

const initialBudgets = [
  { id: "food", name: "餐饮", budget: 0, spent: 0 },
  { id: "transport", name: "交通", budget: 0, spent: 0 },
  { id: "shopping", name: "购物", budget: 0, spent: 0 },
  { id: "entertainment", name: "娱乐", budget: 0, spent: 0 },
  { id: "housing", name: "居住", budget: 0, spent: 0 },
]

const initialAccounts: Account[] = [
  { id: 'bank', name: '银行卡', type: 'bank', balance: 0, icon: '🏦' },
  { id: 'cash', name: '现金', type: 'cash', balance: 0, icon: '💵' },
  { id: 'alipay', name: '支付宝', type: 'alipay', balance: 0, icon: '💰' },
  { id: 'wechat', name: '微信', type: 'wechat', balance: 0, icon: '💳' },
]

// 初始状态
const initialState = {
  transactions: [] as Transaction[],
  isLoading: false,
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
  },
  filter: {
    type: 'all' as 'income' | 'expense' | 'all',
  },
  sort: {
    field: 'date' as keyof Transaction,
    direction: 'desc' as const,
  },
  budgets: initialBudgets,
  statistics: initialStatistics,
  accounts: initialAccounts,
  currentAccount: 'all' as const,
}

export const useFinanceStore = create<FinanceStore>((set, get) => ({
  ...initialState,

  // 重置所有数据到初始状态
  resetAllData: () => {
    set({
      transactions: [],
      isLoading: false,
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      filter: {
        type: 'all' as const,
      },
      sort: {
        field: 'date' as keyof Transaction,
        direction: 'desc' as const,
      },
      budgets: initialBudgets,
      statistics: initialStatistics,
      accounts: initialAccounts,
      currentAccount: 'all' as const,
    })
  },

  // 同步所有数据
  syncAllData: () => {
    const store = get()
    store.calculateStatistics()
    store.calculateBudgetSpent()
    store.calculateAccountBalances()
  },

  // 添加交易时同步所有相关数据
  addTransaction: (transaction) => {
    set((state) => ({ 
      transactions: [...state.transactions, transaction],
      pagination: {
        ...state.pagination,
        total: state.transactions.length + 1
      }
    }))
    get().syncAllData()
  },

  // 删除交易时同步所有相关数据
  deleteTransaction: (id) => {
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
      pagination: {
        ...state.pagination,
        total: state.transactions.length - 1
      }
    }))
    get().syncAllData()
  },

  // 更新交易时同步所有相关数据
  updateTransaction: (id, transaction) => {
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...transaction } : t
      )
    }))
    get().syncAllData()
  },

  // 更新预算时同步统计数据
  updateBudget: (id, budget) => {
    set((state) => ({
      budgets: state.budgets.map((item) =>
        item.id === id ? { ...item, budget } : item
      ),
    }))
    get().syncAllData()
  },

  // 添加账户时同步余额
  addAccount: (account) => {
    set((state) => ({
      accounts: [...state.accounts, { ...account, balance: 0 }]
    }))
    get().syncAllData()
  },

  // 删除账户时同步数据
  deleteAccount: (id) => {
    set((state) => ({
      accounts: state.accounts.filter((a) => a.id !== id),
      currentAccount: state.currentAccount === id ? 'all' : state.currentAccount,
      // 删除该账户的所有交易记录
      transactions: state.transactions.filter(t => t.account !== id)
    }))
    get().syncAllData()
  },

  setPage: (page) =>
    set((state) => ({
      pagination: { ...state.pagination, page }
    })),

  setPageSize: (pageSize) =>
    set((state) => ({
      pagination: { ...state.pagination, pageSize }
    })),

  setFilter: (filter) =>
    set((state) => ({
      filter: { ...state.filter, ...filter },
      pagination: { ...state.pagination, page: 1 } // 重置到第一页
    })),

  setSort: (field) =>
    set((state) => ({
      sort: {
        field,
        direction: 
          state.sort.field === field && state.sort.direction === 'asc' 
            ? 'desc' 
            : 'asc'
      }
    })),

  calculateBudgetSpent: () => {
    const { transactions, budgets } = get()
    const spent = transactions.reduce((acc, curr) => {
      if (curr.amount < 0) {
        const category = budgets.find(c => c.id === curr.category)
        if (category) {
          acc[curr.category] = (acc[curr.category] || 0) + Math.abs(curr.amount)
        }
      }
      return acc
    }, {} as Record<string, number>)

    set((state) => ({
      budgets: state.budgets.map(budget => ({
        ...budget,
        spent: spent[budget.id] || 0
      }))
    }))
  },

  calculateStatistics: () => {
    const { transactions } = get()
    
    const stats = transactions.reduce((acc, curr) => {
      // 更新总计
      if (curr.amount > 0) {
        acc.totalIncome += curr.amount
      } else {
        acc.totalExpense += Math.abs(curr.amount)
      }
      
      // 更新月度统计
      const month = curr.date.substring(0, 7)
      if (!acc.monthlyStats[month]) {
        acc.monthlyStats[month] = { income: 0, expense: 0, balance: 0 }
      }
      if (curr.amount > 0) {
        acc.monthlyStats[month].income += curr.amount
      } else {
        acc.monthlyStats[month].expense += Math.abs(curr.amount)
      }
      acc.monthlyStats[month].balance = 
        acc.monthlyStats[month].income - acc.monthlyStats[month].expense
      
      // 更新分类统计
      if (!acc.categoryStats[curr.category]) {
        acc.categoryStats[curr.category] = { income: 0, expense: 0 }
      }
      if (curr.amount > 0) {
        acc.categoryStats[curr.category].income += curr.amount
      } else {
        acc.categoryStats[curr.category].expense += Math.abs(curr.amount)
      }
      
      return acc
    }, {
      totalIncome: 0,
      totalExpense: 0,
      totalBalance: 0,
      monthlyStats: {} as Record<string, { income: number; expense: number; balance: number }>,
      categoryStats: {} as Record<string, { income: number; expense: number }>,
    })
    
    stats.totalBalance = stats.totalIncome - stats.totalExpense
    
    set({ statistics: stats })
  },

  resetData: () => {
    set({
      transactions: [],
      budgets: initialBudgets,
      statistics: initialStatistics,
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      filter: {
        type: 'all',
      },
      sort: {
        field: 'date',
        direction: 'desc',
      },
    })
  },

  setCurrentAccount: (id) => {
    set({ currentAccount: id })
  },

  calculateAccountBalances: () => {
    const { transactions, accounts } = get()
    
    // 重置所有账户余额
    const balances = accounts.reduce((acc, account) => {
      acc[account.id] = 0
      return acc
    }, {} as Record<string, number>)
    
    // 计算每个账户的余额
    transactions.forEach((t) => {
      if (balances[t.account] !== undefined) {
        balances[t.account] += t.amount
      }
    })
    
    // 更新账户余额
    set((state) => ({
      accounts: state.accounts.map((account) => ({
        ...account,
        balance: balances[account.id] || 0
      }))
    }))
  },

  updateAccount: (id, data) => {
    set((state) => ({
      accounts: state.accounts.map((account) =>
        account.id === id ? { ...account, ...data } : account
      ),
    }))
    get().syncAllData()
  },
}))

// 添加持久化
if (typeof window !== 'undefined') {
  // 从 localStorage 加载数据
  const savedState = localStorage.getItem('financeState')
  if (savedState) {
    try {
      const parsedState = JSON.parse(savedState)
      useFinanceStore.setState(parsedState)
    } catch (e) {
      console.error('Failed to load state:', e)
    }
  }

  // 监听状态变化并保存到 localStorage
  useFinanceStore.subscribe((state) => {
    localStorage.setItem('financeState', JSON.stringify(state))
  })
} 