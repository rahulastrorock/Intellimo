import React, { useEffect, useRef, useState } from 'react';
import Konva from 'konva';

function TextToggleCanvas() {
  const stageRef = useRef(null);
  const [layer, setLayer] = useState(null);
  const [textNode, setTextNode] = useState(null);
  const [transformer, setTransformer] = useState(null);

  useEffect(() => {
    const stage = new Konva.Stage({
      container: stageRef.current,
      width: window.innerWidth,
      height: window.innerHeight / 2,
    });

    const layer = new Konva.Layer();
    stage.add(layer);
    setLayer(layer);

    // Set canvas background color
    const background = new Konva.Rect({
      x: 0,
      y: 0,
      width: stage.width(),
      height: stage.height(),
      fill: 'lightblue', // Background color
    });
    layer.add(background);
    layer.draw();

    // Create and add transformer
    const tr = new Konva.Transformer({
      padding: 10,
      borderDash: [6, 2],
      borderStroke: 'black',
      anchorStroke: 'black',
      anchorSize: 10,
      anchorStrokeWidth: 2,
      anchorFill: 'white',
      enabledAnchors: ['middle-left', 'middle-right'],
      boundBoxFunc: (oldBox, newBox) => {
        const MIN_WIDTH = 20;
        if (Math.abs(newBox.width) < MIN_WIDTH) {
          return oldBox;
        }
        return newBox;
      },
    });
    layer.add(tr);
    setTransformer(tr);

    // Cleanup on component unmount
    return () => {
      stage.destroy();
    };
  }, []);

  const toggleText = () => {
    if (textNode) {
      // Remove text
      textNode.destroy();
      transformer.nodes([]);
      setTextNode(null);
      layer.draw();
    } else {
      // Add text
      const text = new Konva.Text({
        x: 200,
        y: 200,
        text: 'Hello Konva',
        fontSize: 30,
        draggable: true,
        padding: 10,
        align: 'center',
        fill: 'black',
        stroke: 'black', // Border color
        strokeWidth: 2, // Border width
      });
      layer.add(text);
      setTextNode(text);
      transformer.nodes([text]);
      layer.draw();
    }
  };

  const moveText = (dx, dy) => {
    if (textNode) {
      textNode.x(textNode.x() + dx);
      textNode.y(textNode.y() + dy);
      layer.draw();
    }
  };

  return (
    <div>
      <button onClick={toggleText}>Add/Remove text</button>
      <button onClick={() => moveText(0, -10)}>Up</button>
      <button onClick={() => moveText(0, 10)}>Down</button>
      <button onClick={() => moveText(-10, 0)}>Left</button>
      <button onClick={() => moveText(10, 0)}>Right</button>
      <div ref={stageRef}></div>
    </div>
  );
}

export default TextToggleCanvas;