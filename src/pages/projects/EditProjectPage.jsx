import { useParams } from 'react-router-dom';
import ProjectForm from '../../components/projects/ProjectForm';

const EditProjectPage = () => {
  const { projectId } = useParams();

  return (
    <div className="p-6">
      <ProjectForm projectId={projectId} />
    </div>
  );
};

export default EditProjectPage;