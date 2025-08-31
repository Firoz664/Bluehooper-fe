import { Outlet } from 'react-router-dom';
import Sidebar from '../components/ui/Sidebar';

const ProtectedLayout = () => {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;