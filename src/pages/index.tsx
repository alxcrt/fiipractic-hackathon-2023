import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/router";
import ConfettiExplosion from "react-confetti-explosion";
import { useState } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [isExploding, setIsExploding] = useState(false);

  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-black dark:text-white ">
            Get <span>proof of competence</span> before you hire
          </h1>
          <p>
            {`A skills assessment platform that gives hiring teams incredible
            insight into candidates' job-specific skills. So you find and
            shortlist quality talent, real fast! `}
          </p>

          {!!isExploding && (
            <ConfettiExplosion
              className="flex-wrap"
              onComplete={() => {
                void router.push("/explore");
              }}
            />
          )}

          <Button
            onClick={() => {
              setIsExploding(true);
              // void router.push("/explore");
            }}
          >
            <span>Get Started</span>
          </Button>
          <Image
            className="rounded-xl"
            src="/hero2.webp"
            alt="Rocket"
            width={1920}
            height={1080}
          />
          {/* <Button>
            <span>Get Started</span>
          </Button> */}
          {/* <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-black dark:text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div> */}
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-black dark:text-white ">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20 dark:text-white"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
