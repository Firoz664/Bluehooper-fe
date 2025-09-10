import { memo } from 'react';
import { Link } from 'react-router-dom';
import { pricingPlans } from '../../data/landingPageData';

const CheckIcon = memo(({ isPopular }) => (
  <svg 
    className={`w-5 h-5 mr-3 flex-shrink-0 ${isPopular ? 'text-yellow-400' : 'text-green-500'}`} 
    fill="currentColor" 
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
));

CheckIcon.displayName = 'CheckIcon';

const PricingCard = memo(({ plan }) => (
  <div
    className={`rounded-2xl p-8 ${
      plan.popular
        ? 'bg-blue-600 text-white shadow-2xl scale-105 ring-4 ring-blue-600/20'
        : 'bg-white shadow-lg'
    } transition-transform duration-200`}
  >
    {plan.popular && (
      <div className="text-center mb-4">
        <span className="bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-sm font-semibold">
          Most Popular
        </span>
      </div>
    )}
    <div className="text-center mb-8">
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
    <ul className="space-y-4 mb-8" role="list">
      {plan.features.map((feature) => (
        <li key={feature} className="flex items-center">
          <CheckIcon isPopular={plan.popular} />
          <span className={plan.popular ? 'text-white' : 'text-gray-700'}>
            {feature}
          </span>
        </li>
      ))}
    </ul>
    <Link
      to="/register"
      className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-4 ${
        plan.popular
          ? 'bg-white text-blue-600 hover:bg-gray-100 focus:ring-white/50'
          : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/50'
      }`}
      aria-label={`${plan.name === 'Enterprise' ? 'Contact sales for' : 'Start free trial for'} ${plan.name} plan`}
    >
      {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
    </Link>
  </div>
));

PricingCard.displayName = 'PricingCard';

const PricingSection = memo(() => {
  return (
    <section className="py-24 bg-gray-50" aria-labelledby="pricing-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="pricing-heading" className="text-4xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the plan that fits your team size and needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
});

PricingSection.displayName = 'PricingSection';

export default PricingSection;