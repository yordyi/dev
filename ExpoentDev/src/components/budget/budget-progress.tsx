"use client"

interface BudgetAlertProps {
  spent: number
  budget: number
}

export function BudgetAlert({ spent, budget }: BudgetAlertProps) {
  const percentage = (spent / budget) * 100
  
  if (percentage >= 90) {
    return (
      <div className="rounded-md bg-red-50 p-4 mt-2">
        <span className="text-red-800">
          预算使用已达 {percentage.toFixed(1)}%，请注意控制支出
        </span>
      </div>
    )
  }
  return null
}

export function BudgetProgress() {
  return (
    <div>
      {/* 预算进度组件的其他内容 */}
    </div>
  )
} 