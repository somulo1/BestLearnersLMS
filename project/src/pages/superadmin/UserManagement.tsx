import React, { useState } from 'react';
import { 
  Shield, 
  Key, 
  Users as UsersIcon, 
  Lock, 
  Unlock, 
  Settings, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Edit,
  Save
} from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

interface UserRole {
  userId: number;
  roleId: string;
  status: 'active' | 'suspended' | 'pending';
}

// Mock data
const initialPermissions: Permission[] = [
  {
    id: 'course_create',
    name: 'Create Courses',
    description: 'Ability to create new courses',
    enabled: false
  },
  {
    id: 'course_edit',
    name: 'Edit Courses',
    description: 'Ability to edit existing courses',
    enabled: false
  },
  {
    id: 'course_delete',
    name: 'Delete Courses',
    description: 'Ability to delete courses',
    enabled: false
  },
  {
    id: 'user_manage',
    name: 'Manage Users',
    description: 'Ability to manage user accounts',
    enabled: false
  },
  {
    id: 'role_manage',
    name: 'Manage Roles',
    description: 'Ability to manage roles and permissions',
    enabled: false
  },
  {
    id: 'system_settings',
    name: 'System Settings',
    description: 'Access to system settings',
    enabled: false
  },
  {
    id: 'reports_view',
    name: 'View Reports',
    description: 'Access to view system reports',
    enabled: false
  },
  {
    id: 'analytics_view',
    name: 'View Analytics',
    description: 'Access to view analytics',
    enabled: false
  }
];

const initialRoles: Role[] = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full system access',
    permissions: initialPermissions.map(p => ({ ...p, enabled: true }))
  },
  {
    id: 'instructor',
    name: 'Instructor',
    description: 'Course management access',
    permissions: initialPermissions.map(p => ({
      ...p,
      enabled: p.id.startsWith('course_')
    }))
  },
  {
    id: 'student',
    name: 'Student',
    description: 'Basic course access',
    permissions: initialPermissions.map(p => ({
      ...p,
      enabled: false
    }))
  }
];

const UserManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handlePermissionToggle = (roleId: string, permissionId: string) => {
    setRoles(prevRoles =>
      prevRoles.map(role =>
        role.id === roleId
          ? {
              ...role,
              permissions: role.permissions.map(perm =>
                perm.id === permissionId
                  ? { ...perm, enabled: !perm.enabled }
                  : perm
              )
            }
          : role
      )
    );
  };

  const handleSaveChanges = () => {
    // Here you would typically make an API call to save the changes
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    setEditMode(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management & Access Control</h1>
        <p className="text-gray-600">Manage roles, permissions, and system access</p>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Changes saved successfully
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">System Roles</h2>
            <button
              onClick={() => setEditMode(!editMode)}
              className="text-sm px-3 py-1 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
            >
              {editMode ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            </button>
          </div>
          <div className="space-y-3">
            {roles.map(role => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedRole?.id === role.id
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  <div>
                    <div className="font-medium">{role.name}</div>
                    <div className="text-sm text-gray-500">{role.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Permissions Management */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          {selectedRole ? (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {selectedRole.name} Permissions
                </h2>
                <p className="text-sm text-gray-500">{selectedRole.description}</p>
              </div>

              <div className="space-y-4">
                {selectedRole.permissions.map(permission => (
                  <div
                    key={permission.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center">
                      <Key className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">
                          {permission.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {permission.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          editMode &&
                          handlePermissionToggle(selectedRole.id, permission.id)
                        }
                        disabled={!editMode}
                        className={`p-2 rounded-full transition-colors ${
                          permission.enabled
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-400'
                        } ${
                          editMode
                            ? 'hover:bg-opacity-75 cursor-pointer'
                            : 'cursor-not-allowed'
                        }`}
                      >
                        {permission.enabled ? (
                          <Unlock className="h-5 w-5" />
                        ) : (
                          <Lock className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {editMode && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSaveChanges}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 mx-auto mb-4" />
                <p>Select a role to manage permissions</p>
              </div>
            </div>
          )}
        </div>

        {/* System Security Settings */}
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">System Security Settings</h2>
              <p className="text-sm text-gray-500">Configure system-wide security settings</p>
            </div>
            <Settings className="h-6 w-6 text-gray-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Two-Factor Authentication */}
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-500 mb-4">
                Require 2FA for administrative accounts
              </p>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm">
                Enabled
              </button>
            </div>

            {/* Password Policy */}
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-2">Password Policy</h3>
              <p className="text-sm text-gray-500 mb-4">
                Minimum requirements for user passwords
              </p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">
                Configure
              </button>
            </div>

            {/* Session Management */}
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-2">Session Management</h3>
              <p className="text-sm text-gray-500 mb-4">
                Control user session duration and limits
              </p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">
                Configure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
