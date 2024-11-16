import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const recentTransactions = [
  {
    id: "1",
    amount: -320,
    date: "2024-01-15",
    description: "超市购物",
    category: "日常支出",
    icon: "🛒",
  },
  {
    id: "2",
    amount: 5000,
    date: "2024-01-14",
    description: "工资收入",
    category: "工资",
    icon: "💰",
  },
  {
    id: "3",
    amount: -150,
    date: "2024-01-13",
    description: "午餐费用",
    category: "餐饮",
    icon: "🍱",
  },
  {
    id: "4",
    amount: -899,
    date: "2024-01-12",
    description: "电费支出",
    category: "水电费",
    icon: "⚡",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-8">
      {recentTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{transaction.icon}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.description}</p>
            <p className="text-sm text-muted-foreground">{transaction.category}</p>
          </div>
          <div className="ml-auto font-medium">
            <span className={transaction.amount > 0 ? "text-green-500" : "text-red-500"}>
              {transaction.amount > 0 ? "+" : ""}{transaction.amount}¥
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}