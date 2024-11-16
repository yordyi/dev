"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useFinanceStore } from "@/stores/finance"
import { Trash, Tag, FolderInput } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface BatchActionsProps {
  selectedIds: string[]
  onSelectAll: () => void
  onClearSelection: () => void
}

export function BatchActions({ selectedIds, onSelectAll, onClearSelection }: BatchActionsProps) {
  const { deleteTransaction, updateTransaction } = useFinanceStore()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleBatchDelete = async () => {
    setIsDeleting(true)
    try {
      selectedIds.forEach(id => deleteTransaction(id))
      onClearSelection()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Checkbox 
        checked={selectedIds.length > 0}
        onClick={selectedIds.length > 0 ? onClearSelection : onSelectAll}
      />
      <span className="text-sm text-muted-foreground">
        已选择 {selectedIds.length} 项
      </span>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" disabled={selectedIds.length === 0}>
            批量操作
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleBatchDelete}>
            <Trash className="mr-2 h-4 w-4" />
            删除
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Tag className="mr-2 h-4 w-4" />
            修改分类
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FolderInput className="mr-2 h-4 w-4" />
            修改账户
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
} 