/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const Cursor = (props) => {
  const [position, setPosition] = useState({
    startX: 0,
    endX: 0,
    startY: 0,
    endY: 0,
  });
  const [axis, setAxis] = useState({
    startX: 0,
    endX: 0,
    startY: 0,
    endY: 0,
  });
  useEffect(() => {
    const image = props.reference.current;
    const { left, top, width, height } = props.boundingClient;
    const addEventListeners = () => {
      image.addEventListener("mousedown", mCLick);
      image.addEventListener("mouseup", mUp);
    };

    const removeEventListeners = () => {
      image.removeEventListener("mousedown", mCLick);
      image.removeEventListener("mouseup", mUp);
    };

    const mMove = (e) => {
      // Original image dimensions
      const originalWidth = image.naturalWidth;
      const originalHeight = image.naturalHeight;
      const scaledWidth = image.width;
      const scaledHeight = image.height;

      const mouseX = e.clientX - image.offsetLeft;
      const mouseY = e.clientY - top;

      const originalX = Math.floor(mouseX * (originalWidth / scaledWidth));
      const originalY = Math.floor(mouseY * (originalHeight / scaledHeight));

      setPosition((prev) => {
        return { ...prev, endX: e.clientX, endY: e.clientY };
      });
      setAxis((prev) => {
        return { ...prev, endX: originalX, endY: originalY };
      });
    };

    const mCLick = (e) => {
      setAxis({
        startX: 0,
        endX: 0,
        startY: 0,
        endY: 0,
      });
      image.addEventListener("mousemove", mMove);

      const originalWidth = image.naturalWidth;
      const originalHeight = image.naturalHeight;
      const scaledWidth = image.width;
      const scaledHeight = image.height;

      const mouseX = e.clientX - image.offsetLeft;
      const mouseY = e.clientY - top;

      const originalX = Math.floor(mouseX * (originalWidth / scaledWidth));
      const originalY = Math.floor(mouseY * (originalHeight / scaledHeight));

      setPosition((prev) => {
        return { ...prev, startX: e.clientX, startY: e.clientY };
      });
      setAxis((prev) => {
        return { ...prev, startX: originalX, startY: originalY };
      });
    };

    const mUp = (e) => {
      const originalWidth = image.naturalWidth;
      const originalHeight = image.naturalHeight;
      const scaledWidth = image.width;
      const scaledHeight = image.height;

      const mouseX = e.clientX - image.offsetLeft;
      const mouseY = e.clientY - top;

      const originalX = Math.floor(mouseX * (originalWidth / scaledWidth));
      const originalY = Math.floor(mouseY * (originalHeight / scaledHeight));

      setPosition((prev) => {
        return { ...prev, endX: e.clientX, endY: e.clientY };
      });

      setAxis((prev) => {
        return { ...prev, endX: originalX, endY: originalY };
      });
      image.removeEventListener("mousemove", mMove);
    };

    image.style.maxWidth = "30%";

    addEventListeners();
    return () => removeEventListeners();
  }, []);

  useEffect(() => {
    if (props.cursorType != "none") {
      props.setCoords((prev) => ({
        ...prev,
        [props.cursorType]: axis,
      }));
    }
  }, [axis]);

  return (
    <div
      className={
        props.cursorType == "qr_coords"
          ? "qr-cursor"
          : props.cursorType == "name_coords"
          ? "cursor"
          : ""
      }
      style={
        props.cursorType == "qr_coords"
          ? {
              left: `${position.endX}px`,
              top: `${position.endY}px`,
            }
          : props.cursorType == "name_coords"
          ? {
              left: `${position.startX}px`,
              top: `${position.startY}px`,
              width: `${position.endX - position.startX}px`,
              height: `${position.endY - position.startY}px`,
            }
          : props.cursorType == "none"
          ? {
              display: "none",
            }
          : ""
      }
    ></div>
  );
};

export default Cursor;
