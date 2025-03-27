import React, { useState, useRef, useEffect } from 'react';

const YouTubePlayer = ({ videoId }) => {
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef(null);

  // This function is called when the YouTube API is ready
  const onYouTubeIframeAPIReady = () => {
    playerRef.current = new window.YT.Player('youtube-player', {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0
      },
      events: {
        onReady: onPlayerReady
      }
    });
  };

  const onPlayerReady = (event) => {
    // Player is ready
  };

  useEffect(() => {
    // Load the YouTube API script if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } else {
      onYouTubeIframeAPIReady();
    }

    return () => {
      // Clean up
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '240px' }}>
      <div id="youtube-player"></div>
      <button 
        onClick={toggleMute}
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          zIndex: 10,
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '5px 10px',
          cursor: 'pointer'
        }}
      >
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  );
};

export default YouTubePlayer;