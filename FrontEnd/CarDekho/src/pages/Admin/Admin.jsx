
import { Outlet } from 'react-router';
import SideBar from '../../components/Admin/SideBar';

const Admin = () => {
    return (
        <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
    );
}

export default Admin;
