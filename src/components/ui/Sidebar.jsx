import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Projects', href: '/dashboard/projects', icon: '🏗️' },
    { name: 'Tasks', href: '/dashboard/tasks', icon: '✓' },
    { name: 'Users', href: '/dashboard/users', icon: '👥' },
    { name: 'Documents', href: '/dashboard/documents', icon: '📄' },
  ];

  return (
    <div className="flex flex-col w-64 bg-gray-800">
      <div className="flex items-center h-16 px-4 bg-gray-900">
        <Link to="/" className="text-xl font-bold text-white">
          BlueHooper
        </Link>
      </div>
      
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="px-2 py-4 border-t border-gray-700">
          <div className="flex items-center px-2 py-2 text-sm text-gray-300">
            <div className="mr-3 h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <div className="font-medium text-white">{user?.name || 'User'}</div>
              <div className="text-gray-400">{user?.email || 'user@example.com'}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-2 text-left px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;