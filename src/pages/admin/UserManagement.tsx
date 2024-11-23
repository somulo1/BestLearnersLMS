import React, { useState } from 'react';
import { Shield, Users, Lock, Unlock, AlertCircle } from 'lucide-react';

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

// Limited permissions for Admin (compared to SuperAdmin)
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
    id: 'student_manage',
    name: 'Manage Students',
    description: 'Ability to manage student accounts',
    enabled: false
  },
  {
    id: 'instructor_manage',
    name: 'Manage Instructors',
    description: 'Ability to manage instructor accounts',
    enabled: false
  }
];

// Limited roles for Admin
const initialRoles: Role[] = [
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

const AdminUserManagement: React.FC = () => {
  const [roles] = useState<Role[]>(initialRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">User Role Management</h1>
        <p className="text-gray-600">View and understand role permissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Roles</h2>
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
                      <div className={`p-2 rounded-full ${
                        permission.enabled
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {permission.enabled ? (
                          <Unlock className="h-5 w-5" />
                        ) : (
                          <Lock className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 mx-auto mb-4" />
                <p>Select a role to view permissions</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;
