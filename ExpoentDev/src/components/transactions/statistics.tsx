"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFinanceStore } from "@/stores/finance"
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react"

export function TransactionStatistics() {
  const { transactions } = useFinanceStore()

  const stats = transactions.reduce((acc, curr) => {
    if (curr.amount > 0) {
      acc.income += curr.amount
    } else {
      acc.expense += Math.abs(curr.amount)
    }
    return acc
  }, { income: 0, expense: 0 })

  const balance = stats.income - stats.expense
  const savingsRate = ((stats.income - stats.expense) / stats.income * 100) || 0

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">总收入</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">
            ¥{stats.income.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">总支出</CardTitle>
          <ArrowDownRight className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">
            ¥{stats.expense.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">结余</CardTitle>
          <TrendingUp className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ¥{balance.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            储蓄率: {savingsRate.toFixed(1)}%
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 