"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Plus, Bell, BookOpen, AlertCircle } from "lucide-react"

// Mock data for demonstration
const weeklySchedule = [
  {
    day: "Monday",
    classes: [
      { time: "9:00 AM", subject: "Mathematics", room: "Room 101", duration: "2 hours", color: "bg-primary" },
      { time: "2:00 PM", subject: "Physics", room: "Lab 203", duration: "1.5 hours", color: "bg-secondary" },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      { time: "10:00 AM", subject: "Chemistry", room: "Lab 105", duration: "2 hours", color: "bg-accent" },
      { time: "3:00 PM", subject: "English Literature", room: "Room 301", duration: "1 hour", color: "bg-primary" },
    ],
  },
  {
    day: "Wednesday",
    classes: [
      { time: "9:00 AM", subject: "Mathematics", room: "Room 101", duration: "2 hours", color: "bg-primary" },
      { time: "1:00 PM", subject: "Computer Science", room: "Lab 401", duration: "3 hours", color: "bg-secondary" },
    ],
  },
  {
    day: "Thursday",
    classes: [
      { time: "11:00 AM", subject: "Physics", room: "Lab 203", duration: "2 hours", color: "bg-secondary" },
      { time: "4:00 PM", subject: "History", room: "Room 205", duration: "1 hour", color: "bg-accent" },
    ],
  },
  {
    day: "Friday",
    classes: [
      { time: "9:00 AM", subject: "Chemistry", room: "Lab 105", duration: "1.5 hours", color: "bg-accent" },
      { time: "2:00 PM", subject: "English Literature", room: "Room 301", duration: "1 hour", color: "bg-primary" },
    ],
  },
]

const upcomingAssignments = [
  {
    title: "Calculus Problem Set",
    subject: "Mathematics",
    dueDate: "2024-01-15",
    priority: "high",
    status: "pending",
  },
  {
    title: "Physics Lab Report",
    subject: "Physics",
    dueDate: "2024-01-18",
    priority: "medium",
    status: "in-progress",
  },
  {
    title: "Chemistry Research Paper",
    subject: "Chemistry",
    dueDate: "2024-01-22",
    priority: "low",
    status: "pending",
  },
  {
    title: "Literature Essay",
    subject: "English Literature",
    dueDate: "2024-01-25",
    priority: "medium",
    status: "pending",
  },
]

const upcomingEvents = [
  {
    title: "Midterm Exams Begin",
    date: "2024-01-20",
    type: "exam",
    description: "Mathematics and Physics midterms",
  },
  {
    title: "Guest Lecture: AI in Science",
    date: "2024-01-17",
    type: "lecture",
    description: "Special guest speaker from Tech Corp",
  },
  {
    title: "Study Group Meeting",
    date: "2024-01-16",
    type: "study",
    description: "Chemistry study group in Library",
  },
]

export default function TimetablePage() {
  const [selectedDay, setSelectedDay] = useState("Monday")

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

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "exam":
        return <AlertCircle className="h-4 w-4" />
      case "lecture":
        return <BookOpen className="h-4 w-4" />
      case "study":
        return <Calendar className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Timetable & Schedule</h1>
            <p className="text-muted-foreground">Manage your classes, assignments, and important events</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>

        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="events">Upcoming Events</TabsTrigger>
          </TabsList>

          {/* Weekly Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Day Selector */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Days</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {weeklySchedule.map((day) => (
                    <Button
                      key={day.day}
                      variant={selectedDay === day.day ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedDay(day.day)}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      {day.day}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Schedule Details */}
              <div className="lg:col-span-3 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      {selectedDay} Schedule
                    </CardTitle>
                    <CardDescription>Your classes and activities for {selectedDay}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {weeklySchedule
                      .find((day) => day.day === selectedDay)
                      ?.classes.map((classItem, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border rounded-lg mb-4 last:mb-0">
                          <div className={`w-4 h-16 rounded ${classItem.color}`} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-lg">{classItem.subject}</h3>
                              <Badge variant="outline">{classItem.duration}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {classItem.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {classItem.room}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Bell className="h-4 w-4 mr-1" />
                            Remind
                          </Button>
                        </div>
                      )) || (
                      <div className="text-center py-8 text-muted-foreground">
                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No classes scheduled for {selectedDay}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Assignments</CardTitle>
                <CardDescription>Track your assignments and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAssignments.map((assignment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{assignment.title}</h3>
                          <Badge className={getPriorityColor(assignment.priority)}>{assignment.priority}</Badge>
                          <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{assignment.subject}</span>
                          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button size="sm">Mark Complete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Important dates and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-lg">{getEventTypeIcon(event.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{event.title}</h3>
                          <span className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Bell className="h-4 w-4 mr-1" />
                        Remind
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
