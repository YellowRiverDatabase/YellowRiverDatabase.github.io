import { useState } from "react";
import { rgbHash } from "./colorHash";

const legendBox = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid black",
  borderRadius: "5px",
  zIndex: 999,
  color: "black",
  backgroundColor: "white",
  padding: "5px",
  maxHeight: "400px",
  overflow: "auto",
  gap: "2px",
  pointerEvents: "auto",
  overflowX: "hidden",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export function LegendMap() {
  const colors = rgbHash;
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <div style={{ ...legendBox, padding: "15px" }}>
        <div style={divStyle}>
          <p>Category Colors</p>
          <button
            style={{
              backgroundColor: "lightgrey",
              color: "black",
              padding: "5px",
              width: "25px",
              height: "25px",
            }}
            className="rounded border-dark"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            &times;
          </button>
        </div>
        <hr style={{ width: "100%" }} />
        {Object.entries(colors).map(([key, value]) => {
          return (
            <div
              styles={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <section
                style={{
                  padding: "0",
                  margin: "0",
                  display: "flex",
                  gap: "15px",
                }}
              >
                <svg height={20} width={20}>
                  <circle
                    cx={10}
                    cy={10}
                    r={9}
                    fill={value}
                    strokeWidth={1}
                    stroke={"black"}
                  />
                </svg>{" "}
                {key}
              </section>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <button
      style={{ ...legendBox, height: "50px" }}
      onClick={() => {
        setIsOpen(true);
      }}
    >
      Legend
    </button>
  );
}
