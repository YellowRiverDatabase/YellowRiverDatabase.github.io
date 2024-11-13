import { GeoJsonLayer } from "@deck.gl/layers";
import oceans from "../../mymaps/oceans.json";
import { memo, useMemo } from "react";

export function OceansLayer(visibility) {
  const oceansObject = useMemo(() => {
    return new GeoJsonLayer({
      id: "oceans",
      data: oceans,
      pickable: true,
      visible: visibility,
      stroked: false,
      extruded: false,
      lineWidthMinPixels: 1,
      getFillColor: [39, 106, 245, 44],
      getLineWidth: 0,
    });
  }, [visibility]);

  return oceansObject;
}
