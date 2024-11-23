import React from 'react';
import { Scan, ShieldCheck, RefreshCw } from 'lucide-react';

const steps = [
  {
    icon: Scan,
    title: 'Continuous Monitoring',
    description: 'Our AI constantly scans your system for suspicious activities and potential threats.'
  },
  {
    icon: ShieldCheck,
    title: 'Instant Protection',
    description: 'When a threat is detected, it\'s immediately blocked before it can encrypt your files.'
  },
  {
    icon: RefreshCw,
    title: 'Automatic Recovery',
    description: 'Your system is automatically restored to its safe state using secure backups.'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-400">
            Simple, effective protection in three steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-24 left-1/2 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-transparent" />
              )}
              <div className="relative z-10 text-center p-6">
                <div className="w-16 h-16 mx-auto bg-cyan-500/10 rounded-full flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-cyan-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}