import { useEffect, useMemo } from "react";
import { eventsState, filteredEventsState } from "../site/globalState";
import { Marker } from "react-map-gl";
import { useRecoilState, useRecoilValue } from "recoil";
import { ColumnLayer, DeckGL, ScatterplotLayer } from "deck.gl";
import { colorHash } from "./colorHash";

export function Events() {
  const [events, setEvents] = useRecoilState(eventsState);
  const filtered = useRecoilValue(filteredEventsState);
  useEffect(() => {
    if (events.length === 0) {
      const fetchData = async () => {
        const res = await fetch(
          "https://raw.githubusercontent.com/YellowRiverDatabase/geodata/refs/heads/main/atlas_data/yrdb-places-and-events.json"
        );
        const data = await res.json();
        // // console.log(data);
        setEvents(data);
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    console.log(events);
  }, [events]);

  const setFillColor = (data1) => {
    const data = data1.flat().map((d) => Array.from(d.en_type)); // flatten the array and convert Set to Array
    const frequencyHash = {};
    data.forEach((d) =>
      d.forEach((cat) => (frequencyHash[cat] = (frequencyHash[cat] || 0) + 1))
    );
    const frequentKey = (obj) => {
      return Object.entries(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
    };
    const mostFrequent = frequentKey(frequencyHash);
    return colorHash[mostFrequent[0]];
  };

  const eventsObject = useMemo(() => {
    // const processedData = processData(filtered);
    return new ColumnLayer({
      id: "events-layers",
      extruded: true,
      data: filtered,
      pickable: true,
      opacity: 0.8,
      stroked: true,
      filled: true,
      radius: 9000,
      elevationScale: 1,
      lineWidthMinPixels: 500,
      getElevation: (d) => {
        // // console.log("from the events", d.events);
        return 300 * d.events.length;
      },
      getPosition: (d) => [d.Latitude, d.Longitude],
      getRadius: (d) => 1500,
      getFillColor: (d) => {
        return setFillColor(d.events);
        // return [100, 0, 0];
      },
      getLineColor: (d) => [100, 0, 0],
    });
  }, [filtered]);

  return eventsObject;
}
