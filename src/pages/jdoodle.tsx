import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

import Problem1 from "~/components/codingProblems/problem1";
import Stickman from "~/components/stickman";
import { toast } from "react-hot-toast";

interface Language {
  name: string;
  code: string;
}

const languages: Language[] = [
  { name: "Java", code: "java" },
  { name: "C++", code: "cpp" },
  { name: "Python3", code: "python3" },
  { name: "C#", code: "csharp" },
];

const JdoodlePage = () => {
  const router = useRouter();
  const { language: languageCode } = router.query;

  const defaultLanguage: Language = { name: "Java", code: "java" };
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>(defaultLanguage);
  const [remainingTime, setRemainingTime] = useState(0); // start from 0 and count up to infinity

  useEffect(() => {
    if (typeof languageCode === "string") {
      const selected = languages.find((lang) => lang.code === languageCode);
      if (selected) {
        setSelectedLanguage(selected);
      }
    }
  }, [languageCode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        return prevTime + 1; // increment the prevTime by 1
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    console.log(remainingTime);
    setProgress(1200);

    // toast for getting XP
    toast.success("👏 You have earned 200 XP!", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
        fontSize: "1.25rem",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#333",
      },
    });

    setTimeout(() => {
      router.push("/quiz");
    }, 1500);
  };

  const [progress, setProgress] = useState(0);

  return (
    <div className="flex p-8">
      <div className="flex w-1/2 flex-col justify-between">
        <div className="mb-2 px-10 text-lg font-bold">
          Elapsed Time: {remainingTime} seconds
        </div>
        <Problem1 />
        <div className="mt-8 flex justify-center">
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <Stickman progress={progress} />
      </div>
      <Script
        src="https://www.jdoodle.com/assets/jdoodle-pym.min.js"
        type="text/javascript"
      />
      <div
        key={selectedLanguage.code}
        data-pym-src="https://www.jdoodle.com/plugin"
        data-language={selectedLanguage.code}
        data-version-index="4"
        data-libs="mavenlib1, mavenlib2"
        className="w-1/2 px-10"
      ></div>
    </div>
  );
};

export default JdoodlePage;
