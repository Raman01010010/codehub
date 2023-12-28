import React, { useState, useRef, useEffect } from 'react';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [tool, setTool] = useState('pencil');
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setContext(ctx);
  }, []);

  const startDrawing = (event) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = event.nativeEvent;
    setStartX(offsetX);
    setStartY(offsetY);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = event.nativeEvent;

    switch (tool) {
      case 'pencil':
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(offsetX, offsetY);
        context.stroke();
        setStartX(offsetX);
        setStartY(offsetY);
        break;
      case 'eraser':
        context.clearRect(offsetX - 5, offsetY - 5, 10, 10);
        break;
      case 'line':
        redrawCanvas(shapes); // Redraw existing shapes
        setEndX(offsetX);
        setEndY(offsetY);
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.stroke();
        break;
      case 'rectangle':
        redrawCanvas(shapes); // Redraw existing shapes
        setEndX(offsetX);
        setEndY(offsetY);
        context.beginPath();
        context.rect(startX, startY, endX - startX, endY - startY);
        context.stroke();
        break;
      case 'triangle':
        redrawCanvas(shapes); // Redraw existing shapes
        setEndX(offsetX);
        setEndY(offsetY);
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.lineTo(startX - (endX - startX), endY);
        context.closePath();
        context.stroke();
        break;
      case 'circle':
        redrawCanvas(shapes); // Redraw existing shapes
        setEndX(offsetX);
        setEndY(offsetY);
        const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        context.beginPath();
        context.arc(startX, startY, radius, 0, 2 * Math.PI);
        context.stroke();
        break;
      default:
        break;
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);

    switch (tool) {
      case 'line':
        setShapes([...shapes, { type: 'line', startX, startY, endX, endY }]);
        break;
      case 'rectangle':
        setShapes([...shapes, { type: 'rectangle', startX, startY, width: endX - startX, height: endY - startY }]);
        break;
      case 'triangle':
        setShapes([...shapes, { type: 'triangle', startX, startY, endX, endY }]);
        break;
      case 'circle':
        const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        setShapes([...shapes, { type: 'circle', startX, startY, radius }]);
        break;
      default:
        break;
    }
  };

  const redrawCanvas = (shapesToDraw) => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    shapesToDraw.forEach((shape) => {
      switch (shape.type) {
        case 'pencil':
          context.beginPath();
          context.moveTo(shape.points[0].x, shape.points[0].y);
          shape.points.forEach((point) => {
            context.lineTo(point.x, point.y);
          });
          context.stroke();
          break;
        case 'eraser':
          shape.points.forEach((point) => {
            context.clearRect(point.x - 5, point.y - 5, 10, 10);
          });
          break;
        case 'line':
          context.beginPath();
          context.moveTo(shape.startX, shape.startY);
          context.lineTo(shape.endX, shape.endY);
          context.stroke();
          break;
        case 'rectangle':
          context.beginPath();
          context.rect(shape.startX, shape.startY, shape.width, shape.height);
          context.stroke();
          break;
        case 'triangle':
          context.beginPath();
          context.moveTo(shape.startX, shape.startY);
          context.lineTo(shape.endX, shape.endY);
          context.lineTo(shape.startX - (shape.endX - shape.startX), shape.endY);
          context.closePath();
          context.stroke();
          break;
        case 'circle':
          context.beginPath();
          context.arc(shape.startX, shape.startY, shape.radius, 0, 2 * Math.PI);
          context.stroke();
          break;
        default:
          break;
      }
    });
  };

  const handleToolChange = (selectedTool) => {
    setTool(selectedTool);
  };

  return (
    <div>
      <select onChange={(e) => handleToolChange(e.target.value)} value={tool}>
        <option value="pencil">Pencil</option>
        <option value="eraser">Eraser</option>
        <option value="line">Line</option>
        <option value="rectangle">Rectangle</option>
        <option value="triangle">Triangle</option>
        <option value="circle">Circle</option>
      </select>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        style={{ border: '1px solid #000' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      />
    </div>
  );
};

export default DrawingCanvas;
