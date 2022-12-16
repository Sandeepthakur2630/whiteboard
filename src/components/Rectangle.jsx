import { useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import Konva from "konva";
import styled from "styled-components";

const Rectangle = () => {
  const [color, setColor] = useState("green");

  const changeColor = () => {
    setColor(Konva.Util.getRandomColor());
  };

  return (
   <Shape>
     <Rect
      x={20}
      y={20}
      width={50}
      height={50}
      fill={color}
      shadowBlur={5}
      onClick={changeColor}
    />
   </Shape>
  );
};

export default Rectangle;

const Shape = styled.div`
  width: 100%;
  height: 100%;
`;
