"use client"

import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { TransactionList } from "@/components/transactions/transaction-list"
import { TransactionFilters } from "@/components/transactions/transaction-filters"
import { NewTransactionDialog } from "@/components/dashboard/new-transaction-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedCard } from "@/components/ui/motion"

export default function TransactionsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">交易管理</h2>
          <NewTransactionDialog />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AnimatedCard>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">本月交易</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142</div>
                <p className="text-xs text-muted-foreground">
                  较上月 +12%
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">总支出</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">¥8,532</div>
                <p className="text-xs text-muted-foreground">
                  较上月 -5%
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">总收入</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">¥12,234</div>
                <p className="text-xs text-muted-foreground">
                  较上月 +8%
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">结余</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥3,702</div>
                <p className="text-xs text-muted-foreground">
                  较上月 +15%
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>

        <div className="space-y-4">
          <TransactionFilters />
          <TransactionList />
        </div>
      </div>
    </DashboardLayout>
  )
}