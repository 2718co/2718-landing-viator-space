import Link from "next/link";
import { navlinks } from "./config";
import MobileNavlinks from "./MobileNavlinks";

const Navlinks = (): JSX.Element => {
  return (
    <>
      <nav className="hidden flex-1 flex-row justify-start lg:flex">
        {navlinks.map(({ path, label }) => (
          <Link
            key={label}
            href={path}
            className="rounded-2xl py-4 px-8 font-mono text-highlight hover:bg-hover-rectangle"
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="lg:hidden">
        <MobileNavlinks />
      </div>
    </>
  );
};

export default Navlinks;
