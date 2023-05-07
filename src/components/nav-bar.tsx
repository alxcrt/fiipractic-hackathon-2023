import Link from "next/link";
import { getServerSession } from "next-auth";
import { buttonVariants } from "./ui/button";
import SignOutButton from "./sign-out-button";
import SignInButton from "./sign-in-button";
import ThemeToggle from "./theme-toggle";
// import ProfilePicture from "./profile-picture";
import { useSession } from "next-auth/react";
import ProfilePicture from "./profile-picture";
import Streak from "./streak";

import Image from "next/image"; // Add this import
import { useTheme } from "next-themes";



const NavBar = () => {
  // const session = await getServerSession();
  const { data: session } = useSession();

  const { theme, setTheme } = useTheme();

  return (
    <div className="container fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between bg-slate-50 px-4 py-4 backdrop-blur-sm dark:bg-slate-900/75 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between border-b border-slate-300 py-2 dark:border-slate-700">
        <Link href="/" className=" items-center space-x-2 md:flex">
          {theme === "light" ? <Image
            src="/logo2.png"
            alt="Hackathon Logo"
            width={200}
            height={200}
            className="inline-block"
          /> : <Image
            src="/logo-dark2.png"
            alt="Hackathon Logo"
            width={200}
            height={200}
            className="inline-block"
          />
          }

        </Link>

        {/* <div className="flex-1 flex items-center  justify-start">
          {!!session && (
            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className={buttonVariants({ variant: "ghost" })}
              >
                Dashboard
              </Link>
            </div>
          )}
        </div> */}

        <div className="md:hidden">
          <ThemeToggle />
        </div>

        <div className="hidden gap-4 md:flex">
          <ThemeToggle />
          {/* <Link href="/test" className={buttonVariants({ variant: "ghost" })}>
            Test
          </Link> */}

          {session ? (
            <>
              <Link
                className={buttonVariants({ variant: "ghost" })}
                href="/explore"
              >
                Explore
              </Link>

              <Streak />

              <ProfilePicture />

              {/* <SignOutButton /> */}
            </>
          ) : (
            <>
              <ProfilePicture />
              <SignInButton />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
