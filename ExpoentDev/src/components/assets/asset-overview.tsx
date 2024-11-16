"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "1月", 总资产: 50000 },
  { name: "2月", 总资产: 55000 },
  { name: "3月", 总资产: 53000 },
  { name: "4月", 总资产: 58000 },
  { name: "5月", 总资产: 62000 },
  { name: "6月", 总资产: 65000 },
  { name: "7月", 总资产: 68000 },
]

export function AssetOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">资产趋势</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">总资产</p>
              <p className="text-2xl font-bold">¥68,000</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">较上月</span>
              <span className="text-sm font-medium text-green-500">+4.6%</span>
            </div>
          </div>
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
                dataKey="总资产"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ fill: "#2563eb", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}