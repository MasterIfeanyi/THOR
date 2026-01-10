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
      <div className='min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-card'>
        
        <div className="hidden lg:block relative w-full h-screen">
          <Image 
            src="/images/cat.png"
            alt="space background"
            fill
            className="object-cover object-center"
          />
        </div>

        
        <div className="flex w-full flex-col justify-start px-10 py-12 lg:px-16 z-10 relative overflow-hidden">
            <div className="mx-auto w-full">

              <div className="flex flex-col items-center justify-center text-center space-y-4">
                
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

                <div className="flex gap-4 flex-col sm:flex-row justify-center">
                  <Button 
                    variant="primary" 
                    className="rounded-full py-4 px-8 text-sm cursor-pointer"
                    onClick={() => signIn('github')}
                  >
                    <FaGithub size={20} />
                    Sign in with GitHub
                  </Button>

                  <Link href="/getting-started">
                    <Button 
                      variant="other" 
                      className="rounded-full px-8 py-4 text-sm cursor-pointer"
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
