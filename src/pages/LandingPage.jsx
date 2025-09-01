import { Link } from 'react-router-dom';
import { useState } from 'react';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('project');

  const features = [
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

  const modules = [
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

  const testimonials = [
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

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
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
      price: '$79',
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

  const integrations = [
    { name: 'Procore', logo: '🏗️' },
    { name: 'Autodesk', logo: '🏛️' },
    { name: 'Microsoft 365', logo: '📊' },
    { name: 'Sage', logo: '📈' },
    { name: 'QuickBooks', logo: '💰' },
    { name: 'Dropbox', logo: '📁' }
  ];

  return (
    <div className=\"bg-white\">
      {/* Hero Section */}
      <section className=\"relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden\">
        {/* Background Pattern */}
        <div className=\"absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]\"></div>
        
        <div className=\"relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32\">
          <div className=\"text-center\">
            <h1 className=\"text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8\">
              The Complete
              <span className=\"block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent\">
                Construction Management
              </span>
              Platform
            </h1>
            <p className=\"text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed\">
              Streamline every aspect of your construction business with our comprehensive platform. 
              From project planning to financial management, we've got you covered.
            </p>
            <div className=\"flex flex-col sm:flex-row gap-4 justify-center mb-16\">
              <Link
                to=\"/register\"
                className=\"bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold px-8 py-4 rounded-lg hover:from-yellow-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg\"
              >
                Start Free Trial
              </Link>
              <a
                href=\"#demo\"
                className=\"bg-white/10 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/20 border border-white/20 transition-all duration-200\"
              >
                Watch Demo
              </a>
            </div>
            
            {/* Stats */}
            <div className=\"grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-white\">
              <div>
                <div className=\"text-3xl md:text-4xl font-bold text-yellow-400\">10,000+</div>
                <div className=\"text-blue-200\">Projects Managed</div>
              </div>
              <div>
                <div className=\"text-3xl md:text-4xl font-bold text-yellow-400\">500+</div>
                <div className=\"text-blue-200\">Companies Trust Us</div>
              </div>
              <div>
                <div className=\"text-3xl md:text-4xl font-bold text-yellow-400\">40%</div>
                <div className=\"text-blue-200\">Efficiency Increase</div>
              </div>
              <div>
                <div className=\"text-3xl md:text-4xl font-bold text-yellow-400\">99.9%</div>
                <div className=\"text-blue-200\">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className=\"py-24 bg-gray-50\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"text-center mb-20\">
            <h2 className=\"text-5xl font-bold text-gray-900 mb-6\">
              Everything You Need in One Platform
            </h2>
            <p className=\"text-xl text-gray-600 max-w-3xl mx-auto\">
              Replace multiple tools with our comprehensive construction management solution. 
              Built by industry experts for construction professionals.
            </p>
          </div>

          <div className=\"grid grid-cols-1 md:grid-cols-2 gap-12\">
            {features.map((feature, index) => (
              <div key={feature.title} className=\"bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300\">
                <div className=\"flex items-start space-x-6\">
                  <div className=\"text-4xl\">{feature.icon}</div>
                  <div className=\"flex-1\">
                    <h3 className=\"text-2xl font-bold text-gray-900 mb-4\">{feature.title}</h3>
                    <p className=\"text-gray-600 mb-6\">{feature.description}</p>
                    <ul className=\"space-y-2\">
                      {feature.benefits.map((benefit) => (
                        <li key={benefit} className=\"flex items-center text-gray-700\">
                          <svg className=\"w-5 h-5 text-green-500 mr-3\" fill=\"currentColor\" viewBox=\"0 0 20 20\">
                            <path fillRule=\"evenodd\" d=\"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z\" clipRule=\"evenodd\" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules/Services Section */}
      <section className=\"py-24 bg-white\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"text-center mb-16\">
            <h2 className=\"text-5xl font-bold text-gray-900 mb-6\">
              Powerful Modules for Every Construction Need
            </h2>
            <p className=\"text-xl text-gray-600 max-w-3xl mx-auto\">
              Choose the modules that fit your business or get the complete suite. 
              Each module is designed to work seamlessly together.
            </p>
          </div>

          {/* Module Tabs */}
          <div className=\"flex flex-wrap justify-center gap-4 mb-12\">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveTab(module.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === module.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className=\"text-xl\">{module.icon}</span>
                <span>{module.name}</span>
              </button>
            ))}
          </div>

          {/* Module Content */}
          <div className=\"bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 md:p-12\">
            {modules.map((module) => (
              <div
                key={module.id}
                className={`${activeTab === module.id ? 'block' : 'hidden'}`}
              >
                <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-12 items-center\">
                  <div>
                    <div className=\"flex items-center space-x-4 mb-6\">
                      <span className=\"text-5xl\">{module.icon}</span>
                      <div>
                        <h3 className=\"text-3xl font-bold text-gray-900\">{module.name}</h3>
                        <p className=\"text-gray-600\">{module.description}</p>
                      </div>
                    </div>
                    <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
                      {module.features.map((feature) => (
                        <div key={feature} className=\"flex items-center space-x-3\">
                          <svg className=\"w-5 h-5 text-green-500 flex-shrink-0\" fill=\"currentColor\" viewBox=\"0 0 20 20\">
                            <path fillRule=\"evenodd\" d=\"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z\" clipRule=\"evenodd\" />
                          </svg>
                          <span className=\"text-gray-700\">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className=\"bg-white rounded-2xl p-8 shadow-lg\">
                    <div className=\"text-center\">
                      <div className=\"text-6xl mb-4\">{module.icon}</div>
                      <h4 className=\"text-xl font-semibold text-gray-900 mb-2\">
                        Ready to get started with {module.name}?
                      </h4>
                      <p className=\"text-gray-600 mb-6\">
                        Try it free for 14 days. No credit card required.
                      </p>
                      <Link
                        to=\"/register\"
                        className=\"bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200\"
                      >
                        Start Free Trial
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className=\"py-24 bg-gray-900\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"text-center mb-16\">
            <h2 className=\"text-4xl font-bold text-white mb-6\">
              Integrates with Your Existing Tools
            </h2>
            <p className=\"text-xl text-gray-300 max-w-3xl mx-auto\">
              Connect with popular construction and business tools to create a seamless workflow.
            </p>
          </div>

          <div className=\"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8\">
            {integrations.map((integration) => (
              <div key={integration.name} className=\"bg-white/10 rounded-lg p-6 text-center hover:bg-white/20 transition-colors duration-200\">
                <div className=\"text-4xl mb-3\">{integration.logo}</div>
                <div className=\"text-white font-medium\">{integration.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className=\"py-24 bg-white\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"text-center mb-16\">
            <h2 className=\"text-4xl font-bold text-gray-900 mb-6\">
              Trusted by Construction Professionals
            </h2>
            <p className=\"text-xl text-gray-600\">
              See what our customers say about BlueHooper
            </p>
          </div>

          <div className=\"grid grid-cols-1 md:grid-cols-3 gap-8\">
            {testimonials.map((testimonial, index) => (
              <div key={index} className=\"bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300\">
                <div className=\"text-4xl mb-4\">{testimonial.image}</div>
                <blockquote className=\"text-gray-700 mb-6 italic\">
                  \"{testimonial.quote}\"
                </blockquote>
                <div>
                  <div className=\"font-semibold text-gray-900\">{testimonial.name}</div>
                  <div className=\"text-gray-600\">{testimonial.role}</div>
                  <div className=\"text-blue-600 font-medium\">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className=\"py-24 bg-gray-50\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"text-center mb-16\">
            <h2 className=\"text-4xl font-bold text-gray-900 mb-6\">
              Simple, Transparent Pricing
            </h2>
            <p className=\"text-xl text-gray-600\">
              Choose the plan that fits your team size and needs
            </p>
          </div>

          <div className=\"grid grid-cols-1 md:grid-cols-3 gap-8\">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-blue-600 text-white shadow-2xl scale-105'
                    : 'bg-white shadow-lg'
                } transition-transform duration-200`}
              >
                {plan.popular && (
                  <div className=\"text-center mb-4\">
                    <span className=\"bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-sm font-semibold\">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className=\"text-center mb-8\">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <div className={`text-4xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </div>
                  <div className={`text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                    {plan.period}
                  </div>
                  <p className={`mt-4 ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>
                <ul className=\"space-y-4 mb-8\">
                  {plan.features.map((feature) => (
                    <li key={feature} className=\"flex items-center\">
                      <svg className={`w-5 h-5 mr-3 ${plan.popular ? 'text-yellow-400' : 'text-green-500'}`} fill=\"currentColor\" viewBox=\"0 0 20 20\">
                        <path fillRule=\"evenodd\" d=\"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z\" clipRule=\"evenodd\" />
                      </svg>
                      <span className={plan.popular ? 'text-white' : 'text-gray-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to=\"/register\"
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                    plan.popular
                      ? 'bg-white text-blue-600 hover:bg-gray-100'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className=\"py-24 bg-gradient-to-r from-blue-600 to-indigo-700\">
        <div className=\"max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8\">
          <h2 className=\"text-4xl md:text-5xl font-bold text-white mb-6\">
            Ready to Transform Your Construction Business?
          </h2>
          <p className=\"text-xl text-blue-100 mb-12\">
            Join thousands of construction professionals who have streamlined their operations with BlueHooper. 
            Start your free trial today and see the difference.
          </p>
          <div className=\"flex flex-col sm:flex-row gap-4 justify-center\">
            <Link
              to=\"/register\"
              className=\"bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg\"
            >
              Start Your Free Trial
            </Link>
            <a
              href=\"#contact\"
              className=\"bg-transparent text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 border-2 border-white transition-all duration-200\"
            >
              Schedule a Demo
            </a>
          </div>
          <p className=\"text-blue-200 mt-6\">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;