import React from 'react';
import SideBar from '../../components/Admin/SideBar';
import { Outlet } from 'react-router';

const Profile = () => {
    return (
         <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
    );
}

export default Profile;
