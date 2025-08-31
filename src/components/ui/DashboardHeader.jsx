import { useSelector } from 'react-redux';

const DashboardHeader = ({ title, children }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            {children}
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
                <span className="text-white font-medium">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <span className="text-gray-700">{user?.name || 'User'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;