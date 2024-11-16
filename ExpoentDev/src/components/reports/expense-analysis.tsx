"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "餐饮", value: 2400 },
  { name: "交通", value: 1398 },
  { name: "购物", value: 3800 },
  { name: "娱乐", value: 2000 },
  { name: "居住", value: 4800 }
]

const COLORS = ["#4ade80", "#f43f5e", "#facc15", "#60a5fa", "#a78bfa"]

export function ExpenseAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>支出分析</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `¥${value}`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}