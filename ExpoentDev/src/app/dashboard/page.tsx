import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { BudgetProgress } from "@/components/dashboard/budget-progress"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { AnimatedCard, AnimatedSection } from "@/components/ui/motion"
import { Wallet, TrendingDown, TrendingUp, PieChart } from "lucide-react"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <AnimatedSection className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">仪表盘</h2>
          <QuickActions />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AnimatedCard>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">总资产</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥128,400</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  较上月 +¥3,200
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">本月支出</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥4,200</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingDown className="h-4 w-4 text-green-500" />
                  较上月 -12.3%
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">本月收入</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥7,400</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  较上月 +4.5%
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">预算执行</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">
                  剩余预算 ¥2,800
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <AnimatedCard className="col-span-4" transition={{ delay: 0.4 }}>
            <Card>
              <CardHeader>
                <CardTitle>收支趋势</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard className="col-span-3" transition={{ delay: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>最近交易</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentTransactions />
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>
        <AnimatedCard transition={{ delay: 0.6 }}>
          <Card>
            <CardHeader>
              <CardTitle>预算执行情况</CardTitle>
            </CardHeader>
            <CardContent>
              <BudgetProgress />
            </CardContent>
          </Card>
        </AnimatedCard>
      </AnimatedSection>
    </DashboardLayout>
  )
}