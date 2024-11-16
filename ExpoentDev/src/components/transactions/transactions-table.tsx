"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import type { Transaction } from '@/stores/finance'
import { EditTransactionDialog } from "./edit-transaction-dialog"
import { SortableHeader } from "./sortable-header"

interface TransactionsTableProps {
  data?: Transaction[]
  onDelete?: (id: string) => void
  onEdit?: (id: string, transaction: Partial<Transaction>) => void
}

export function TransactionsTable({ 
  data = [], 
  onDelete, 
  onEdit 
}: TransactionsTableProps) {
  return (
    <div className="max-h-[600px] overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <SortableHeader field="date">日期</SortableHeader>
            </TableHead>
            <TableHead>
              <SortableHeader field="description">描述</SortableHeader>
            </TableHead>
            <TableHead>
              <SortableHeader field="category">分类</SortableHeader>
            </TableHead>
            <TableHead>
              <SortableHeader field="amount">金额</SortableHeader>
            </TableHead>
            <TableHead>
              <SortableHeader field="account">账户</SortableHeader>
            </TableHead>
            <TableHead>标签</TableHead>
            <TableHead className="w-[100px]">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell className={transaction.amount > 0 ? "text-green-500" : "text-red-500"}>
                {transaction.amount > 0 ? "+" : ""}{transaction.amount}¥
              </TableCell>
              <TableCell>{transaction.account}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {transaction.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <EditTransactionDialog
                        transaction={transaction}
                        onSave={onEdit!}
                        trigger={
                          <div className="flex items-center">
                            <Pencil className="mr-2 h-4 w-4" />
                            编辑
                          </div>
                        }
                      />
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => onDelete?.(transaction.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      删除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}