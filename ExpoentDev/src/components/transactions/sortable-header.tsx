import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFinanceStore } from "@/stores/finance"
import type { Transaction } from "@/stores/finance"

interface SortableHeaderProps {
  field: keyof Transaction
  children: React.ReactNode
}

export function SortableHeader({ field, children }: SortableHeaderProps) {
  const { sort, setSort } = useFinanceStore()
  
  return (
    <Button
      variant="ghost"
      onClick={() => setSort(field)}
      className="hover:bg-transparent"
    >
      {children}
      {sort.field === field ? (
        sort.direction === 'asc' ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-2 h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  )
} 