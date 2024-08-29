import React from 'react';
import ImageCanvas from './components/ImageCanvas';
import TextToggleCanvas from './components/TextToggleCanvas';
import VideoCanvas from './components/VideoCanvas';

function App() {
  return (
    <div>
      <h1>Konva Canvas Example</h1>
      <ImageCanvas />
      <TextToggleCanvas />
      <VideoCanvas />


    </div>
  );
}

export default App;
