import { GeoJsonLayer } from "@deck.gl/layers";
import { memo, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { StudyBorderState, visibilityState } from "../site/globalState";
import { useEffect } from "react";

export function StudyArea() {
  const [studyBorder, setStudyBorder] = useRecoilState(StudyBorderState);
  const visibility = useRecoilValue(visibilityState);
  useEffect(() => {
    if (Object.keys(studyBorder).length === 0) {
      // console.log("fetching");
      const fetchData = async () => {
        const res = await fetch(
          "https://raw.githubusercontent.com/YellowRiverDatabase/geodata/main/cultural_data/studyarea.geojson"
        );
        const data = await res.json();
        setStudyBorder(data);
      };
      fetchData();
    }
  }, []);
  const object = useMemo(() => {
    return new GeoJsonLayer({
      id: "study-border",
      data: studyBorder,
      pickable: false,
      visible: visibility["Study Area"],
      stroked: true,
      extruded: false,
      lineWidthMinPixels: 1,
      getFillColor: [39, 106, 245, 44],
      getLineWidth: 0,
    });
  }, [visibility, StudyBorderState, studyBorder]);

  return object;
}
