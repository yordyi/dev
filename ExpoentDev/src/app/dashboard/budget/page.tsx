"use client"

import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AnimatedCard } from "@/components/ui/motion"
import { NewBudgetDialog } from "@/components/budget/new-budget-dialog"
import { Wallet, TrendingDown, AlertTriangle, Calculator } from "lucide-react"

const budgetCategories = [
  {
    category: "餐饮",
    spent: 1200,
    budget: 2000,
    icon: "🍽️",
    color: "bg-blue-500"
  },
  {
    category: "交通",
    spent: 450,
    budget: 800,
    icon: "🚗",
    color: "bg-green-500"
  },
  {
    category: "购物",
    spent: 2300,
    budget: 2500,
    icon: "🛍️",
    color: "bg-yellow-500"
  },
  {
    category: "娱乐",
    spent: 800,
    budget: 1000,
    icon: "🎮",
    color: "bg-purple-500"
  },
  {
    category: "居住",
    spent: 3500,
    budget: 4000,
    icon: "🏠",
    color: "bg-red-500"
  }
]

export default function BudgetPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">预算管理</h2>
          <NewBudgetDialog />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AnimatedCard>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">总预算</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥10,300</div>
                <p className="text-xs text-muted-foreground">
                  已使用 68%
                </p>
                <Progress value={68} className="mt-2" />
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">剩余预算</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥3,296</div>
                <p className="text-xs text-muted-foreground">
                  本月剩余 12 天
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">预警类别</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  超支或接近预算
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">日均可用</CardTitle>
                <Calculator className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥274</div>
                <p className="text-xs text-muted-foreground">
                  建议日支出上限
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>

        <div className="grid gap-4">
          {budgetCategories.map((category, index) => (
            <AnimatedCard key={category.category} transition={{ delay: index * 0.1 }}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <p className="font-medium">{category.category}</p>
                        <p className="text-sm text-muted-foreground">
                          已使用 ¥{category.spent} / ¥{category.budget}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        剩余 ¥{category.budget - category.spent}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {((category.spent / category.budget) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <Progress 
                    value={(category.spent / category.budget) * 100} 
                    className="h-2"
                    variant={(category.spent / category.budget) > 0.9 ? "destructive" : "default"}
                  />
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}