import React from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed w-full z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-cyan-500" />
            <span className="ml-2 text-xl font-bold text-white">KAEYA</span>
          </div>
          <div className="hidden md:flex space-x-6">
  <a
    href="/honey"
    className="text-white px-4 py-2 rounded-lg hover:text-cyan-500 hover:bg-gray-800 transition-all duration-300"
  >
    Honeypot
  </a>
  <a
    href="/alerts"
    className="text-white px-4 py-2 rounded-lg hover:text-cyan-500 hover:bg-gray-800 transition-all duration-300"
  >
    Alerts Page
  </a>
  <a
    href="/scanransome"
    className="text-white px-4 py-2 rounded-lg hover:text-cyan-500 hover:bg-gray-800 transition-all duration-300"
  >
    Scan
  </a>
  <a
    href="/discord"
    className="text-white px-4 py-2 rounded-lg hover:text-cyan-500 hover:bg-gray-800 transition-all duration-300"
  >
    Discord
  </a>
</div>
          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              
              <button className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors " onClick={() => navigate("/login")}>
                Get Protected
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
            
            <button className="w-full text-left px-3 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600" onClick={() => navigate("/login")}>
              Get Protected
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}