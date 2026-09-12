'use client';

import React from 'react';
import { CircleMenu } from '@/components/ui/circle-menu';
import { Home, Briefcase, BookOpen, FlaskConical, User, Mail } from 'lucide-react';

export default function DemoOne() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <CircleMenu
        items={[
          { label: 'Home', icon: <Home size={16} />, href: '/' },
          { label: 'Work', icon: <Briefcase size={16} />, href: '/work' },
          { label: 'Writing', icon: <BookOpen size={16} />, href: '/writing' },
          { label: 'Experiments', icon: <FlaskConical size={16} />, href: '/experiments' },
          { label: 'About', icon: <User size={16} />, href: '/about' },
          { label: 'Contact', icon: <Mail size={16} />, href: '/contact' },
        ]}
      />
    </div>
  );
}
