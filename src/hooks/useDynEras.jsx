import { useRecoilState } from "recoil";
import { dynastiesState, erasState } from "../components/site/globalState";
import { useEffect } from "react";

export function useDynEras() {
  const [dynasties, setDynasties] = useRecoilState(dynastiesState);
  const [eras, setEras] = useRecoilState(erasState);
  useEffect(() => {
    const fetchDynEras = async () => {
      if (Object.keys(dynasties).length === 0) {
        const resDynasties = await fetch(
          "https://raw.githubusercontent.com/YellowRiverDatabase/geodata/main/relational-datadata/dynasties.geojson?token=GHSAT0AAAAAACGFEEKKSQU7WGR7IYU5S26UZGVEODA"
        );
        const dynasties = await resDynasties.json();
        const dynObj = {};
        if (dynasties.features) {
          dynasties.features.forEach((dyn) => {
            dynObj[dyn.properties.name_en] = [
              dyn.properties.start_date,
              dyn.properties.end_date,
            ];
          });
        }
        setDynasties(dynObj);
      }
      if (Object.keys(eras).length === 0) {
        const resEras = await fetch(
          "https://raw.githubusercontent.com/YellowRiverDatabase/geodata/main/relational-datadata/eras.geojson?token=GHSAT0AAAAAACGFEEKKQGFQ6VWXB3LUMO7CZGVESPQ"
        );
        const eras = await resEras.json();
        const erasObj = {};
        if (dynasties.features) {
          eras.features.forEach((era) => {
            erasObj[era.properties.name_en] = [
              era.properties.start_date,
              era.properties.end_date,
            ];
          });
        }
        setEras(erasObj);
      }
    };
    fetchDynEras();
  }, []);

  return null;
}
