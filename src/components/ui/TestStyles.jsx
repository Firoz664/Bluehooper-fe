const TestStyles = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          🎨 Tailwind CSS Test Page
        </h1>
        
        {/* Color Testing */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-primary-500 text-white p-4 rounded-lg text-center">
            Primary 500
          </div>
          <div className="bg-primary-600 text-white p-4 rounded-lg text-center">
            Primary 600
          </div>
          <div className="bg-red-500 text-white p-4 rounded-lg text-center">
            Red 500
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg text-center">
            Green 500
          </div>
        </div>

        {/* Layout Testing */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Layout & Spacing Test
          </h2>
          <div className="flex flex-wrap gap-4 mb-6">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Button 1
            </button>
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Button 2
            </button>
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Button 3
            </button>
          </div>
        </div>

        {/* Form Testing */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Form Elements Test
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Input
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter some text..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Dropdown
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>

            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Checkbox option</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestStyles;