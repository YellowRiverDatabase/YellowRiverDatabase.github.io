import { useRecoilState, useRecoilValue } from "recoil";
import {
  dynastiesState,
  erasState,
  isLayersMenuState,
  limitToStudyAreaState,
  visibilityState,
} from "./globalState";
import { RadioBtn } from "./RadioBtn";

const filtersMenu = {
  zIndex: 1,
  color: "black",
  backgroundColor: "white",
  padding: "10px",
  border: "1px solid black",
  borderRadius: "5px",
  width: "150px",
  alignSelf: "end",
};

export function LayersMenu() {
  const [isLayersMenu, setIsLayersMenu] = useRecoilState(isLayersMenuState);
  const [visibility, setVisibility] = useRecoilState(visibilityState);
  const [limitToStudyArea, setLimitToStudyArea] = useRecoilState(
    limitToStudyAreaState,
  );

  return (
    <div style={filtersMenu}>
      <div>
        {Object.keys(visibility).map((key) => {
          function handleChange(e) {
            setVisibility({ ...visibility, [key]: e.target.checked });
          }
          return (
            <RadioBtn
              key={key}
              value={key}
              label={key}
              checked={visibility[key]}
              onChange={handleChange}
            />
          );
        })}
        <RadioBtn
          key="limit-to-study-area"
          label="Limit to Study Area"
          checked={limitToStudyArea}
          onChange={(e) => setLimitToStudyArea(e.target.checked)}
        />
      </div>
    </div>
  );
}