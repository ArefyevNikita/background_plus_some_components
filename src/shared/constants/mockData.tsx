import React from 'react';
import type { StackItem, ListItem } from '~/shared/types';


export const GALLERY_STACK_ITEMS: StackItem[] = [
  {
    id: 'design',
    title: 'Modern Design',
    backgroundColor: '#1e293b',
    content: React.createElement('div', null,
      React.createElement('p', { className: 'text-lg mb-4' },
        'Clean, modern interfaces that prioritize user experience and accessibility.'
      ),
      React.createElement('p', { className: 'text-sm text-white/70' },
        'Our design philosophy focuses on simplicity, elegance, and functionality.'
      )
    ),
  },
  {
    id: 'development',
    title: 'Development Excellence',
    backgroundColor: '#1f2937',
    content: React.createElement('div', null,
      React.createElement('p', { className: 'text-lg mb-4' },
        'Cutting-edge development practices with modern technologies and frameworks.'
      ),
      React.createElement('p', { className: 'text-sm text-white/70' },
        'Built with React, TypeScript, and the latest web standards for optimal performance.'
      )
    ),
  },
  {
    id: 'performance',
    title: 'Optimized Performance',
    backgroundColor: '#374151',
    content: React.createElement('div', null,
      React.createElement('p', { className: 'text-lg mb-4' },
        'Lightning-fast loading times and smooth animations for the best user experience.'
      ),
      React.createElement('p', { className: 'text-sm text-white/70' },
        'Optimized for all devices and browsers with progressive enhancement.'
      )
    ),
  },
  {
    id: 'scalability',
    title: 'Scalable Architecture',
    backgroundColor: '#4b5563',
    content: React.createElement('div', null,
      React.createElement('p', { className: 'text-lg mb-4' },
        'Built with Feature-Sliced Design for maintainable and scalable applications.'
      ),
      React.createElement('p', { className: 'text-sm text-white/70' },
        'Modular architecture that grows with your project needs.'
      )
    ),
  },
];

export const ABOUT_LIST_ITEMS: ListItem[] = [
  {
    id: 'mission',
    title: 'Наша миссия',
    description: 'Создавать исключительные цифровые опыты, которые вдохновляют и вовлекают пользователей через инновационные дизайн и технологии.',
    icon: React.createElement('span', { className: 'text-2xl' }, '🎯'),
  },
  {
    id: 'vision',
    title: 'Наше видение',
    description: 'Быть лидером в современном веб-разработке, устанавливая новые стандарты качества и опыта пользователя.',
    icon: React.createElement('span', { className: 'text-2xl' }, '👁️'),
  },
  {
    id: 'values',
    title: 'Наши ценности',
    description: 'Инновация, качество, сотрудничество и непрерывное обучение — все это определяет то, что мы делаем.',
    icon: React.createElement('span', { className: 'text-2xl' }, '⭐'),
  },
  {
    id: 'team',
    title: 'Наша команда',
    description: 'Диверсифицированная группа страстных разработчиков, дизайнеров и стратегов, работающих вместе, чтобы построить будущее.',
    icon: React.createElement('span', { className: 'text-2xl' }, '👥'),
  },
  {
    id: 'approach',
    title: 'Наш подход',
    description: 'Мы объединяем гибкие методы с передовыми технологиями, чтобы предоставлять решения, которые превышают ожидания.',
    icon: React.createElement('span', { className: 'text-2xl' }, '🚀'),
  },
];
