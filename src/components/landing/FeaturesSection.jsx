import { memo } from 'react';
import { features } from '../../data/landingPageData';

const CheckIcon = memo(() => (
  <svg 
    className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" 
    fill="currentColor" 
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
));

CheckIcon.displayName = 'CheckIcon';

const FeatureCard = memo(({ feature }) => (
  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-start space-x-6">
      <div className="text-4xl flex-shrink-0" role="img" aria-label={feature.title}>
        {feature.icon}
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
        <p className="text-gray-600 mb-6">{feature.description}</p>
        <ul className="space-y-2" role="list">
          {feature.benefits.map((benefit) => (
            <li key={benefit} className="flex items-center text-gray-700">
              <CheckIcon />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
));

FeatureCard.displayName = 'FeatureCard';

const FeaturesSection = memo(() => {
  return (
    <section className="py-24 bg-gray-50" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 id="features-heading" className="text-5xl font-bold text-gray-900 mb-6">
            Everything You Need in One Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Replace multiple tools with our comprehensive construction management solution. 
            Built by industry experts for construction professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
});

FeaturesSection.displayName = 'FeaturesSection';

export default FeaturesSection;