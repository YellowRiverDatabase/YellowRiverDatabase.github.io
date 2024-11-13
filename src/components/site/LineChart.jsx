import { useRecoilState, useRecoilValue } from "recoil";
import {
  groupedEventsState,
  sliderWidthState,
  upstreamChoicesState,
  yearsState,
} from "./globalState";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Checkbox } from "./Checkbox";

const lineChartBox = {
  // display: "flex",
  // flexDirection: "column",
  position: "absolute",
  bottom: "10px",
  left: 0,
  width: "100vw",
  height: "200px",
  zIndex: 5,
  // padding: "0 10px",
};

const radioBtns = {
  position: "absolute",
  bottom: "150px",
};

const svg = {
  position: "relative",
  margin: "40px auto 0 auto",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  height: "150px",
  // backgroundColor: "rgba(255, 255, 255, 0.6)",
};

const slider = {
  position: "relative",
  margin: "0 auto 0 auto",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
};

const sliderRight = {
  position: "relative",
  width: "5px",
  height: "100%",
  backgroundColor: "blue",
  border: "solid 1px black",
  zIndex: 999,
  cursor: "crosshair",
};
const sliderLeft = {
  position: "relative",
  width: "5px",
  height: "100%",
  backgroundColor: "blue",
  border: "solid 1px black",
};

const leftYears = {
  position: "absolute",
  bottom: 50,
  height: "25px",
  width: "75px",
  borderRadius: "10pt",
  border: "solid 1px black",
  textAlign: "center",
  color: "black",
  backgroundColor: "white",
};

const rightYears = {
  position: "absolute",
  bottom: 50,
  height: "25px",
  width: "75px",
  borderRadius: "10pt",
  border: "solid 1px black",
  textAlign: "center",
  color: "black",
  backgroundColor: "white",
};

export function LineChart() {
  const [snapShots, setSnapShots] = useRecoilState(upstreamChoicesState);
  const groupedEvents = useRecoilValue(groupedEventsState);
  const svgRef = useRef();
  const boxRef = useRef();
  const [divWidth, setDivWidth] = useRecoilState(sliderWidthState);
  const [svgWidth, setSvgWidth] = useState(500);
  const [isRightDragging, setIsRightDragging] = useState(false);
  const [isLeftDragging, setIsLeftDragging] = useState(false);
  const [years, setYears] = useRecoilState(yearsState);
  const [localYears, setLocalYears] = useState(years);

  const [rectRX, setRectRX] = useState(divWidth);
  const [rectLX, setRectLX] = useState(divWidth - divWidth);

  const rightXRef = useRef();
  const leftXRef = useRef();
  const svgBoxRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const svgSize = windowWidth * 0.8;
      setDivWidth(svgSize);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const margin = { top: 10, right: 30, bottom: 30, left: 30 };
  // const width = divWidth * 2.2;
  const width = divWidth;
  const height = 150 - margin.top - margin.bottom;

  const x = d3
    .scaleLinear()
    .domain(d3.extent(groupedEvents, (d) => d.date))
    .range([0, width]);

  const y = d3
    .scaleLinear()
    .domain(d3.extent(groupedEvents, (d) => d.events.length))
    .range([height, -height]);

  const linebuilder = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.events.length));

  const linepath = linebuilder(groupedEvents);

  const rightDate = Math.round(x.invert(rectRX + 5));
  const leftDate = Math.round(x.invert(rectLX - 5));

  useEffect(() => {
    setLocalYears([
      leftDate < -1700 ? -1700 : leftDate,
      rightDate > 1916 ? 1916 : rightDate,
    ]);
  }, [leftDate, rightDate]);

  useEffect(() => {
    if (isRightDragging === false) {
      rightDate < 1916 && setYears([years[0], localYears[1]]);
      rightDate > 1916 && setYears([years[0], 1916]);
    }
  }, [isRightDragging, rectRX]);

  useEffect(() => {
    if (isLeftDragging === false) {
      leftDate > -2070 && setYears([localYears[0], years[1]]);
      // console.log("rectLX", Math.round(x.invert(rectLX - 5)));
      leftDate < -2070 && setYears([-2070, years[1]]);
    }
  }, [isLeftDragging, rectLX]);

  const bisect = d3.bisector((d) => d.date).left;

  const handleRRectMove = (e, direction) => {
    const [mouseX] = d3.pointer(e);
    const dateValue = x.invert(mouseX);
    if (mouseX === 0 || mouseX === divWidth) {
      setIsLeftDragging(false);
      setIsRightDragging(false);
    }
    if (
      direction === "right" &&
      mouseX > 0 &&
      mouseX < divWidth &&
      mouseX > rectLX
    ) {
      setRectRX(mouseX + 5);
    }
    if (
      direction === "left" &&
      mouseX > 0 &&
      mouseX < divWidth &&
      mouseX < rectRX
    ) {
      setRectLX(mouseX - 5);
    }
  };
  const handleMouseUp = (e) => {
    setIsRightDragging(false);
    setIsLeftDragging(false);
  };

  const handleClick = (key) => {
    setSnapShots({ ...snapShots, [key]: !snapShots[key] });
  };

  const handleSvgClick = (e) => {
    const [mouseX] = d3.pointer(e);
    const closestRect = rectRX - mouseX < mouseX - rectLX ? "right" : "left";
    if (closestRect === "right") {
      mouseX + 5 < x(1916) ? setRectRX(mouseX + 5) : setRectRX(x(1916) - 5);
    } else {
      setRectLX(mouseX - 5);
    }
  };

  function spaceBoxes(key, i, snapShots, x) {
    const keys = Object.keys(snapShots);
    let currentX = x(key) - 15;

    // Check backward
    // if (i > 0) {
    //   const prevKey = keys[i - 1];
    //   const prevX = x(prevKey) - 15;
    //   if (currentX - prevX < 25) {
    //     currentX = prevX + 25; // Adjust to avoid overlap
    //   }
    // }

    // Check forward
    if (i < keys.length - 1) {
      const nextKey = keys[i + 1];
      const nextX = x(nextKey) - 15;
      if (nextX - currentX < 50) {
        currentX -= 25; // Adjust to avoid overlap, if possible
      }
    }

    return currentX;
  }

  const spaceBoxesEvenly = (key, i, snapShots, totalWidth) => {
    const numBoxes = Object.keys(snapShots).length;
    const spacing = totalWidth / numBoxes;
    return i * spacing + spacing / 2 - 10;
  };

  return (
    <div style={lineChartBox}>
      <div style={{ ...slider, width: divWidth + 20, marginBottom: "100px" }}>
        <div style={{ ...leftYears, left: -95 }}>{localYears[0]}</div>
        <div style={{ ...rightYears, right: -95 }}>{localYears[1]}</div>

        <svg
          style={{
            ...svg,
            width: divWidth + 20,
            height: "100%",
            cursor: isLeftDragging || isRightDragging ? "ew-resize" : "default",
            border: "solid 1px black",
          }}
          onClick={(e) => handleSvgClick(e)}
          ref={svgBoxRef}
          onMouseUp={(e) => handleMouseUp(e)}
          onMouseMove={(e) => {
            if (isRightDragging) {
              handleRRectMove(e, "right");
            }
            if (isLeftDragging) {
              handleRRectMove(e, "left");
            }
          }}
        >
          <path
            fill={"none"}
            stroke="steelblue"
            style={{ marginLeft: margin.left }}
            d={linepath}
            strokeWidth={1.25}
            width={divWidth - 20}
          />
          <rect
            id="fillColor"
            x={rectLX}
            y={0}
            width={rectRX - rectLX}
            height={height + 50}
            fill="rgba(0,0,0,0.2)" // Slightly darker than the background color
          />
          <g
            id="RigthRect"
            ref={rightXRef}
            style={{ cursor: "ew-resize" }}
            onMouseDown={() => setIsRightDragging(true)}
          >
            <rect
              x={rectRX - 2.5}
              y={0}
              width={5}
              height={height + 50}
              fill="steelblue"
              stroke="black"
            />
            <rect
              x={rectRX - 7}
              y={65}
              width={15}
              height={25}
              fill="steelblue"
              stroke="black"
              style={{ cursor: "ew-resize" }}
              pointerEvents="all"
            />
          </g>
          <g
            id="LeftRect"
            ref={leftXRef}
            onMouseDown={() => setIsLeftDragging(true)}
            cursor={"ew-resize"}
            pointerEvents="all"
          >
            <rect
              x={rectLX}
              y={0}
              width={5}
              height={height + 50}
              fill="steelblue"
              stroke="black"
            />
            <rect
              x={rectLX - 5}
              y={65}
              width={15}
              height={25}
              fill="steelblue"
              stroke="black"
              style={{ cursor: "ew-resize" }}
              pointerEvents="all"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
