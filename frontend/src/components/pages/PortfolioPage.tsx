'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
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
  CheckCircle
} from 'lucide-react';

export function PortfolioPage() {
  const investments = [
    {
      name: 'HDFC Top 100 Fund',
      type: 'Equity Mutual Fund',
      invested: 150000,
      current: 168000,
      returns: 12,
      allocation: 25
    },
    {
      name: 'SBI Small Cap Fund',
      type: 'Equity Mutual Fund',
      invested: 100000,
      current: 125000,
      returns: 25,
      allocation: 18
    },
    {
      name: 'ICICI Prudential Corporate Bond',
      type: 'Debt Mutual Fund',
      invested: 200000,
      current: 216000,
      returns: 8,
      allocation: 30
    },
    {
      name: 'Reliance Industries',
      type: 'Direct Equity',
      invested: 80000,
      current: 92000,
      returns: 15,
      allocation: 15
    },
    {
      name: 'Gold ETF',
      type: 'Commodity',
      invested: 50000,
      current: 48000,
      returns: -4,
      allocation: 8
    },
    {
      name: 'EPF',
      type: 'Retirement',
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
      principal: 2500000,
      outstanding: 2100000,
      emi: 23500,
      rate: 8.5,
      tenure: '15 years remaining',
      type: 'Secured'
    },
    {
      name: 'Personal Loan',
      bank: 'SBI',
      principal: 300000,
      outstanding: 180000,
      emi: 8500,
      rate: 12.5,
      tenure: '2 years remaining',
      type: 'Unsecured'
    },
    {
      name: 'Credit Card',
      bank: 'ICICI Bank',
      principal: 0,
      outstanding: 45000,
      emi: 0,
      rate: 36,
      tenure: 'Revolving',
      type: 'Revolving'
    }
  ];

  const insurancePolicies = [
    {
      name: 'Term Life Insurance',
      provider: 'LIC',
      cover: 5000000,
      premium: 18000,
      type: 'Life',
      status: 'Active',
      recommendation: 'Adequate'
    },
    {
      name: 'Health Insurance',
      provider: 'Star Health',
      cover: 500000,
      premium: 12000,
      type: 'Health',
      status: 'Active',
      recommendation: 'Consider increasing cover'
    },
    {
      name: 'Motor Insurance',
      provider: 'Bajaj Allianz',
      cover: 800000,
      premium: 8500,
      type: 'Motor',
      status: 'Active',
      recommendation: 'Adequate'
    }
  ];

  const totalInvested = investments.reduce((sum, inv) => sum + inv.invested, 0);
  const totalCurrent = investments.reduce((sum, inv) => sum + inv.current, 0);
  const totalDebt = debts.reduce((sum, debt) => sum + debt.outstanding, 0);
  const totalCover = insurancePolicies.reduce((sum, policy) => sum + policy.cover, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Portfolio Overview</h1>
        <p className="text-muted-foreground">
          Track your investments, debts, taxes, and insurance
        </p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Investments</p>
                <p className="text-2xl font-bold">₹{(totalCurrent / 100000).toFixed(1)}L</p>
              </div>
              <PieChart className="h-8 w-8 text-primary" />
            </div>
            <div className={`flex items-center gap-1 mt-2 ${totalCurrent > totalInvested ? 'text-green-600' : 'text-red-600'}`}>
              {totalCurrent > totalInvested ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span className="text-sm">
                {((totalCurrent - totalInvested) / totalInvested * 100).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Debt</p>
                <p className="text-2xl font-bold">₹{(totalDebt / 100000).toFixed(1)}L</p>
              </div>
              <CreditCard className="h-8 w-8 text-destructive" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Monthly EMI: ₹32,000
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tax Saved</p>
                <p className="text-2xl font-bold">₹1.2L</p>
              </div>
              <Calculator className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Out of ₹1.5L limit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Insurance Cover</p>
                <p className="text-2xl font-bold">₹{(totalCover / 1000000).toFixed(1)}Cr</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              3 active policies
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="investments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="debt">Debt</TabsTrigger>
          <TabsTrigger value="taxation">Taxation</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
        </TabsList>

        <TabsContent value="investments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Investment Holdings</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Investment
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {investments.map((investment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{investment.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {investment.type}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Invested: ₹{(investment.invested / 1000).toFixed(0)}K | 
                        Current: ₹{(investment.current / 1000).toFixed(0)}K | 
                        Allocation: {investment.allocation}%
                      </div>
                    </div>
                    <div className={`text-right ${investment.returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <div className="flex items-center gap-1">
                        {investment.returns >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        <span className="font-medium">{investment.returns > 0 ? '+' : ''}{investment.returns}%</span>
                      </div>
                      <div className="text-sm">
                        ₹{Math.abs(investment.current - investment.invested).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Equity</span>
                      <span>58%</span>
                    </div>
                    <Progress value={58} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Debt</span>
                      <span>30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Gold</span>
                      <span>8%</span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Others</span>
                      <span>4%</span>
                    </div>
                    <Progress value={4} className="h-2" />
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Recommended allocation for your risk profile:</p>
                  <p className="text-sm">Equity: 70% | Debt: 25% | Gold: 5%</p>
                  <Button className="w-full mt-3" variant="outline">
                    Rebalance Portfolio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="debt" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Debt Overview</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Debt
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {debts.map((debt, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{debt.name}</h4>
                        <Badge variant={debt.type === 'Secured' ? 'default' : debt.type === 'Unsecured' ? 'secondary' : 'destructive'}>
                          {debt.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{debt.bank}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{(debt.outstanding / 100000).toFixed(1)}L</p>
                      <p className="text-sm text-muted-foreground">{debt.rate}% interest</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Monthly EMI</p>
                      <p className="font-medium">₹{debt.emi ? debt.emi.toLocaleString() : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Outstanding</p>
                      <p className="font-medium">₹{debt.outstanding.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tenure</p>
                      <p className="font-medium">{debt.tenure}</p>
                    </div>
                  </div>
                  <Progress 
                    value={((debt.principal - debt.outstanding) / debt.principal) * 100} 
                    className="mt-3 h-2" 
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Debt Optimization Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border">
                  <h4 className="font-medium mb-1">Pay off Credit Card first</h4>
                  <p className="text-sm text-muted-foreground">
                    Credit card debt at 36% interest should be your priority. Save ₹16,200 annually in interest.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-lg border">
                  <h4 className="font-medium mb-1">Consider debt consolidation</h4>
                  <p className="text-sm text-muted-foreground">
                    Consolidate personal loan with home loan top-up at lower rates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="taxation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Gross Income</p>
                    <p className="font-medium">₹12,00,000</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Deductions (80C)</p>
                    <p className="font-medium">₹1,20,000</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Standard Deduction</p>
                    <p className="font-medium">₹50,000</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">HRA Exemption</p>
                    <p className="font-medium">₹2,40,000</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span>Taxable Income</span>
                    <span className="font-medium">₹7,90,000</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Tax Liability</span>
                    <span className="font-medium">₹97,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Net Tax Payable</span>
                    <span className="font-medium text-lg">₹97,500</span>
                  </div>
                </div>
                <Button className="w-full">
                  Calculate Detailed Tax
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Saving Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <h4 className="font-medium">Section 80C</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Used: ₹1.2L / Available: ₹1.5L
                    </p>
                    <Progress value={80} className="mt-2 h-2" />
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <h4 className="font-medium">Section 80D</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Used: ₹12K / Available: ₹25K
                    </p>
                    <Progress value={48} className="mt-2 h-2" />
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <h4 className="font-medium">Section 80E</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Used: ₹0 / Available: No limit
                    </p>
                    <Progress value={0} className="mt-2 h-2" />
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  View Recommendations
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Tax Documents</CardTitle>
              <Button size="sm">
                <FileText className="h-4 w-4 mr-2" />
                File ITR
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Form 16</h4>
                  <p className="text-sm text-muted-foreground">FY 2023-24</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Download
                  </Button>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Investment Proofs</h4>
                  <p className="text-sm text-muted-foreground">80C Documents</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    View
                  </Button>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <h4 className="font-medium mb-1">ITR Filing</h4>
                  <p className="text-sm text-muted-foreground">One-click filing</p>
                  <Button size="sm" className="mt-2">
                    File Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Insurance Policies</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Policy
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {insurancePolicies.map((policy, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{policy.name}</h4>
                        <Badge variant={policy.status === 'Active' ? 'default' : 'secondary'}>
                          {policy.status}
                        </Badge>
                        <Badge 
                          variant={policy.recommendation === 'Adequate' ? 'default' : 'destructive'}
                        >
                          {policy.recommendation}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{policy.provider}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{(policy.cover / 100000).toFixed(0)}L</p>
                      <p className="text-sm text-muted-foreground">Cover Amount</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Annual Premium</p>
                      <p className="font-medium">₹{policy.premium.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Policy Type</p>
                      <p className="font-medium">{policy.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Premium</p>
                      <p className="font-medium">Mar 15, 2024</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Insurance Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border">
                  <h4 className="font-medium mb-1">Increase Health Insurance</h4>
                  <p className="text-sm text-muted-foreground">
                    Consider increasing health cover to ₹10L for better protection against medical inflation.
                  </p>
                  <Button size="sm" className="mt-2">
                    Get Quotes
                  </Button>
                </div>
                <div className="p-3 bg-white rounded-lg border">
                  <h4 className="font-medium mb-1">Critical Illness Cover</h4>
                  <p className="text-sm text-muted-foreground">
                    Add critical illness rider to your existing health policy for comprehensive coverage.
                  </p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Learn More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}