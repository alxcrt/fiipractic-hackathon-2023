import { useMemo, useState } from "react";
import Canvas from "./canvas";
import useEventListener from '@use-it/event-listener'
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const LabyrinthGame = ({handleFinishedGame}:{handleFinishedGame:any}) => {
    const [lineIndex, setLineIndex] = useState<number>(9);
    const [colIndex, setColIndex] = useState<number>(1);

    const [newLineIndex, setNewLineIndex] = useState<number>(9);
    const [newColIndex, setNewColIndex] = useState<number>(1);

    const [keyPressed, setKeyPressed] = useState<string>('');
    const [isGameFinished, setIsGameFinished] = useState<boolean>(false);

    const delay = (ms: any) => new Promise(res => setTimeout(res, ms));

    const handleContextReady = useMemo(() => {
        return async (ctx: CanvasRenderingContext2D) => {
            let canvas = ctx.canvas;
            let context = canvas.getContext("2d");

            function rect(x: any, y: any, w: any, h: any, color: any) {
                context!.fillStyle = color;
                context!.fillRect(x, y, w, h);
            }

            function randomcolor() {
                var r = Math.floor(Math.random() * 255),
                    g = Math.floor(Math.random() * 255),
                    b = Math.floor(Math.random() * 255),
                    a = Math.random(),
                    rgba = "rgba(" + r + "," + g + "," + b + "," + a + ")";
                return rgba;
            }

            let delimiter = 10;
            let size = canvas.width / delimiter;

            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    rect(size * i, size * j, size, size, randomcolor());
                }
            }

            var Maze = new Array(
                new Array(1, 0, 1, 1, 1, 1, 1, 1, 1, 1),
                new Array(1, 0, 0, 0, 1, 1, 1, 0, 0, 2),
                new Array(1, 0, 1, 0, 0, 0, 0, 0, 1, 1),
                new Array(1, 0, 0, 0, 1, 1, 1, 0, 1, 1),
                new Array(1, 0, 1, 1, 1, 1, 0, 1, 1, 1),
                new Array(1, 0, 0, 1, 1, 1, 0, 0, 0, 1),
                new Array(1, 1, 0, 0, 0, 1, 0, 1, 0, 1),
                new Array(1, 1, 1, 1, 0, 1, 0, 1, 0, 1),
                new Array(1, 0, 0, 0, 0, 0, 0, 1, 0, 1),
                new Array(1, 0, 1, 1, 1, 1, 1, 1, 1, 1)
            );

            // if "wasd" was pressed
            if (keyPressed != '') {
                if (keyPressed == 'w') {
                    // check if the new move is valid
                    if (newLineIndex >= 0) {
                        // if the user wants to go on a white cell
                        if (Maze[newLineIndex]![colIndex] == 0) {
                            Maze[lineIndex]![colIndex] = 0;
                            setLineIndex(newLineIndex);
                        } else if (Maze[newLineIndex]![newColIndex] == 1) {
                            setNewLineIndex(lineIndex);
                        } else if (Maze[newLineIndex]![newColIndex] == 2) {
                            console.log("YOU WON");
                            setIsGameFinished(true);
                            handleFinishedGame();
                        }
                    }
                } else if (keyPressed == "s") {
                    // check if the new move is valid
                    if (newLineIndex <= 9) {
                        // if the user wants to go on a white cell
                        if (Maze[newLineIndex]![colIndex] == 0) {
                            Maze[lineIndex]![colIndex] = 0;
                            setLineIndex(newLineIndex);
                        } else if (Maze[newLineIndex]![newColIndex] == 1) {
                            setNewLineIndex(lineIndex);
                        } else if (Maze[newLineIndex]![newColIndex] == 2) {
                            console.log("YOU WON");
                            setIsGameFinished(true);
                            handleFinishedGame();
                        }
                    }
                } else if (keyPressed == "a") {
                    // check if the new move is valid
                    if (newColIndex >= 0) {
                        // if the user wants to go on a white cell
                        if (Maze[lineIndex]![newColIndex] == 0) {
                            Maze[lineIndex]![colIndex] = 0;
                            setColIndex(newColIndex);
                        } else if (Maze[newLineIndex]![newColIndex] == 1) {
                            setNewColIndex(colIndex);
                        } else if (Maze[newLineIndex]![newColIndex] == 2) {
                            console.log("YOU WON");
                            setIsGameFinished(true);
                            handleFinishedGame();
                        }
                    }
                } else if (keyPressed == "d") {
                    // check if the new move is valid
                    if (newColIndex <= 9) {
                        // if the user wants to go on a white cell
                        if (Maze[lineIndex]![newColIndex] == 0) {
                            Maze[lineIndex]![colIndex] = 0;
                            setColIndex(newColIndex);
                        } else if (Maze[newLineIndex]![newColIndex] == 1) {
                            setNewColIndex(colIndex);
                        } else if (Maze[newLineIndex]![newColIndex] == 2) {
                            console.log("YOU WON");
                            setIsGameFinished(true);
                            handleFinishedGame();
                        }
                    }
                }
            }

            Maze[lineIndex]![colIndex] = 3;

            function CellColor(something: any) {
                if (something == 0) {
                    return "white";
                } else if (something == 1) {
                    return "black";
                } else if (something == 2) {
                    return "green"
                } else {
                    return "purple"
                }
            }

            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    rect(size * j, size * i, size, size, CellColor(Maze[i]![j]!));
                }
            }
        };
    }, [lineIndex, colIndex, newLineIndex, newColIndex, keyPressed]);

    const ESCAPE_KEYS = ['w', 'a', 's', 'd'];

    function handler({ key }: { key: any }) {
        if (ESCAPE_KEYS.includes(String(key))) {
            setKeyPressed(String(key));
        } else {
            setKeyPressed('');
        }

        if (String(key) == 'w') {
            setNewLineIndex(lineIndex - 1)
            console.log("this really is w")
        }
        if (String(key) == 'a') {
            setNewColIndex(colIndex - 1)
            console.log("this really is a")
        }
        if (String(key) == 's') {
            setNewLineIndex(lineIndex + 1)
            console.log("this really is s")
        }
        if (String(key) == 'd') {
            setNewColIndex(colIndex + 1)
            console.log("this really is d")
        }
    }

    useEventListener('keydown', handler);

    return (
        <div className="mt-[20px]">
            <div className="relative border-4">
                {isGameFinished
                    ? <div className="flex align-center justify-center h-[600px] w-[600px]"><h1 className="m-auto text-3xl font-extrabold leading-none tracking-tight text-green-600 dark:text-green-400">Congrats! You won!</h1></div>
                    : <Canvas onContextReady={handleContextReady} width={600} height={600} />
                }
            </div>
        </div>
    );
};

export default LabyrinthGame;