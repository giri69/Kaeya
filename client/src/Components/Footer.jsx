import React from 'react';
import { Shield, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-cyan-500" />
              <span className="ml-2 text-xl font-bold text-white">CyberShield</span>
            </div>
            <p className="text-gray-400 mb-4">
              Protecting your digital assets from ransomware threats
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-500">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-cyan-500">Features</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-cyan-500">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-500">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-500">Updates</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-cyan-500">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-500">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-500">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-500">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-cyan-500">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-500">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-500">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-500">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} CyberShield. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}