import DashboardHeader from '../../components/ui/DashboardHeader';

const TasksPage = () => {
  const tasks = [
    {
      id: 1,
      title: 'Foundation Inspection',
      description: 'Complete inspection of building foundation',
      assignee: 'John Smith',
      priority: 'High',
      status: 'In Progress',
      dueDate: '2024-09-05',
      project: 'Office Complex Build',
    },
    {
      id: 2,
      title: 'Electrical Wiring Plan',
      description: 'Finalize electrical wiring layout for floors 1-5',
      assignee: 'Sarah Johnson',
      priority: 'Medium',
      status: 'Pending',
      dueDate: '2024-09-10',
      project: 'Office Complex Build',
    },
    {
      id: 3,
      title: 'Material Procurement',
      description: 'Order concrete and steel materials for next phase',
      assignee: 'Mike Davis',
      priority: 'High',
      status: 'Completed',
      dueDate: '2024-08-28',
      project: 'Residential Development',
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <DashboardHeader title="Tasks">
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          New Task
        </button>
      </DashboardHeader>
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <li key={task.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-primary-600 truncate">
                            {task.title}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex space-x-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                              {task.status}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              {task.description}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <p>
                              Assigned to {task.assignee} • Due {task.dueDate}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">Project: {task.project}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;