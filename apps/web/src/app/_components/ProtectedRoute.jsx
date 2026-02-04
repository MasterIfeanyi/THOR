// components/ProtectedRoute.jsx
"use client";

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { FaGithub, FaLock } from "react-icons/fa";

export default function ProtectedRoute({ children }) {
  const { data: session, status } = useSession();
  const [isDismissed, setIsDismissed] = useState(false);
  const pathname = usePathname();

  const showModal = status === "unauthenticated" && !isDismissed;

  const handleSignIn = () => {
    signIn("github", { callbackUrl: pathname });
  };

  const handleClose = () => {
    setIsDismissed(true);
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {children}

      <Modal isShown={showModal} onClose={handleClose}>
        <div className="flex justify-center items-center p-4 min-h-screen">
          <div className="p-8 w-full max-w-md text-center bg-white rounded-lg shadow-xl dark:bg-gray-900">
            <div className="flex justify-center mb-6">
              <div className="flex justify-center items-center w-24 h-24 bg-teal-700 rounded-full">
                <FaLock size={48} className="text-white" />
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Authentication Required
            </h2>

            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Please sign in with GitHub to use this feature.
            </p>

            <Button
              onClick={handleSignIn}
              size="large"
              variant="primary"
              className="px-8 py-4 text-sm rounded-full cursor-pointer dark:text-gray-100"
              // className="px-4 py-3 w-full font-medium text-white bg-gray-900 rounded-lg transition-colors hover:bg-gray-800"
            >
              <FaGithub size={20} />
              Sign in with GitHub
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
