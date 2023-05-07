import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import Stickman from "~/components/stickman";
import Image from "next/image";
import { toast } from "react-hot-toast";

const QuizPage = () => {
  const question = 'What does the acronym "API" stand for?';
  const correctAnswers = ["Application Programming Interface"];
  const incorrectAnswers = [
    "Advanced Packet Inspection",
    "Artificial Programming Intelligence",
    "Application Performance Index",
  ];

  const answers = [...incorrectAnswers, ...correctAnswers];

  useEffect(() => {
    console.log("cca");
  }, []);

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      if (prevSelectedAnswers.includes(answer)) {
        return prevSelectedAnswers.filter((a) => a !== answer);
      } else {
        return [...prevSelectedAnswers, answer];
      }
    });
  };

  const handleSubmit = () => {
    toast.success("👏 You have earned 100 XP!", {
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

    setIsSubmitted(true);
    setProgress(2300);
    if (selectedAnswers.length >= 1) {
      const correctSelected = selectedAnswers.every((answer) =>
        correctAnswers.includes(answer)
      );
      console.log(correctSelected ? "1" : "0");
    }
    setTimeout(() => {
      router.push("/explore");
    }, 1500);
  };

  const [progress, setProgress] = useState(1265);

  const answerColors = [
    "bg-red-500 hover:bg-red-700",
    "bg-yellow-500 hover:bg-yellow-700",
    "bg-green-500 hover:bg-green-700",
    "bg-indigo-500 hover:bg-indigo-700",
  ];

  return (
    <>
      <div className="min-h-auto mt-36 flex items-center justify-center">
        <div className="flex h-96 flex-col items-center justify-center">
          <div className="bg-white-500 mb-12 rounded-full p-8  text-center text-black shadow-xl dark:bg-blue-200 dark:text-black">
            <h1 className="mb-4 text-2xl font-semibold">Java Trivia</h1>
            <p className="">{question}</p>
          </div>
          <ul className="flex flex-wrap items-center justify-between">
            {answers.map((answer, index) => (
              <li
                key={index}
                className={`w-1/2 ${index % 2 === 0 ? "pr-6" : "pl-6"} my-2`}
              >
                <button
                  onClick={() => handleAnswer(answer)}
                  className={`h-40 w-full ${
                    answerColors[index]
                  } rounded-full px-4 py-2 font-bold text-white ${
                    selectedAnswers.includes(answer)
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  disabled={isSubmitted}
                >
                  {answer}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSubmit}
            className="mt-4 rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            disabled={isSubmitted}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="mx-auto">
        <div style={{ marginTop: "122px" }}>
          <Stickman progress={progress} />
        </div>
      </div>
      <div className="finish-line top-50 absolute right-64">
        <Image
          src="/flag.png"
          alt="Finish Line"
          width={48}
          height={48}
          layout="fixed"
        />
      </div>
    </>
  );
};

export default QuizPage;
