"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "现金", value: 20000 },
  { name: "股票", value: 25000 },
  { name: "基金", value: 15000 },
  { name: "债券", value: 8000 },
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1']

export function AssetAllocation() {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">资产配置</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `¥${value.toLocaleString()}`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <ul className="space-y-2">
            {data.map((item, index) => (
              <li key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
                <div className="text-sm">
                  {((item.value / total) * 100).toFixed(1)}%
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}