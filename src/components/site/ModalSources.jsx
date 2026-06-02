import { useRecoilState, useRecoilValue } from "recoil";
import { isSourceModalState, sourceModalInfoState } from "./globalState";
import { formatDate } from "../map/formatDate";
import { colorHash } from "../map/colorHash";

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
  maxHeight: "80vh",
  maxWidth: "33vw",
  border: "solid 1px black",
  color: "black",
  overflow: "auto",
  position: "relative",
};

const header = {
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
  width: "100%",
  borderCollapse: "collapse",
};

const tableRowStyle = {
  borderBottom: "1px solid black",
};

const thStyle = {
  textAlign: "left",
  padding: "0.5em 0.75em",
  borderBottom: "2px solid black",
};

const tdStyle = {
  textAlign: "left",
  padding: "0.5em 0.75em",
};

export function ModalSources({ sources, onClose }) {
  const [isSourceModal, setIsSourceModal] = useRecoilState(isSourceModalState);
  const sourceInfo = useRecoilValue(sourceModalInfoState);

  // console.log("source info", sourceInfo);

  if (isSourceModal) {
    const isUpstream = sourceInfo?.date !== undefined && sourceInfo?.regime;
    const colorArray = isUpstream
      ? [180, 200, 255]
      : colorHash[Array.from(sourceInfo.en_type || ["unknown"])[0]];
    return (
      <div style={modalBkg}>
        <div
          style={{
            ...modal,
            backgroundColor: `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, 0.8)`,
          }}
        >
          <div style={header}>
            <h2>
              {isUpstream
                ? `${sourceInfo.py} ${sourceInfo.hz}`
                : sourceInfo.place}
            </h2>
            {!isUpstream && (
              <span style={{ fontSize: "0.9em", color: "gray" }}>
                {Array.from(new Set(sourceInfo.en_cat || [])).join(", ")}
              </span>
            )}
          </div>
          <button
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
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
                <thead>
                  <tr style={tableRowStyle}>
                    <th style={thStyle}>Field</th>
                    <th style={thStyle}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {isUpstream ? (
                    <>
                      <tr style={tableRowStyle}>
                        <td style={tdStyle}>Establishment Date</td>
                        <td style={tdStyle}>{formatDate(sourceInfo.date)}</td>
                      </tr>
                      <tr style={tableRowStyle}>
                        <td style={tdStyle}>Regime</td>
                        <td style={tdStyle}>{sourceInfo.regime}</td>
                      </tr>
                      {sourceInfo.name_type || sourceInfo.name_type_en ? (
                        <tr style={tableRowStyle}>
                          <td style={tdStyle}>Type</td>
                          <td style={tdStyle}>
                            {sourceInfo.name_type}
                            {sourceInfo.name_type && sourceInfo.name_type_en
                              ? ` (${sourceInfo.name_type_en})`
                              : sourceInfo.name_type_en}
                          </td>
                        </tr>
                      ) : null}
                      {sourceInfo.name_class_en ? (
                        <tr style={tableRowStyle}>
                          <td style={tdStyle}>Class</td>
                          <td style={tdStyle}>{sourceInfo.name_class_en}</td>
                        </tr>
                      ) : null}
                    </>
                  ) : (
                    <>
                      <tr style={tableRowStyle}>
                        <td style={tdStyle}>Category</td>
                        <td style={tdStyle}>
                          {Array.from(new Set(sourceInfo.en_cat)).join(", ")}
                        </td>
                      </tr>
                      <tr style={tableRowStyle}>
                        <td style={tdStyle}>Type</td>
                        <td style={tdStyle}>
                          {Array.from(new Set(sourceInfo.en_type)).join(", ")}
                        </td>
                      </tr>
                      {sourceInfo.source?.length > 0 &&
                        sourceInfo.source.map((s, i) => (
                          <tr style={tableRowStyle} key={`${s}-${i}`}>
                            <td style={tdStyle}>
                              Source{sourceInfo.source.length > 1 ? i + 1 : ""}
                            </td>
                            <td style={tdStyle}>
                              {s}{" "}
                              {sourceInfo.src_page[i]
                                ? "pg. " + sourceInfo.src_page[i]
                                : ""}
                            </td>
                          </tr>
                        ))}
                      {sourceInfo.description?.length > 0 &&
                        sourceInfo.description.map((d, i) => (
                          <tr style={tableRowStyle} key={`${d}-${i}`}>
                            <td style={tdStyle}>
                              {sourceInfo.source[i]} Description
                            </td>
                            <td style={tdStyle}>{d}</td>
                          </tr>
                        ))}
                    </>
                  )}
                </tbody>
              </table>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
