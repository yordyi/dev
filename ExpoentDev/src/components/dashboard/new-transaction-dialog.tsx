"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFinanceStore } from "@/stores/finance"
import { PlusCircle } from "lucide-react"

interface TransactionForm {
  type: 'income' | 'expense'
  amount: number
  description: string
  category: string
  account: string
  tags: string[]
}

const initialForm: TransactionForm = {
  type: 'expense',
  amount: 0,
  description: '',
  category: '',
  account: '',
  tags: []
}

export function NewTransactionDialog() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<TransactionForm>(initialForm)
  const { addTransaction } = useFinanceStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTransaction({
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      description: form.description,
      category: form.category,
      amount: form.type === 'income' ? Math.abs(form.amount) : -Math.abs(form.amount),
      account: form.account,
      tags: form.tags
    })
    setForm(initialForm)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          新增交易
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新增交易</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>交易类型</Label>
            <Select
              value={form.type}
              onValueChange={(value: 'income' | 'expense') => 
                setForm(prev => ({ ...prev, type: value }))
              }
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
              value={form.amount}
              onChange={(e) => setForm(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
            />
          </div>

          <div className="space-y-2">
            <Label>���述</Label>
            <Input
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label>分类</Label>
            <Select
              value={form.category}
              onValueChange={(value) => setForm(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                {form.type === 'expense' ? (
                  <>
                    <SelectItem value="food">餐饮</SelectItem>
                    <SelectItem value="transport">交通</SelectItem>
                    <SelectItem value="shopping">购物</SelectItem>
                    <SelectItem value="entertainment">娱乐</SelectItem>
                    <SelectItem value="housing">居住</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="salary">工资</SelectItem>
                    <SelectItem value="bonus">奖金</SelectItem>
                    <SelectItem value="investment">投资收益</SelectItem>
                    <SelectItem value="other">其他收入</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>账户</Label>
            <Select
              value={form.account}
              onValueChange={(value) => setForm(prev => ({ ...prev, account: value }))}
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
              value={form.tags.join(',')}
              onChange={(e) => setForm(prev => ({ 
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