"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "1日", 支出: 200, 预算: 300 },
  { name: "5日", 支出: 800, 预算: 900 },
  { name: "10日", 支出: 1200, 预算: 1500 },
  { name: "15日", 支出: 1800, 预算: 2100 },
  { name: "20日", 支出: 2400, 预算: 2700 },
  { name: "25日", 支出: 2900, 预算: 3000 },
  { name: "30日", 支出: 3200, 预算: 3500 },
]

export function BudgetOverview() {
  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">预算执行概览</CardTitle>
        <Select defaultValue="current">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="选择月份" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">本月</SelectItem>
            <SelectItem value="last">上月</SelectItem>
            <SelectItem value="last2">前两月</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">总预算使用情况</p>
              <p className="text-2xl font-bold">
                ¥3,200 / ¥5,000
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              剩余 64%
            </div>
          </div>
          <Progress value={64} className="h-2" />
        </div>
        <div className="mt-6 h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="name"
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
              <Line
                type="monotone"
                dataKey="支出"
                stroke="#f43f5e"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="预算"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}