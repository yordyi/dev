"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFinanceStore } from "@/stores/finance"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts"

export function AccountChart() {
  const { accounts } = useFinanceStore()

  const data = accounts.map(account => ({
    name: account.name,
    value: account.balance,
    icon: account.icon
  }))

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

  return (
    <Card>
      <CardHeader>
        <CardTitle>账户余额</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={({ x, y, payload }) => (
                <g transform={`translate(${x},${y})`}>
                  <text 
                    x={0} 
                    y={0} 
                    dy={16} 
                    textAnchor="middle" 
                    fill="#666"
                  >
                    {payload.value}
                  </text>
                  <text 
                    x={0} 
                    y={0} 
                    dy={-8} 
                    textAnchor="middle" 
                    fill="#666"
                    fontSize="16px"
                  >
                    {data[payload.index].icon}
                  </text>
                </g>
              )}
            />
            <YAxis />
            <Tooltip
              formatter={(value: number) => `¥${value.toFixed(2)}`}
            />
            <Bar dataKey="value">
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
} 