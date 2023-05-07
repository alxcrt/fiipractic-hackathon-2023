import { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';
import Stickman from '~/components/stickman';
import Image from 'next/image';

const QuizPage = () => {
    const question = 'What does the acronym "API" stand for?';
    const correctAnswers = ['Application Programming Interface'];
    const incorrectAnswers = [
        'Advanced Packet Inspection',
        'Artificial Programming Intelligence',
        'Application Performance Index',
    ];


    const answers = [...incorrectAnswers, ...correctAnswers];

    useEffect(() => {
        console.log('cca');
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
        setIsSubmitted(true);
        setProgress(2300);
        if (selectedAnswers.length >= 1) {
            const correctSelected = selectedAnswers.every((answer) =>
                correctAnswers.includes(answer)
            );
            console.log(correctSelected ? '1' : '0');
        }
        setTimeout(() => {
            router.push('/explore');
        }, 1500);

    };

    const [progress, setProgress] = useState(1265);


    const answerColors = [
        'bg-red-500 hover:bg-red-700',
        'bg-yellow-500 hover:bg-yellow-700',
        'bg-green-500 hover:bg-green-700',
        'bg-indigo-500 hover:bg-indigo-700',
    ];

    return (
        <>
            <div className="flex items-center justify-center min-h-auto mt-36">
                <div className="flex flex-col items-center justify-center h-96">
                    <div className="bg-white-500 dark:bg-blue-200 text-black dark:text-black  p-8 rounded-full shadow-xl mb-12 text-center">
                        <h1 className="text-2xl font-semibold mb-4">Java Trivia</h1>
                        <p className="">{question}</p>
                    </div>
                    <ul className="flex flex-wrap justify-between items-center">
                        {answers.map((answer, index) => (
                            <li key={index} className={`w-1/2 ${index % 2 === 0 ? 'pr-6' : 'pl-6'} my-2`}>
                                <button
                                    onClick={() => handleAnswer(answer)}
                                    className={`w-full h-40 ${answerColors[index]} text-white font-bold py-2 px-4 rounded-full ${selectedAnswers.includes(answer) ? 'opacity-50 cursor-not-allowed' : ''
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
                        disabled={isSubmitted}
                    >
                        Submit
                    </button>

                </div>
            </div>
            <div className="mx-auto">
                <div style={{ marginTop: '122px' }}>
                    <Stickman progress={progress} />
                </div>
            </div>
            <div className="finish-line absolute right-64 top-50">
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
