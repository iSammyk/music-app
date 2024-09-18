import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'; 


const Songs = () => {
  const navigate = useNavigate();
  const route = useParams();
  const { id } = route;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [onesong, setonesong] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    axios
      .get(`https://robo-music-api.onrender.com/music/my-api/${id}`)
      .then((res) => {
        const song = res.data.data;
        setonesong(song[0]);
        console.log(onesong);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const move = () => {
    navigate(`/`);
  };

  const change = (direction) => {
    const nextId = direction === 'next' ? +id + 1 : +id - 1;
    navigate(`/song/${nextId}`);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = (e) => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(isNaN(audioRef.current.duration) ? 0 : audioRef.current.duration);
    }
  };
  

  const handleVolumeChange = (e) => {
    if (audioRef.current) {
      audioRef.current.volume = e.target.value;
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const seekTime = (e.target.value / 100) * duration;
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  return (
    <div className='opo'>
      <button className='bg-info pop rounded-5 mt-2' onClick={move}>
        <i className="bi bi-arrow-left-circle-fill fs-3"></i>
      </button>
      <div className="container mx-auto">
        {loading ? (
          <div className="spinner text-center mx-auto mt-5">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <div>
            <div className='container d-flex justify-content-center'>
              <img
                src={onesong.songImage}
                width={370}
                height={350}
                alt=""
                className='mt-2 rounded-5'
              />
            </div>
            <div className='text-info text-center my-3'>
              <h3>{onesong.songTitle}</h3>
              <p>{onesong.artistName}</p>
            </div>

            <div className='mt-1 container'>
              <div className="custom-audio-controls">
                
                <div className="time-controls container text-info">
                  <span>{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    value={(currentTime / duration) * 100 || 0}
                    onChange={handleSeek}
                  />
                  <span>{formatTime(duration)}</span>
                </div>

              </div>
              <audio
                ref={audioRef}
                src={onesong.songUrl}
                className="custom-audio"
                onLoadedMetadata={(e) => {
                    handleTimeUpdate(e);
                }}
                onTimeUpdate={handleTimeUpdate}
                />
            </div>

            <div className='container w-50 d-flex justify-content-around my-2'>
              <button className='pop rounded-5 mt-2' onClick={() => change('prev')}>
                <i class="bi bi-skip-start-fill fs-1 text-info"></i>
              </button>

              <button className='bra' onClick={handlePlayPause}>
                {isPlaying ? (
                  <i className="bi bi-pause-fill  text-info"></i>
                ) : (
                  <i className="bi bi-play-fill  text-info"></i>
                )}
              </button>

              <button className='pop rounded-5 mt-2 ml-2' onClick={() => change('next')}>
                <i class="bi bi-skip-end-fill fs-1 text-info"></i>
              </button>
            </div>
            <div className="vertical-volume-container mx-auto my-3">
                 <button className='ela'><i class="bi bi-volume-up-fill text-info"></i></button>   
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={audioRef.current ? audioRef.current.volume : 1}
                    onChange={handleVolumeChange}
                    className="vertical-volume-slider"
                />
                </div>
          </div>
        )}
      </div>
    </div>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default Songs;
