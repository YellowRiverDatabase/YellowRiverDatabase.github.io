import { useRecoilState, useRecoilValue } from "recoil";
import { isEntryModalState } from "./globalState";
// import { Nav } from "./Nav";
import { Layers } from "./Layers";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export function Header() {
  const [isEntryModal, setIsEntryModal] = useRecoilState(isEntryModalState);
  const [show, setShow] = useState(false);
  const styledWrapperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "10%",
    minHeight: "50px",
    width: "100%",
    backgroundColor: "#242424",
    borderBottom: "1px solid grey",
    zIndex: 3,
  };

  const pathname = useLocation().pathname;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const menuItemsArray = [
    {
      name: "Web Atlas",
      path: "/",
    },
    {
      name: "Contributors",
      path: "/about-us",
    },
    {
      name: "Database Build Instructions",
      path: "/how-to-build",
    },
    {
      name: "Database Description",
      path: "/db-description",
    },
    {
      name: "Database History",
      path: "/db-history",
    },
    {
      name: "Data on GitHub",
      path: "https://github.com/YellowRiverDatabase/geodata/tree/main/relational-datadata",
      newTab: true,
    },
  ];

  return (
    <>
      {[false].map((expand) => (
        <div>
          <Navbar
            style={{ pointerEvents: "auto", width: "100%" }}
            key={expand}
            expand={expand}
            className="bg-body-tertiary"
          >
            <Container fluid>
              <Navbar.Brand href="#">
                The Tracks of Yu Database
                <br /> A Web Atlas{" "}
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
                onClick={handleShow}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                show={show}
                onHide={handleClose}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Project Information
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    {menuItemsArray.map((item, i) => {
                      if (item.path === pathname) {
                        return null;
                      }
                      return (
                        <Nav.Link
                          key={`${item.name}-${i}`}
                          href={item.path}
                          target={item.newTab ? "_blank" : "_self"}
                        >
                          {item.name}
                        </Nav.Link>
                      );
                    })}
                    {pathname === "/" ? (
                      <Nav.Link
                        href="#"
                        onClick={() => {
                          setIsEntryModal(true);
                          handleClose();
                        }}
                      >
                        Open Intro Modal
                      </Nav.Link>
                    ) : null}
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </div>
      ))}
    </>
  );
}
