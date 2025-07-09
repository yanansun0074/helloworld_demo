// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import bg1 from './img/bg_1.png';
import bg2 from './img/bg_2.jpg';
import bg3 from './img/bg_3.jpg';
import bg4 from './img/bg_4.png';
import bg5 from './img/bg_5.jpg';

const backgroundImage = [
  bg1,
  bg2,
  bg3,
  bg4,
  bg5
];

function App() {
  const [bgIndex, setBgIndex] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [shake, setShake] = useState(false);

  const next = () => {
    setBgIndex((bgIndex) => (bgIndex + 1) % backgroundImage.length);
    setImgError(false);
  };
  const prev = () => {
    setBgIndex((bgIndex) => (bgIndex - 1 + backgroundImage.length) % backgroundImage.length);
    setImgError(false);
  };

  const handleInputChange = (e) => setName(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setSubmitted(true);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500); // duration matches animation
    }
  };

  const backgroundStyle = {
    backgroundImage: imgError ? 'none' : `url(${backgroundImage[bgIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: "no-repeat",
    height: '100vh',
    textAlign: 'center',
    position: 'relative',
  };


  return (
    <div className='app-container' style={backgroundStyle}>
      {/* Hidden img to detect load error */}
      <img
        src={backgroundImage[bgIndex]}
        alt='background test'
        style={{ display: 'none' }}
        onError={() => setImgError(true)}
        onLoad={() => setImgError(false)}
      />
      {imgError && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          fontSize: '2em',
          zIndex: 2,
        }}>
          Failed to load background image
        </div>
      )}
      <h1 className='title'>Hello, {submitted ? name : 'World'}!</h1>

      {/* no input */}
      {!submitted && (
        <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
          <input
            type='text'
            value={name}
            onChange={handleInputChange}
            placeholder='Your name'
            maxLength={20}
            style={{ fontSize: '1.5em', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            className={shake ? 'shake' : ''}
          />
          <button type='submit' className='button' style={{ marginLeft: 10 }}>Enter</button>
        </form>
      )}

      {/* with input */}
      {submitted && (
        <div>
          <button onClick={prev} className='button'>Previous</button>
          <button onClick={next} className='button'>Next</button>
        </div>
      )}
    </div>
  );
}

export default App;
