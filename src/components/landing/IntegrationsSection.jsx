import { memo } from 'react';
import { integrations } from '../../data/landingPageData';

const IntegrationCard = memo(({ integration }) => (
  <div className="bg-white/10 rounded-lg p-6 text-center hover:bg-white/20 transition-colors duration-200 focus-within:ring-4 focus-within:ring-white/50">
    <div className="text-4xl mb-3" role="img" aria-label={`${integration.name} logo`}>
      {integration.logo}
    </div>
    <div className="text-white font-medium">{integration.name}</div>
  </div>
));

IntegrationCard.displayName = 'IntegrationCard';

const IntegrationsSection = memo(() => {
  return (
    <section className="py-24 bg-gray-900" aria-labelledby="integrations-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="integrations-heading" className="text-4xl font-bold text-white mb-6">
            Integrates with Your Existing Tools
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connect with popular construction and business tools to create a seamless workflow.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {integrations.map((integration) => (
            <IntegrationCard key={integration.name} integration={integration} />
          ))}
        </div>
      </div>
    </section>
  );
});

IntegrationsSection.displayName = 'IntegrationsSection';

export default IntegrationsSection;