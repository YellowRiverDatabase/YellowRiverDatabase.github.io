import { Slider } from "@mui/base";
import { BaseMap } from "../components/map/BaseMap";
import { EntryModal } from "../components/site/EntryModal";
import { Header } from "../components/site/Header";
import { Main } from "../components/site/Main";
import TimeSlider from "../components/site/TimeSlider";
import { LineChart } from "../components/site/LineChart";
import { useRef } from "react";
import { ModalSources } from "../components/site/ModalSources";
import { LegendMap } from "../components/map/LegendMap";
import { MapPeripheralComponents } from "../components/site/MapPeripheralComponents";
export function Home() {
  // const sliderRef = useRef();
  return (
    <>
      <MapPeripheralComponents />
      <Main>
        <BaseMap />
        <EntryModal />
      </Main>
      <LineChart />
      <ModalSources />
    </>
  );
}
