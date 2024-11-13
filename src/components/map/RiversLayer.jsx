import { GeoJsonLayer } from "@deck.gl/layers";
import { memo, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ChinaBorderState,
  riverRoutesState,
  riversState,
  visibilityState,
} from "../site/globalState";
import { useEffect } from "react";

export function RiversLayer() {
  const [rivers, setrivers] = useRecoilState(riversState);
  const riverRoutes = useRecoilValue(riverRoutesState);
  const visibility = useRecoilValue(visibilityState);
  useEffect(() => {
    if (Object.keys(rivers).length === 0) {
      // console.log("fetching");
      const fetchData = async () => {
        const res = await fetch(
          "https://raw.githubusercontent.com/YellowRiverDatabase/geodata/main/physical_data/yellow-river-course-changes.geojson"
        );
        const data = await res.json();
        setrivers(data.features);
      };
      fetchData();
    }
  }, []);
  const oceansObject = useMemo(() => {
    return new GeoJsonLayer({
      id: "river-routes",
      data: riverRoutes,
      pickable: true,
      visible: visibility["Rivers"],
      stroked: true,
      extruded: false,
      lineWidthMinPixels: 5,
      getLineColor: [0, 0, 245, 66],
      getLineWidth: 5,
    });
  }, [visibility, riverRoutes]);

  return oceansObject;
}
