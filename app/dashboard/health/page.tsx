"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Activity, TrendingUp, Clock, Zap, Moon, Droplets, Plus, CheckCircle } from "lucide-react"

// Mock data for demonstration
const healthStats = {
  steps: { current: 8420, goal: 10000, unit: "steps" },
  water: { current: 6, goal: 8, unit: "glasses" },
  sleep: { current: 7.5, goal: 8, unit: "hours" },
  exercise: { current: 45, goal: 60, unit: "minutes" },
}

const weeklyProgress = [
  { day: "Mon", steps: 9200, water: 7, sleep: 8, exercise: 30 },
  { day: "Tue", steps: 8500, water: 6, sleep: 7, exercise: 45 },
  { day: "Wed", steps: 10200, water: 8, sleep: 7.5, exercise: 60 },
  { day: "Thu", steps: 7800, water: 5, sleep: 6.5, exercise: 0 },
  { day: "Fri", steps: 9500, water: 7, sleep: 8, exercise: 40 },
  { day: "Sat", steps: 11000, water: 9, sleep: 9, exercise: 90 },
  { day: "Sun", steps: 8420, water: 6, sleep: 7.5, exercise: 45 },
]

const fitnessGoals = [
  {
    title: "Daily Steps",
    target: "10,000 steps",
    current: 8420,
    goal: 10000,
    streak: 5,
    status: "in-progress",
    icon: Activity,
  },
  {
    title: "Weekly Exercise",
    target: "5 hours per week",
    current: 4.5,
    goal: 5,
    streak: 2,
    status: "in-progress",
    icon: Heart,
  },
  {
    title: "Sleep Schedule",
    target: "8 hours nightly",
    current: 7.5,
    goal: 8,
    streak: 3,
    status: "in-progress",
    icon: Moon,
  },
  {
    title: "Hydration",
    target: "8 glasses daily",
    current: 6,
    goal: 8,
    streak: 1,
    status: "behind",
    icon: Droplets,
  },
]

const healthTips = [
  {
    category: "Exercise",
    title: "Take Study Breaks for Movement",
    description:
      "Every 45 minutes of studying, take a 5-minute walk or do light stretching to improve focus and circulation.",
    priority: "high",
    icon: Activity,
  },
  {
    category: "Nutrition",
    title: "Brain-Boosting Breakfast",
    description:
      "Start your day with protein and complex carbs like oatmeal with nuts to maintain steady energy for studying.",
    priority: "medium",
    icon: Zap,
  },
  {
    category: "Sleep",
    title: "Consistent Sleep Schedule",
    description: "Go to bed and wake up at the same time daily, even on weekends, to optimize your circadian rhythm.",
    priority: "high",
    icon: Moon,
  },
  {
    category: "Mental Health",
    title: "Practice Mindfulness",
    description: "Spend 10 minutes daily on meditation or deep breathing to reduce stress and improve concentration.",
    priority: "medium",
    icon: Heart,
  },
]

const recentActivities = [
  {
    type: "exercise",
    activity: "Morning Jog",
    duration: "30 minutes",
    calories: 280,
    time: "2 hours ago",
    icon: Activity,
  },
  {
    type: "water",
    activity: "Hydration Goal",
    duration: "6/8 glasses",
    calories: null,
    time: "Just now",
    icon: Droplets,
  },
  {
    type: "sleep",
    activity: "Night Sleep",
    duration: "7.5 hours",
    calories: null,
    time: "8 hours ago",
    icon: Moon,
  },
]

export default function HealthPage() {
  const [selectedMetric, setSelectedMetric] = useState("steps")

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100
    if (percentage >= 100) return "bg-green-500"
    if (percentage >= 75) return "bg-primary"
    if (percentage >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Health & Fitness</h1>
            <p className="text-muted-foreground">Track your wellness goals and maintain a healthy lifestyle</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Log Activity
          </Button>
        </div>

        {/* Health Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(healthStats).map(([key, stat]) => {
            const percentage = (stat.current / stat.goal) * 100
            const IconComponent = {
              steps: Activity,
              water: Droplets,
              sleep: Moon,
              exercise: Heart,
            }[key]

            return (
              <Card key={key} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium capitalize">{key}</CardTitle>
                  {IconComponent && <IconComponent className="h-4 w-4 text-muted-foreground" />}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stat.current}
                    <span className="text-sm font-normal text-muted-foreground">/{stat.goal}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{stat.unit}</p>
                  <Progress value={percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">{Math.round(percentage)}% of goal</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="tips">Health Tips</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Progress</CardTitle>
                  <CardDescription>Your health metrics over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      {["steps", "water", "sleep", "exercise"].map((metric) => (
                        <Button
                          key={metric}
                          variant={selectedMetric === metric ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedMetric(metric)}
                          className="capitalize"
                        >
                          {metric}
                        </Button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {weeklyProgress.map((day, index) => {
                        const value = day[selectedMetric as keyof typeof day] as number
                        const goal = healthStats[selectedMetric as keyof typeof healthStats].goal
                        const percentage = Math.min((value / goal) * 100, 100)

                        return (
                          <div key={index} className="flex items-center gap-3">
                            <span className="text-sm font-medium w-8">{day.day}</span>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${getProgressColor(value, goal)}`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-16 text-right">
                              {value}
                              {selectedMetric === "sleep" && "h"}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Health Score */}
              <Card>
                <CardHeader>
                  <CardTitle>Health Score</CardTitle>
                  <CardDescription>Overall wellness assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="relative w-32 h-32 mx-auto">
                      <div className="absolute inset-0 rounded-full border-8 border-muted"></div>
                      <div
                        className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent transform -rotate-90"
                        style={{
                          background: `conic-gradient(from 0deg, hsl(var(--primary)) 0deg, hsl(var(--primary)) ${
                            78 * 3.6
                          }deg, transparent ${78 * 3.6}deg)`,
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold">78</div>
                          <div className="text-sm text-muted-foreground">Good</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Exercise</span>
                        <span className="text-primary">85%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Sleep</span>
                        <span className="text-primary">75%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Nutrition</span>
                        <span className="text-yellow-500">65%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Hydration</span>
                        <span className="text-red-500">60%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fitnessGoals.map((goal, index) => {
                const percentage = (goal.current / goal.goal) * 100
                const IconComponent = goal.icon

                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{goal.title}</CardTitle>
                            <CardDescription>{goal.target}</CardDescription>
                          </div>
                        </div>
                        <Badge variant={goal.status === "in-progress" ? "default" : "destructive"}>
                          {goal.status === "in-progress" ? "On Track" : "Behind"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{Math.round(percentage)}%</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span>{goal.streak} day streak</span>
                          </div>
                          <Button variant="outline" size="sm">
                            Update
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Health Tips Tab */}
          <TabsContent value="tips" className="space-y-6">
            <div className="space-y-4">
              {healthTips.map((tip, index) => {
                const IconComponent = tip.icon

                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <IconComponent className="h-5 w-5 text-accent" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{tip.title}</h3>
                            <Badge className={getPriorityColor(tip.priority)}>{tip.priority}</Badge>
                            <Badge variant="outline">{tip.category}</Badge>
                          </div>
                          <p className="text-muted-foreground">{tip.description}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Done
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Activity Log Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your latest health and fitness activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => {
                    const IconComponent = activity.icon

                    return (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="p-2 bg-secondary/10 rounded-lg">
                          <IconComponent className="h-5 w-5 text-secondary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{activity.activity}</span>
                            <Badge variant="outline" className="text-xs capitalize">
                              {activity.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {activity.duration}
                            </div>
                            {activity.calories && (
                              <div className="flex items-center gap-1">
                                <Zap className="h-4 w-4" />
                                {activity.calories} cal
                              </div>
                            )}
                            <span>{activity.time}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
