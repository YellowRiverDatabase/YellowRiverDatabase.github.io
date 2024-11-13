import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isNavMenuState } from "./globalState";

export function NavMenu() {
  const [isNavMenu, setIsNavMenu] = useRecoilState(isNavMenuState);
  const location = useLocation();

  const menuItemsArray = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About Us",
      path: "/about-us",
    },
    {
      name: "DB Build Instructions",
      path: "/how-to-build",
    },
    {
      name: "DB Description",
      path: "/db-description",
    },
    {
      name: "Database History",
      path: "/db-history",
    },
  ];

  const menuItems = menuItemsArray.filter(
    (item) => item.path !== location.pathname
  );
  const StyledMenu = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: lightgrey;
    background-color: #242424;
    z-index: 100;
    gap: 3em;
    top: 10.1%;
    right: 0;
    width: calc(250px - 1px);
    height: calc(90vh - 1px);
    padding: 50px 25px;

    @media (max-width: 500px) {
      width: calc(100vw - 1px);
      height: calc(90vh - 1px);
    }
  `;

  const menuItemsStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    height: "50%",
    gap: "10px",
  };

  return (
    <div className="menu-left">
      <nav style={menuItemsStyle}>
        {menuItems.map((item, i) => (
          <Link
            key={`${item.name}-${i}`}
            to={item.path}
            onClick={() => setIsNavMenu(false)}
          >
            {item.name}
          </Link>
        ))}
        <a
          href="https://github.com/orgs/YellowRiverDatabase/repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Data
        </a>
      </nav>
      <button onClick={() => setIsNavMenu(false)}>Close</button>
    </div>
  );
}
