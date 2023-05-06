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
        <div>
            <select defaultValue="" onChange={handleLanguageChange}>
                <option value="" disabled>Select a language</option>
                {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;
