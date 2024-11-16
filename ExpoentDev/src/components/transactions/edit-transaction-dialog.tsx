"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { Transaction } from "@/stores/finance"
import { toast } from "@/components/ui/use-toast"

interface EditTransactionDialogProps {
  transaction: Transaction
  onSave: (id: string, data: Partial<Transaction>) => void
  trigger?: React.ReactNode
}

export function EditTransactionDialog({ transaction, onSave, trigger }: EditTransactionDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(transaction)
  const [date, setDate] = useState<Date>(new Date(transaction.date))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 表单验证
    if (!formData.description.trim()) {
      toast({
        title: "验证失败",
        description: "描述不能为空",
        variant: "destructive",
      })
      return
    }

    if (!formData.amount) {
      toast({
        title: "验证失败",
        description: "金额不能为空",
        variant: "destructive",
      })
      return
    }

    try {
      onSave(transaction.id, {
        ...formData,
        date: format(date, 'yyyy-MM-dd'),
      })
      setOpen(false)
      toast({
        title: "保存成功",
        description: "交易记录已更新",
      })
    } catch (error) {
      toast({
        title: "保存失败",
        description: error instanceof Error ? error.message : "未知错误",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">编辑</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>编辑交易</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>日期</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, 'yyyy-MM-dd')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>交易类型</Label>
            <Select
              value={formData.amount > 0 ? "income" : "expense"}
              onValueChange={(value: 'income' | 'expense') => {
                setFormData(prev => ({
                  ...prev,
                  amount: value === "income" ? Math.abs(prev.amount) : -Math.abs(prev.amount)
                }))
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择交易类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">支出</SelectItem>
                <SelectItem value="income">收入</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>金额</Label>
            <Input
              type="number"
              step="0.01"
              value={Math.abs(formData.amount)}
              onChange={(e) => {
                const value = parseFloat(e.target.value)
                setFormData(prev => ({
                  ...prev,
                  amount: prev.amount > 0 ? value : -value
                }))
              }}
            />
          </div>

          <div className="space-y-2">
            <Label>描述</Label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label>分类</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                {formData.amount > 0 ? (
                  <>
                    <SelectItem value="salary">工资</SelectItem>
                    <SelectItem value="bonus">奖金</SelectItem>
                    <SelectItem value="investment">投资收益</SelectItem>
                    <SelectItem value="other">其他收入</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="food">餐饮</SelectItem>
                    <SelectItem value="transport">交通</SelectItem>
                    <SelectItem value="shopping">购物</SelectItem>
                    <SelectItem value="entertainment">娱乐</SelectItem>
                    <SelectItem value="housing">居住</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>账户</Label>
            <Select
              value={formData.account}
              onValueChange={(value) => setFormData(prev => ({ ...prev, account: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择账户" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">银行卡</SelectItem>
                <SelectItem value="cash">现金</SelectItem>
                <SelectItem value="alipay">支付宝</SelectItem>
                <SelectItem value="wechat">微信</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>标签</Label>
            <Input
              placeholder="多个标签用逗号分隔"
              value={formData.tags.join(',')}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
              }))}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button type="submit">保存</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 