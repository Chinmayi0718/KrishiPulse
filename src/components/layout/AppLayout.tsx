import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { MobileNav } from './MobileNav';
import { Footer } from './Footer';
import { DemoBanner } from '../common/DemoBanner';
import { MonsoonNoirAtmosphere } from '../common/MonsoonNoirAtmosphere';
import { X } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-noir-950 text-ivory-100 relative selection:bg-lime-accent selection:text-noir-950">
      {/* Ambient Atmospheric Background Layers */}
      <MonsoonNoirAtmosphere showGrid={true} showContours={true} intensity="medium" />

      {/* Top Demo Banner */}
      <DemoBanner />

      <div className="flex flex-1 relative z-10">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="fixed top-10 bottom-0 w-64">
            <Sidebar />
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex animate-in fade-in">
            <div
              className="fixed inset-0 bg-noir-950/80 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-72 max-w-[80vw] bg-noir-900 border-r border-noir-700 h-full z-10 flex flex-col shadow-2xl">
              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-ivory-400 hover:text-lime-accent rounded-lg hover:bg-noir-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Sidebar onClose={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
          <Navbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
};
