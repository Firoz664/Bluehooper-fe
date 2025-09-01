import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  fetchProject,
  fetchProjectUsers,
  assignUserToProject,
  removeUserFromProject,
  deleteProject,
  clearCurrentProject,
  clearError
} from '../../store/slices/projectSlice';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { currentProject, projectUsers, isLoading, error } = useSelector((state) => state.projects);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('member');

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProject(projectId));
      dispatch(fetchProjectUsers(projectId));
    }
    
    return () => {
      dispatch(clearCurrentProject());
    };
  }, [dispatch, projectId]);

  const handleDeleteProject = async () => {
    try {
      await dispatch(deleteProject(projectId)).unwrap();
      navigate('/dashboard/projects');
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleAssignUser = async (e) => {
    e.preventDefault();
    if (!newUserEmail.trim()) return;

    try {
      await dispatch(assignUserToProject({
        projectId,
        userData: {
          email: newUserEmail.trim(),
          role: newUserRole
        }
      })).unwrap();
      
      setNewUserEmail('');
      setNewUserRole('member');
      setShowUserModal(false);
      dispatch(fetchProjectUsers(projectId));
    } catch (error) {
      console.error('User assignment failed:', error);
    }
  };

  const handleRemoveUser = async (userId) => {
    if (window.confirm('Are you sure you want to remove this user from the project?')) {
      try {
        await dispatch(removeUserFromProject({ projectId, userId })).unwrap();
        dispatch(fetchProjectUsers(projectId));
      } catch (error) {
        console.error('User removal failed:', error);
      }
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type) => {
    const colors = {
      commercial: 'bg-blue-100 text-blue-800',
      residential: 'bg-green-100 text-green-800',
      industrial: 'bg-gray-100 text-gray-800',
      infrastructure: 'bg-purple-100 text-purple-800',
      renovation: 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRoleColor = (role) => {
    const colors = {
      owner: 'bg-purple-100 text-purple-800',
      admin: 'bg-red-100 text-red-800',
      manager: 'bg-blue-100 text-blue-800',
      member: 'bg-gray-100 text-gray-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading && !currentProject) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">Project not found</div>
        <Link
          to="/dashboard/projects"
          className="mt-4 inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard/projects"
              className="text-primary-600 hover:text-primary-800"
            >
              ← Back to Projects
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{currentProject.name}</h1>
          <div className="flex items-center space-x-3 mt-2">
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(currentProject.type)}`}>
              {currentProject.type}
            </span>
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(currentProject.priority)}`}>
              {currentProject.priority} priority
            </span>
          </div>
        </div>

        <div className="flex space-x-3">
          <Link
            to={`/dashboard/projects/${projectId}/edit`}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Edit Project
          </Link>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Delete Project
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={() => dispatch(clearError())}
              className="text-red-400 hover:text-red-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Description */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {currentProject.description || 'No description provided'}
            </p>
          </div>

          {/* Location Information */}
          {currentProject.location && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
              <div className="space-y-3">
                {currentProject.location.address && (
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Address:</span>
                    <span className="text-gray-600">{currentProject.location.address}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">City:</span>
                  <span className="text-gray-600">
                    {currentProject.location.city}, {currentProject.location.state}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Country:</span>
                  <span className="text-gray-600">{currentProject.location.country}</span>
                </div>
                {currentProject.location.postal_code && (
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Postal Code:</span>
                    <span className="text-gray-600">{currentProject.location.postal_code}</span>
                  </div>
                )}
                {currentProject.location.coordinates && (
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Coordinates:</span>
                    <span className="text-gray-600">
                      {currentProject.location.coordinates.latitude}, {currentProject.location.coordinates.longitude}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Project Tags */}
          {currentProject.tags && currentProject.tags.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {currentProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Details</h2>
            <div className="space-y-4">
              {currentProject.budget && (
                <div>
                  <span className="block text-sm font-medium text-gray-700">Budget</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {formatCurrency(currentProject.budget.estimated_cost, currentProject.budget.currency)}
                  </span>
                </div>
              )}

              {currentProject.timeline && (
                <div>
                  <span className="block text-sm font-medium text-gray-700">Timeline</span>
                  <div className="text-sm text-gray-600">
                    <div>Start: {formatDate(currentProject.timeline.start_date)}</div>
                    <div>End: {formatDate(currentProject.timeline.end_date)}</div>
                  </div>
                </div>
              )}

              <div>
                <span className="block text-sm font-medium text-gray-700">Created</span>
                <span className="text-sm text-gray-600">
                  {formatDate(currentProject.created_at)}
                </span>
              </div>

              <div>
                <span className="block text-sm font-medium text-gray-700">Last Updated</span>
                <span className="text-sm text-gray-600">
                  {formatDate(currentProject.updated_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Project Team */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
              <button
                onClick={() => setShowUserModal(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded text-sm"
              >
                Assign User
              </button>
            </div>

            <div className="space-y-3">
              {projectUsers.length === 0 ? (
                <p className="text-gray-500 text-sm">No team members assigned</p>
              ) : (
                projectUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name || user.email}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                      <button
                        onClick={() => handleRemoveUser(user.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                        title="Remove user"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Assign User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Assign User to Project
            </h3>
            <form onSubmit={handleAssignUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="user@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="member">Member</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Assign User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delete Project
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{currentProject.name}"? This action cannot be undone and will remove all associated data.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProject}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;