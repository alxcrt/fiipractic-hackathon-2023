import React from 'react';
import { useRouter } from 'next/router';

interface Language {
    name: string;
    code: string;
}

const languages: Language[] = [
    { name: 'Java', code: 'java' },
    { name: 'C++', code: 'cpp' },
    { name: 'Python3', code: 'python3' },
    { name: 'C#', code: 'csharp' },
];

const LanguageSelector: React.FC = () => {
    const router = useRouter();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const code = event.target.value;
        router.push(`/jdoodle?language=${code}`);
    };

    return (
        <div className="flex justify-center items-center">
            <select
                defaultValue=""
                onChange={handleLanguageChange}
                className="w-96 h-30 rounded-md bg-white text-gray-700 shadow-lg px-6 py-4 text-2xl focus:outline-none"
            >
                <option value="" disabled>
                    Select a language
                </option>
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;
