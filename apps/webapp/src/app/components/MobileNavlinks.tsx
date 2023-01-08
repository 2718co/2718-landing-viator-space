"use client";

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { navlinks } from "./config";
import Hamburger from "./Hamburger";
import TwitterLogo from "./logos/twitter";
import SeparatorStar from "./SeparatorStar";

const socialLinks = [
  {
    href: "",
    logo: <TwitterLogo />,
    name: "Twitter",
  },
  {
    href: "",
    logo: "D",
    name: "Discord",
  },
  {
    href: "",
    logo: "O",
    name: "Open Sea",
  },
];

const MobileNavlinks = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="flex h-full w-full items-center justify-end lg:hidden">
        <Hamburger
          open={menuOpen}
          onClick={() => {
            console.log("Open Mobile menu");
            setMenuOpen(!menuOpen);
          }}
        />
      </div>

      <Transition.Root show={menuOpen} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => {
            console.log("Closing Mobile Menu Dialog");
            setMenuOpen(false);
          }}
          className="relative top-32 z-50 lg:hidden"
        >
          <Transition.Child
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}
          >
            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 top-32 flex items-stretch justify-start bg-dark-background p-4">
              <Dialog.Panel className={"h-screen w-screen "}>
                <nav className="flex w-full flex-col items-center space-y-12">
                  {navlinks.map(({ path, label }, idx) => (
                    <span key={path + idx}>
                      {idx > 0 && <SeparatorStar key={`separator${idx}`} />}
                      <Link
                        key={path}
                        href={path}
                        className="rounded-2xl py-4 px-8 text-highlight hover:bg-hover-rectangle"
                      >
                        {label}
                      </Link>
                    </span>
                  ))}
                </nav>

                <div className="flex flex-row items-center justify-center space-x-4">
                  {socialLinks.map((social) => (
                    <Link key={social.name} href={social.href}>
                      {social.logo}
                    </Link>
                  ))}
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default MobileNavlinks;

{
  /* <div className="hidden lg:hidden">
<Disclosure>
  {({ open }) => (
    <>
      <Disclosure.Button className="">
        <Hamburger open={open} />
      </Disclosure.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Disclosure.Panel className={"relative"}>
          <nav className="absolute inset-0 top-16 flex w-screen flex-col space-y-12 bg-dark-background">
            {navlinks.map(({ path, label }, idx) => (
              <>
                {idx > 0 && <SeparatorStar key={`separator${idx}`} />}
                <Link
                  key={path}
                  href={path}
                  className="rounded-2xl py-4 px-8 text-highlight hover:bg-hover-rectangle"
                >
                  {label}
                </Link>
              </>
            ))}
          </nav>

          <div className="flex flex-row items-center justify-center space-x-4">
            {socialLinks.map((social) => (
              <Link key={social.name} href={social.href}>
                {social.logo}
              </Link>
            ))}
          </div>
        </Disclosure.Panel>
      </Transition>
    </>
  )}
</Disclosure>
</div> */
}
