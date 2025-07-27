'use client';

import { AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, ExternalLink, Lightbulb, Target, TrendingUp } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface RightSidebarProps {
  currentPage: string;
  onCollapsedChange: (collapsed: boolean) => void;
  isCollapsed: boolean;
  onNavigate?: (page: string, section?: string) => void;
}

export function RightSidebar({ currentPage, onCollapsedChange, isCollapsed, onNavigate }: RightSidebarProps) {
  const handleToggle = () => {
    onCollapsedChange(!isCollapsed);
  };

  const getPageSpecificContent = () => {
    switch (currentPage) {
      case 'portfolio':
        return {
          tips: [
            {
              title: "High Risk Alert: Small Cap Exposure",
              description: "Your small-cap allocation is 18%. Consider reducing to 10-12% during market volatility. Risk Score: 8.2/10",
              type: "risk",
              priority: "high",
              action: () => console.log('Navigate to portfolio')
            },
            {
              title: "Rebalance Your Portfolio",
              description: "Your equity allocation is 75%. Consider rebalancing to your target 70%.",
              type: "recommendation",
              priority: "medium",
              action: () => console.log('Navigate to portfolio')
            }
          ],
          recommendations: [
            "Consider SIP in mid-cap funds for better long-term returns",
            "Your debt fund allocation is lower than recommended 25%",
            "Review and exit underperforming funds after 3 years"
          ]
        };
      case 'budget':
        return {
          tips: [
            {
              title: "Food & Dining Overspent",
              description: "You've exceeded your Food & Dining budget by ₹1,200 this month. Consider meal planning to reduce costs.",
              type: "alert",
              priority: "high",
              action: () => console.log('Navigate to budget category: Food & Dining')
            },
            {
              title: "Entertainment Budget Alert",
              description: "Entertainment spending is 127% of budget. Review recent entertainment expenses.",
              type: "alert",
              priority: "medium",
              action: () => console.log('Navigate to budget category: Entertainment')
            },
            {
              title: "Subscription Optimization",
              description: "You can save ₹2,800 monthly by canceling unused streaming subscriptions.",
              type: "savings",
              priority: "medium",
              action: () => console.log('Navigate to subscriptions')
            },
            {
              title: "Cashback Opportunity",
              description: "Use your HDFC credit card for grocery purchases to earn 5% cashback.",
              type: "savings",
              priority: "low",
              action: () => console.log('Navigate to credit cards')
            }
          ],
          recommendations: [
            "Your housing expenses are well within budget - great job!",
            "Set up automated bill payments to avoid late fees",
            "Consider using UPI apps for better expense categorization",
            "Enable SMS alerts when you exceed 80% of any category budget"
          ]
        };
      default:
        return {
          tips: [
            {
              title: "Crypto Risk Assessment",
              description: "High volatility detected in your crypto investments. Current risk level: 9.1/10. Consider reducing exposure.",
              type: "risk",
              priority: "high",
              action: () => console.log('Navigate to portfolio')
            },
            {
              title: "Tax Saving Opportunity",
              description: "You can save ₹18,000 more in taxes by investing in ELSS funds before March 31st.",
              type: "tax",
              priority: "medium",
              action: () => onNavigate?.('portfolio', 'tax')
            },
            {
              title: "Insurance Review Due",
              description: "Your health insurance coverage may need increase. Click to review your policies.",
              type: "insurance",
              priority: "medium",
              action: () => console.log('Navigate to portfolio insurance')
            }
          ],
          recommendations: [
            "Increase SIP amount by ₹2,000 to meet retirement goals faster",
            "Consider adding international equity funds for diversification",
            "Review insurance coverage - health insurance may need increase"
          ]
        };
    }
  };

  const content = getPageSpecificContent();

  const getIcon = (type: string) => {
    switch (type) {
      case 'risk':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'recommendation':
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case 'tax':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'savings':
        return <Lightbulb className="h-4 w-4 text-yellow-600" />;
      case 'insurance':
        return <Target className="h-4 w-4 text-purple-600" />;
      default:
        return <Lightbulb className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-orange-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-muted';
    }
  };

  if (isCollapsed) {
    return (
      <div className="w-12 bg-sidebar border-l border-sidebar-border h-full flex flex-col">
        <div className="p-3 border-b border-sidebar-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            className="h-6 w-6"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 p-3 space-y-3">
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-medium">2</span>
          </div>
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-medium">3</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-sidebar border-l border-sidebar-border h-full flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-sidebar-foreground">Insights</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            className="h-6 w-6"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="alerts" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2 gap-2 px-4 mt-4">
            <TabsTrigger
              value="alerts"
              className="px-3 py-2 text-sm font-medium truncate"
            >
              Alerts & Tips
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="px-3 py-2 text-sm font-medium truncate"
            >
              AI Recommendations
            </TabsTrigger>
          </TabsList>

          
          <TabsContent value="alerts" className="flex-1 overflow-y-auto p-4 space-y-3">
            {content.tips.map((tip, index) => (
              <Card key={index} className={`border-l-4 ${getPriorityColor(tip.priority)} bg-card/50 cursor-pointer hover:bg-card/80`} onClick={tip.action}>
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    {getIcon(tip.type)}
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-card-foreground mb-1">{tip.title}</h4>
                      <p className="text-xs text-muted-foreground">{tip.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {tip.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {tip.priority}
                        </Badge>
                        <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="recommendations" className="flex-1 overflow-y-auto p-4 space-y-2">
            {/* Tax Saving Special Tile */}
            <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-emerald-50 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate?.('portfolio', 'tax')}>
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-card-foreground mb-1">💰 Smart Tax Saving Strategies</h4>
                    <p className="text-xs text-muted-foreground mb-2">Explore ELSS, PPF, NPS and other tax-saving investment options to maximize your savings.</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">Tax Planning</Badge>
                      <Badge variant="outline" className="text-xs">Save ₹46,000+</Badge>
                      <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {content.recommendations.map((rec, index) => (
              <div key={index} className="p-3 bg-accent/30 rounded-lg border cursor-pointer hover:bg-accent/50">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-xs text-card-foreground">{rec}</p>
                    <ExternalLink className="h-3 w-3 text-muted-foreground mt-1" />
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}