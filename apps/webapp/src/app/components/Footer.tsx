import Link from "next/link";

const linksConfiguration = [
  {
    href: "/terms",
    label: "Terms & Conditions",
  },
  {
    href: "#",
    label: "Privacy Policy",
  },
  {
    href: "#",
    label: "License",
  },
];

const Footer = (): JSX.Element => {
  return (
    <footer className="bottom-8 mt-32 flex flex-col items-center justify-end space-y-6 lg:bottom-0 lg:flex-row lg:space-y-0 lg:space-x-24">
      {linksConfiguration.map(({ href, label }, i) => (
        <Link
          key={`footer-link-${i}`}
          href={href}
          className="font-mono text-highlight hover:underline hover:opacity-90"
        >
          {label}
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
