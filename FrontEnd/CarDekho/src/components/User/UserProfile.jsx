import React from 'react';
import { useSelector } from 'react-redux';
import { ROLE_MAP } from '../../utils/constants';

const UserProfile = () => {
    const user = useSelector((state)=> state?.user?.user)
    return (
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      {/* Profile Header */}
      <div className="flex items-center gap-6 border-b pb-6 mb-6">
        <img
          src={user.ProfileImage || "/default-avatar.png"}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-2 border-purple-500 shadow-md"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {user.FirstName} {user.MiddleName} {user.LastName}
          </h2>
          <p className="text-gray-500">{user.Email}</p>
          <p className="text-gray-500">{user.Phone}</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-2 gap-6 text-gray-700">
        <div>
          <h3 className="font-semibold">User ID:</h3>
          <p>{user.UserId}</p>
        </div>
        <div>
          <h3 className="font-semibold">Role:</h3>
          <p>{ROLE_MAP[user.RoleId]?.text || "Unknown"}</p>
        </div>
        <div>
          <h3 className="font-semibold">Address:</h3>
          <p>{user.Address}, {user.City}, {user.District}, {user.State} - {user.Pincode}</p>
        </div>
       
        <div>
          <h3 className="font-semibold">Active State:</h3>
          <p>{user.ActiveState ? "Active" : "Inactive"}</p>
        </div>
        <div>
          <h3 className="font-semibold">Created Date:</h3>
          <p>{new Date(user.CreatedDate | "N/A").toLocaleString()}</p>
        </div>
        <div>
          <h3 className="font-semibold">Modified Date:</h3>
          <p>{new Date(user.ModifiedDate | "N/A" ).toLocaleString()}</p>
        </div>
        <div>
          <h3 className="font-semibold">Modified By:</h3>
          <p>{user.ModifiedBy || user.FirstName}</p>
        </div>
      </div>

      {/* Extra Section (Future Expansion) */}
      <div className="mt-6 p-4 border-t">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Additional Info</h3>
        <ul className="list-disc pl-6 text-gray-600 space-y-1">
          <li>Last Login: {user.LastLogin || "Not available"}</li>
          <li>Subscription Plan: {user.SubscriptionPlan || "Free"}</li>
          <li>Preferences: {user.Preferences || "None"}</li>
        </ul>
      </div>
    </div>

    );
}

export default UserProfile;
