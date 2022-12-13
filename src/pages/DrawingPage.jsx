import "../index.css";
import { useState } from "react";
import React from "react";
import Timer from "../components/Timer";
import { Stage, Layer, Rect, Line } from "react-konva";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import EditIcon from "@mui/icons-material/Edit";
import { act } from "react-dom/test-utils";
const DrawingPage = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState([]);
  const isDrawing = React.useRef(false);
  const [dataSetLocal, setDataSetLocal] = useState(
    JSON.parse(localStorage.getItem("whitebord")) || []
  );
  const handleClickPen = (e) => {
    console.log("yes");
    setActiveTab(1);
  };
  const handleClickRect = (e) => {
    console.log("yes");
    setActiveTab(2);
    console.log(e, "JHgfhgf");
  };

  const handleMouseDownPen = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMovePen = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
    localStorage.setItem(
      "whitebord",
      JSON.stringify([...lines, ...dataSetLocal])
    );
  };

  const handleMouseUpPen = (e) => {
    isDrawing.current = false;
  };

  const handleMouseDown = (event) => {
    if (newAnnotation.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
    }
  };

  const handleMouseUp = (event) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: annotations.length + 1,
      };
      annotations.push(annotationToAdd);
      setNewAnnotation([]);
      setAnnotations(annotations);
      localStorage.setItem(
        "whitebord",
        JSON.stringify([...annotations, ...dataSetLocal])
      );
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

  const annotationsToDraw = [...annotations, ...newAnnotation, ...dataSetLocal];
  const linesToDraw = [...lines, ...dataSetLocal];
  console.log(annotationsToDraw, "hiiiiii");
  console.log(lines, "hooo");

  return (
    <>
      <div className="absolute top-[20px] right-[30px]">
        <Timer />
      </div>
      {/* {toggle ? ( */}
      <Stage
        width={2000}
        height={950}
        onMouseDown={(e) => {
          if (activeTab === 1) {
            handleMouseDownPen(e);
          } else {
            handleMouseDown(e);
          }
        }}
        onMouseUp={(e) => {
          if (activeTab === 1) {
            handleMouseUpPen(e);
          } else {
            handleMouseUp(e);
          }
        }}
        onMouseMove={(e) => {
          if (activeTab === 1) {
            handleMouseMovePen(e);
          } else {
            handleMouseMove(e);
          }
        }}
      >
        <Layer>
          {annotationsToDraw.map((value) => {
            return (
              <Rect
                x={value.x}
                y={value.y}
                width={value.width}
                height={value.width}
                fill="transparent"
                stroke="black"
              />
            );
          })}

          {linesToDraw.map((line, i) => {
            return (
              <Line
                key={i}
                points={line.points}
                stroke="#df4b26"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            );
          })}
        </Layer>
      </Stage>

      <div className=" flex justify-around  rounded-[33px] bg-[#d3d0d0] w-fit mx-auto">
        <div
          onClick={handleClickPen}
          className={`p-[10px]  rounded-[33px]  ${
            activeTab === 1 && `bg-blue-500`
          }`}
        >
          <EditIcon />
        </div>
        <div
          className={`p-[10px]  rounded-[33px]  ${
            activeTab === 2 && `bg-blue-500`
          }`}
          onClick={handleClickRect}
        >
          <CheckBoxOutlineBlankIcon />
        </div>
        <div className=" p-[10px] rounded-[33px] icon">
          <RadioButtonUncheckedIcon />
        </div>
      </div>
    </>
  );
};

export default DrawingPage;
