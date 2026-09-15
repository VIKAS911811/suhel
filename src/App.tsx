/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CompanyId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CompanySwitcher } from './components/CompanySwitcher';
import { WhatsAppButton } from './components/WhatsAppButton';
import { LogoProvider } from './context/LogoContext';
import { CmdProvider } from './context/CmdContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { AdminAuthModal } from './components/AdminAuthModal';
import { CompanyLoadingScreen } from './components/CompanyLoadingScreen';
import { WebsiteOpeningLoader } from './components/WebsiteOpeningLoader';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CompaniesPage } from './pages/CompaniesPage';
import { CompanyPortalPage } from './pages/CompanyPortalPage';
import { CompanyDetailPage } from './pages/CompanyDetailPage';
import { SrInfraPage } from './pages/SrInfraPage';
import { SuhelEngineeringPage } from './pages/SuhelEngineeringPage';
import { SrPowerSolutionPage } from './pages/SrPowerSolutionPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { QualitySafetyPage } from './pages/QualitySafetyPage';
import { GalleryPage } from './pages/GalleryPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { RequestQuotePage } from './pages/RequestQuotePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { useAdminAuth } from './context/AdminAuthContext';
import { ArrowUp } from 'lucide-react';

function AdminDashboardModalWrapper() {
  const { isAdminDashboardOpen, closeAdminDashboard } = useAdminAuth();
  return <AdminDashboardModal isOpen={isAdminDashboardOpen} onClose={closeAdminDashboard} />;
}

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [currentCompany, setCurrentCompany] = useState<CompanyId>('sr-group');
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [loadingCompany, setLoadingCompany] = useState<CompanyId | null>(null);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  const normalizePath = (rawPath?: string) => {
    // If an explicit path argument is provided, normalize and return it directly
    if (rawPath !== undefined && rawPath !== null) {
      let clean = rawPath.split('?')[0].split('#')[0];
      if (!clean.startsWith('/')) {
        clean = '/' + clean;
      }
      if (clean.length > 1 && clean.endsWith('/')) {
        clean = clean.slice(0, -1);
      }
      return clean.toLowerCase() || '/';
    }

    // Otherwise determine path from URL hash or pathname
    const hash = window.location.hash.replace(/^#\/?/, '/');
    let p = hash && hash !== '/' ? hash : window.location.pathname || '/';
    let clean = p.split('?')[0].split('#')[0];
    if (!clean.startsWith('/')) {
      clean = '/' + clean;
    }
    if (clean.length > 1 && clean.endsWith('/')) {
      clean = clean.slice(0, -1);
    }
    return clean.toLowerCase() || '/';
  };

  // Sync with browser URL / Hash navigation
  useEffect(() => {
    const handleUrlChange = () => {
      const path = normalizePath();
      setCurrentPath(path);
      updateCompanyFromPath(path);
    };

    handleUrlChange();

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateCompanyFromPath = (path: string) => {
    if (path.includes('sr-infra')) {
      setCurrentCompany('sr-infra');
    } else if (path.includes('suhel-engineering')) {
      setCurrentCompany('suhel-engineering');
    } else if (path.includes('sr-power-solution')) {
      setCurrentCompany('sr-power-solution');
    } else {
      setCurrentCompany('sr-group');
    }
  };

  const handleNavigate = (path: string) => {
    const cleanPath = normalizePath(path);
    setCurrentPath(cleanPath);
    window.history.pushState({}, '', cleanPath);
    updateCompanyFromPath(cleanPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerCompanyVisit = (companyId: CompanyId, targetPath?: string) => {
    let dest = targetPath;
    if (!dest) {
      if (companyId === 'sr-infra') dest = '/companies/sr-infra';
      else if (companyId === 'suhel-engineering') dest = '/companies/suhel-engineering';
      else if (companyId === 'sr-power-solution') dest = '/companies/sr-power-solution';
      else dest = '/';
    }

    setPendingPath(dest);
    setLoadingCompany(companyId);
  };

  const handleLoadingComplete = () => {
    if (loadingCompany) {
      setCurrentCompany(loadingCompany);
    }
    if (pendingPath) {
      handleNavigate(pendingPath);
    }
    setLoadingCompany(null);
    setPendingPath(null);
  };

  const handleSelectCompany = (companyId: CompanyId) => {
    triggerCompanyVisit(companyId);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route Renderer
  const renderContent = () => {
    // Company Detail Pages
    if (currentPath === '/companies/sr-infra') {
      return (
        <SrInfraPage
          onNavigate={handleNavigate}
          onSelectCompany={handleSelectCompany}
        />
      );
    }
    if (currentPath === '/companies/suhel-engineering') {
      return (
        <SuhelEngineeringPage
          onNavigate={handleNavigate}
          onSelectCompany={handleSelectCompany}
        />
      );
    }
    if (currentPath === '/companies/sr-power-solution') {
      return (
        <SrPowerSolutionPage
          onNavigate={handleNavigate}
          onSelectCompany={handleSelectCompany}
        />
      );
    }

    // Service Detail Pages
    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      return <ServiceDetailPage slug={slug} onNavigate={handleNavigate} />;
    }

    // Top Level Pages
    switch (currentPath) {
      case '/about':
        return <AboutPage onNavigate={handleNavigate} onSelectCompany={handleSelectCompany} />;
      case '/companies':
        return <CompaniesPage onNavigate={handleNavigate} onSelectCompany={handleSelectCompany} />;
      case '/portal':
      case '/company-portal':
      case '/companies-hub':
        return (
          <CompanyPortalPage
            onNavigate={handleNavigate}
            onSelectCompany={handleSelectCompany}
            onTriggerLoading={(id) => triggerCompanyVisit(id)}
          />
        );
      case '/services':
        return <ServicesPage onNavigate={handleNavigate} onSelectCompany={handleSelectCompany} />;
      case '/industries':
        return <IndustriesPage onNavigate={handleNavigate} onSelectCompany={handleSelectCompany} />;
      case '/projects':
        return <ProjectsPage onNavigate={handleNavigate} onSelectCompany={handleSelectCompany} />;
      case '/quality-safety':
        return <QualitySafetyPage onNavigate={handleNavigate} />;
      case '/gallery':
        return <GalleryPage onNavigate={handleNavigate} />;
      case '/careers':
        return <CareersPage onNavigate={handleNavigate} />;
      case '/contact':
        return (
          <ContactPage
            currentCompany={currentCompany}
            onSelectCompany={handleSelectCompany}
          />
        );
      case '/admin':
      case '/admin/dashboard':
      case '/dashboard':
        return <AdminDashboardPage onNavigate={handleNavigate} />;
      case '/clients':
      case '/companies-worked-with':
      case '/worked-with-companies':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onSelectCompany={handleSelectCompany}
          />
        );
      case '/request-quote':
        return (
          <RequestQuotePage
            currentCompany={currentCompany}
            onSelectCompany={handleSelectCompany}
          />
        );
      case '/':
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onSelectCompany={handleSelectCompany}
          />
        );
    }
  };

  return (
    <AdminAuthProvider>
      <CmdProvider>
        <LogoProvider>
          <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-amber-500 selection:text-slate-950">
          {/* Sticky Header */}
          <Header
            currentPath={currentPath}
            onNavigate={handleNavigate}
            currentCompany={currentCompany}
            onSelectCompany={handleSelectCompany}
          />

          {/* Interactive Bar when context is a specific company */}
          {currentCompany !== 'sr-group' && (
            <CompanySwitcher
              currentCompany={currentCompany}
              onSelectCompany={handleSelectCompany}
              variant="bar"
            />
          )}

          {/* Main Page Area with Smooth Redirect Animation */}
          <main className="flex-1 overflow-x-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPath}
                initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(2px)' }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Footer */}
          <Footer
            onNavigate={handleNavigate}
            onSelectCompany={handleSelectCompany}
          />

          {/* Admin Security Console Authentication Modal */}
          <AdminAuthModal />

          {/* Admin Submissions & Enquiries Dashboard Modal */}
          <AdminDashboardModalWrapper />

          {/* Floating Action WhatsApp Chat Button */}
          <WhatsAppButton />

          {/* Website Initial Opening Loading Screen */}
          <AnimatePresence>
            {isInitialLoading && (
              <WebsiteOpeningLoader
                onFinish={() => setIsInitialLoading(false)}
                duration={2200}
              />
            )}
          </AnimatePresence>

          {/* Global Company Visit Loading Screen / Gateway */}
          <AnimatePresence>
            {loadingCompany && (
              <CompanyLoadingScreen
                targetCompany={loadingCompany}
                onComplete={handleLoadingComplete}
                onCancel={() => {
                  setLoadingCompany(null);
                  setPendingPath(null);
                }}
                autoCloseDelay={1300}
              />
            )}
          </AnimatePresence>

          {/* Back To Top Button */}
          {showBackToTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 left-6 z-40 w-11 h-11 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 focus:outline-none"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5 stroke-[2.5]" />
            </button>
          )}
        </div>
      </LogoProvider>
    </CmdProvider>
  </AdminAuthProvider>
  );
}
