import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { Card } from "~/components/ui/card";


const BadgesCard: FC = () => {
    const [badges, setBadges] = useState<JSX.Element[]>([]);


    const { data: session } = useSession();

    // badges = [];

    function getBadges() {
        const badges2: JSX.Element[] = []

        badges2.push(
            <img
                className="rounded-l"
                src="/badges/Badge_Fire.png"
                alt="Fire"
                width='100vw'
            />)

        badges2.push(<img
            className="rounded-l"
            src="/badges/Badge_Default.png"
            width='100vw'
            alt="1"
        />)

        badges2.push(
            <img
                className="rounded-l"
                src="/badges/Badge_Programming.png"
                alt="Programming"
                width='100vw'
            />)

        badges2.push(
            <img
                className="rounded-l"
                src="/badges/Badge_Time.png"
                alt="Time"
                width='100vw'
            />)

        badges2.push(<img
            className="rounded-l"
            src="/badges/Badge_Default.png"
            alt="2"
            width='100vw'
        />)

        setBadges(badges2);

    }

    useEffect(() => {
        if (session) {
            getBadges()
        }
    }, [session]);


    return (<Card>
        <div className="max-w-md justify-center  border-gray-200 p-2 dark:border-gray-700 ">
            <p className="align-middle font-medium text-gray-400">
                {session ? "User's Badges" : ""}
            </p>
        </div>
        <div className="flex p-3">
        {badges.map((item) => {
            return (<div className="grid-flow-row items-center justify-start" key={JSON.stringify(item)}>
                {item}
            </div>)
        })}
        </div>
    </Card>)
};

export default BadgesCard;
