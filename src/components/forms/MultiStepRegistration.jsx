import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { 
  registerUser, 
  clearError as clearAuthError 
} from '../../store/slices/authSlice';
import { 
  createOrganization, 
  setRegistrationStep, 
  resetRegistrationData,
  clearError as clearOrgError 
} from '../../store/slices/organizationSlice';
import UserRegistrationStep from './UserRegistrationStep';
import OrganizationForm from './OrganizationForm';

const MultiStepRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isLoading: authLoading, error: authError } = useSelector((state) => state.auth);
  const { 
    isLoading: orgLoading, 
    error: orgError, 
    registrationData 
  } = useSelector((state) => state.organizations);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [userId, setUserId] = useState(null);

  const totalSteps = 2;
  const isLoading = authLoading || orgLoading;
  const error = authError || orgError;

  useEffect(() => {
    dispatch(setRegistrationStep(currentStep));
  }, [dispatch, currentStep]);

  useEffect(() => {
    // Reset registration data when component mounts
    return () => {
      dispatch(resetRegistrationData());
    };
  }, [dispatch]);

  // Trigger user registration when userData is set and we're on step 1
  useEffect(() => {
    if (registrationData.userData && currentStep === 1 && !isLoading) {
      console.log('User data detected, starting registration...', registrationData.userData);
      handleUserRegistration();
    }
  }, [registrationData.userData, currentStep, isLoading]);

  const steps = [
    { number: 1, title: 'Personal Info', description: 'Create your account' },
    { number: 2, title: 'Organization', description: 'Setup your company' }
  ];

  const handleNextStep = () => {
    console.log('Moving to next step. Current:', currentStep, 'Total:', totalSteps);
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleUserRegistration = async () => {
    try {
      const { userData } = registrationData;
      
      if (!userData) {
        console.error('No user data found in registration data');
        return;
      }
      
      const userPayload = {
        email: userData.email,
        password: userData.password,
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
        role: "owner",
        type: "partner",
      };

      console.log('User registration payload:', userPayload);
      const result = await dispatch(registerUser(userPayload)).unwrap();
      console.log('User registration result:', result);
      
      // Extract user ID for organization creation
      if (result.user?.id) {
        setUserId(result.user.id);
        console.log('User ID set:', result.user.id);
        handleNextStep();
      } else {
        console.error('No user ID in registration result:', result);
      }
    } catch (error) {
      console.error('User registration failed:', error);
    }
  };

  const handleOrganizationCreation = async () => {
    try {
      const { organizationData } = registrationData;
      
      // Add the user ID to the organization data
      const orgPayload = {
        ...organizationData,
        owner_id: userId
      };

      console.log('Organization creation payload:', orgPayload);
      await dispatch(createOrganization(orgPayload)).unwrap();
      
      // Clear registration data and redirect to dashboard
      dispatch(resetRegistrationData());
      navigate('/dashboard');
    } catch (error) {
      console.error('Organization creation failed:', error);
    }
  };

  const handleOrganizationStepComplete = async () => {
    await handleOrganizationCreation();
  };

  const clearErrors = () => {
    if (authError) dispatch(clearAuthError());
    if (orgError) dispatch(clearOrgError());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to BlueHooper</h1>
          <p className="mt-2 text-lg text-gray-600">
            Join our platform to manage your construction projects
          </p>
        </div>

        {/* Stepper */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= step.number
                        ? 'bg-primary-600 border-primary-600 text-white'
                        : 'border-gray-300 text-gray-500'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-primary-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 ${
                      currentStep > step.number ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            <div className="flex justify-between items-center">
              <span>{error}</span>
              <button
                onClick={clearErrors}
                className="text-red-400 hover:text-red-600"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {currentStep === 1 && (
            <UserRegistrationStep />
          )}
          
          {currentStep === 2 && (
            <OrganizationForm 
              onNext={handleOrganizationStepComplete}
              onPrev={handlePrevStep}
            />
          )}
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <span className="text-lg font-medium">
                {currentStep === 1 ? 'Creating your account...' : 'Setting up your organization...'}
              </span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MultiStepRegistration;