"use client"

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import { FaGithub } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";


export default function Home() {

  const { data: session } = useSession();

  const handleGuestAccess = async () => {
    session ? await signOut() : null;
    localStorage.setItem("guestMode", "true");
  };


  return (
    <>
      <div className='grid grid-cols-1 w-full min-h-screen lg:grid-cols-2 bg-card'>

        <div className="hidden relative w-full h-screen lg:block">
          <Image
            src="/images/cat.png"
            alt="space background"
            fill
            className="object-cover object-center"
          />
        </div>


        <div className="flex overflow-hidden relative z-10 flex-col justify-start px-10 py-12 w-full lg:px-16">
          <div className="mx-auto w-full">

            <div className="flex flex-col justify-center items-center space-y-4 text-center">

              <Image
                src="/images/thor.png"
                width={120} height={120}
                className="-mx-3"
                alt="thor-hammer"
              />

              <div>
                <h1 className="text-5xl font-bold leading-tight text-foreground">
                  THOR
                </h1>
                <p className="text-2xl font-light leading-relaxed text-foreground">
                  The Handbook of Open-source Repositories.
                </p>
              </div>

              <div className="flex flex-col gap-4 justify-center sm:flex-row">
                <Button
                  variant="primary"
                  className="px-8 py-4 text-sm rounded-full cursor-pointer"
                  onClick={() => signIn('github')}
                >
                  <FaGithub size={20} />
                  Sign in with GitHub
                </Button>

                <Link href="/getting-started">
                  <Button
                    variant="other"
                    className="px-8 py-4 text-sm rounded-full cursor-pointer"
                    onClick={handleGuestAccess}
                  >
                    Continue as Guest
                  </Button>
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </>
  );
}
