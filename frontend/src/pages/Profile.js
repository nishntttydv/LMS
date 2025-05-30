import React from 'react';

const Profile = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Profile</h1>
      <p style={styles.paragraph}>This is the profile page. You can add more details here.</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  header: {
    fontSize: '2em',
  },
  paragraph: {
    fontSize: '1.2em',
  },
};

export default Profile;
