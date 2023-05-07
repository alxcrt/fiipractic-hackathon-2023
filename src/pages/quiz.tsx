import { useEffect, useState } from 'react';

const QuizPage = () => {
    const question = 'What does the acronym "API" stand for?';
    const correctAnswer = 'Application Programming Interface';
    const incorrectAnswers = [
        'Advanced Packet Inspection',
        'Artificial Programming Intelligence',
        'Application Performance Index',
    ];

    const answers = [...incorrectAnswers, correctAnswer];

    useEffect(() => {
        console.log('cca');
    }, []);

    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [attempts, setAttempts] = useState(2);

    const handleAnswer = (answer: string) => {
        if (attempts > 0) {
            if (answer === correctAnswer) {
                console.log('correct');
            } else {
                console.log('wrong');
            }

            if (attempts === 1) {
                setSelectedAnswer(null);
                setAttempts(2);
            } else {
                setSelectedAnswer(answer);
                setAttempts(attempts - 1);
            }
        }
    };

    const answerColors = [
        'bg-red-500 hover:bg-red-700',
        'bg-yellow-500 hover:bg-yellow-700',
        'bg-green-500 hover:bg-green-700',
        'bg-indigo-500 hover:bg-indigo-700',
    ];

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center justify-center h-96">
                <div className="bg-white p-8 rounded-full shadow-md mb-12">
                    <h1 className="text-2xl font-semibold mb-4">Programming Trivia</h1>
                    <p className="">{question}</p>
                </div>
                <ul className="flex flex-wrap justify-between items-center">
                    {answers.map((answer, index) => (
                        <li key={index} className={`w-1/2 ${index % 2 === 0 ? 'pr-6' : 'pl-6'} my-2`}>
                            <button
                                onClick={() => handleAnswer(answer)}
                                className={`w-full h-40 ${answerColors[index]} text-white font-bold py-2 px-4 rounded-full ${selectedAnswer === answer ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                disabled={selectedAnswer === answer}
                            >
                                {answer}
                            </button>
                        </li>
                    ))}
                </ul>
                {selectedAnswer && (
                    <div className="p-4 bg-white text-center rounded-b-lg mt-4">
                        <p>Attempts remaining: {attempts}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizPage;
