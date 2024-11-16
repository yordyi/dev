"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const categories = [
  {
    name: "日常开销",
    budget: 2000,
    spent: 1500,
    color: "bg-blue-500",
    trend: "normal",
  },
  {
    name: "餐饮",
    budget: 1500,
    spent: 1400,
    color: "bg-yellow-500",
    trend: "warning",
  },
  {
    name: "交通",
    budget: 500,
    spent: 200,
    color: "bg-green-500",
    trend: "good",
  },
  {
    name: "娱乐",
    budget: 1000,
    spent: 950,
    color: "bg-purple-500",
    trend: "warning",
  },
  {
    name: "购物",
    budget: 1000,
    spent: 1200,
    color: "bg-red-500",
    trend: "exceeded",
  },
]

export function BudgetCategories() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">预算分类详情</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {categories.map((category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {category.name}
                  </span>
                  {category.trend === "exceeded" && (
                    <Badge variant="destructive" className="text-xs">
                      超支
                    </Badge>
                  )}
                  {category.trend === "warning" && (
                    <Badge variant="warning" className="text-xs">
                      接近预算
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  已支出 ¥{category.spent} / 预算 ¥{category.budget}
                </div>
              </div>
              <span className="text-sm font-medium">
                {Math.round((category.spent / category.budget) * 100)}%
              </span>
            </div>
            <Progress 
              value={(category.spent / category.budget) * 100} 
              className={`h-2 ${category.spent > category.budget ? "bg-red-500" : ""}`}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}