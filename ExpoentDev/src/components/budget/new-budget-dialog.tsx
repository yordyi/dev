"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle } from "lucide-react"

const categories = [
  { value: "food", label: "餐饮", icon: "🍽️" },
  { value: "transport", label: "交通", icon: "🚗" },
  { value: "shopping", label: "购物", icon: "🛍️" },
  { value: "entertainment", label: "娱乐", icon: "🎮" },
  { value: "housing", label: "居住", icon: "🏠" },
]

export function NewBudgetDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          新增预算
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新增预算</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="category">预算类别</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="选择预算类别" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    <span className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span>{category.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">预算金额</Label>
            <Input
              id="amount"
              type="number"
              placeholder="输入预算金额"
              className="col-span-3"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="period">预算周期</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="选择预算周期" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">每月</SelectItem>
                <SelectItem value="quarterly">每季度</SelectItem>
                <SelectItem value="yearly">每年</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">备注</Label>
            <Input
              id="description"
              placeholder="输入备注信息"
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button onClick={() => setOpen(false)}>
            保存
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}