// SharedCanvas.js
import React, { useRef, useEffect } from 'react';
import Konva from 'konva';

const SharedCanvas = ({ children }) => {
  const stageRef = useRef(null);
  const layersRef = useRef({});

  useEffect(() => {
    const stage = new Konva.Stage({
      container: stageRef.current,
      width: window.innerWidth,
      height: window.innerHeight / 2,
    });

    // Create a layer for each child
    React.Children.forEach(children, (child, index) => {
      const layer = new Konva.Layer();
      stage.add(layer);
      layersRef.current[child.key || index] = layer;
    });

    return () => {
      stage.destroy();
    };
  }, [children]);

  return (
    <div ref={stageRef} style={{ border: '1px solid black', position: 'relative' }}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { 
          stage: stageRef.current, 
          layer: layersRef.current[child.key || 0] 
        })
      )}
    </div>
  );
};

export default SharedCanvas;
