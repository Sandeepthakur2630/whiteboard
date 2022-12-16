import * as React from "react";
import { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
const Timer = () => {
  const navigate = useNavigate();
  const initialTimer = localStorage.getItem("timer") ?? 60;
  const timeoutId = useRef(null);
  const [timer, setTimer] = useState(initialTimer);

  const countTimer = useCallback(() => {
    if (timer <= 0) {
      localStorage.clear("timer");
    } else {
      setTimer(timer - 1);
      localStorage.setItem("timer", timer);
    }
  }, [timer]);

  useEffect(() => {
    timeoutId.current = window.setTimeout(countTimer, 1000);

    return () => window.clearTimeout(timeoutId.current);
  }, [timer, countTimer]);

  useEffect(() => {
    if (timer === 0) {
      navigate("/");
      setTimer(60);
      localStorage.removeItem("timer");
    }
  }, [timer]);

  return (
    <div
      className="rounded-[50px] h-[60px] w-[60px] flex items-center justify-center text-[white] "
      style={{ background: timer < 10 ? "red" : "gray" }}
    >
      {timer}
    </div>
  );
};

export default Timer;
