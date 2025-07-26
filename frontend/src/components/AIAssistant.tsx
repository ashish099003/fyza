'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { MessageCircle, X, Send, Bot, TrendingUp, PiggyBank, Shield, Calculator } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const suggestions = [
  { icon: TrendingUp, text: "How can I optimize my portfolio?", category: "Investment" },
  { icon: PiggyBank, text: "Help me plan my retirement savings", category: "Planning" },
  { icon: Shield, text: "Do I have adequate insurance coverage?", category: "Insurance" },
  { icon: Calculator, text: "Calculate my tax savings for this year", category: "Tax" }
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "नमस्ते! I'm your personal finance assistant. How can I help you build wealth today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

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

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 flex flex-col shadow-2xl z-50 bg-card">
      <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <span>Fyza AI Assistant</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-2 rounded-lg text-sm ${
                message.isUser
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {messages.length === 1 && (
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
                <Badge variant="secondary" className="text-xs">
                  {suggestion.category}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask me anything about finances..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}