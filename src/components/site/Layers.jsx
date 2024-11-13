import { useRecoilState } from "recoil";
import { BtnLayers } from "./BtnLayers";
import { isLayersMenuState } from "./globalState";
import { LayersMenu } from "./LayersMenu";

export function Layers() {
  const [isLayersMenu, setIsLayersMenu] = useRecoilState(isLayersMenuState);

  return (
    <>
      <BtnLayers onClick={() => setIsLayersMenu(!isLayersMenu)} />
      {/* {isLayersMenu && <LayersMenu />} */}
    </>
  );
}
