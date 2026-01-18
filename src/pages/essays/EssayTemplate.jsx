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
      <Header />
      <div
        style={{
          margin: 0,
          display: "flex",
          justifyContent: "center",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            maxWidth: "800px",
            width: "100%",
            height: "100%",
            // backgroundColor: "lightgrey",
            color: "black",
            padding: "2em",
            lineHeight: "1.6",
          }}
        >
          <div
            style={{
              width: "100%",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
