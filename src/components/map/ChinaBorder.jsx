import { GeoJsonLayer } from "@deck.gl/layers";
import { memo, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ChinaBorderState, visibilityState } from "../site/globalState";
import { useEffect } from "react";

export function ChinaBorderLayer() {
  const [chinaBorder, setChinaBorder] = useRecoilState(ChinaBorderState);
  const visibility = useRecoilValue(visibilityState);
  useEffect(() => {
    if (Object.keys(chinaBorder).length === 0) {
      // console.log("fetching");
      const fetchData = async () => {
        const res = await fetch(
          "https://raw.githubusercontent.com/YellowRiverDatabase/geodata/main/cultural_data/china-borders.geojson"
        );
        const data = await res.json();
        setChinaBorder(data);
      };
      fetchData();
    }
  }, []);
  const oceansObject = useMemo(() => {
    return new GeoJsonLayer({
      id: "china-border",
      data: chinaBorder,
      pickable: false,
      visible: visibility["China Borders"],
      stroked: true,
      extruded: false,
      lineWidthMinPixels: 1,
      getFillColor: [39, 106, 245, 44],
      getLineWidth: 0,
    });
  }, [visibility, ChinaBorderState, chinaBorder]);

  return oceansObject;
}
