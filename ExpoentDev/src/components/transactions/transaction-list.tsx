"use client"

import { TransactionsTable } from "./transactions-table"
import { TransactionFilters } from "./transaction-filters"
import { ExportButton } from "./export-button"
import { ImportButton } from "./import-button"
import { AdvancedSearch } from "./advanced-search"
import { useFinanceStore } from "@/stores/finance"
import { LoadingSpinner } from "@/components/ui/loading"
import { Pagination } from "@/components/ui/pagination"
import { useEffect } from "react"
import { AccountSwitcher } from "@/components/accounts/account-switcher"

export function TransactionList() {
  const { 
    transactions, 
    isLoading, 
    deleteTransaction, 
    updateTransaction,
    pagination,
    setPage,
    calculateBudgetSpent,
    calculateStatistics,
    filter,
    sort
  } = useFinanceStore()

  // 当交易数据变化时更新统计和预算
  useEffect(() => {
    calculateBudgetSpent()
    calculateStatistics()
  }, [transactions, calculateBudgetSpent, calculateStatistics])

  // 过滤和排序交易数据
  const filteredTransactions = transactions.filter(t => {
    if (filter.type && filter.type !== 'all') {
      if (filter.type === 'income' && t.amount <= 0) return false
      if (filter.type === 'expense' && t.amount > 0) return false
    }
    
    if (filter.account && filter.account !== 'all' && t.account !== filter.account) {
      return false
    }

    if (filter.dateRange) {
      const date = new Date(t.date)
      if (date < filter.dateRange.from || date > filter.dateRange.to) {
        return false
      }
    }

    if (filter.search) {
      const searchTerm = filter.search.toLowerCase()
      return (
        t.description.toLowerCase().includes(searchTerm) ||
        t.category.toLowerCase().includes(searchTerm) ||
        t.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }

    if (filter.advancedSearch) {
      const { amountMin, amountMax, description, tags, categories } = filter.advancedSearch
      
      if (amountMin !== undefined && t.amount < amountMin) return false
      if (amountMax !== undefined && t.amount > amountMax) return false
      if (description && !t.description.toLowerCase().includes(description.toLowerCase())) return false
      if (tags?.length && !tags.some(tag => t.tags.includes(tag))) return false
      if (categories?.length && !categories.includes(t.category)) return false
    }

    return true
  }).sort((a, b) => {
    if (!sort.field) return 0
    const aValue = a[sort.field]
    const bValue = b[sort.field]
    const direction = sort.direction === 'asc' ? 1 : -1
    return aValue > bValue ? direction : -direction
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  const totalPages = Math.ceil(filteredTransactions.length / pagination.pageSize)
  const start = (pagination.page - 1) * pagination.pageSize
  const end = start + pagination.pageSize
  const paginatedTransactions = filteredTransactions.slice(start, end)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <AccountSwitcher />
        <div className="flex items-center gap-2">
          <AdvancedSearch />
          <ImportButton />
          <ExportButton />
        </div>
      </div>
      
      <TransactionFilters />
      
      <TransactionsTable 
        data={paginatedTransactions}
        onDelete={deleteTransaction}
        onEdit={(id, transaction) => updateTransaction(id, transaction)}
      />
      
      <div className="flex justify-end">
        <Pagination 
          currentPage={pagination.page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
} 