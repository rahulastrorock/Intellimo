import React, { useEffect, useRef } from 'react';
import Konva from 'konva';

function ResizableImageCanvas() {
  const stageRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Initialize the Konva Stage
    const stage = new Konva.Stage({
      container: stageRef.current,
      width: width,
      height: height,
    });

    const layer = new Konva.Layer();
    stage.add(layer);
    layerRef.current = layer;

    // Function to update anchor positions and image size
    function update(activeAnchor) {
      const group = activeAnchor.getParent();
      const topLeft = group.findOne('.topLeft');
      const topRight = group.findOne('.topRight');
      const bottomRight = group.findOne('.bottomRight');
      const bottomLeft = group.findOne('.bottomLeft');
      const image = group.findOne('Image');

      const anchorX = activeAnchor.x();
      const anchorY = activeAnchor.y();

      switch (activeAnchor.getName()) {
        case 'topLeft':
          topRight.y(anchorY);
          bottomLeft.x(anchorX);
          break;
        case 'topRight':
          topLeft.y(anchorY);
          bottomRight.x(anchorX);
          break;
        case 'bottomRight':
          bottomLeft.y(anchorY);
          topRight.x(anchorX);
          break;
        case 'bottomLeft':
          bottomRight.y(anchorY);
          topLeft.x(anchorX);
          break;
        default:
          break;
      }

      image.position(topLeft.position());

      const width = topRight.x() - topLeft.x();
      const height = bottomLeft.y() - topLeft.y();
      if (width && height) {
        image.width(width);
        image.height(height);
      }
      layer.draw();
    }

    // Function to add anchor points
    function addAnchor(group, x, y, name) {
      const anchor = new Konva.Circle({
        x: x,
        y: y,
        stroke: '#666',
        fill: '#ddd',
        strokeWidth: 2,
        radius: 8,
        name: name,
        draggable: true,
        dragOnTop: false,
      });

      anchor.on('dragmove', function () {
        update(this);
      });
      anchor.on('mousedown touchstart', function () {
        group.draggable(false);
        this.moveToTop();
      });
      anchor.on('dragend', function () {
        group.draggable(true);
      });
      anchor.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
        this.strokeWidth(4);
      });
      anchor.on('mouseout', function () {
        document.body.style.cursor = 'default';
        this.strokeWidth(2);
      });

      group.add(anchor);
    }

    // Create groups and add images and anchors
    const darthVaderGroup = new Konva.Group({
      x: 180,
      y: 50,
      draggable: true,
    });
    layer.add(darthVaderGroup);
    const darthVaderImg = new Konva.Image({
      width: 200,
      height: 137,
    });
    darthVaderGroup.add(darthVaderImg);
    addAnchor(darthVaderGroup, 0, 0, 'topLeft');
    addAnchor(darthVaderGroup, 200, 0, 'topRight');
    addAnchor(darthVaderGroup, 200, 137, 'bottomRight');
    addAnchor(darthVaderGroup, 0, 137, 'bottomLeft');

    // Load images
    const imageObj1 = new Image();
    imageObj1.onload = function () {
      darthVaderImg.image(imageObj1);
      layer.draw();
    };
    imageObj1.src = 'https://konvajs.org/assets/lion.png';


    return () => {
      // Cleanup
      stage.destroy();
    };
  }, []);

  return <div ref={stageRef}></div>;
}

export default ResizableImageCanvas;
