import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface StickmanProps {
    progress: number;

}

const Stickman: React.FC<StickmanProps> = ({ progress }) => {
    const stickmanStyle = {
        transform: `translateX(${progress}%)`,
    };

    const frames: string[] = ['/frame1.png', '/frame2.png', '/frame3.png'];
    const [stickmanFrameIndex, setStickmanFrameIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsAnimating(true);
        const timeout = setTimeout(() => {
            setIsAnimating(false);
        }, 2000); // Stop the animation after 2 seconds

        return () => clearTimeout(timeout);
    }, [progress]);

    useEffect(() => {
        if (!isAnimating) return;

        const changeFrame = () => {
            setStickmanFrameIndex((prevIndex) => (prevIndex + 1) % frames.length);
        };

        const interval = setInterval(changeFrame, 100);

        return () => clearInterval(interval);
    }, [isAnimating]);

    return (
        <div className="relative">
            <div
                className="stickman-image absolute transition-transform duration-1000"
                style={{ ...stickmanStyle, width: 48, height: 48 }}
            >
                <Image
                    src={frames[stickmanFrameIndex] as string}
                    alt="Stickman"
                    width={48}
                    height={48}
                    layout="fixed"
                />
            </div>

        </div>
    );
};

export default Stickman;
