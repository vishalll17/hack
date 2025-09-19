"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, BookOpen, Calculator, Heart, DollarSign, Sparkles } from "lucide-react"

// Mock data for demonstration
const suggestedQuestions = [
  {
    category: "Study Help",
    icon: BookOpen,
    questions: [
      "Help me understand calculus derivatives",
      "Create a study schedule for my exams",
      "Explain quantum mechanics concepts",
      "What are the best study techniques?",
    ],
  },
  {
    category: "Health & Wellness",
    icon: Heart,
    questions: [
      "How can I manage study stress?",
      "What are healthy study break activities?",
      "Tips for better sleep during exams",
      "How to maintain work-life balance?",
    ],
  },
  {
    category: "Finance",
    icon: DollarSign,
    questions: [
      "Help me create a student budget",
      "How to save money on textbooks?",
      "What are good part-time jobs for students?",
      "Tips for managing student loans",
    ],
  },
  {
    category: "Academic Planning",
    icon: Calculator,
    questions: [
      "How to choose the right courses?",
      "What career paths match my major?",
      "How to improve my GPA?",
      "Tips for graduate school applications",
    ],
  },
]

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  category?: string
}

const mockAIResponses: { [key: string]: string } = {
  "help me understand calculus derivatives": `Great question! Derivatives are fundamental to calculus. Here's a simple explanation:

**What is a derivative?**
A derivative measures how a function changes as its input changes. Think of it as the "rate of change" or "slope" at any point.

**Key concepts:**
• The derivative of f(x) is written as f'(x) or df/dx
• It represents the slope of the tangent line at any point
• Common rules: Power rule, Product rule, Chain rule

**Example:**
If f(x) = x², then f'(x) = 2x
This means at x = 3, the slope is 2(3) = 6

**Study tips:**
1. Practice basic rules daily
2. Use visual graphs to understand concepts
3. Work through step-by-step examples
4. Connect derivatives to real-world applications

Would you like me to explain any specific derivative rule or provide practice problems?`,

  "create a study schedule for my exams": `I'd be happy to help you create an effective study schedule! Here's a structured approach:

**Step 1: Assess Your Exams**
• List all exams with dates and difficulty levels
• Identify subjects that need more time
• Note any overlapping exam periods

**Step 2: Time Allocation**
• Work backwards from exam dates
• Allocate 2-3 weeks for major exams
• Use the 2:1 rule (2 hours study : 1 hour class time)

**Sample Weekly Schedule:**
• **Monday-Wednesday:** Focus on hardest subjects
• **Thursday-Friday:** Review and practice problems  
• **Weekend:** Light review and self-care

**Study Techniques:**
• 25-minute focused sessions (Pomodoro)
• Active recall and spaced repetition
• Mix of reading, practice, and review

**Pro Tips:**
✓ Schedule breaks and meals
✓ Include buffer time for unexpected topics
✓ Plan reward activities after study sessions

Would you like me to help create a specific schedule based on your current courses?`,

  "how can i manage study stress": `Managing study stress is crucial for academic success and well-being. Here are proven strategies:

**Immediate Stress Relief:**
• Deep breathing exercises (4-7-8 technique)
• 5-minute meditation or mindfulness
• Quick walk or light stretching
• Listen to calming music

**Long-term Stress Management:**
• **Time Management:** Break large tasks into smaller ones
• **Realistic Goals:** Set achievable daily targets
• **Regular Exercise:** 20-30 minutes daily
• **Adequate Sleep:** 7-9 hours consistently

**Study-Specific Tips:**
• Use active learning techniques
• Form study groups for support
• Take regular breaks (every 45-60 minutes)
• Vary your study locations

**When to Seek Help:**
• Persistent anxiety or panic
• Sleep disruption for multiple days
• Loss of appetite or motivation
• Difficulty concentrating despite rest

**Campus Resources:**
• Counseling services
• Academic support centers
• Peer tutoring programs
• Stress management workshops

Remember: Some stress is normal, but chronic stress needs attention. Would you like specific techniques for any particular situation?`,

  "help me create a student budget": `Creating a student budget is essential for financial success! Let's build one together:

**Step 1: Calculate Monthly Income**
• Part-time job earnings
• Financial aid/scholarships
• Family support
• Other sources

**Step 2: List Fixed Expenses**
• Tuition and fees
• Housing (rent/dorm)
• Meal plans
• Transportation
• Insurance
• Phone bill

**Step 3: Variable Expenses**
• Groceries/dining out
• Textbooks and supplies
• Entertainment
• Clothing
• Personal care

**Sample Student Budget (Monthly):**
**Income:** $1,500
• Part-time job: $800
• Family support: $700

**Expenses:** $1,350
• Housing: $600 (40%)
• Food: $300 (20%)
• Transportation: $150 (10%)
• Books/Supplies: $100 (7%)
• Entertainment: $100 (7%)
• Personal: $100 (7%)

**Savings:** $150 (10%)

**Money-Saving Tips:**
• Buy used textbooks or rent
• Cook meals instead of eating out
• Use student discounts everywhere
• Share streaming subscriptions
• Walk/bike when possible

Would you like help customizing this budget for your specific situation?`,
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI study assistant. I'm here to help you with academics, health, finance, and productivity. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const lowerContent = content.toLowerCase()
      let aiResponse =
        "I understand you're asking about that topic. While I'd love to provide a detailed response, I'm currently in demo mode. In a full implementation, I would provide comprehensive, personalized assistance based on your specific needs and academic context."

      // Check for matching mock responses
      for (const [key, response] of Object.entries(mockAIResponses)) {
        if (lowerContent.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerContent)) {
          aiResponse = response
          break
        }
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputMessage)
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">AI Assistant</h1>
            <p className="text-muted-foreground">Get instant help with your studies and student life</p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            AI Powered
          </Badge>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Suggested Questions Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Help</CardTitle>
                <CardDescription>Popular questions to get you started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestedQuestions.map((category, categoryIndex) => {
                  const IconComponent = category.icon

                  return (
                    <div key={categoryIndex} className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <IconComponent className="h-4 w-4 text-primary" />
                        {category.category}
                      </div>
                      <div className="space-y-1">
                        {category.questions.map((question, questionIndex) => (
                          <Button
                            key={questionIndex}
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-left h-auto p-2 text-xs"
                            onClick={() => handleSuggestedQuestion(question)}
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3 flex flex-col">
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  <CardTitle>Chat with AI Assistant</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <ScrollArea ref={scrollAreaRef} className="flex-1 px-6">
                  <div className="space-y-4 pb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.sender === "ai" && (
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                          <div className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                        {message.sender === "user" && (
                          <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4 text-secondary" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                        <div className="bg-muted text-muted-foreground rounded-lg px-4 py-2">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-current rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-current rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="border-t p-4">
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask me anything about your studies, health, finances, or productivity..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button type="submit" disabled={!inputMessage.trim() || isTyping}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground mt-2">
                    AI responses are generated for demonstration. In production, this would connect to a real AI
                    service.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
