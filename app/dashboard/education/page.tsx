"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Search, Play, Star, ExternalLink, Download, Filter, TrendingUp, Users } from "lucide-react"

// Mock data for demonstration
const subjects = [
  { name: "Mathematics", color: "bg-primary", courses: 12, progress: 75 },
  { name: "Physics", color: "bg-secondary", courses: 8, progress: 60 },
  { name: "Chemistry", color: "bg-accent", courses: 10, progress: 45 },
  { name: "Computer Science", color: "bg-primary", courses: 15, progress: 80 },
  { name: "English Literature", color: "bg-secondary", courses: 6, progress: 90 },
  { name: "History", color: "bg-accent", courses: 4, progress: 30 },
]

const featuredLectures = [
  {
    title: "Calculus Fundamentals: Derivatives and Integrals",
    subject: "Mathematics",
    instructor: "Prof. Sarah Johnson",
    duration: "45 min",
    views: "125K",
    rating: 4.8,
    thumbnail: "/calculus-mathematics-lecture.jpg",
    url: "https://youtube.com/watch?v=example1",
  },
  {
    title: "Quantum Mechanics: Wave-Particle Duality",
    subject: "Physics",
    instructor: "Dr. Michael Chen",
    duration: "38 min",
    views: "89K",
    rating: 4.9,
    thumbnail: "/quantum-physics-lecture.jpg",
    url: "https://youtube.com/watch?v=example2",
  },
  {
    title: "Organic Chemistry: Reaction Mechanisms",
    subject: "Chemistry",
    instructor: "Prof. Emily Davis",
    duration: "52 min",
    views: "67K",
    rating: 4.7,
    thumbnail: "/organic-chemistry-lecture.jpg",
    url: "https://youtube.com/watch?v=example3",
  },
  {
    title: "Data Structures and Algorithms",
    subject: "Computer Science",
    instructor: "Prof. Alex Kumar",
    duration: "60 min",
    views: "234K",
    rating: 4.9,
    thumbnail: "/data-structures-programming.png",
    url: "https://youtube.com/watch?v=example4",
  },
]

const studyResources = [
  {
    title: "Linear Algebra Study Guide",
    subject: "Mathematics",
    type: "PDF",
    size: "2.4 MB",
    downloads: 1250,
    rating: 4.6,
    description: "Comprehensive guide covering vectors, matrices, and eigenvalues",
  },
  {
    title: "Physics Formula Sheet",
    subject: "Physics",
    type: "PDF",
    size: "1.8 MB",
    downloads: 890,
    rating: 4.8,
    description: "Essential formulas for mechanics, thermodynamics, and electromagnetism",
  },
  {
    title: "Chemistry Lab Manual",
    subject: "Chemistry",
    type: "PDF",
    size: "5.2 MB",
    downloads: 567,
    rating: 4.5,
    description: "Step-by-step procedures for common chemistry experiments",
  },
  {
    title: "Programming Practice Problems",
    subject: "Computer Science",
    type: "ZIP",
    size: "3.1 MB",
    downloads: 2100,
    rating: 4.9,
    description: "100+ coding problems with solutions in multiple languages",
  },
]

const recentActivity = [
  {
    action: "Watched",
    resource: "Calculus Fundamentals",
    subject: "Mathematics",
    time: "2 hours ago",
    progress: 100,
  },
  {
    action: "Downloaded",
    resource: "Physics Formula Sheet",
    subject: "Physics",
    time: "1 day ago",
    progress: null,
  },
  {
    action: "Started",
    resource: "Quantum Mechanics Course",
    subject: "Physics",
    time: "2 days ago",
    progress: 25,
  },
]

export default function EducationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("All")

  const filteredLectures = featuredLectures.filter(
    (lecture) =>
      (selectedSubject === "All" || lecture.subject === selectedSubject) &&
      lecture.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredResources = studyResources.filter(
    (resource) =>
      (selectedSubject === "All" || resource.subject === selectedSubject) &&
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Education & Learning</h1>
            <p className="text-muted-foreground">Access curated study resources and video lectures</p>
          </div>
          <Button>
            <BookOpen className="h-4 w-4 mr-2" />
            My Library
          </Button>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search lectures, resources, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedSubject === "All" ? "default" : "outline"}
                  onClick={() => setSelectedSubject("All")}
                >
                  All Subjects
                </Button>
                {subjects.slice(0, 3).map((subject) => (
                  <Button
                    key={subject.name}
                    variant={selectedSubject === subject.name ? "default" : "outline"}
                    onClick={() => setSelectedSubject(subject.name)}
                  >
                    {subject.name}
                  </Button>
                ))}
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="subjects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="subjects">My Subjects</TabsTrigger>
            <TabsTrigger value="lectures">Video Lectures</TabsTrigger>
            <TabsTrigger value="resources">Study Resources</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          {/* Subjects Tab */}
          <TabsContent value="subjects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <Card key={subject.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-lg ${subject.color} flex items-center justify-center`}>
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="outline">{subject.courses} courses</Badge>
                    </div>
                    <CardTitle className="text-xl">{subject.name}</CardTitle>
                    <CardDescription>Progress: {subject.progress}% complete</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${subject.color}`}
                          style={{ width: `${subject.progress}%` }}
                        />
                      </div>
                      <Button className="w-full bg-transparent" variant="outline">
                        Continue Learning
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Video Lectures Tab */}
          <TabsContent value="lectures" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredLectures.map((lecture, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={lecture.thumbnail || "/placeholder.svg"}
                      alt={lecture.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-t-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button size="lg" className="rounded-full">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-black/70 text-white">{lecture.duration}</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{lecture.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {lecture.instructor} • {lecture.subject}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {lecture.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {lecture.rating}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" asChild>
                        <a href={lecture.url} target="_blank" rel="noopener noreferrer">
                          <Play className="h-4 w-4 mr-2" />
                          Watch Now
                        </a>
                      </Button>
                      <Button variant="outline" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Study Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="space-y-4">
              {filteredResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <Badge variant="outline">{resource.subject}</Badge>
                            <span>
                              {resource.type} • {resource.size}
                            </span>
                            <div className="flex items-center gap-1">
                              <Download className="h-4 w-4" />
                              {resource.downloads}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {resource.rating}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recent Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Learning Activity</CardTitle>
                <CardDescription>Your recent study sessions and downloads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="p-2 bg-secondary/10 rounded-lg">
                        {activity.action === "Watched" && <Play className="h-5 w-5 text-secondary" />}
                        {activity.action === "Downloaded" && <Download className="h-5 w-5 text-secondary" />}
                        {activity.action === "Started" && <TrendingUp className="h-5 w-5 text-secondary" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{activity.action}</span>
                          <span className="text-muted-foreground">{activity.resource}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {activity.subject}
                          </Badge>
                          <span>{activity.time}</span>
                          {activity.progress && <span>{activity.progress}% complete</span>}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Continue
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
