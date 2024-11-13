import { useState } from "react";
import { upstreamChoicesState } from "../site/globalState";
import { useRecoilState } from "recoil";

const location = {
  zIndex: 1,
  width: "125px",
  backgroundColor: "white",
  border: "1px solid black",
  alignSelf: "end",

  borderRadius: "5px",
};

const box = {
  display: "flex",
  flexDirection: "column",
  gap: "1em",
  alignItems: "center",
  backgroundColor: "white",
  border: "1px solid black",
  borderRadius: "10px",
  color: "black",
  padding: "10px",
  maxHeight: "60vh",
  zIndex: 2,
  overflow: "auto",
  width: "300px",
};

const titleLine = {
  width: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

const valuesBox = {
  display: "flex",
  flexDirection: "row",
  gap: "1em",
  // width: "100%",
  flexWrap: "wrap",
  margin: "0 10px",
  overflow: "auto",
};

const lineItem = {
  // width: "100%",
  display: "flex",
  width: "75px",
  flexDirection: "row",
  justifyContent: "center",
  gap: "1em",
  cursor: "pointer",
};

const CheckedBox = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="black"
    >
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q8 0 15 1.5t14 4.5l-74 74H200v560h560v-266l80-80v346q0 33-23.5 56.5T760-120H200Zm261-160L235-506l56-56 170 170 367-367 57 55-424 424Z" />
    </svg>
  );
};

const EmptyBox = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      stroke="black"
      fill="black"
      zIndex="2"
    >
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z" />
    </svg>
  );
};

export function UpStreamBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [snapShots, setSnapShots] = useRecoilState(upstreamChoicesState);

  const handleClick = (key) => {
    console.log("key", key);
    setSnapShots({ ...snapShots, [key]: !snapShots[key] });
  };

  if (isOpen) {
    return (
      <div style={box}>
        <div style={titleLine}>
          <div></div>
          <section>Upstream locations by Year</section>
          <button
            style={{ borderRadius: "5px", border: "solid black 1px" }}
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
        </div>
        <div style={valuesBox}>
          {Object.entries(snapShots).map(([key, value], i) => {
            return (
              <div
                style={lineItem}
                onClick={() => handleClick(key)}
                key={`${key}`}
              >
                {snapShots[key] ? <CheckedBox /> : <EmptyBox />}{" "}
                <section>{key}</section>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <button style={{ ...location }} onClick={() => setIsOpen(true)}>
      Upstream Places
    </button>
  );
}
