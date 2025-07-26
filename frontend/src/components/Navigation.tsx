'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Home,
  User,
  PieChart,
  Wallet,
  BookOpen,
  BarChart3,
  Bell,
  Menu,
  X,
  TrendingUp
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: 'landing', label: 'Home', icon: Home, badge: null },
  { id: 'profile', label: 'Profile', icon: User, badge: null },
  { id: 'portfolio', label: 'Portfolio', icon: PieChart, badge: '₹2.4L' },
  { id: 'budget', label: 'Budget & Expenses', icon: Wallet, badge: null },
  { id: 'knowledge', label: 'Knowledge Portal', icon: BookOpen, badge: 'New' },
  { id: 'health', label: 'Financial Health', icon: BarChart3, badge: null }
];

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePageChange = (pageId: string) => {
    onPageChange(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-40"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-40 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:z-0
        `}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-medium text-sidebar-foreground">Fyza</h1>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'default' : 'ghost'}
                className={`w-full justify-start gap-3 h-12 ${
                  currentPage === item.id
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
                onClick={() => handlePageChange(item.id)}
              >
                <item.icon className="h-5 w-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge
                    variant={currentPage === item.id ? 'secondary' : 'outline'}
                    className="ml-auto"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </nav>

          <div className="mt-8 p-4 bg-sidebar-accent rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="h-4 w-4 text-sidebar-accent-foreground" />
              <span className="text-sm font-medium text-sidebar-accent-foreground">
                Notifications
              </span>
              <Badge variant="destructive" className="ml-auto text-xs">
                3
              </Badge>
            </div>
            <p className="text-xs text-sidebar-accent-foreground/80">
              You have pending tax recommendations
            </p>
          </div>
        </div>
      </div>
    </>
  );
}