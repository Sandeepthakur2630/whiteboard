import styled from "styled-components";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import EditIcon from "@mui/icons-material/Edit";
import Konva, { Stage, Layer, Rect, Text, Line } from "react-konva";
import React, { useEffect, useRef, useState } from "react";
import Holder from "../components/Holder";
import { tool } from "../utils";
import Timer from "../components/Timer";
function DrawCircle() {
  const [elements, setElements] = useState([]);
  const [redo, setRedo] = React.useState([]);
  const [activeTab, setActiveTab] = useState(1);

  const [elementsGet, setElementsGet] = useState(
    JSON.parse(localStorage.getItem("whitebord")) || []
  );
  const [activeType, setActiveType] = useState(tool.pen);

  //undo redo function

  const undo = () => {
    const rem = elementsGet.pop();
    setRedo((s) => [...s, rem]);
    console.log(elementsGet, "removeMe");
    setElementsGet(
      elementsGet.filter((i, ind) => ind !== elementsGet.length - i)
    );
  };
  const redof = () => {
    if (redo.length > 0) {
      console.log(elementsGet, "addMe");
      setElementsGet([...elementsGet, redo[redo.length - 1]]);
      setRedo(redo.filter((i, ind) => ind !== redo.length - 1));
    }
  };

  let isDraw = useRef(false);

  const onMouseDown = (e) => {
    isDraw.current = true;

    setElements((s) => [
      ...s,
      {
        id: activeType + "-" + Date.now(),
        type: activeType,
        points: [
          e.target?.getStage().getPointerPosition().x,
          e.target?.getStage().getPointerPosition().y,
        ],
        x: e.target?.getStage().getPointerPosition().x,
        y: e.target?.getStage().getPointerPosition().y,
        width: 0,
        height: 0,
        stroke: "#000",
      },
    ]);
  };
  const onMouseMove = (e) => {
    if (!isDraw.current) return;
    const st = e.currentTarget;
    const pos = st.getPointerPosition();
    if (elements.length > 0) {
      let lastId = [...elements].pop().id;
      const nn = e.target.getStage().findOne("#" + lastId);

      switch (activeType) {
        case tool.rectangle:
          return nn.setAttrs({
            width: pos.x - nn.attrs.x,
            height: pos.y - nn.attrs.y,
          });
        case tool.circle:
          return nn.setAttrs({
            radius: pos.x - nn.attrs.x,
          });
        default:
          nn.setAttrs({
            points: nn.attrs.points.concat(pos.x, pos.y),
            x: 0,
            y: 0,
          });
      }
    }
  };

  const onMouseUp = (e) => {
    isDraw.current = false;
    let lastId = [...elements].pop().id;
    const shapeAttrs = e.target.getStage().findOne("#" + lastId);
    localStorage.setItem(
      "whitebord",
      JSON.stringify([
        ...elements.map((i) => {
          if (i.id === lastId) {
            return {
              ...i,
              ...shapeAttrs.attrs,
            };
          } else {
            console.log(e.target.getStage().findOne("#" + i.id).attrs, "i");
            return e.target.getStage().findOne("#" + i.id).attrs;
          }
        }),
        ...elementsGet,
      ])
    );
  };

  const store = [...elements, ...elementsGet];

  return (
    <>
      <div className="absolute right-2 top-2">
        <Timer />
      </div>
      <Root>
        <DrawingBoard>
          <Stage
            className="canvas-size"
            width={`${window.innerWidth}`}
            height={window.innerHeight}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          >
            <Layer>
              {store.map((i) => {
                return <Holder {...i} />;
              })}
            </Layer>
          </Stage>
        </DrawingBoard>
        <Sidebar>
          <div className="tools">
            <div className="tool">
              <input
                type="radio"
                id="pen"
                name="shape"
                onChange={() => {
                  setActiveType(tool.pen);
                }}
              />
              <label htmlFor="pen" className="text">
                Pen
              </label>
            </div>
            <div className="tool">
              <input
                type="radio"
                name="shape"
                id="rectangle"
                onChange={() => {
                  setActiveType(tool.rectangle);
                }}
              />
              <label htmlFor="rectangle" className="text">
                Rectangle
              </label>
            </div>
            <div className="tool">
              <input
                type="radio"
                id="circle"
                name="shape"
                onChange={() => {
                  setActiveType(tool.circle);
                }}
              />
              <label htmlFor="circle" className="text">
                Circle
              </label>
            </div>
          </div>
          <div className="flex ">
            <button onClick={redof} className=" p-3 bg-[#ffe0ff] rounded-[40px]">
              redo
            </button>
            <button onClick={undo} className="p-2">
              undo
            </button>
          </div>
        </Sidebar>
      </Root>
    </>
  );
}

export default DrawCircle;

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1rem;
  /* position: relative; */
`;

const Sidebar = styled.div`
  width: 300px;
  background-color: #eeeeee;
  padding: 1rem;
  position: absolute;
  left: 0;
  border-radius: 40px;
  bottom: 20px;
  z-index: 2;
`;

const DrawingBoard = styled.div`
  .canvas-size {
    width: 100%;
    height: 100%;
    background-color: #d8d5d5;
  }
`;
