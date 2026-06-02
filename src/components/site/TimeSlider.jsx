import { Slider } from "@mui/base/Slider";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { sliderWidthState, yearsState } from "./globalState";
// import { LineChart } from "./LineChart";

export default function TimeSlider() {
  const [years, setYears] = useRecoilState(yearsState);
  const [width, setWidth] = useRecoilState(sliderWidthState);
  const [trackWidth, setTrackWidth] = useState(0);
  const sliderRef = useRef();

  const handleChange = (event, newValue) => {
    setYears(newValue);
  };

  const handleChangeCommitted = () => {};

  useEffect(() => {
    const track = document.querySelector(".MuiSlider-root.sliderMUI");
    const trackW = track.offsetWidth;
    // console.log(trackW);
    if (trackWidth !== trackW) {
      setTrackWidth(trackW);
    }
  });

  useEffect(() => {
    // const track = document.querySelector(".MuiSlider-rail");
    // const trackW = track.offsetWidth;
    // // console.log("sliderWidth", width);
    setWidth(trackWidth);
  }, [trackWidth]);

  return (
    <div className="sliderBox">
      <div className="box-wrapper">
        <div className="values-text">{years[0]}</div>
        <div className="slider-wrapper">
          <Slider
            className="sliderMUI"
            value={years}
            onChange={handleChange}
            onChangeCommitted={handleChangeCommitted}
            getAriaLabel={() => "Date Range"}
            min={-2070}
            max={1916}
          />
        </div>
        <div className="values-text">{years[1]}</div>
      </div>
    </div>
  );
}
