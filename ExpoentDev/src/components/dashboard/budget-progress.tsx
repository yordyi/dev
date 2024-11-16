"use client"

import { Progress } from "@/components/ui/progress"

const budgetCategories = [
  {
    category: "日常支出",
    budget: 3000,
    spent: 2100,
    color: "bg-blue-500",
  },
  {
    category: "餐饮",
    budget: 2000,
    spent: 1800,
    color: "bg-green-500",
  },
  {
    category: "交通",
    budget: 800,
    spent: 400,
    color: "bg-yellow-500",
  },
  {
    category: "娱乐",
    budget: 1000,
    spent: 900,
    color: "bg-purple-500",
  },
]

export function BudgetProgress() {
  return (
    <div className="space-y-8">
      {budgetCategories.map((item) => (
        <div key={item.category} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {item.category}
              </p>
              <p className="text-sm text-muted-foreground">
                已支出 ¥{item.spent} / 预算 ¥{item.budget}
              </p>
            </div>
            <p className="text-sm font-medium">
              {Math.round((item.spent / item.budget) * 100)}%
            </p>
          </div>
          <Progress 
            value={(item.spent / item.budget) * 100} 
            className={item.spent > item.budget ? "text-red-500" : ""}
          />
        </div>
      ))}
    </div>
  )
}