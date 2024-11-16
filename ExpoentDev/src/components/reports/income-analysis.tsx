"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { category: "工资", amount: 8000 },
  { category: "兼职", amount: 2000 },
  { category: "投资", amount: 1500 },
  { category: "其他", amount: 500 }
]

export function IncomeAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>收入分析</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(value) => `¥${value}`} />
            <YAxis type="category" dataKey="category" width={60} />
            <Tooltip 
              formatter={(value) => `¥${value}`}
              labelFormatter={(label) => `类别: ${label}`}
            />
            <Bar
              dataKey="amount"
              fill="#4ade80"
              radius={[0, 4, 4, 0]}
              label={{ position: 'right', formatter: (value) => `¥${value}` }}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">总收入</span>
            <span>¥12,000</span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>较上月</span>
            <span className="text-green-500">+8.5%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}