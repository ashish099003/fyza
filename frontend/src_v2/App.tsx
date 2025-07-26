'use client';

import { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { RightSidebar } from './components/RightSidebar';
import { AIAssistant } from './components/AIAssistant';
import { LandingPage } from './components/pages/LandingPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { PortfolioPage } from './components/pages/PortfolioPage';
import { BudgetPage } from './components/pages/BudgetPage';
import { KnowledgePage } from './components/pages/KnowledgePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [showProfile, setShowProfile] = useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);

  const renderPage = () => {
    if (showProfile) {
      return <ProfilePage />;
    }
    
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={(page, section) => {
          if (page === 'profile' && section === 'goals') {
            setShowProfile(true);
          } else {
            setCurrentPage(page);
          }
        }} />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'budget':
        return <BudgetPage />;
      case 'knowledge':
        return <KnowledgePage />;
      default:
        return <LandingPage onNavigate={(page, section) => {
          if (page === 'profile' && section === 'goals') {
            setShowProfile(true);
          } else {
            setCurrentPage(page);
          }
        }} />;
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <Header 
        onShowProfile={() => setShowProfile(!showProfile)} 
        onNavigateHome={() => {
          setCurrentPage('landing');
          setShowProfile(false);
        }}
      />
      
      <div className="flex flex-1 h-[calc(100vh-4rem)] overflow-hidden">
        <Navigation currentPage={showProfile ? 'profile' : currentPage} onPageChange={(page) => {
          setCurrentPage(page);
          setShowProfile(false);
        }} />
        
        <main className="flex-1 overflow-hidden">
          <div className="h-full p-6">
            <div className="bg-card rounded-lg border shadow-sm h-full overflow-hidden">
              <div className="h-full p-6 overflow-y-auto">
                {renderPage()}
              </div>
            </div>
          </div>
        </main>
        
        <RightSidebar 
          currentPage={showProfile ? 'profile' : currentPage} 
          onCollapsedChange={setIsRightSidebarCollapsed}
          isCollapsed={isRightSidebarCollapsed}
          onNavigate={(page, section) => {
            setCurrentPage(page);
            setShowProfile(false);
            // Handle section navigation if needed
          }}
        />
      </div>

      <AIAssistant isRightSidebarCollapsed={isRightSidebarCollapsed} />
    </div>
  );
}