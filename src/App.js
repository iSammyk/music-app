import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

const App = () => {
  const [data, setdata] = useState([]);
  const [isDayMode, setDayMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://robo-music-api.onrender.com/music/my-api')
      .then((res) => {
        console.log(res.data);
        setdata(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const toggleDayMode = () => {
    setDayMode((prevMode) => !prevMode);
  };

  const more = (id) => {
    console.log(id);
    navigate(`/song/${id}`);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredData = data.filter((el) =>
    el.songTitle.toLowerCase().includes(searchInput.toLowerCase())  ||
    el.artistName.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <div className={`container mx-auto wop mt-3 pb-3 rounded-4 ${isDayMode ? 'Day-mode' : ''}`}>
        <div className='d-flex justify-content-end'>
          <label className='switch my-2'>
            <input type='checkbox' onChange={toggleDayMode} checked={isDayMode} />
            <span className='slider'></span>
          </label>
        </div>
        <div className='input-container w-100'>
          <input
            type='text'
            name='text'
            className='input'
            placeholder='search...'
            value={searchInput}
            onChange={handleSearchChange}
          />
          <span className='icon'>
            <svg width='19px' height='19px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
              <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
              <g id='SVGRepo_iconCarrier'>
                <path
                  opacity='1'
                  d='M14 5H20'
                  stroke='#000'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                ></path>
                <path
                  opacity='1'
                  d='M14 8H17'
                  stroke='#000'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                ></path>
                <path
                  d='M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2'
                  stroke='#000'
                  stroke-width='2.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                ></path>
                <path
                  opacity='1'
                  d='M22 22L20 20'
                  stroke='#000'
                  stroke-width='3.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                ></path>
              </g>
            </svg>
          </span>
        </div>

        <div className='container d-flex wopp align-items-center'>
          <div className='container w-50'>
            <h4 className='mus'>Your Music playlist</h4>
          </div>
          <div className='w-50'>
            <img
              src={require('../src/blue-moon-cartoon-design-concept-listening-music-vector-31611151-removebg-preview.png')}
              alt=''
              width={200}
            />
          </div>
        </div>

        <div className='mx-4'>
          <h4 className='mus'>All Songs</h4>
        </div>
        {loading ? (
          <div className='spinner text-center mx-auto mt-5'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : filteredData.length === 0 ? (
          <div className='mx-4 text-info'>No songs found</div>
        ) : (
          filteredData.map((el, index) => (
            <div key={index} className='music-card d-flex text-info' onClick={() => more(el.id)}>
              <img src={el.songImage} alt='' width={60} className='rounded-2' />
              <div className='mx-4'>
                <b className='fs-4 fw-5'>{el.songTitle}</b> <br />
                <b>{el.artistName}</b>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default App;
