import styled from "styled-components";
export function Main({ children }) {
  const MainDiv = {
    height: "100vh",
    width: "100vw",
    margin: 0,
    padding: 0,
    zIndex: 1,
  };
  return <div style={MainDiv}>{children}</div>;
}
