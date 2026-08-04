import { GeoJsonLayer } from "@deck.gl/layers";
import { memo, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { LoessBorderState, visibilityState } from "../site/globalState";
import { useEffect } from "react";
import loessData from "../../mymaps/loess.json";

export function LoessArea() {
  const [loessBorder, setLoessBorder] = useRecoilState(LoessBorderState);
  const visibility = useRecoilValue(visibilityState);
  useEffect(() => {
    if (Object.keys(loessBorder).length === 0) {
      setLoessBorder(loessData);
    }
  }, []);
  const object = useMemo(() => {
    return new GeoJsonLayer({
      id: "loess-border",
      data: loessBorder,
      pickable: false,
      visible: visibility["Loess Study Area"],
      stroked: true,
      extruded: false,
      lineWidthMinPixels: 1,
      getFillColor: [245, 149, 39, 44],
      getLineWidth: 0,
    });
  }, [visibility, LoessBorderState, loessBorder]);

  return object;
}
