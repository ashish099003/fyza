'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Home,
  PieChart,
  Wallet,
  BookOpen,
  Menu,
  X,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: 'landing', label: 'Home', icon: Home, badge: null },
  { id: 'portfolio', label: 'Portfolio', icon: PieChart, badge: '₹10.4L' },
  { id: 'budget', label: 'Budget & Expenses', icon: Wallet, badge: null },
  { id: 'knowledge', label: 'Knowledge Portal', icon: BookOpen, badge: 'New' }
];

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-16 h-[calc(100vh-4rem)] bg-sidebar border-r border-sidebar-border z-40 transform transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:z-0 md:top-0 md:h-full
          ${isCollapsed ? 'w-16' : 'w-64'}
        `}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="h-8 w-8 hidden md:flex rounded-full"
              >
                {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'default' : 'ghost'}
                className={`w-full justify-start gap-3 h-12 ${
                  currentPage === item.id
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                } ${isCollapsed ? 'px-3' : ''}`}
                onClick={() => handlePageChange(item.id)}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <Badge
                        variant={currentPage === item.id ? 'secondary' : 'outline'}
                        className="ml-auto text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            ))}
          </nav>

          {!isCollapsed && (
            <div className="p-4 border-t border-sidebar-border">
              <div className="p-3 bg-sidebar-accent rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-sidebar-accent-foreground rounded-full" />
                  <span className="text-sm font-medium text-sidebar-accent-foreground">
                    Quick Tip
                  </span>
                </div>
                <p className="text-xs text-sidebar-accent-foreground/80">
                  Review your portfolio allocation monthly for optimal returns
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}