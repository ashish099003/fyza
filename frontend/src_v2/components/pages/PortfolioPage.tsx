'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Calculator, 
  Shield,
  Plus,
  FileText,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Clock,
  Maximize2,
  Filter
} from 'lucide-react';

export function PortfolioPage() {
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);
  const [fullscreenSection, setFullscreenSection] = useState<string | null>(null);
  const [selectedAssetClass, setSelectedAssetClass] = useState<string>('all');

  const toggleSection = (sectionId: string) => {
    setCollapsedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const investments = [
    {
      name: 'HDFC Top 100 Fund',
      type: 'Equity Mutual Fund',
      assetClass: 'equity',
      invested: 150000,
      current: 168000,
      returns: 12,
      allocation: 25
    },
    {
      name: 'SBI Small Cap Fund',
      type: 'Equity Mutual Fund',
      assetClass: 'equity',
      invested: 100000,
      current: 125000,
      returns: 25,
      allocation: 18
    },
    {
      name: 'ICICI Prudential Corporate Bond',
      type: 'Debt Mutual Fund',
      assetClass: 'debt',
      invested: 200000,
      current: 216000,
      returns: 8,
      allocation: 30
    },
    {
      name: 'Reliance Industries',
      type: 'Direct Equity',
      assetClass: 'equity',
      invested: 80000,
      current: 92000,
      returns: 15,
      allocation: 15
    },
    {
      name: 'Gold ETF',
      type: 'Commodity',
      assetClass: 'commodity',
      invested: 50000,
      current: 48000,
      returns: -4,
      allocation: 8
    },
    {
      name: 'EPF',
      type: 'Retirement',
      assetClass: 'retirement',
      invested: 300000,
      current: 345000,
      returns: 8.1,
      allocation: 4
    }
  ];

  const debts = [
    {
      name: 'Home Loan',
      bank: 'HDFC Bank',
      outstanding: 2100000,
      emi: 23500,
      rate: 8.5,
      tenure: '15 years',
      totalTenure: 20,
      paidTenure: 5,
      priority: 'low'
    },
    {
      name: 'Personal Loan',
      bank: 'SBI',
      outstanding: 180000,
      emi: 8500,
      rate: 12.5,
      tenure: '2 years',
      totalTenure: 3,
      paidTenure: 1,
      priority: 'medium'
    },
    {
      name: 'Car Loan',
      bank: 'ICICI Bank',
      outstanding: 450000,
      emi: 12500,
      rate: 9.2,
      tenure: '4 years',
      totalTenure: 5,
      paidTenure: 1,
      priority: 'low'
    },
    {
      name: 'Credit Card',
      bank: 'HDFC Bank',
      outstanding: 85000,
      emi: 15000,
      rate: 42.0,
      tenure: '6 months',
      totalTenure: 1,
      paidTenure: 0.5,
      priority: 'high'
    }
  ];

  const insurancePolicies = [
    {
      name: 'Term Life Insurance',
      provider: 'LIC',
      cover: 5000000,
      premium: 18000,
      type: 'Life',
      recommendation: 'adequate'
    },
    {
      name: 'Health Insurance',
      provider: 'Star Health',
      cover: 500000,
      premium: 12000,
      type: 'Health',
      recommendation: 'increase'
    }
  ];

  const totalInvested = investments.reduce((sum, inv) => sum + inv.invested, 0);
  const totalCurrent = investments.reduce((sum, inv) => sum + inv.current, 0);
  const totalDebt = debts.reduce((sum, debt) => sum + debt.outstanding, 0);
  const totalCover = insurancePolicies.reduce((sum, policy) => sum + policy.cover, 0);

  const portfolioTiles = [
    { 
      label: 'Total Investments', 
      value: `₹${(totalCurrent / 100000).toFixed(1)}L`, 
      change: `${((totalCurrent - totalInvested) / totalInvested * 100).toFixed(1)}%`,
      positive: totalCurrent > totalInvested,
      icon: PieChart,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    { 
      label: 'Total Debt', 
      value: `₹${(totalDebt / 100000).toFixed(1)}L`, 
      subtitle: 'Monthly EMI: ₹32,000',
      icon: CreditCard,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    { 
      label: 'Tax Saved', 
      value: '₹1.2L', 
      subtitle: 'Out of ₹1.5L limit',
      icon: Calculator,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    { 
      label: 'Insurance Cover', 
      value: `₹${(totalCover / 1000000).toFixed(1)}Cr`, 
      subtitle: '2 active policies',
      icon: Shield,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  const assetClasses = [
    { id: 'all', name: 'All Assets', count: investments.length },
    { id: 'equity', name: 'Equity', count: investments.filter(i => i.assetClass === 'equity').length },
    { id: 'debt', name: 'Debt', count: investments.filter(i => i.assetClass === 'debt').length },
    { id: 'commodity', name: 'Commodity', count: investments.filter(i => i.assetClass === 'commodity').length },
    { id: 'retirement', name: 'Retirement', count: investments.filter(i => i.assetClass === 'retirement').length }
  ];

  const filteredInvestments = selectedAssetClass === 'all' 
    ? investments 
    : investments.filter(inv => inv.assetClass === selectedAssetClass);

  const assetAllocation = [
    { category: 'Equity', percentage: 58, color: 'bg-green-500', textColor: 'text-green-600' },
    { category: 'Debt', percentage: 30, color: 'bg-blue-500', textColor: 'text-blue-600' },
    { category: 'Gold', percentage: 8, color: 'bg-yellow-500', textColor: 'text-yellow-600' },
    { category: 'Others', percentage: 4, color: 'bg-purple-500', textColor: 'text-purple-600' }
  ];

  return (
    <div className="h-full flex flex-col space-y-4 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Portfolio Overview</h1>
          <p className="text-sm text-muted-foreground">
            Track your investments, debts, taxes, and insurance
          </p>
        </div>
        <Button variant="outline" onClick={() => toggleSection('summary')}>
          {collapsedSections.includes('summary') ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
          {collapsedSections.includes('summary') ? 'Show Charts' : 'Hide Charts'}
        </Button>
      </div>

      {/* Portfolio Summary */}
      {!collapsedSections.includes('summary') && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {portfolioTiles.map((tile, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">{tile.label}</p>
                    <p className="text-lg font-bold text-foreground">{tile.value}</p>
                    {tile.change && (
                      <div className={`flex items-center gap-1 mt-1 ${tile.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {tile.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        <span className="text-xs">{tile.change}</span>
                      </div>
                    )}
                    {tile.subtitle && (
                      <p className="text-xs text-muted-foreground mt-1">{tile.subtitle}</p>
                    )}
                  </div>
                  <div className={`w-10 h-10 rounded-lg ${tile.bgColor} flex items-center justify-center`}>
                    <tile.icon className={`h-5 w-5 ${tile.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Tabs defaultValue="investments" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="grid w-full grid-cols-4 bg-muted p-1 rounded-lg">
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="debt">Debt</TabsTrigger>
          <TabsTrigger value="taxation">Taxation</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
        </TabsList>

        <TabsContent value="investments" className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
            <Card className="lg:col-span-2 flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Investment Holdings</CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setFullscreenSection('investments')}>
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  {assetClasses.map((assetClass) => (
                    <Button
                      key={assetClass.id}
                      variant={selectedAssetClass === assetClass.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedAssetClass(assetClass.id)}
                      className="text-xs h-7"
                    >
                      {assetClass.name} ({assetClass.count})
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-2">
                {filteredInvestments.map((investment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 text-sm">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">{investment.name}</h4>
                        <Badge variant="outline" className="text-xs h-4">
                          {investment.type}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ₹{(investment.invested / 1000).toFixed(0)}K → ₹{(investment.current / 1000).toFixed(0)}K | {investment.allocation}%
                      </div>
                    </div>
                    <div className={`text-right ${investment.returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <div className="flex items-center gap-1">
                        {investment.returns >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        <span className="font-medium text-sm">{investment.returns > 0 ? '+' : ''}{investment.returns}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Simple Pie Chart Representation */}
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="transparent"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    {/* Equity - 58% */}
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="transparent"
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeDasharray="58 42"
                      strokeDashoffset="0"
                    />
                    {/* Debt - 30% */}
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="transparent"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeDasharray="30 70"
                      strokeDashoffset="-58"
                    />
                    {/* Gold - 8% */}
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="transparent"
                      stroke="#eab308"
                      strokeWidth="2"
                      strokeDasharray="8 92"
                      strokeDashoffset="-88"
                    />
                  </svg>
                </div>
                
                <div className="space-y-2">
                  {assetAllocation.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${asset.color}`} />
                        <span className="font-medium">{asset.category}</span>
                      </div>
                      <span className={`font-medium ${asset.textColor}`}>{asset.percentage}%</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-3 border-t mt-3">
                  <p className="text-xs text-muted-foreground mb-2">Target: Equity 70% | Debt 25% | Gold 5%</p>
                  <Button className="w-full" size="sm">
                    Rebalance Portfolio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="debt" className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 h-full">
            {debts.map((debt, index) => {
              const paidPercentage = (debt.paidTenure / debt.totalTenure) * 100;
              const remainingPercentage = 100 - paidPercentage;
              
              return (
                <Card key={index} className="flex flex-col hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          debt.priority === 'high' ? 'bg-red-50' :
                          debt.priority === 'medium' ? 'bg-yellow-50' : 'bg-green-50'
                        }`}>
                          <CreditCard className={`h-4 w-4 ${
                            debt.priority === 'high' ? 'text-red-600' :
                            debt.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">{debt.name}</h3>
                          <p className="text-xs text-muted-foreground">{debt.bank}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={debt.priority === 'high' ? 'destructive' : debt.priority === 'medium' ? 'secondary' : 'outline'} 
                        className="text-xs"
                      >
                        {debt.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-3">
                    <div className="space-y-3">
                      <div className="text-center p-3 bg-gradient-to-br from-accent/50 to-accent/30 rounded-lg">
                        <div className="text-xl font-bold text-foreground">₹{(debt.outstanding / 100000).toFixed(1)}L</div>
                        <div className="text-xs text-muted-foreground">Outstanding Amount</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center p-2 bg-blue-50 rounded-lg">
                          <div className="text-sm font-bold text-blue-600">₹{debt.emi.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">EMI</div>
                        </div>
                        <div className="text-center p-2 bg-purple-50 rounded-lg">
                          <div className="text-sm font-bold text-purple-600">{debt.rate}%</div>
                          <div className="text-xs text-muted-foreground">Rate</div>
                        </div>
                        <div className="text-center p-2 bg-orange-50 rounded-lg">
                          <div className="text-sm font-bold text-orange-600">{debt.tenure}</div>
                          <div className="text-xs text-muted-foreground">Left</div>
                        </div>
                      </div>
                      
                      {/* Tenure Progress Pie Chart */}
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12">
                          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                            <circle
                              cx="18"
                              cy="18"
                              r="16"
                              fill="transparent"
                              stroke="#e5e7eb"
                              strokeWidth="3"
                            />
                            <circle
                              cx="18"
                              cy="18"
                              r="16"
                              fill="transparent"
                              stroke="#22c55e"
                              strokeWidth="3"
                              strokeDasharray={`${paidPercentage} ${remainingPercentage}`}
                              strokeDashoffset="0"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-foreground">{Math.round(paidPercentage)}%</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground mb-1">Tenure Progress</div>
                          <div className="text-sm font-medium">{debt.paidTenure}Y / {debt.totalTenure}Y</div>
                          <div className="text-xs text-green-600">
                            Save ₹{Math.round(debt.outstanding * 0.15 / 100000)}L+ with prepayment
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs">
                          Calculate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="insurance" className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-full">
            {insurancePolicies.map((policy, index) => (
              <Card key={index} className="flex flex-col hover:shadow-md transition-shadow border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                        <Shield className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{policy.name}</h3>
                        <p className="text-sm text-muted-foreground">{policy.provider}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={policy.recommendation === 'adequate' ? 'default' : 'secondary'}
                      className={policy.recommendation === 'increase' ? 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200' : ''}
                    >
                      {policy.recommendation === 'adequate' ? 'Adequate' : 'Review'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-3">
                  <div className="space-y-3">
                    {/* Cover Amount - Prominent Display */}
                    <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-green-50 rounded-lg border border-primary/20">
                      <div className="text-2xl font-bold text-primary">₹{(policy.cover / 100000).toFixed(0)}L</div>
                      <div className="text-sm text-muted-foreground">Coverage Amount</div>
                    </div>
                    
                    {/* Policy Details Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="text-lg font-bold text-blue-600">₹{policy.premium.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Annual Premium</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                        <div className="text-lg font-bold text-purple-600">{policy.type}</div>
                        <div className="text-xs text-muted-foreground">Policy Type</div>
                      </div>
                    </div>
                    
                    {/* Action and Recommendation */}
                    <div className="pt-2 border-t">
                      {policy.recommendation === 'increase' ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                            <span className="text-sm text-muted-foreground">Coverage review needed</span>
                          </div>
                          <Button size="sm" variant="outline" className="text-xs">
                            Increase Cover
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600">Adequate coverage</span>
                          </div>
                          <Button size="sm" variant="outline" className="text-xs">
                            View Details
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="taxation" className="flex-1 overflow-hidden space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 h-full">
            
            {/* Tax Calculator */}
            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tax Calculator</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-3">
                {/* ITR Filing Banner at Top */}
                <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 border rounded-lg mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <div>
                        <h4 className="font-medium text-sm">ITR Filing Due</h4>
                        <p className="text-xs text-muted-foreground">15 days left</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-xs">
                      File Now
                    </Button>
                  </div>
                </div>
                
                {/* Tax Data Vertically */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-accent/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">Gross Income</span>
                    <span className="text-sm font-bold text-foreground">₹12L</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-accent/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">Tax Payable</span>
                    <span className="text-sm font-bold text-foreground">₹97.5K</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                    <span className="text-sm text-muted-foreground">Tax Saved</span>
                    <span className="text-sm font-bold text-green-600">₹1.2L</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                    <span className="text-sm text-muted-foreground">Remaining 80C</span>
                    <span className="text-sm font-bold text-blue-600">₹30K</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tax Saving Techniques */}
            <Card className="flex flex-col lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tax Saving Techniques</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-3 overflow-y-auto">
                <div className="space-y-2">
                  <div className="p-2 border rounded-lg hover:bg-accent/50 cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">ELSS Mutual Funds</h4>
                      <Badge variant="outline" className="text-xs">₹1.5L</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Equity Linked Savings Scheme with 3-year lock-in</p>
                    <div className="flex items-center gap-1 mt-1">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">Tax deduction under 80C</span>
                    </div>
                  </div>
                  
                  <div className="p-2 border rounded-lg hover:bg-accent/50 cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">PPF Investment</h4>
                      <Badge variant="outline" className="text-xs">₹1.5L</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">15-year lock-in with tax-free returns</p>
                    <div className="flex items-center gap-1 mt-1">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">EEE tax benefit</span>
                    </div>
                  </div>
                  
                  <div className="p-2 border rounded-lg hover:bg-accent/50 cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">Health Insurance</h4>
                      <Badge variant="outline" className="text-xs">₹25K</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Premium deduction under 80D</p>
                    <div className="flex items-center gap-1 mt-1">
                      <AlertTriangle className="h-3 w-3 text-orange-600" />
                      <span className="text-xs text-orange-600">Coverage needed</span>
                    </div>
                  </div>
                  

                </div>
              </CardContent>
            </Card>

            {/* Tax Documents */}
            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tax Documents</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-3">
                <div className="grid grid-cols-1 gap-2">
                  <div className="p-2 border rounded-lg text-center hover:bg-accent/50 cursor-pointer">
                    <FileText className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                    <h4 className="font-medium text-sm mb-1">Form 16</h4>
                    <Button size="sm" variant="outline" className="text-xs">
                      Download
                    </Button>
                  </div>
                  <div className="p-2 border rounded-lg text-center hover:bg-accent/50 cursor-pointer">
                    <FileText className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                    <h4 className="font-medium text-sm mb-1">Investment Proofs</h4>
                    <Button size="sm" variant="outline" className="text-xs">
                      View
                    </Button>
                  </div>
                  <div className="p-2 border rounded-lg text-center hover:bg-accent/50 cursor-pointer">
                    <FileText className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                    <h4 className="font-medium text-sm mb-1">Tax Computation</h4>
                    <Button size="sm" variant="outline" className="text-xs">
                      Calculate
                    </Button>
                  </div>
                  <div className="p-2 border rounded-lg text-center hover:bg-accent/50 cursor-pointer">
                    <FileText className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                    <h4 className="font-medium text-sm mb-1">Previous Returns</h4>
                    <Button size="sm" variant="outline" className="text-xs">
                      View All
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Fullscreen Dialog */}
      <Dialog open={!!fullscreenSection} onOpenChange={() => setFullscreenSection(null)}>
        <DialogContent className="max-w-6xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>
              {fullscreenSection === 'investments' && 'Investment Holdings'}
              {fullscreenSection === 'debt' && 'Debt Overview'}
              {fullscreenSection === 'insurance' && 'Insurance Policies'}
            </DialogTitle>
            <DialogDescription>
              {fullscreenSection === 'investments' && 'Detailed view of all your investment holdings and portfolio allocation'}
              {fullscreenSection === 'debt' && 'Comprehensive overview of all your debts and repayment schedules'}
              {fullscreenSection === 'insurance' && 'Complete details of your insurance policies and coverage recommendations'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto">
            {/* Fullscreen content would go here */}
            <p className="text-muted-foreground">Fullscreen view for {fullscreenSection}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}