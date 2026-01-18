import DeckGL from "@deck.gl/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ChinaBorderState,
  groupedEventsState,
  isTableState,
  riverRoutesState,
  riversState,
  studyAreaState,
  tableDataState,
  tableHeaderState,
  viewState,
  visibilityState,
} from "../site/globalState";
import { Map } from "react-map-gl";
import { useEffect, useMemo } from "react";
import { RiversLayer } from "./RiversLayer";
import { Events } from "./Events";
import { formatDate } from "./formatDate";
import { StudyArea } from "./StudyArea";
import { max, min } from "d3-array";
import { MyTable } from "../site/Table";
import "mapbox-gl/dist/mapbox-gl.css";
import { UpStreamLayer } from "./UpStreamLayer";

function capitalizeWords(string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function BaseMap() {
  const [view, setView] = useRecoilState(viewState);
  const groupedEvents = useRecoilValue(groupedEventsState);
  const [tableData, setTableData] = useRecoilState(tableDataState);
  const [isTable, setIsTable] = useRecoilState(isTableState);
  const [tableHeader, setTableHeader] = useRecoilState(tableHeaderState);

  useEffect(() => {
    // console.log(groupedEvents);
  }, [groupedEvents]);
  // // console.log("mapbox access", import.meta.env.VITE_MAPBOX_ACCESS_TOKEN);

  // // console.log(studyarea);

  return (
    <>
      <DeckGL
        viewState={{ ...view }}
        style={{
          position: "relative",
          zIndex: 1,
        }}
        controller={true}
        map
        getCursor={(e) => {
          if (e.isDragging) {
            return "grabbing";
          }
          if (e.isHovering) {
            return "pointer";
          }
          if (!e.isDragging) {
            return "grab";
          }
        }}
        layers={[
          // Tiles(),
          // ChinaBorderLayer(visibility),
          Events(),
          RiversLayer(),
          StudyArea(),
          UpStreamLayer(),
        ]}
        onViewStateChange={(e) => {
          setView(e.viewState);
        }}
        onClick={(e) => {
          if (e.object && e.object.events) {
            setTableData(e.object.events);
            setTableHeader(
              `${capitalizeWords(e.object.ch_pinyin)} ${e.object.tr_title}`,
            );
            setIsTable(true);
          }
        }}
        getTooltip={({ object }) => {
          if (object && object.properties) {
            return (
              object.properties.yearstart + " - " + object.properties.yearend
            );
          }
          if (object && object.regime) {
            return `${object.hz} `;
          }
          if (object && !object.properties && object.events) {
            return `${object.ch_pinyin} (${object.tr_title}): ${
              object.events.length
            } events from ${formatDate(
              min(object.events.map((a) => a.en_date_start)),
            )} to ${formatDate(
              max(object.events.map((a) => a.en_date_start)),
            )}`;
          }
        }}
      >
        <Map
          reuseMaps
          mapStyle={"mapbox://styles/nkmwicz123/clsg5aqky03gr01pb30cmebxd"}
          preventStyleDiffing={true}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
      <MyTable />
    </>
  );
}
