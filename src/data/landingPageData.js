// Landing page data - separated for better performance and maintainability
export const heroStats = [
  { value: '10,000+', label: 'Projects Managed' },
  { value: '500+', label: 'Companies Trust Us' },
  { value: '40%', label: 'Efficiency Increase' },
  { value: '99.9%', label: 'Uptime' }
];

export const features = [
  {
    title: 'Project Management',
    description: 'Complete project lifecycle management from planning to completion with real-time tracking and reporting.',
    icon: '🏗️',
    benefits: ['Real-time dashboards', 'Resource allocation', 'Timeline management', 'Budget tracking']
  },
  {
    title: 'Financial Management',
    description: 'Track budgets, manage costs, handle invoicing and maintain financial transparency across projects.',
    icon: '💰',
    benefits: ['Budget forecasting', 'Cost tracking', 'Invoice management', 'Financial reporting']
  },
  {
    title: 'Document Control',
    description: 'Centralized document management with version control, digital signatures and secure sharing.',
    icon: '📋',
    benefits: ['Version control', 'Digital signatures', 'Secure sharing', 'Mobile access']
  },
  {
    title: 'Quality & Safety',
    description: 'Ensure compliance, manage inspections, track safety incidents and maintain quality standards.',
    icon: '🔐',
    benefits: ['Safety checklists', 'Incident reporting', 'Quality inspections', 'Compliance tracking']
  }
];

export const modules = [
  {
    id: 'project',
    name: 'Project Management',
    icon: '🏗️',
    description: 'End-to-end project management suite',
    features: [
      'Project planning and scheduling',
      'Resource allocation and management',
      'Progress tracking and reporting',
      'Risk management and mitigation',
      'Milestone tracking',
      'Critical path analysis'
    ]
  },
  {
    id: 'financial',
    name: 'Financial Management',
    icon: '📊',
    description: 'Complete financial control and reporting',
    features: [
      'Budget planning and forecasting',
      'Cost tracking and analysis',
      'Invoice and billing management',
      'Change order management',
      'Financial reporting and analytics',
      'Cash flow projections'
    ]
  },
  {
    id: 'field',
    name: 'Field Management',
    icon: '📱',
    description: 'Mobile-first field operations',
    features: [
      'Daily reports and timesheets',
      'Photo documentation',
      'Issue tracking and resolution',
      'Equipment management',
      'Material tracking',
      'Weather and site conditions'
    ]
  },
  {
    id: 'quality',
    name: 'Quality & Safety',
    icon: '✅',
    description: 'Compliance and safety management',
    features: [
      'Safety inspections and checklists',
      'Incident reporting and tracking',
      'Quality control workflows',
      'Compliance management',
      'Training and certifications',
      'Audit trails and documentation'
    ]
  }
];

export const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Project Manager',
    company: 'BuildCorp Construction',
    image: '👩‍💼',
    quote: 'BlueHooper has transformed how we manage our construction projects. The real-time visibility and collaboration tools have improved our efficiency by 40%.'
  },
  {
    name: 'Mike Rodriguez',
    role: 'Operations Director',
    company: 'Premier Contractors',
    image: '👨‍💼',
    quote: 'The financial management features are outstanding. We now have complete visibility into project costs and can make informed decisions quickly.'
  },
  {
    name: 'Jennifer Chen',
    role: 'Safety Manager',
    company: 'Urban Development Group',
    image: '👩‍🔧',
    quote: 'Safety compliance has never been easier. The mobile app allows our field teams to report issues instantly and maintain our safety standards.'
  }
];

export const pricingPlans = [
  {
    name: 'Starter',
    price: '$19',
    period: '/month per user',
    description: 'Perfect for small construction teams',
    features: [
      'Up to 5 projects',
      'Basic project management',
      'Document storage (5GB)',
      'Mobile app access',
      'Email support'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: '$49',
    period: '/month per user',
    description: 'Ideal for growing construction companies',
    features: [
      'Unlimited projects',
      'Advanced project management',
      'Financial management',
      'Document storage (100GB)',
      'Field management tools',
      'Priority support',
      'Custom reports'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '/pricing',
    description: 'For large construction organizations',
    features: [
      'Everything in Professional',
      'Advanced analytics',
      'Custom integrations',
      'Unlimited storage',
      'Dedicated support',
      'Training and onboarding',
      'Custom workflows'
    ],
    popular: false
  }
];

export const integrations = [
  { name: 'Autodesk', logo: '🏛️' },
  { name: 'Microsoft 365', logo: '📊' },
  { name: 'Sage', logo: '📈' },
  { name: 'QuickBooks', logo: '💰' },
  { name: 'Dropbox', logo: '📁' },
  { name: 'Google Drive', logo: '💾' }
];