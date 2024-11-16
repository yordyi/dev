"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFinanceStore } from "@/stores/finance"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

type ChartType = "category" | "trend" | "account"
type ViewType = "pie" | "bar" | "line"

export function ChartAnalysis() {
  const { statistics, calculateStatistics } = useFinanceStore()
  const [chartType, setChartType] = useState<ChartType>("category")
  const [viewType, setViewType] = useState<ViewType>("pie")

  // 使用统计数据
  const categoryData = Object.entries(statistics.categoryStats)
    .map(([name, stats]) => ({
      name,
      value: stats.expense, // 默认显示支出
    }))
    .sort((a, b) => b.value - a.value)

  // 使用月度统计数据
  const trendData = Object.entries(statistics.monthlyStats)
    .map(([month, stats]) => ({
      date: month,
      收入: stats.income,
      支出: stats.expense,
      结余: stats.balance
    }))
    .sort((a, b) => a.date.localeCompare(b.date))

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

  const renderChart = () => {
    switch (chartType) {
      case "category": {
        if (viewType === "pie") {
          return (
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `¥${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )
        }

        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => `¥${value.toFixed(2)}`} />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )
      }

      case "trend": {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value: number) => `¥${value.toFixed(2)}`} />
              <Legend />
              <Line type="monotone" dataKey="收入" stroke="#4ade80" />
              <Line type="monotone" dataKey="支出" stroke="#f43f5e" />
              <Line type="monotone" dataKey="结余" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        )
      }

      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>图表分析</CardTitle>
          <div className="flex gap-2">
            <Select value={chartType} onValueChange={(value: ChartType) => setChartType(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="选择分析维度" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="category">按分类</SelectItem>
                <SelectItem value="trend">收支趋势</SelectItem>
              </SelectContent>
            </Select>
            {chartType !== "trend" && (
              <Select value={viewType} onValueChange={(value: ViewType) => setViewType(value)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="选择图表类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pie">饼图</SelectItem>
                  <SelectItem value="bar">柱状图</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  )
} 