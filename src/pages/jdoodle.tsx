// pages/jdoodle.tsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

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

const MyPage = () => {
    const router = useRouter();
    const { language: languageCode } = router.query;

    const defaultLanguage: Language = { name: 'Java', code: 'java' };
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(defaultLanguage);

    useEffect(() => {
        if (typeof languageCode === 'string') {
            const selected = languages.find(lang => lang.code === languageCode);
            if (selected) {
                setSelectedLanguage(selected);
            }
        }
    }, [languageCode]);

    return (
        <div>
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
                className="w-full"
            >
            </div>
        </div>
    );
};

export default MyPage;