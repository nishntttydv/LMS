// src/components/BackgroundVideo.js
import React from 'react';
import './BackgroundVideo.css'; // Optional, for styling the video

const BackgroundVideo = () => {
  return (
    <div className="background-video-container">
      {/* Background video */}
      <video autoPlay muted loop className="background-video">
        <source src={require('../assets/background.mp4')} type="video/mp4" />
        {/* Fallback image if video doesn't load */}
        <img
          src="https://via.placeholder.com/1920x1080.png?text=Background+Video+Not+Supported"
          alt="Background not supported"
        />
      </video>
    </div>
  );
};

export default BackgroundVideo;
