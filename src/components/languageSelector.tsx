// components/LanguageSelector.tsx

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
        <div className="flex justify-center items-center min-h-screen">
            <div className="relative inline-block text-left">
                <div>
                    <select defaultValue="" onChange={handleLanguageChange} className="rounded-md bg-white text-gray-700 shadow-sm px-4 py-2 w-80">
                        <option value="" disabled>Select a language</option>
                        {languages.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default LanguageSelector;
