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

  const showModal = status === "unauthenticated" && !isDismissed;;


  const handleSignIn = () => {
    signIn("github", { callbackUrl: pathname });
  };

  const handleClose = () => {
    setIsDismissed(true);
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {children}
      
        <Modal isShown={showModal} onClose={handleClose}>
            <div className="flex items-center justify-center min-h-screen p-4">

                <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl text-center">

                    <div className="flex justify-center mb-6">
                        <div className="w-24 h-24 bg-teal-700 rounded-full flex items-center justify-center">
                            <FaLock size={48} className="text-white" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-4 text-gray-900">
                        Authentication Required
                    </h2>

                    <p className="text-gray-600 mb-6">
                        Please sign in with GitHub to use this feature.
                    </p>

                    <Button
                        onClick={handleSignIn}
                        size="large"
                        variant="primary" 
                        className="rounded-full py-4 px-8 text-sm cursor-pointer"
                        // className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
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