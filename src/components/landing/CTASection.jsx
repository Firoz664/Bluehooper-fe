import { memo } from 'react';
import { Link } from 'react-router-dom';

const CTASection = memo(() => {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700" aria-labelledby="cta-heading">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 id="cta-heading" className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Construction Business?
        </h2>
        <p className="text-xl text-blue-100 mb-12">
          Join thousands of construction professionals who have streamlined their operations with BlueHooper. 
          Start your free trial today and see the difference.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/50"
            aria-label="Start your free trial now"
          >
            Start Your Free Trial
          </Link>
          <button
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-transparent text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 border-2 border-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/50"
            aria-label="Schedule a product demo"
          >
            Schedule a Demo
          </button>
        </div>
        <p className="text-blue-200 mt-6 text-sm">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
});

CTASection.displayName = 'CTASection';

export default CTASection;