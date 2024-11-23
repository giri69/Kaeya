import React from 'react';
import { Shield, Lock, Bell, Cloud, Database, LineChart } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Real-time Protection',
    description: 'Advanced AI algorithms detect and block ransomware attacks instantly'
  },
  {
    icon: Lock,
    title: 'Data Encryption',
    description: '256-bit encryption keeps your sensitive information secure'
  },
  {
    icon: Bell,
    title: 'Instant Alerts',
    description: 'Get notified immediately when suspicious activity is detected'
  },
  {
    icon: Cloud,
    title: 'Cloud Backup',
    description: 'Automatic cloud backups ensure your data is always recoverable'
  },
  {
    icon: Database,
    title: 'System Recovery',
    description: 'Quick system restoration to pre-attack state'
  },
  {
    icon: LineChart,
    title: 'Threat Analytics',
    description: 'Detailed insights into security threats and system performance'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Comprehensive Protection Features
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to keep your data safe from ransomware attacks
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-cyan-500 transition-colors"
            >
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-cyan-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}