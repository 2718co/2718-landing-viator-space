"use client";

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useRef, type Dispatch, type SetStateAction } from "react";
import { useConnect } from "wagmi";
import AuthButton from "./AuthButton";
import CloseIcon from "./Close";

interface IAuthModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AuthModal = ({ open, setOpen }: IAuthModalProps): JSX.Element => {
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 font-mono"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-0 text-center sm:items-center lg:p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-t-xl bg-light-background text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl lg:rounded-3xl">
                <div className="px-5 py-9 lg:px-7 lg:py-11">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="flex flex-row justify-between">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-semibold leading-6 text-gray-900"
                      >
                        Connect Wallet
                      </Dialog.Title>
                      <button
                        className="mr-4 hover:opacity-90"
                        onClick={() => setOpen(false)}
                      >
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="mt-7 grid gap-1">
                      {connectors.map((connector) => {
                        return (
                          <AuthButton
                            key={connector.id}
                            label={connector.id}
                            onClick={() => connect({ connector })}
                            buttonProps={{
                              disabled: !connector.ready,
                            }}
                          />
                        );
                      })}
                    </div>
                    <div className="mt-7 text-left text-subtitle-2-size text-light-text lg:px-4 lg:text-center">
                      <p>
                        By connecting a wallet, you agree to 2718&apos;s{" "}
                        <Link
                          href={"/terms"}
                          target="_blank"
                          className="text-highlight underline hover:opacity-80"
                        >
                          Terms of Service
                        </Link>{" "}
                        and acknowledge that you have read and understod the
                        2718&apos;s{" "}
                        <Link
                          href={"/"}
                          target="_blank"
                          className="text-highlight underline hover:opacity-80"
                        >
                          Protocol Disclaimer
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AuthModal;
