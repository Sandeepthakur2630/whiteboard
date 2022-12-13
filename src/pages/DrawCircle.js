import { useEffect, useState } from "react";
import React from "react";

import { Stage, Layer, Rect, Circle, Line } from "react-konva";
const DrawCircle = () => {
  const [toggle, setToggle] = useState(true);
  const [circleSet, setcircleSet] = useState([]);
  const [getCircle, setGetCircle] = useState(
    JSON.parse(localStorage.getItem("circle")) || []
  );
  const [checkLocal, setCheckLocal] = useState(false);
  const [newAnnotation, setNewAnnotation] = useState([]);
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState([]);
  const [getPencil, setGetPencil] = useState(
    JSON.parse(localStorage.getItem("pencil")) || []
  );
  const isDrawing = React.useRef(false);
  const handleClick = () => {
    console.log("yes");
    setToggle((s) => !s);
  };

  const handleMouseDownPen = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMovePen = (e) => {
    if (!isDrawing.current) {
      return;
    }
    // console.log('ptn000')
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
    localStorage.setItem("pencil", JSON.stringify([...lines, ...getPencil]));
  };

  const handleMouseUpPen = () => {
    isDrawing.current = false;
  };

  const handleMouseDown = (event) => {
    if (newAnnotation.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
    }
  };

  const handleMouseUp = (event) => {
    console.log("circlr+++");
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: circleSet.length + 1,
      };
      circleSet.push(annotationToAdd);
      setNewAnnotation([]);
      setcircleSet(circleSet);
      localStorage.setItem(
        "circle",
        JSON.stringify([...circleSet, ...newAnnotation, ...getCircle])
      );
      console.log(circleSet, "llll");
    }
  };

  const handleMouseMove = (event) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: "0",
        },
      ]);
    }
  };

  const circleSetToDraw = [...circleSet, ...newAnnotation, ...getCircle];
  const penSetToDraw = [...lines, ...getPencil];

  useEffect(() => {
    if (localStorage.getItem("circle")) {
      setGetCircle(JSON.parse(localStorage.getItem("circle")));
      setCheckLocal(true);
      console.log(checkLocal, "kkoo0909");
    } else {
      setCheckLocal(false);
      console.log(checkLocal, "kkoo0909");
    }
  }, [checkLocal]);

  return (
    <>
      <div className="absolute top-[20px] right-[120px]">
        <button
          onClick={handleClick}
          className="p-2 bg-[#26eee4] rounded-lg z-40"
        >
          toggle
        </button>
      </div>
      {toggle ? (
        <Stage
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          width={1000}
          height={500}
        >
          <Layer>
            {circleSetToDraw.map((value) => {
              return (
                <Circle
                  x={value.x}
                  y={value.y}
                  width={value.width}
                  height={value.width}
                  fill="transparent"
                  stroke="black"
                />
              );
            })}
          </Layer>
        </Stage>
      ) : (
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDownPen}
          onMousemove={handleMouseMovePen}
          onMouseup={handleMouseUpPen}
        >
          <Layer>
            {penSetToDraw.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#000"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            ))}
          </Layer>
        </Stage>
      )}
    </>
  );
};

export default DrawCircle;
