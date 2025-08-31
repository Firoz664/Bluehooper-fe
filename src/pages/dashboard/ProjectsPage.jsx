import DashboardHeader from '../../components/ui/DashboardHeader';

const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      name: 'Office Complex Build',
      description: 'Modern office building with 15 floors',
      status: 'In Progress',
      progress: 75,
      startDate: '2024-01-15',
      endDate: '2024-08-30',
    },
    {
      id: 2,
      name: 'Residential Development',
      description: 'Luxury residential complex with 50 units',
      status: 'Planning',
      progress: 25,
      startDate: '2024-03-01',
      endDate: '2024-12-15',
    },
    {
      id: 3,
      name: 'Shopping Center Renovation',
      description: 'Complete renovation of existing shopping center',
      status: 'In Progress',
      progress: 60,
      startDate: '2024-02-01',
      endDate: '2024-09-30',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <DashboardHeader title="Projects">
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          New Project
        </button>
      </DashboardHeader>
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{project.description}</p>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between text-sm text-gray-500">
                    <span>Start: {project.startDate}</span>
                    <span>End: {project.endDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;