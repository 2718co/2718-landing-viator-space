import { type InputHTMLAttributes } from "react";
import { classNames } from "../../../utils/classnames";

interface IInputTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className: string;
}

const InputTextField = ({
  name,
  id,
  type = "text",
  className,
}: IInputTextFieldProps): JSX.Element => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      className={classNames(className, "")}
    />
  );
};

export default InputTextField;
