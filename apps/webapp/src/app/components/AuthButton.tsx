"use client";

import { type ButtonHTMLAttributes } from "react";
import type { AuthProviders } from "./config";
import { PROVIDERS } from "./config";

interface IAuthButtonProps {
  label: string;
  onClick: () => void;
  buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
}

const AuthButton = ({ label, onClick }: IAuthButtonProps) => {
  const provider = PROVIDERS.get(label as AuthProviders);
  const { icon, name } = provider ?? {};
  return (
    <button
      onClick={onClick}
      type="button"
      className="mr-2 mb-2 inline-flex w-full flex-row items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-2.5 text-center text-2xl font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 "
    >
      <span className="inline">
        <span className="hidden lg:inline">Connect with</span> {name}
      </span>
      {icon}
    </button>
  );
};
export default AuthButton;

// dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600
