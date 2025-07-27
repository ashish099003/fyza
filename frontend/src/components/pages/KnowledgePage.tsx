'use client';

import {
  ArrowRight,
  BookOpen,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Clock,
  Crown,
  Eye,
  EyeOff,
  Flame,
  Maximize2,
  Newspaper,
  Play,
  Shield,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Zap
} from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

export function KnowledgePage() {
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [currentToolIndex, setCurrentToolIndex] = useState(0);
  const [collapsedCharts, setCollapsedCharts] = useState<string[]>([]);

  const toggleChart = (chartId: string) => {
    setCollapsedCharts(prev => 
      prev.includes(chartId) 
        ? prev.filter(id => id !== chartId)
        : [...prev, chartId]
    );
  };

  const courses = [
    {
      title: 'Basics of Mutual Funds',
      level: 'Beginner',
      duration: '2 hours',
      progress: 0,
      description: 'Learn the fundamentals of mutual fund investing in the Indian market',
      instructor: 'Radhika Gupta',
      rating: 4.8,
      students: 15420,
      image: '/api/placeholder/300/200',
      reward: 'Certificate + 100 points',
      modules: 8,
      completion: '75%'
    },
    {
      title: 'Tax Planning Strategies',
      level: 'Intermediate',
      duration: '3 hours',
      progress: 30,
      description: 'Master tax-saving techniques and investment planning under Indian tax laws',
      instructor: 'Saurabh Mukherjea',
      rating: 4.9,
      students: 8650,
      image: '/api/placeholder/300/200',
      reward: 'Certificate + 200 points',
      modules: 12,
      completion: '30%'
    },
    {
      title: 'Retirement Planning',
      level: 'Intermediate',
      duration: '4 hours',
      progress: 0,
      description: 'Create a comprehensive retirement strategy for financial freedom',
      instructor: 'Nilesh Shah',
      rating: 4.7,
      students: 12340,
      image: '/api/placeholder/300/200',
      reward: 'Certificate + 250 points',
      modules: 15,
      completion: '0%'
    },
    {
      title: 'Advanced Portfolio Management',
      level: 'Advanced',
      duration: '5 hours',
      progress: 55,
      description: 'Professional techniques for portfolio optimization and risk management',
      instructor: 'Prashant Jain',
      rating: 4.9,
      students: 5680,
      image: '/api/placeholder/300/200',
      reward: 'Certificate + 300 points',
      modules: 20,
      completion: '55%'
    }
  ];

  const articles = [
    {
      title: 'RBI Monetary Policy: What It Means for Your Investments',
      category: 'Market News',
      readTime: '5 min read',
      level: 'Beginner',
      author: 'Economic Times',
      publishedAt: '2 hours ago',
      image: '/api/placeholder/400/250',
      excerpt: 'The Reserve Bank of India kept the repo rate unchanged at 6.5%. Here\'s how this decision impacts your mutual fund investments and fixed deposits.',
      trending: true,
      content: 'Full article content would go here...'
    },
    {
      title: 'How to Build an Emergency Fund in 2025: A Complete Guide',
      category: 'Financial Planning',
      readTime: '7 min read',
      level: 'Beginner',
      author: 'Money Control',
      publishedAt: '6 hours ago',
      image: '/api/placeholder/400/250',
      excerpt: 'Step-by-step guide to building a robust emergency fund that can sustain you during financial crises in the current economic climate.',
      trending: false,
      content: 'Full article content would go here...'
    },
    {
      title: 'ELSS vs PPF: Tax Saving Battle for 2025',
      category: 'Tax Planning',
      readTime: '6 min read',
      level: 'Intermediate',
      author: 'Business Standard',
      publishedAt: '1 day ago',
      image: '/api/placeholder/400/250',
      excerpt: 'Compare ELSS and PPF investments with updated tax benefits and returns for making informed decisions about your tax-saving strategy.',
      trending: true,
      content: 'Full article content would go here...'
    },
    {
      title: 'Real Estate vs Stocks: Where to Invest in 2025?',
      category: 'Investing',
      readTime: '10 min read',
      level: 'Advanced',
      author: 'Mint',
      publishedAt: '2 days ago',
      image: '/api/placeholder/400/250',
      excerpt: 'Detailed analysis of real estate versus stock market investments considering current market conditions and future outlook.',
      trending: false,
      content: 'Full article content would go here...'
    }
  ];

  const tools = [
    { name: 'SIP Calculator', icon: Calculator, color: 'bg-blue-50 text-blue-600', description: 'Calculate SIP returns' },
    { name: 'EMI Calculator', icon: Calculator, color: 'bg-green-50 text-green-600', description: 'Plan your loan EMIs' },
    { name: 'Tax Calculator', icon: Calculator, color: 'bg-purple-50 text-purple-600', description: 'Estimate tax liability' },
    { name: 'Retirement Calculator', icon: Calculator, color: 'bg-orange-50 text-orange-600', description: 'Plan retirement corpus' },
    { name: 'Goal Planner', icon: Target, color: 'bg-pink-50 text-pink-600', description: 'Set financial goals' },
    { name: 'Risk Profiler', icon: Shield, color: 'bg-indigo-50 text-indigo-600', description: 'Assess risk tolerance' }
  ];

  const userProgress = {
    coursesCompleted: 3,
    totalPoints: 750,
    currentLevel: 'Intermediate',
    nextLevelPoints: 1000,
    achievements: ['First Course', 'Tax Expert', 'Investment Guru'],
    streak: 7,
    rank: 245,
    weeklyGoal: 5,
    weeklyProgress: 3,
    monthlyReadingGoal: 20,
    monthlyReadingProgress: 14
  };

  const progressTiles = [
    { 
      label: 'Courses Completed', 
      value: userProgress.coursesCompleted, 
      subtitle: 'This Month',
      icon: BookOpen,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    { 
      label: 'Articles Read', 
      value: userProgress.monthlyReadingProgress, 
      subtitle: `Goal: ${userProgress.monthlyReadingGoal}`,
      icon: Newspaper,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    { 
      label: 'Learning Streak', 
      value: `${userProgress.streak} days`, 
      subtitle: 'Keep it up!',
      icon: Flame,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    { 
      label: 'Current Rank', 
      value: `#${userProgress.rank}`, 
      subtitle: 'Leaderboard',
      icon: Crown,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  const nextCourse = () => {
    setCurrentCourseIndex((prev) => (prev + 1) % recommendedCourses.length);
  };

  const prevCourse = () => {
    setCurrentCourseIndex((prev) => (prev - 1 + recommendedCourses.length) % recommendedCourses.length);
  };


  const nextArticle = () => {
    setCurrentArticleIndex((prev) => (prev + 1) % articles.length);
  };

  const prevArticle = () => {
    setCurrentArticleIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const nextTool = () => {
    setCurrentToolIndex((prev) => (prev + 1) % tools.length);
  };

  const prevTool = () => {
    setCurrentToolIndex((prev) => (prev - 1 + tools.length) % tools.length);
  };

  const recommendedCourses = courses.filter(course =>
    ['Tax Planning Strategies', 'Advanced Portfolio Management'].includes(course.title)
  );
  const currentCourse = recommendedCourses[currentCourseIndex % recommendedCourses.length];

  const currentArticle = articles[currentArticleIndex];
  const currentTool = tools[currentToolIndex];

  return (
    <div className="h-full flex flex-col space-y-4 overflow-hidden">
      {/* Header with Gamification */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Knowledge Portal</h1>
          <p className="text-sm text-muted-foreground">
            Enhance your financial literacy with personalized learning
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">{userProgress.streak} day streak</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">{userProgress.totalPoints} points</span>
          </div>
          <Button variant="outline" onClick={() => toggleChart('progress')}>
            {collapsedCharts.includes('progress') ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
            {collapsedCharts.includes('progress') ? 'Show Progress' : 'Hide Progress'}
          </Button>
        </div>
      </div>

      {/* Progress Update Section */}
      {!collapsedCharts.includes('progress') && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {progressTiles.map((tile, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">{tile.label}</p>
                    <p className="text-lg font-bold text-foreground">{tile.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{tile.subtitle}</p>
                  </div>
                  <div className={`w-8 h-8 rounded-lg ${tile.bgColor} flex items-center justify-center`}>
                    <tile.icon className={`h-4 w-4 ${tile.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Main Layout: Financial News + Two Right Tiles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-1 overflow-y-auto">
        
        {/* Left Side: Financial News (Larger) */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Financial News
              </CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>Latest Financial News</DialogTitle>
                    <DialogDescription>Stay updated with the latest financial news and market insights</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {articles.slice(0, 4).map((article, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                            {article.trending && <Badge variant="default" className="text-xs">Trending</Badge>}
                          </div>
                          <h3 className="font-semibold text-sm mb-1 line-clamp-2">{article.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{article.excerpt}</p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">{article.author}</span>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-3">
            <div className="space-y-3">
              {articles.slice(0, 2).map((article, index) => (
                <div key={index} className="relative border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                  <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-muted-foreground" />
                  </div>
                  
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                      {article.trending && (
                        <Badge variant="default" className="text-xs flex items-center gap-1">
                          <Zap className="h-2 w-2" />
                          Trending
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">{article.level}</Badge>
                    </div>
                    
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{article.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{article.author}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{article.publishedAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Side: Two Vertically Stacked Tiles */}
        <div className="space-y-3">
          
          {/* Top Right: Recommended Courses */}
          <Card className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Recommended Courses
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>All Courses</DialogTitle>
                      <DialogDescription>Browse all available financial literacy courses</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                      {courses.map((course, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">{course.level}</Badge>
                              <Badge variant="secondary" className="text-xs">{course.duration}</Badge>
                            </div>
                            <h3 className="font-semibold text-sm mb-1">{course.title}</h3>
                            <p className="text-xs text-muted-foreground mb-2">{course.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span className="text-xs">{course.rating}</span>
                              </div>
                              <Button size="sm">
                                {course.progress > 0 ? 'Continue' : 'Start'}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-3">
              <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-3 border flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs bg-white">{currentCourse.level}</Badge>
                    <Badge variant="secondary" className="text-xs bg-white">{currentCourse.duration}</Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium">{currentCourse.rating}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-foreground mb-2 text-sm">{currentCourse.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{currentCourse.description}</p>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-4 w-4">
                      <AvatarFallback className="text-xs">{currentCourse.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{currentCourse.instructor}</span>
                  </div>
                  
                  {currentCourse.progress > 0 && (
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{currentCourse.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1">
                        <div 
                          className="bg-primary h-1 rounded-full transition-all"
                          style={{ width: `${currentCourse.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={prevCourse} className="h-6 w-6">
                      <ChevronLeft className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={nextCourse} className="h-6 w-6">
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-xs">
                    <Play className="h-3 w-3 mr-1" />
                    {currentCourse.progress > 0 ? 'Continue' : 'Start'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Right: Tools & Calculators */}
          <Card className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-primary" />
                  Tools & Calculators
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>All Financial Tools</DialogTitle>
                      <DialogDescription>Access all financial calculators and planning tools</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                      {tools.map((tool, index) => (
                        <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-3 text-center">
                            <div className={`w-10 h-10 rounded-lg ${tool.color} flex items-center justify-center mx-auto mb-2`}>
                              <tool.icon className="h-5 w-5" />
                            </div>
                            <h3 className="font-medium text-sm mb-1">{tool.name}</h3>
                            <p className="text-xs text-muted-foreground">{tool.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-3">
              <div className="border rounded-lg p-3 text-center flex-1 flex flex-col justify-center">
                <div className={`w-10 h-10 rounded-lg ${currentTool.color} flex items-center justify-center mx-auto mb-3`}>
                  <currentTool.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-sm">{currentTool.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{currentTool.description}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={prevTool} className="h-6 w-6">
                      <ChevronLeft className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={nextTool} className="h-6 w-6">
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button size="sm" className="text-xs">
                    Use Tool
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>


    </div>
  );
}