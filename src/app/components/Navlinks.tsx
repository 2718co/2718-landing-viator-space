import DesktopNavlinks from "./DesktopNavlinks";
import MobileNavlinks from "./MobileNavlinks";

const Navlinks = (): JSX.Element => {
  return (
    <>
      <DesktopNavlinks />

      <div className="lg:hidden">
        <MobileNavlinks />
      </div>
    </>
  );
};

export default Navlinks;
