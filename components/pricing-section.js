export default function PricingSection() {
  return (
    <section className="bg-white dark:bg-black/10 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Simple & Transparent Pricing
        </h2>
        <p className="text-gray-700 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Choose the plan that fits your needs. No hidden fees, cancel anytime.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Basic</h3>
            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              $19<span className="text-base font-normal">/mo</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Perfect for individuals starting out.
            </p>
            <ul className="text-gray-700 dark:text-gray-300 mb-6 space-y-2 text-sm">
              <li>✓ Access to basic features</li>
              <li>✓ 1 project</li>
              <li>✓ Email support</li>
            </ul>
            <button className="w-full bg-gray-900 text-white dark:bg-white dark:text-black py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition">
              Choose Plan
            </button>
          </div>

          {/* Popular Plan */}
          <div className="relative border-2 border-purple-600 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all bg-purple-100 dark:bg-purple-900/20">
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Most Popular
            </span>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Pro</h3>
            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              $49<span className="text-base font-normal">/mo</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Ideal for growing teams and power users.
            </p>
            <ul className="text-gray-700 dark:text-gray-300 mb-6 space-y-2 text-sm">
              <li>✓ Everything in Basic</li>
              <li>✓ Unlimited projects</li>
              <li>✓ Priority support</li>
              <li>✓ Advanced analytics</li>
            </ul>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
              Choose Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Enterprise</h3>
            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              $99<span className="text-base font-normal">/mo</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              For businesses that need advanced support.
            </p>
            <ul className="text-gray-700 dark:text-gray-300 mb-6 space-y-2 text-sm">
              <li>✓ Everything in Pro</li>
              <li>✓ Dedicated account manager</li>
              <li>✓ Custom integrations</li>
              <li>✓ 24/7 support</li>
            </ul>
            <button className="w-full bg-gray-900 text-white dark:bg-white dark:text-black py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition">
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
