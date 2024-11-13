import { Header } from "./Header";
import { Filter } from "../map/Filter";
import { UpStreamBtn } from "../map/UpStreamBtn";
import { LayersMenu } from "./LayersMenu";
import { LegendMap } from "../map/LegendMap";

export function MapPeripheralComponents() {
  return (
    <div
      style={{
        position: "absolute",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          pointerEvents: "none",
          margin: "1em",
        }}
      >
        <LegendMap />
        <div
          style={{
            zIndex: 3,
            pointerEvents: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            margin: "0",
          }}
        >
          <Filter />
          <UpStreamBtn />
          <LayersMenu />
        </div>
      </div>
    </div>
  );
}
