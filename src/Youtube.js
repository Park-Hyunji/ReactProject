import React, { useState } from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = () => {
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const playlist = ["_hZlQ1UdZjs", "9s9UH-2HJac", "qXHmSuZrSKE", "GVKLwh87yTA"];

  const onEndHandler = (e) => {
    setPlaylistIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const handleButtonClick = (index) => {
    setPlaylistIndex(index);
  };

  return (
    <>
      <div>
        <button onClick={() => handleButtonClick(0)}>웹 공학</button>
        <button onClick={() => handleButtonClick(1)}>모바일 소프트웨어</button>
        <button onClick={() => handleButtonClick(2)}>빅데이터</button>
        <button onClick={() => handleButtonClick(3)}>디지털콘텐츠</button>
      </div>
      <YouTube
        videoId={playlist[playlistIndex]}
        opts={{
          width: "60%",
          height: "560px",
          playerVars: {
            autoplay: 1,
            modestbranding: 1,
            playlist: playlist.join(','),
          },
        }}
        onEnd={onEndHandler}
      />
    </>
  );
};

export default VideoPlayer;
