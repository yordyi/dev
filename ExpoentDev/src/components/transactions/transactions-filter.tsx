"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Search, Filter } from "lucide-react"

export function TransactionsFilter() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索交易..."
            className="pl-8"
          />
        </div>
        <DateRangePicker />
      </div>
      <div className="flex items-center space-x-2">
        <Select defaultValue="all">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="交易类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="income">收入</SelectItem>
            <SelectItem value="expense">支出</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="账户" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部账户</SelectItem>
            <SelectItem value="bank">银行卡</SelectItem>
            <SelectItem value="cash">现金</SelectItem>
            <SelectItem value="alipay">支付宝</SelectItem>
            <SelectItem value="wechat">微信</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}