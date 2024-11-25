import React, { useState } from 'react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const Profile: React.FC = () => {
  // Mock user data
  const [user, setUser] = useState<UserProfile>({
    id: '12345',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main Street, Springfield',
  });

  const [isEditing, setIsEditing] = useState(false); // Toggle editing state
  const [formData, setFormData] = useState(user); // Temporary state for edits

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser(formData); // Save changes to user state
    setIsEditing(false); // Exit edit mode
  };

  const handleCancel = () => {
    setFormData(user); // Revert changes
    setIsEditing(false); // Exit edit mode
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      setUser({
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
      }); // Clear user data
      alert('Profile deleted successfully!');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {user.id ? (
          isEditing ? (
            // Edit form
            <form>
              <div className="mb-4">
                <label className="block text-gray-600 dark:text-gray-300 font-bold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 dark:text-gray-300 font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 dark:text-gray-300 font-bold mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 dark:text-gray-300 font-bold mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            // Display user info
            <div>
              <p className="text-gray-600 dark:text-gray-300"><strong>Name:</strong> {user.name}</p>
              <p className="text-gray-600 dark:text-gray-300"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-600 dark:text-gray-300"><strong>Phone:</strong> {user.phone}</p>
              <p className="text-gray-600 dark:text-gray-300"><strong>Address:</strong> {user.address}</p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        ) : (
          <p className="text-gray-600 dark:text-gray-300">No profile data available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
