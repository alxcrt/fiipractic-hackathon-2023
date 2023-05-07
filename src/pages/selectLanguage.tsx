import LanguageSelector from "~/components/languageSelector";
import Image from "next/image";

const SelectLanguagePage = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen pb-36">
            <div className="mb-8">
                <Image
                    className="rounded-xl"
                    src="/languages.jpg"
                    alt="Rocket"
                    width={450}
                    height={1000}
                />
            </div>
            <div>
                <LanguageSelector />
            </div>
        </div>
    );
};

export default SelectLanguagePage;
