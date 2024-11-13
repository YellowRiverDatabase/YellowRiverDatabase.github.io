import { useRecoilState, useRecoilValue } from "recoil";
import { isSourceModalState, sourceModalInfoState } from "./globalState";
import { formatDate } from "../map/formatDate";
import { max, text } from "d3";
import { colorHash } from "../map/colorHash";

const spanStyle = {
  // make at the bottom of modal
  fontSize: "0.8em",
};

const modalBkg = {
  position: "absolute",
  top: "0",
  left: "0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  width: "100vw",
  height: "100vh",
  zIndex: "999",
};

const modal = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "azure",
  borderRadius: "10pt",
  padding: "20px",
  minWidth: "250px",
  minHeight: "250px",
  maxWidth: "33vw",
  border: "solid 1px black",
  color: "black",
};

const header = {
  position: "relative",
  display: "flex",
  textAlign: "center",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
};

const tableStyle = {
  border: "1px solid black",
  backgroundColor: "azure",
  borderRadius: "10px",
};

const trStyle = {
  borderBottom: "1px solid black",
};

export function ModalSources({ sources, onClose }) {
  const [isSourceModal, setIsSourceModal] = useRecoilState(isSourceModalState);
  const sourceInfo = useRecoilValue(sourceModalInfoState);

  // console.log("source info", sourceInfo);

  if (isSourceModal) {
    const colorArray = colorHash[Array.from(sourceInfo.en_type)[0]];
    return (
      <div style={modalBkg}>
        <div
          style={{
            ...modal,
            backgroundColor: `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 0.8`,
          }}
        >
          <div style={modal}>
            <div style={header}>
              <h2>
                {sourceInfo.place}
                <br />({formatDate(sourceInfo.en_date_start)})
              </h2>
              <button
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  cursor: "pointer",
                  border: "1px solid black",
                  padding: "5px",
                  borderRadius: "5px",
                  backgroundColor: "lightgray",
                }}
                onClick={() => setIsSourceModal(false)}
              >
                &times;
              </button>
              <table style={tableStyle}>
                <tbody>
                  <tr style={trStyle}>
                    <td style={{ textAlign: "start" }}>Category: </td>
                    <td>{Array.from(sourceInfo.en_cat).join(", ")}</td>
                  </tr>
                  <tr style={trStyle}>
                    <td style={{ textAlign: "start" }}>Type:</td>
                    <td>{Array.from(sourceInfo.en_type).join(", ")}</td>
                  </tr>
                  <tr style={trStyle}>
                    <td style={{ textAlign: "start" }}>Description:</td>
                    <td>{Array.from(sourceInfo.source).join(", ")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
