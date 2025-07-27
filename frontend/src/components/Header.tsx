'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { LanguageSelector } from './LanguageSelector';
import { Bell, Settings, LogOut, User, Clock, ArrowRight, TrendingUp } from 'lucide-react';

interface HeaderProps {
  onShowProfile: () => void;
  onNavigateHome: () => void;
}

export function Header({ onShowProfile, onNavigateHome }: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    {
      id: '1',
      title: 'SIP Processing Complete',
      message: 'Your SIP of ₹5,000 for HDFC Top 100 Fund has been processed successfully',
      time: '2 hours ago',
      type: 'success'
    },
    {
      id: '2',
      title: 'Tax Filing Reminder',
      message: 'Only 15 days left to file your ITR. Click to start filing process.',
      time: '1 day ago',
      type: 'warning',
      action: 'portfolio'
    },
    {
      id: '3',
      title: 'Budget Alert',
      message: 'You have exceeded your dining budget by ₹1,200 this month',
      time: '2 days ago',
      type: 'alert',
      action: 'budget'
    },
    {
      id: '4',
      title: 'Goal Achievement',
      message: 'Congratulations! Your Emergency Fund is now 65% complete',
      time: '3 days ago',
      type: 'success'
    },
    {
      id: '5',
      title: 'Insurance Review Due',
      message: 'Your health insurance coverage may need to be increased',
      time: '1 week ago',
      type: 'info',
      action: 'portfolio'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'alert':
        return '🚨';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">Fyza</h1>
        </button>
      </div>

      <div className="ml-6 text-sm text-muted-foreground relative group cursor-pointer">
  📞 Support: <span className="font-medium text-foreground">+91-99999-88888</span>
  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-max bg-muted px-2 py-1 text-xs text-muted-foreground rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-50">
    🌟 Premium customers get priority access and their calls are catered by humans directly.
  </div>
</div>


      <div className="flex items-center gap-4">
        <LanguageSelector />


        <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {notifications.filter(n => ['warning', 'alert'].includes(n.type)).length}
              </Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-4 border-b last:border-b-0 hover:bg-accent/50">
                  <div className="flex items-start gap-3">
                    <span className="text-sm">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {notification.time}
                        </div>
                        {notification.action && (
                          <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t">
              <Button variant="ghost" className="w-full text-sm">
                View All Notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
  <div className="flex flex-col items-center space-y-1 relative group cursor-pointer">
    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
      <Avatar className="h-8 w-8">
        <AvatarImage src="/placeholder-avatar.jpg" alt="Sundar Pichai" />
        <AvatarFallback>SP</AvatarFallback>
      </Avatar>
    </Button>
    <Badge variant="default" className="bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full">
      🌟 Premium
    </Badge>
    <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 w-max bg-muted px-2 py-1 text-xs text-muted-foreground rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-50">
      🌟 Premium customers get priority access and their calls are catered by humans directly.
    </div>
  </div>
</DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuItem onClick={onShowProfile}>
              <User className="mr-2 h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Account Settings <i> coming soon </i>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}