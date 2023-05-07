import { FC, useEffect, useState } from "react";
import LabyrinthGame from "~/components/labyrinth-game";
import ClickingGame from "~/components/clicking-game";
import { CountdownCircleTimer, Props } from "react-countdown-circle-timer";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const TimeEstimationGame: FC = ({}) => {
  let [gameNumber, setGameNumber] = useState<number>(0);
  const [stopwatchTime, setStopwatchTime] = useState<number>(5);
  const [isShown, setIsShown] = useState(true);
  const [isStopwatchDisplayed, setIsStopwatchDisplayed] =
    useState<boolean>(false);
  const [isGameNumberDisplayed, setIsGameNumberDisplayed] =
    useState<boolean>(false);
  const [isGameDisplayed, setIsGameDisplayed] = useState<boolean>(false);
  const [isEstimateTime1Displayed, setIsEstimateTime1Displayed] =
    useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [firstEstimation, setFirstEstimation] = useState("");
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const router = useRouter();

  const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));

  async function previewChallenge1() {
    setIsShown(false);
    setGameNumber(1);
    setIsGameNumberDisplayed(true);
    setIsStopwatchDisplayed(true);
    setIsGameDisplayed(true);

    await delay(5000);

    setIsGameNumberDisplayed(false);
    setIsStopwatchDisplayed(false);
    setIsGameDisplayed(false);
    setIsEstimateTime1Displayed(true);
  }

  const Explanation1 = () => {
    return (
      <div className="mx-auto w-[50%]">
        <p>
          For the next part you will be shown a short challange for a few
          seconds. The controlls will be 'w' 'a' 's' 'd'. After the time ends,
          you will have to estimate in how many seconds you can solve it. After
          inputting the number, you will proceed to solving the challange.
        </p>
        <p>Good luck!</p>
        <Button className="mt-[20px]" onClick={previewChallenge1}>
          Start challange
        </Button>
      </div>
    );
  };

  const EstimateTime1 = () => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        setFirstEstimation(event.target.value);
        console.log(event.target.value);

        setIsGameNumberDisplayed(true);
        setIsStopwatchDisplayed(true);
        setIsGameDisplayed(true);
        setStopwatchTime(event.target.value);
        setIsEstimateTime1Displayed(false);
      }
    };

    return (
      <div>
        <input
          type="text"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="input the number of seconds.."
          onKeyDown={handleKeyDown}
          required
        />
      </div>
    );
  };

  async function handleFinishedGame() {
    toast.success("👏 You have earned 500 XP!", {
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

    setIsPlaying(false);
    await delay(2000);
    setGameFinished(true);
    setIsGameNumberDisplayed(false);
    setIsStopwatchDisplayed(false);
    setIsGameDisplayed(false);
    router.push("/explore");
  }

  return (
    <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center">
      <div className="block">
        <div className="flex justify-between">
          {isGameNumberDisplayed == true && (
            <div className="m-auto ml-0 flex align-middle">
              <h1 className="p mb-4 mt-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-4xl">
                Game number: {gameNumber}
              </h1>
            </div>
          )}
          {isStopwatchDisplayed == true && (
            <CountdownCircleTimer
              isPlaying={isPlaying}
              size={180}
              duration={stopwatchTime}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[7, 5, 2, 0]}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          )}
        </div>
        {/* 
                <button onClick={() => {
                    setGameNumber(gameNumber + 1);
                }}>click me</button> */}
        {isShown == true && <Explanation1></Explanation1>}
        {isEstimateTime1Displayed == true && <EstimateTime1></EstimateTime1>}
        {gameNumber == 1 && isGameDisplayed == true && (
          <LabyrinthGame
            handleFinishedGame={handleFinishedGame}
          ></LabyrinthGame>
        )}
        {gameNumber == 2 && <ClickingGame></ClickingGame>}
      </div>
    </main>
  );
};

export default TimeEstimationGame;
