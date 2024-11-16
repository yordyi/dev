"use client"

import { useFinanceStore } from "@/stores/finance"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Search, Filter } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

export function TransactionFilters() {
  const { filter, setFilter, statistics } = useFinanceStore()
  const [showMoreFilters, setShowMoreFilters] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])
  const [amountRange, setAmountRange] = useState({ min: '', max: '' })

  // 从统计数据中获取所有分类
  const categories = Object.keys(statistics.categoryStats)

  // 预定义的账户列表
  const accounts = ["bank", "cash", "alipay", "wechat"]

  const handleApplyFilters = () => {
    setFilter({
      ...filter,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      accounts: selectedAccounts.length > 0 ? selectedAccounts : undefined,
      amountRange: {
        min: amountRange.min ? Number(amountRange.min) : undefined,
        max: amountRange.max ? Number(amountRange.max) : undefined,
      },
    })
    setShowMoreFilters(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索交易..."
              className="pl-8"
              value={filter.search}
              onChange={(e) => setFilter({ search: e.target.value })}
            />
          </div>
          <DatePickerWithRange 
            onChange={(range: DateRange | undefined) => {
              if (range?.from && range?.to) {
                setFilter({ 
                  dateRange: { from: range.from, to: range.to } 
                })
              }
            }}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Select 
            value={filter.type || 'all'} 
            onValueChange={(value: 'all' | 'income' | 'expense') => 
              setFilter({ type: value })
            }
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="交易类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="income">收入</SelectItem>
              <SelectItem value="expense">支出</SelectItem>
            </SelectContent>
          </Select>

          <Sheet open={showMoreFilters} onOpenChange={setShowMoreFilters}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>高级筛选</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">金额范围</h3>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="最小金额"
                      value={amountRange.min}
                      onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="最大金额"
                      value={amountRange.max}
                      onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">分类</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories(prev => [...prev, category])
                            } else {
                              setSelectedCategories(prev => prev.filter(c => c !== category))
                            }
                          }}
                        />
                        <label className="text-sm">{category}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">账户</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {accounts.map((account) => (
                      <div key={account} className="flex items-center space-x-2">
                        <Checkbox
                          checked={selectedAccounts.includes(account)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedAccounts(prev => [...prev, account])
                            } else {
                              setSelectedAccounts(prev => prev.filter(a => a !== account))
                            }
                          }}
                        />
                        <label className="text-sm">{account}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <SheetFooter>
                <Button onClick={handleApplyFilters}>应用筛选</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}