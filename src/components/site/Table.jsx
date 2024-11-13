import { useRecoilState, useRecoilValue } from "recoil";
import {
  isSourceModalState,
  isTableState,
  sourceModalInfoState,
  tableDataState,
  tableHeaderState,
} from "./globalState";
import { useMemo } from "react";
import { formatDate } from "../map/formatDate";

// const tableStyle = {
//   display: "flex",
//   flexDirection: "column",
//   position: "absolute",
//   top: "11%",
//   left: "5px",
//   backgroundColor: "white",
//   color: "black",
//   justifyContent: "center",
//   alignItems: "center",
//   maxHeight: "65vh",
//   // width: "20%",
//   overflow: "scroll",
//   padding: "1em",
//   border: "1px solid black",
//   borderRadius: "10px",
//   // paddingTop: "200px",
// };

const tableStyle = {
  // display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "11%",
  left: "5px",
  backgroundColor: "white",
  color: "black",
  justifyContent: "center",
  alignItems: "center",
  maxHeight: "65vh",
  padding: "2em",
  border: "1px solid black",
  borderRadius: "10px",
  overflow: "auto",
  zIndex: 999,
};

const tableBodyStyle = {
  maxHeight: "60%",
  overflow: "auto",
  position: "relative",
};

const headerStyle = {
  display: "flex",
  justifyContent: "center",
  color: "black",
  alignItems: "center",
  height: "3em",
};

const dataStyle = {
  cursor: "pointer",
  border: "1px solid black",
  padding: "0.5em",
};

const closeButtonStyle = {
  position: "absolute",
  right: "10px",
  top: "10px",
  cursor: "pointer",
  border: "1px solid black",
  padding: "5px",
  borderRadius: "5px",
  backgroundColor: "lightgray",
};

export function MyTable() {
  const [isTable, setIsTable] = useRecoilState(isTableState);
  const tableData = useRecoilValue(tableDataState);
  const tableHeader = useRecoilValue(tableHeaderState);
  const [sourceInfo, setSourceInfo] = useRecoilState(sourceModalInfoState);
  const [isSourceModal, setIsSourceModal] = useRecoilState(isSourceModalState);

  const sortedTableData = useMemo(() => {
    return [...tableData].sort((a, b) => +a.en_date_start - +b.en_date_start);
  }, [tableData]);

  if (!isTable) {
    return null;
  }

  return (
    <>
      <div style={tableStyle}>
        <div style={headerStyle}>
          <h1>{tableHeader}</h1>
          <div style={closeButtonStyle} onClick={() => setIsTable(false)}>
            &times;
          </div>
        </div>
        <table style={tableBodyStyle}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Event</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {sortedTableData.map((r, i) => {
              const row = r[0];
              return (
                <tr
                  key={`table-row-${i}`}
                  onClick={() => {
                    setSourceInfo({ place: tableHeader, ...row });
                    setIsSourceModal(true);
                  }}
                >
                  <td style={dataStyle}>{formatDate(row.en_date_start)}</td>
                  <td style={dataStyle}>{row.en_cat}</td>
                  <td style={dataStyle}>{row.en_type}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      )
    </>
  );
}
