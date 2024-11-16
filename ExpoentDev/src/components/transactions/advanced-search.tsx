"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { useFinanceStore } from "@/stores/finance"
import { Search, SlidersHorizontal } from "lucide-react"

interface AdvancedSearchForm {
  amountMin?: number
  amountMax?: number
  description?: string
  tags?: string[]
  categories?: string[]
}

export function AdvancedSearch() {
  const { setFilter } = useFinanceStore()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<AdvancedSearchForm>({})

  const handleSearch = () => {
    setFilter({
      advancedSearch: {
        ...form,
        amountMin: form.amountMin,
        amountMax: form.amountMax,
      }
    })
    setOpen(false)
  }

  const handleNumberInput = (field: 'amountMin' | 'amountMax') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? undefined : Number(e.target.value)
    setForm(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>高级搜索</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>金额范围</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="最小金额"
                value={form.amountMin ?? ''}
                onChange={handleNumberInput('amountMin')}
              />
              <span>-</span>
              <Input
                type="number"
                placeholder="最大金额"
                value={form.amountMax ?? ''}
                onChange={handleNumberInput('amountMax')}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>描述包含</Label>
            <Input
              placeholder="输入关键词"
              value={form.description || ''}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="grid gap-2">
            <Label>标签</Label>
            <Input
              placeholder="多个标签用逗号分隔"
              value={form.tags?.join(',') || ''}
              onChange={(e) => setForm(prev => ({ 
                ...prev, 
                tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
              }))}
            />
          </div>

          <div className="grid gap-2">
            <Label>分类</Label>
            <Input
              placeholder="多个分类用逗号分隔"
              value={form.categories?.join(',') || ''}
              onChange={(e) => setForm(prev => ({ 
                ...prev, 
                categories: e.target.value.split(',').map(c => c.trim()).filter(Boolean)
              }))}
            />
          </div>
        </div>
        <SheetFooter>
          <Button onClick={handleSearch}>
            <Search className="mr-2 h-4 w-4" />
            搜索
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
} 