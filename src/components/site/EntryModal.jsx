import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { isEntryModalState } from "./globalState";
import "../../App.css";
import { useEffect, useState } from "react";
import { useRef } from "react";

export function EntryModal() {
  const [isEntryModal, setIsEntryModal] = useRecoilState(isEntryModalState);
  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const modalRef = useRef();

  const closeModal = () => {
    setIsEntryModal(false);
  };

  const ModalWrapper = {
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    zIndex: "100",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    border: "1px solid grey",
    borderRadius: "10px",
    padding: "10px",
    zIndex: 200,
  };

  const mobileStyle = {
    width: "100%",
    height: "100%",
    border: "none",
    zIndex: 999,
    justifyContent: "space-between",
  };

  const desktopStyle = {
    width: "500px",
  };

  const titleStyle = {
    textAlign: "center",
    color: "black",
    margin: "0 20px",
  };

  const sectionStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    width: "100%",
    marginBottom: "20px",
  };

  const modalButtonStyle = {
    width: "20%",
    minWidth: "75px",
    borderRadius: "5px",
  };

  const blackPStyle = {
    color: "black",
    margin: "20px",
  };

  return (
    <>
      {isEntryModal ? (
        <div style={ModalWrapper}>
          <div
            style={{
              ...containerStyle,
              ...(window.innerWidth <= 500 ? mobileStyle : desktopStyle),
            }}
          >
            <section style={sectionStyle}>
              <h2 style={titleStyle}>
                Welcome to the Web Atlas
                <br />
                for the Yellow River Database
              </h2>
              <p style={blackPStyle}>
                There will be more content here as we write a simple
                description.
              </p>
            </section>
            <button style={modalButtonStyle} className="" onClick={closeModal}>
              {windowWidth > 500 ? "Close" : "Go to Web Atlas"}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
