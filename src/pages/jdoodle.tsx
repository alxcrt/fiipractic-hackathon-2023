import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

import styles from './code-highlighting.module.css';
import Problem1 from '~/components/codingProblems/problem1';



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

const JdoodlePage = () => {
    const router = useRouter();
    const { language: languageCode } = router.query;

    const defaultLanguage: Language = { name: 'Java', code: 'java' };
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(
        defaultLanguage
    );

    useEffect(() => {
        if (typeof languageCode === 'string') {
            const selected = languages.find((lang) => lang.code === languageCode);
            if (selected) {
                setSelectedLanguage(selected);
            }
        }
    }, [languageCode]);

    return (
        <div className="flex p-8">
            <Problem1 />
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
                className="w-1/2 px-10"
            ></div>
        </div>
    );

};

export default JdoodlePage;
