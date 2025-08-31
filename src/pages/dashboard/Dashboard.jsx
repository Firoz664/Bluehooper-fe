import DashboardHeader from '../../components/ui/DashboardHeader';

const Dashboard = () => {
  const stats = [
    { name: 'Total Projects', stat: '12', icon: '🏗️' },
    { name: 'Active Tasks', stat: '24', icon: '✓' },
    { name: 'Team Members', stat: '8', icon: '👥' },
    { name: 'Documents', stat: '156', icon: '📄' },
  ];

  const recentProjects = [
    { id: 1, name: 'Office Complex Build', status: 'In Progress', completion: 75 },
    { id: 2, name: 'Residential Development', status: 'Planning', completion: 25 },
    { id: 3, name: 'Shopping Center Renovation', status: 'In Progress', completion: 60 },
  ];

  return (
    <div>
      <DashboardHeader title="Dashboard" />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                        <dd className="text-lg font-medium text-gray-900">{item.stat}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Recent Projects
                </h3>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{project.name}</h4>
                        <p className="text-sm text-gray-500">Status: {project.status}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                          <div 
                            className="bg-primary-600 h-2 rounded-full" 
                            style={{ width: `${project.completion}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">{project.completion}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;