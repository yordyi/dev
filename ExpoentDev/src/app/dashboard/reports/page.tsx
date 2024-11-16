"use client"

import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { ReportOverview } from "@/components/reports/report-overview"
import { ExpenseAnalysis } from "@/components/reports/expense-analysis"
import { IncomeAnalysis } from "@/components/reports/income-analysis"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">财务报表</h2>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">总览</TabsTrigger>
            <TabsTrigger value="income">收入分析</TabsTrigger>
            <TabsTrigger value="expense">支出分析</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <ReportOverview />
          </TabsContent>
          <TabsContent value="income" className="space-y-4">
            <IncomeAnalysis />
          </TabsContent>
          <TabsContent value="expense" className="space-y-4">
            <ExpenseAnalysis />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}