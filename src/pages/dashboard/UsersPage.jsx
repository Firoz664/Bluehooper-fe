import DashboardHeader from '../../components/ui/DashboardHeader';

const UsersPage = () => {
  const users = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'Project Manager',
      status: 'Active',
      avatar: 'JS',
      joinDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      role: 'Architect',
      status: 'Active',
      avatar: 'SJ',
      joinDate: '2024-02-01',
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike.davis@example.com',
      role: 'Site Supervisor',
      status: 'Active',
      avatar: 'MD',
      joinDate: '2024-01-20',
    },
    {
      id: 4,
      name: 'Lisa Wilson',
      email: 'lisa.wilson@example.com',
      role: 'Engineer',
      status: 'Inactive',
      avatar: 'LW',
      joinDate: '2024-03-10',
    },
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'Project Manager':
        return 'bg-purple-100 text-purple-800';
      case 'Architect':
        return 'bg-blue-100 text-blue-800';
      case 'Site Supervisor':
        return 'bg-green-100 text-green-800';
      case 'Engineer':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div>
      <DashboardHeader title="Team Members">
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          Invite User
        </button>
      </DashboardHeader>
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                  <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center">
                        <span className="text-white font-medium">{user.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Role:</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Status:</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Joined:</span>
                        <span className="text-sm text-gray-900">{user.joinDate}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded text-sm">
                        Edit
                      </button>
                      <button className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded text-sm">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;