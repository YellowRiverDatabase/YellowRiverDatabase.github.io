import { Header } from "../../components/site/Header";

export function EssayTemplate({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      {/* <div
        style={{
          display: "flex",
          flexDirection: "column",

          maxHeight: "1250px",
          maxWidth: "1250px",
        }}
      > */}
      <Header />
      <div
        style={{
          margin: 0,
          display: "flex",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            maxWidth: "620px",
            height: "100%",
            // backgroundColor: "lightgrey",
            color: "black",
            padding: "2em",
          }}
        >
          {children}
        </div>
      </div>
    </div>
    // </div>
  );
}
