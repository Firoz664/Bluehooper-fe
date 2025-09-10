import { memo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { modules } from '../../data/landingPageData';

const CheckIcon = memo(() => (
  <svg 
    className="w-5 h-5 text-green-500 flex-shrink-0" 
    fill="currentColor" 
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
));

CheckIcon.displayName = 'CheckIcon';

const ModuleTab = memo(({ module, isActive, onClick }) => (
  <button
    onClick={() => onClick(module.id)}
    className={`flex items-center space-x-3 px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-4 ${
      isActive
        ? 'bg-blue-600 text-white shadow-lg focus:ring-blue-500/50'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500/50'
    }`}
    aria-pressed={isActive}
    aria-label={`Select ${module.name} module`}
  >
    <span className="text-xl" role="img" aria-label={module.name}>
      {module.icon}
    </span>
    <span>{module.name}</span>
  </button>
));

ModuleTab.displayName = 'ModuleTab';

const ModuleContent = memo(({ module, isActive }) => (
  <div className={isActive ? 'block' : 'hidden'}>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-5xl" role="img" aria-label={module.name}>
            {module.icon}
          </span>
          <div>
            <h3 className="text-3xl font-bold text-gray-900">{module.name}</h3>
            <p className="text-gray-600">{module.description}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {module.features.map((feature) => (
            <div key={feature} className="flex items-center space-x-3">
              <CheckIcon />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="text-center">
          <div className="text-6xl mb-4" role="img" aria-label={module.name}>
            {module.icon}
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            Ready to get started with {module.name}?
          </h4>
          <p className="text-gray-600 mb-6">
            Try it free for 14 days. No credit card required.
          </p>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            aria-label={`Start free trial for ${module.name}`}
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </div>
  </div>
));

ModuleContent.displayName = 'ModuleContent';

const ModulesSection = memo(() => {
  const [activeTab, setActiveTab] = useState('project');

  const handleTabChange = useCallback((moduleId) => {
    setActiveTab(moduleId);
  }, []);

  const activeModule = modules.find(module => module.id === activeTab);

  return (
    <section className="py-24 bg-white" aria-labelledby="modules-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="modules-heading" className="text-5xl font-bold text-gray-900 mb-6">
            Powerful Modules for Every Construction Need
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the modules that fit your business or get the complete suite. 
            Each module is designed to work seamlessly together.
          </p>
        </div>

        {/* Module Tabs */}
        <div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          role="tablist"
          aria-label="Construction management modules"
        >
          {modules.map((module) => (
            <ModuleTab
              key={module.id}
              module={module}
              isActive={activeTab === module.id}
              onClick={handleTabChange}
            />
          ))}
        </div>

        {/* Module Content */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 md:p-12">
          {activeModule && (
            <ModuleContent 
              module={activeModule} 
              isActive={true}
            />
          )}
        </div>
      </div>
    </section>
  );
});

ModulesSection.displayName = 'ModulesSection';

export default ModulesSection;