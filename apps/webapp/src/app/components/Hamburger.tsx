interface IHamburgerProps {
  open: boolean;
  onClick: () => void;
}

const Hamburger = ({ open, onClick }: IHamburgerProps): JSX.Element => {
  return (
    <div className="relative flex flex-col space-y-2" onClick={onClick}>
      <div
        className={`h-0.5 w-4 rounded-xl bg-white ${
          open && "translate-y-1 rotate-45 transform "
        }`}
      ></div>
      <div
        className={`h-0.5 w-4 rounded-xl bg-white transition-all ${
          open && "hidden"
        }`}
      ></div>
      <div
        className={`h-0.5 w-4 rounded-xl bg-white ${
          open && "-translate-y-1 -rotate-45 transform "
        }`}
      ></div>
    </div>
  );
};

export default Hamburger;
