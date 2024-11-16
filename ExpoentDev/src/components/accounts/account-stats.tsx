"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFinanceStore } from "@/stores/finance"
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react"

export function AccountStats() {
  const { accounts } = useFinanceStore()

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)
  const positiveBalance = accounts.reduce((sum, account) => sum + (account.balance > 0 ? account.balance : 0), 0)
  const negativeBalance = accounts.reduce((sum, account) => sum + (account.balance < 0 ? Math.abs(account.balance) : 0), 0)

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">总资产</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ¥{totalBalance.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {accounts.length} 个账户
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">正向资产</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">
            ¥{positiveBalance.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {accounts.filter(a => a.balance > 0).length} 个账户
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">负向资产</CardTitle>
          <ArrowDownRight className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">
            ¥{negativeBalance.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {accounts.filter(a => a.balance < 0).length} 个账户
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 