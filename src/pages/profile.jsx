import React, { useState } from 'react';

const Profile = () => {
  // Sample user data (replace with your actual user data)
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    profilePicture: 'https://via.placeholder.com/150', // Sample profile picture URL
  });

  // State for editing profile
  const [editing, setEditing] = useState(false);

  // Function to handle profile edit
  const handleEditProfile = () => {
    // Implement edit profile functionality here
    console.log('Editing profile...');
  };

  return (
    <div>
      <h1>User Profile</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={user.profilePicture}
          alt="Profile"
          style={{ borderRadius: '50%', width: '150px', height: '150px', marginRight: '20px' }}
        />
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          {editing ? (
            <textarea
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
              rows="4"
              cols="50"
            />
          ) : (
            <p>Bio: {user.bio}</p>
          )}
          <button onClick={editing ? handleEditProfile : () => setEditing(true)}>
            {editing ? 'Save' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
