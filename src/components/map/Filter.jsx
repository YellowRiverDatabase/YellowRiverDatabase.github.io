import { useRecoilState } from "recoil";
import { typesState } from "../site/globalState";
import React, { useEffect } from "react";
import { rgbHash } from "./colorHash";
import { rgb } from "d3";

const filterStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1em",
  alignItems: "center",
  maxHeight: "80vh",
  top: "12%",
  right: "10px",
  zIndex: 2,
  backgroundColor: "white",
  padding: "10px",
  paddingBottom: "25px",
  color: "black",
  border: "1px solid black",
  borderRadius: "10px",
};
const typesStyle = {
  display: "flex",
  flexDirection: "row",
  gap: "1em",
  alignItems: "space-between",
  width: "100%",
  overflow: "auto",
};

const hr = {
  width: "50%",
};

const toggleStyle = {
  backgroundColor: "lightgrey",
  color: "black",
  border: "solid black 1px",
  fontSize: "1.1em",
  padding: "10px",
  borderRadius: "5px",
};

const categoriesBox = {
  display: "flex",
  flexDirection: "row",
  gap: "1em",
  width: "100%",
  // alignItems: "center",
  justifyContent: "space-around",
};

const filterBox = {
  display: "flex",
  flexDirection: "column",
};

const color = {
  backgroundColor: "blue",
  color: "white",
};

const filterHeaderBtn = {
  alignSelf: "flex-end",
};

const buttonStyle = {
  backgroundColor: "white",
  color: "black",
  border: "solid black 1px",
  padding: "5px",
  borderRadius: "5px",
};

const closeBtn = {
  height: "25px",
  width: "25px",
  justifySelf: "end",
  position: "absolute",
  right: "0px",
  top: "0px",
};

const filterBtnBox = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  justifyContent: "start",
  // alignItems: "center",
};

const largerBtn = {
  padding: "10px",
  fontSize: "1.5em",
};

export function Filter() {
  const categories = ["Disasters", "Management"];
  const filterRef = React.useRef();

  const [isFilter, setIsFilter] = React.useState(false);

  const disasterTypes = [
    ["Flood", "溢"],
    ["Breach", "決"],
    ["Drought", "旱"],
    ["Intentional Breach", "毀"],
    ["Risky situation", "險"],
    ["Omen", "兆"],
    ["Course change", "徙"],
  ];

  const managementTypes = [
    ["Proposals and Discussion", "議"],
    ["Settlement Relocation", "遷"],
    ["Dam/Sluice Opening", "放"],
    ["Dredging", "疏"],
    ["Using water for a purpose", "助"],
    ["Repair of Structures", "修"],
    ["Emergency Repair", "救"],
    ["New Construction", "建"],
    ["Fieldtrip/survey", "探"],
  ];

  const filterWidth = filterRef?.current?.offsetWidth;

  const [cats, setCats] = useRecoilState(typesState);

  const openfilter = () => {
    setIsFilter(!isFilter);
  };

  const [disastersState, setDisastersState] = React.useState(false);
  const [managementState, setManagementState] = React.useState(false);

  useEffect(() => {
    if (managementState === true) {
      setCats({
        ...cats,
        "Proposals and Discussion": true,
        "Settlement Relocation": true,
        "Movement of refugeess": true,
        "Dam/Sluice Opening": true,
        Dredging: true,
        "Using water for a purpose": true,
        "Repair of Structures": true,
        "Emergency Repair": true,
        "New Construction": true,
        "Fieldtrip/survey": true,
      });
      return;
    }

    if (managementState === false) {
      setCats({
        ...cats,
        "Proposals and Discussion": false,
        "Settlement Relocation": false,
        "Movement of refugeess": false,
        "Dam/Sluice Opening": false,
        Dredging: false,
        "Using water for a purpose": false,
        "Repair of Structures": false,
        "Emergency Repair": false,
        "New Construction": false,
        "Fieldtrip/survey": false,
      });
      return;
    }
  }, [managementState]);

  useEffect(() => {
    if (disastersState === true) {
      setCats({
        ...cats,
        Flood: true,
        Drought: true,
        Breach: true,
        "Intentional Breach": true,
        "Risky situation": true,
        Omen: true,
        "Course change": true,
        Extinction: true,
        Blockage: true,
      });
      return;
    }
    if (disastersState === false) {
      setCats({
        ...cats,
        Flood: false,
        Drought: false,
        Breach: false,
        "Intentional Breach": false,
        "Risky situation": false,
        Omen: false,
        "Course change": false,
        Extinction: false,
        Blockage: false,
      });
      return;
    }
  }, [disastersState]);

  const setDisasters = () => {
    setDisastersState(!disastersState);
  };

  const setManagement = () => {
    setManagementState(!managementState);
  };

  if (isFilter)
    return (
      <>
        <div style={filterStyle} ref={filterRef}>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <h3 style={{ flex: 1, textAlign: "center" }}>Filter Types</h3>
            <button
              style={closeBtn}
              className="rounded border-dark"
              onClick={openfilter}
            >
              <strong>&times;</strong>
            </button>
          </div>
          <div style={categoriesBox}>
            <button
              type="button"
              id="disasters"
              onClick={setDisasters}
              style={
                disastersState
                  ? { ...toggleStyle, ...color }
                  : { ...toggleStyle }
              }
            >
              Disasters 水災
            </button>
            <button
              type="button"
              onClick={setManagement}
              style={
                managementState
                  ? { ...toggleStyle, ...color }
                  : { ...toggleStyle }
              }
            >
              Management 水利
            </button>
          </div>
          <hr style={hr} />
          <div style={typesStyle}>
            <div style={filterBtnBox}>
              {disasterTypes.map((type, i) => {
                console.log(type.join(" "));
                return (
                  <button
                    type="button"
                    id={type}
                    style={
                      cats[type[0]]
                        ? { backgroundColor: rgbHash[type.join(" ")] }
                        : null
                    }
                    className="border-dark rounded"
                    value={type[0]}
                    key={`type-${i}`}
                    onClick={() => {
                      setCats({ ...cats, [type[0]]: !cats[type[0]] });
                    }}
                  >
                    {type[0]} {type[1]}
                  </button>
                );
              })}
            </div>
            <div style={filterBtnBox}>
              {managementTypes.map((type, i) => (
                <button
                  type="button"
                  id={type[0]}
                  style={
                    cats[type[0]]
                      ? { backgroundColor: rgbHash[type.join(" ")] }
                      : null
                  }
                  className="border-dark rounded"
                  value={type}
                  key={`type-${i}`}
                  onClick={() => {
                    setCats({ ...cats, [type[0]]: !cats[type[0]] });
                  }}
                >
                  {type[0]} {type[1]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </>
    );

  return (
    // <div style={filterStyle} ref={filterRef}>
    <div style={filterHeaderBtn}>
      <button style={buttonStyle} onClick={openfilter}>
        Filters
      </button>
    </div>
    // </div>
  );
}
