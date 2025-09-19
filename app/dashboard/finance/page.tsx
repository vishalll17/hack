"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  CheckCircle,
  Clock,
  AlertTriangle,
  Target,
  Calendar,
  Coffee,
  Book,
  Car,
  Home,
  ShoppingCart,
} from "lucide-react"

// Mock data for demonstration
const budgetOverview = {
  totalBudget: 1200,
  totalSpent: 850,
  remaining: 350,
  monthlyIncome: 1500,
}

const expenseCategories = [
  { name: "Food & Dining", spent: 320, budget: 400, color: "bg-primary", icon: Coffee },
  { name: "Books & Supplies", spent: 180, budget: 200, color: "bg-secondary", icon: Book },
  { name: "Transportation", spent: 150, budget: 180, color: "bg-accent", icon: Car },
  { name: "Housing", spent: 200, budget: 300, color: "bg-primary", icon: Home },
  { name: "Entertainment", spent: 0, budget: 120, color: "bg-secondary", icon: ShoppingCart },
]

const recentTransactions = [
  {
    description: "Campus Bookstore",
    category: "Books & Supplies",
    amount: -45.99,
    date: "2024-01-14",
    type: "expense",
  },
  {
    description: "Part-time Job",
    category: "Income",
    amount: 350.0,
    date: "2024-01-13",
    type: "income",
  },
  {
    description: "Lunch at Cafeteria",
    category: "Food & Dining",
    amount: -12.5,
    date: "2024-01-13",
    type: "expense",
  },
  {
    description: "Bus Pass",
    category: "Transportation",
    amount: -25.0,
    date: "2024-01-12",
    type: "expense",
  },
  {
    description: "Coffee Shop",
    category: "Food & Dining",
    amount: -4.75,
    date: "2024-01-12",
    type: "expense",
  },
]

const productivityTasks = [
  {
    title: "Complete Physics Assignment",
    category: "Academic",
    priority: "high",
    dueDate: "2024-01-16",
    status: "pending",
    estimatedTime: "2 hours",
  },
  {
    title: "Review Math Notes",
    category: "Study",
    priority: "medium",
    dueDate: "2024-01-17",
    status: "in-progress",
    estimatedTime: "1 hour",
  },
  {
    title: "Grocery Shopping",
    category: "Personal",
    priority: "low",
    dueDate: "2024-01-18",
    status: "pending",
    estimatedTime: "30 minutes",
  },
  {
    title: "Submit Scholarship Application",
    category: "Financial",
    priority: "high",
    dueDate: "2024-01-20",
    status: "pending",
    estimatedTime: "3 hours",
  },
]

const financialGoals = [
  {
    title: "Emergency Fund",
    target: 1000,
    current: 450,
    deadline: "2024-06-01",
    priority: "high",
  },
  {
    title: "Textbook Budget",
    target: 500,
    current: 320,
    deadline: "2024-02-15",
    priority: "medium",
  },
  {
    title: "Spring Break Trip",
    target: 800,
    current: 150,
    deadline: "2024-03-01",
    priority: "low",
  },
]

export default function FinancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: any } = {
      Academic: Book,
      Study: Book,
      Personal: Home,
      Financial: DollarSign,
    }
    return iconMap[category] || CheckCircle
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Finance & Productivity</h1>
            <p className="text-muted-foreground">Manage your budget, expenses, and stay productive</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${budgetOverview.totalBudget}</div>
              <p className="text-xs text-muted-foreground">Total allocated</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${budgetOverview.totalSpent}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((budgetOverview.totalSpent / budgetOverview.totalBudget) * 100)}% of budget
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remaining</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${budgetOverview.remaining}</div>
              <p className="text-xs text-muted-foreground">Available to spend</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${budgetOverview.monthlyIncome}</div>
              <p className="text-xs text-muted-foreground">From all sources</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="budget" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          {/* Budget Tab */}
          <TabsContent value="budget" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Budget Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Budget Categories</CardTitle>
                  <CardDescription>Track spending across different categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expenseCategories.map((category, index) => {
                      const percentage = (category.spent / category.budget) * 100
                      const IconComponent = category.icon

                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <IconComponent className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{category.name}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              ${category.spent} / ${category.budget}
                            </span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{Math.round(percentage)}% used</span>
                            <span className={percentage > 90 ? "text-red-500" : "text-green-500"}>
                              ${category.budget - category.spent} remaining
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Spending Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Spending Overview</CardTitle>
                  <CardDescription>Visual breakdown of your expenses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">${budgetOverview.totalSpent}</div>
                      <p className="text-muted-foreground">Total spent this month</p>
                    </div>
                    <div className="space-y-2">
                      {expenseCategories.map((category, index) => {
                        const percentage = (category.spent / budgetOverview.totalSpent) * 100

                        return (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${category.color}`} />
                              <span className="text-sm">{category.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">${category.spent}</div>
                              <div className="text-xs text-muted-foreground">{Math.round(percentage)}%</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest income and expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2 rounded-lg ${transaction.type === "income" ? "bg-green-100" : "bg-red-100"}`}
                        >
                          {transaction.type === "income" ? (
                            <TrendingUp className="h-5 w-5 text-green-600" />
                          ) : (
                            <TrendingDown className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`text-lg font-semibold ${
                          transaction.type === "income" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Productivity Tasks</CardTitle>
                <CardDescription>Manage your tasks and stay organized</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productivityTasks.map((task, index) => {
                    const IconComponent = getCategoryIcon(task.category)
                    const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "completed"

                    return (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold">{task.title}</h3>
                              <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                              <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                              {isOverdue && (
                                <Badge variant="destructive">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Overdue
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{task.category}</span>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {task.estimatedTime}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Complete
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {financialGoals.map((goal, index) => {
                const percentage = (goal.current / goal.target) * 100
                const daysLeft = Math.ceil(
                  (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                )

                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">{goal.title}</CardTitle>
                        </div>
                        <Badge className={getPriorityColor(goal.priority)}>{goal.priority}</Badge>
                      </div>
                      <CardDescription>Target: ${goal.target}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>
                              ${goal.current} / ${goal.target}
                            </span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">{Math.round(percentage)}% complete</p>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span className={daysLeft < 30 ? "text-red-500" : "text-muted-foreground"}>
                              {daysLeft} days left
                            </span>
                          </div>
                          <span className="text-muted-foreground">${goal.target - goal.current} to go</span>
                        </div>
                        <Button className="w-full bg-transparent" variant="outline">
                          Add Funds
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
