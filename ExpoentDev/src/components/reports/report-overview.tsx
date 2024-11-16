"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { month: "1月", 收入: 4000, 支出: 2400 },
  { month: "2月", 收入: 3000, 支出: 1398 },
  { month: "3月", 收入: 2000, 支出: 3800 },
  { month: "4月", 收入: 2780, 支出: 3908 },
  { month: "5月", 收入: 1890, 支出: 4800 },
  { month: "6月", 收入: 2390, 支出: 3800 }
]

export function ReportOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>收支概览</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="month"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `¥${value}`}
            />
            <Tooltip />
            <Bar dataKey="收入" fill="#4ade80" radius={[4, 4, 0, 0]} />
            <Bar dataKey="支出" fill="#f43f5e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}