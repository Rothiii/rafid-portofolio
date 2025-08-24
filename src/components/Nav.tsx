// Update Nav component to use the new DesktopNav
import DesktopNav from "./DesktopNav";

const Nav = () => {
  return (
    <nav className="hidden xl:flex">
      <DesktopNav />
    </nav>
  );
};

export default Nav;
