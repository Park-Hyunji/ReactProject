import React, { useState } from 'react';
import YouTube from 'react-youtube';
import Header from './Layout/Header';

const VideoPlayer = () => {
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const playlist = ["_hZlQ1UdZjs", "9s9UH-2HJac", "qXHmSuZrSKE", "GVKLwh87yTA"];
  const videoTitles = ["웹 공학", "모바일 소프트웨어", "빅데이터", "디지털콘텐츠"];

  const onEndHandler = () => {
    setPlaylistIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const handleButtonClick = (index) => {
    setPlaylistIndex(index);
  };

  return (
    <>
    <Header />
    <hr></hr>
    <div className='youtubeName' style={{ textAlign: 'center',
    fontSize: '30px',fontFamily: 'bori', marginTop: '20px' }}>
      트랙 소개 영상
    </div>
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <YouTube
        videoId={playlist[playlistIndex]}
        opts={{
          width: '60%',
          height: '560px',
          playerVars: {
            autoplay: 1,
            modestbranding: 1,
            playlist: playlist.join(','),
          },
        }}
        onEnd={onEndHandler}
      />
      <div>
        {playlist.map((_, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            style={{
              padding: '10px 15px',
              margin: '5px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              backgroundColor: index === playlistIndex ? '#3498db' : '#ddd',
              color: index === playlistIndex ? '#fff' : '#333',
            }}
          >
            {`${videoTitles[index]}`}
          </button>
        ))}
      </div>
      
    </div>
    </>
  );
};

export default VideoPlayer;
