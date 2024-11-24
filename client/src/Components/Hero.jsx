import React from 'react';
import { Shield, Lock, AlertCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-gray-900 flex items-center">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80')] opacity-10 mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-gray-800/50 rounded-full mb-6">
              <Shield className="w-4 h-4 text-cyan-500 mr-2" />
              <span className="text-cyan-400 text-sm">Advanced Ransomware Protection</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Protect Your Data from
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"> Ransomware Threats</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Advanced AI-powered protection that detects and blocks ransomware attacks in real-time, keeping your business safe 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105" onClick={() => navigate("/login")}>
                Get Started
              </button>
              {/* <button className="px-8 py-4 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all">
                Watch Demo
              </button> */}
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div className="flex items-center">
                <Lock className="w-5 h-5 text-cyan-500 mr-2" />
                <span className="text-gray-300">256-bit Encryption</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-cyan-500 mr-2" />
                <span className="text-gray-300">24/7 Monitoring</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative bg-gray-800 p-8 rounded-3xl border border-gray-700">
              <div className="grid gap-6">
                <div className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-xl">
                  <div className="p-3 bg-cyan-500/10 rounded-lg">
                    <Shield className="w-6 h-6 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Real-time Protection</h3>
                    <p className="text-gray-400">Continuous monitoring and instant response</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-xl">
                  <div className="p-3 bg-cyan-500/10 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Real-time Alerts</h3>
                    <p className="text-gray-400">Bots for instant Alerts</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-xl">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <Lock className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Secure Backup</h3>
                    <p className="text-gray-400">Automated encrypted backups</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}