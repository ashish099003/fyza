'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { MessageCircle, X, Send, Maximize2, Minimize2, Sparkles, TrendingUp, PiggyBank, Shield, Calculator } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIAssistantProps {
  isRightSidebarCollapsed: boolean;
}

const suggestions = [
  { icon: TrendingUp, text: "How can I optimize my portfolio?", category: "Investment" },
  { icon: PiggyBank, text: "Help me plan my retirement savings", category: "Planning" },
  { icon: Shield, text: "Do I have adequate insurance coverage?", category: "Insurance" },
  { icon: Calculator, text: "Calculate my tax savings for this year", category: "Tax" }
];

export function AIAssistant({ isRightSidebarCollapsed }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isInputExpanded, setIsInputExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "नमस्ते! I'm your AI-powered financial assistant. How can I help you build wealth today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  // Dragging logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userInput: string): string => {
    const responses = [
      "Based on your profile, I recommend increasing your equity allocation by 10% for better long-term returns.",
      "Your emergency fund looks good! Consider investing the excess in tax-saving ELSS funds.",
      "I notice you have high-interest debt. Let me create a debt snowball plan for you.",
      "Your SIP amount can be increased by ₹2,000 to meet your retirement goal faster.",
      "Consider term insurance of ₹50L based on your current income and dependents."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
  };

  // Floating button if chat is closed
  if (!isOpen) {
    const rightOffset = isRightSidebarCollapsed ? 60 : 340;
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg z-50 flex items-center justify-center"
        style={{ right: `${rightOffset}px` }}
        size="icon"
      >
        <div className="relative">
          <Sparkles className="h-7 w-7" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
        </div>
      </Button>
    );
  }

  const width = isExpanded ? 480 : 320;
  const height = isExpanded ? 600 : 400;
  const rightOffset = isRightSidebarCollapsed ? 60 : 340;

  return (
    <Card
      ref={cardRef}
      className="fixed shadow-2xl z-50 bg-card flex flex-col"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: position.x || (typeof window !== 'undefined' ? window.innerWidth - width - rightOffset : 0),
        top: position.y || (typeof window !== 'undefined' ? window.innerHeight - height - 24 : 0),
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary to-green-600 text-primary-foreground rounded-t-lg cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <Sparkles className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
          </div>
          <span className="font-medium">Fyza AI Assistant</span>
          <Badge variant="secondary" className="text-xs bg-white/20 text-white">Agentic AI</Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)} className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20">
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
              message.isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
            }`}>
              {message.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg text-sm bg-secondary text-secondary-foreground italic animate-pulse">
              Fyza AI is typing...
            </div>
          </div>
        )}

        {messages.length === 1 && !loading && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Quick suggestions:</p>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion.text)}
                className="flex items-center gap-2 p-2 rounded-lg bg-accent hover:bg-accent/80 cursor-pointer text-sm"
              >
                <suggestion.icon className="h-4 w-4 text-primary" />
                <span className="flex-1">{suggestion.text}</span>
                <Badge variant="secondary" className="text-xs">{suggestion.category}</Badge>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-4 border-t space-y-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsInputExpanded(!isInputExpanded)} className="h-8 w-8">
            {isInputExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <span className="text-xs text-muted-foreground">{isInputExpanded ? 'Collapse input' : 'Expand input'}</span>
        </div>
        <div className="flex gap-2">
          {isInputExpanded ? (
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask me anything about finances..."
              className="flex-1 min-h-20 resize-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
          ) : (
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask me anything about finances..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
          )}
          <Button onClick={handleSendMessage} size="icon" className="flex-shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
