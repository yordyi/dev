"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useFinanceStore } from "@/stores/finance"
import { useEffect } from "react"

export function BudgetSettings() {
  const { budgets, updateBudget, calculateBudgetSpent } = useFinanceStore()

  // 组件加载时计算支出
  useEffect(() => {
    calculateBudgetSpent()
  }, [calculateBudgetSpent])

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>总体预算</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgets.map(category => {
              const percentage = (category.spent / category.budget) * 100
              const isOverBudget = percentage > 100
              
              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>{category.name}</Label>
                    <Input
                      type="number"
                      value={category.budget}
                      onChange={(e) => updateBudget(category.id, Number(e.target.value) || 0)}
                      className="w-32"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>已支出: ¥{category.spent.toFixed(2)}</span>
                    <span className={isOverBudget ? "text-red-500" : ""}>
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className={isOverBudget ? "bg-red-200" : ""}
                  />
                  {isOverBudget && (
                    <p className="text-sm text-red-500">
                      超出预算 ¥{(category.spent - category.budget).toFixed(2)}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>预算分析</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>总预算</Label>
                <div className="text-2xl font-bold">
                  ¥{budgets.reduce((sum, cat) => sum + cat.budget, 0).toFixed(2)}
                </div>
              </div>
              <div>
                <Label>总支出</Label>
                <div className="text-2xl font-bold">
                  ¥{budgets.reduce((sum, cat) => sum + cat.spent, 0).toFixed(2)}
                </div>
              </div>
            </div>
            <Button onClick={calculateBudgetSpent} className="w-full">
              更新支出数据
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 