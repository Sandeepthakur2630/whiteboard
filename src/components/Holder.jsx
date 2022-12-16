import React from "react";
import { Circle, Line, Rect } from "react-konva";
import { tool } from "../utils";

export default function Holder(props) {
  console.log(props.type);
  console.log(props)
  switch (props.type) {
    case tool.pen:
      return <Line {...props} />;
    case tool.rectangle:
      return <Rect {...props} />;
    case tool.circle:
      return <Circle {...props} />;
    default:
      return <></>;
  }
}
