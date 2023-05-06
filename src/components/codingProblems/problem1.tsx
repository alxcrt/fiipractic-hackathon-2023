import React from 'react';

const Problem1: React.FC = () => {
    return (
        <div className="px-10">
            <h1 className="text-2xl font-bold mb-4">Problem Statement</h1>
            <p className="mb-4">
                Given two integers&nbsp;
                <code className="bg-gray-200 px-2 py-1 rounded-md">num1</code>&nbsp;and&nbsp;
                <code className="bg-gray-200 px-2 py-1 rounded-md">num2</code>, return&nbsp;the&nbsp;sum&nbsp;of&nbsp;the&nbsp;two&nbsp;integers.
            </p>
            <h2 className="text-lg font-bold mb-2">Example 1:</h2>
            <pre className="bg-gray-200 p-5 rounded-md whitespace-pre-wrap">                <code>
                {`
Input: num1 = 12, num2 = 5
Output: 17
Explanation: num1 is 12, num2 is 5, and their sum is 
12 + 5 = 17, so 17 is returned.`}
            </code>
            </pre>
            <h2 className="text-lg font-bold mb-2">Example 2:</h2>
            <pre className="bg-gray-200 p-4 rounded-md whitespace-pre-wrap">
                <code>
                    {`Input: num1 = -10, num2 = 4
Output: -6
Explanation: num1 + num2 = -6, so -6 is returned.`}
                </code>
            </pre>
            <h2 className="text-lg font-bold mb-2">Constraints:</h2>
            <ul className="list-disc pl-8">
                <li>100&nbsp;&lt;=&nbsp;num1,&nbsp;num2&nbsp;&lt;=&nbsp;100</li>
            </ul>
        </div>
    );
};

export default Problem1;
