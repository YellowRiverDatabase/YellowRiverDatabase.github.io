import { useRecoilState } from "recoil";
import { BtnHamburger } from "./BtnHamburger";
import { NavMenu } from "./NavMenu";
import { isNavMenuState } from "./globalState";

export function Nav() {
  const [isNavMenu, setIsNavMenu] = useRecoilState(isNavMenuState);
  return (
    <>
      <BtnHamburger onClick={() => setIsNavMenu(!isNavMenu)} />
      {isNavMenu && <NavMenu />}
    </>
  );
}
