"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { useFinanceStore } from "@/stores/finance"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BudgetAlert } from "@/components/budget/budget-progress"

export function Overview() {
  const { budgets, statistics, calculateStatistics } = useFinanceStore()
  const [timeRange, setTimeRange] = useState<'month' | 'quarter' | 'year'>('month')
  
  useEffect(() => {
    calculateStatistics()
  }, [calculateStatistics])

  // 将月度统计数据转换为图表数据
  const chartData = Object.entries(statistics.monthlyStats)
    .map(([month, stats]) => ({
      name: month,
      收入: stats.income,
      支出: stats.expense,
      结余: stats.balance
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  // 检查是否有超预算的分类
  const overBudgetCategories = budgets.filter(cat => 
    (cat.spent / cat.budget) * 100 >= 90 && cat.budget > 0
  )

  return (
    <div className="space-y-4">
      {overBudgetCategories.map(cat => (
        <BudgetAlert key={cat.id} spent={cat.spent} budget={cat.budget} />
      ))}
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总收入</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              ¥{statistics.totalIncome.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总支出</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              ¥{statistics.totalExpense.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总结余</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ¥{statistics.totalBalance.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>收支趋势</CardTitle>
            <div className="flex gap-2">
              <Select 
                value={timeRange} 
                onValueChange={(value: 'month' | 'quarter' | 'year') => setTimeRange(value)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="选择时间范围" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">按月</SelectItem>
                  <SelectItem value="quarter">按季度</SelectItem>
                  <SelectItem value="year">按年</SelectItem>
                </SelectContent>
              </Select>
              <DatePickerWithRange />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return `${date.getMonth() + 1}月`
                }}
              />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => `¥${value.toFixed(2)}`}
                labelFormatter={(label) => {
                  const date = new Date(label)
                  return `${date.getFullYear()}年${date.getMonth() + 1}月`
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="收入" 
                stroke="#4ade80" 
                strokeWidth={2}
                dot={{ fill: '#4ade80' }}
              />
              <Line 
                type="monotone" 
                dataKey="支出" 
                stroke="#f43f5e" 
                strokeWidth={2}
                dot={{ fill: '#f43f5e' }}
              />
              <Line 
                type="monotone" 
                dataKey="结余" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}