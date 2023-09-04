import clsx from "clsx";
import { useState } from "react";

const Checkbox = () => {
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked((state) => !state);
  return (
    <>
      <span>
        <div
          className={clsx(
            "flex h-5 w-5 items-center justify-center rounded-md border-2 p-1",
            !checked && "border-light-background bg-dark-background ",
            checked && "border-none border-light-background bg-highlight"
          )}
          onClick={toggleCheckbox}
        >
          {checked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="21"
              fill="none"
              viewBox="0 0 17 21"
            >
              <path
                fill="#000"
                d="M6.068 20.07L0 10.625l.953-1.688 5.084 7.913L16.014.282 17 1.919 6.068 20.07z"
              ></path>
            </svg>
          )}
        </div>
      </span>
    </>
  );
};

export default Checkbox;
