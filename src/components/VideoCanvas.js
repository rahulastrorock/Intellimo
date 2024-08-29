import React, { useEffect, useRef } from 'react';
import Konva from 'konva';

function VideoCanvas() {
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const layerRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;

    const stage = new Konva.Stage({
      container: stageRef.current,
      width: width,
      height: height,
    });

    const layer = new Konva.Layer();
    stage.add(layer);
    layerRef.current = layer;

    const videoElement = document.createElement('video');
    videoElement.src = 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c4/Physicsworks.ogv/Physicsworks.ogv.240p.vp9.webm';
    videoRef.current = videoElement;

    const konvaImage = new Konva.Image({
      image: videoElement,
      draggable: true,
      x: 50,
      y: 20,
    });
    layer.add(konvaImage);

    const text = new Konva.Text({
      text: 'Loading video...',
      width: stage.width(),
      height: stage.height(),
      align: 'center',
      verticalAlign: 'middle',
    });
    layer.add(text);

    const anim = new Konva.Animation(() => {
      // Animation runs to update the layer
    }, layer);
    animRef.current = anim;

    videoElement.addEventListener('loadedmetadata', () => {
      text.text('Press PLAY...');
      konvaImage.width(videoElement.videoWidth);
      konvaImage.height(videoElement.videoHeight);
      layer.draw();
    });

    return () => {
      anim.stop();
    };
  }, []);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      layerRef.current.find('Text').forEach((node) => node.destroy());
      layerRef.current.draw();
      animRef.current.start();
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      animRef.current.stop();
    }
  };

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      animRef.current.stop();
    }
  };

  return (
    <div>
      <button onClick={playVideo}>Play</button>
      <button onClick={pauseVideo}>Pause</button>
      <button onClick={stopVideo}>Stop</button>
      <div ref={stageRef}></div>
    </div>
  );
}

export default VideoCanvas;
