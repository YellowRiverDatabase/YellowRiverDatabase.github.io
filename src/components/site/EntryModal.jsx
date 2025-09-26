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
                Welcome to the Tracks of Yu Digital Atlas
              </h2>
              <p style={blackPStyle}>
                This is a web atlas to accompany{" "}
                <a
                  href="https://www.amazon.com/Yellow-River-Natural-Unnatural-Agrarian/dp/0300238339/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i>The Yellow River: A Natural and Unnatural History</i>
                </a>{" "}
                by Ruth Mostern. The data presented here is provided in
                collaboration with Sharon Zhang, Ryan Horne, and Nathan
                Michalewicz. The data is available at{" "}
                <a
                  href="https://github.com/YellowRiverDatabase/geodata/tree/main/relational-datadata"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub.
                </a>
              </p>
              <p>
                The data presented here represents historical events associated
                the the Yellow River in China, including flood events, river
                course changes, and the construction of water control projects.
                The data is drawn from a variety of historical sources, and is
                presented here for further exploration and analysis. Each
                colored column on the map represents a location of events, and
                the height of the column represents the number of events that
                occurred at that location. Columns are colored based on the
                predominant type of event that occurred at that location.
                Reference the legend for more information here. Each column can
                be clicked to reveal more information about the events that
                occurred at that location. Events and locations can be filtered
                using the filters menu in the top right corner and the time
                slider at the bottom of the screen. In addition, the route of
                the Yellow River as it existed at different periods of time can
                be toggled on and off using in the top right corner. This
                feature will show all river paths that existed during the period
                of time seleted in the time slider.
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
