import { UserRole } from "@prisma/client";
import { Link } from "lucide-react";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import BadgesCard from "~/components/badges_card";
import EditProfile from "~/components/edit-profile";
import GithubRepos from "~/components/github_repos";
import Icons from "~/components/icons";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import WhatWeTest from "~/components/what-we-test";

interface Achievement {
  src: string;
  alt: string;
}

interface UserData {
  login: string;
}
interface AchievementData {
  src: string;
  alt: string;
}

const Profile: FC = () => {
  const { data: session } = useSession();
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  async function getUserAchievements(imageString: string): Promise<void> {
    const userNumberId = imageString.substring(
      imageString.indexOf("/u/") + 3,
      imageString.indexOf("?v")
    );
    await getUserAchievementsExtra(userNumberId);
  }

  async function getUserAchievementsExtra(userNumberId: string): Promise<void> {
    const link = "https://api.github.com/user/" + userNumberId;
    const response = await fetch(link, { method: "GET" });

    if (response.ok) {
      const data = (await response.json()) as UserData;
      const newLink = `https://github.com/${data.login}?tab=achievements`;
      const response2 = await fetch(newLink, { method: "GET", mode: "cors" });
      if (response2.ok) {
        const body = await response2.text();
        const parser = new DOMParser();
        const parsedDocument = parser.parseFromString(body, "text/html");
        const search = parsedDocument.getElementsByClassName(
          "d-flex flex-wrap p-3"
        )[0];
        const achievements2 = [].slice.call(
          search?.getElementsByClassName("achievement-badge-card")
        );

        const achievements3: Achievement[] = [];
        achievements2.forEach((res: AchievementData) => {
          achievements3.push({
            src: res.src,
            alt: res.alt,
          });
        });

        setAchievements(achievements3);
      }
    }
  }

  useEffect(() => {
    if (session) {
      getUserAchievements(session.user.image || "").catch((err) => {
        console.log(err);
      });
    }
  }, [session]);

  return (
    <section className="flex flex-col items-center gap-10 p-6">
      <Card className="relative w-[600px] pb-10 dark:bg-gray-800">
        <div className="flex flex-row items-center justify-between  border-gray-200 p-6 dark:border-gray-700 ">
          {/* <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription> */}

          <div className="flex">
            <div className="relative mr-4 h-[100px] w-[100px]">
              <img
                className="inline-flex aspect-square h-full w-full overflow-hidden rounded-full bg-gray-600"
                src={session?.user.image || ""}
                alt=""
              />
              {session?.user.role !== UserRole.RECRUITER && (
                <>
                  <div className="animate-fade-in absolute bottom-0 left-0 flex h-6 w-6 items-center justify-center rounded-full  bg-gray-200 text-xs ring-4 ring-white dark:bg-gray-700 dark:ring-gray-800">
                    <Icons.Github className="h-4 w-4 stroke-current dark:text-white" />
                  </div>
                  <div className=" absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full  ">
                    <Badge className=" text-sm">
                      Lvl.{session?.user.level}
                    </Badge>
                  </div>
                </>
              )}
            </div>

            <div>
              <p className="font-medium text-gray-400">Welcome back,</p>
              <p className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-2xl font-bold text-transparent">
                {session?.user.name}
              </p>
              <p className="font-medium text-gray-400">You look nice today!</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <a href="../explore/billing">
              <Button>
                <Icons.Newspaper className="mr-2 h-4 w-4" />
                <span>Subscriptions</span>
              </Button>
            </a>

            <EditProfile />
          </div>
        </div>
        {session?.user.role !== UserRole.RECRUITER && (
          <div className=" mx-auto mt-2 w-[80%]">
            <Progress value={90}></Progress>
            <div className=" bottom-0 left-0 mt-1 flex w-full justify-between">
              <span>{session?.user.level}</span>
              <span>{session?.user.level + 1}</span>
            </div>
            <div className="mt-2 flex justify-between">
              <div>
                <span className="font-bold">XP 768</span>/800
              </div>
              <div>
                <span className="font-bold">32 XP</span> to next level
              </div>
            </div>
          </div>
        )}
      </Card>

      {session?.user.role !== UserRole.RECRUITER && (
        <>
          <WhatWeTest name={session?.user.name} />
          <BadgesCard />

          <Card>
            <div className="max-w-md justify-between  border-gray-200 p-2 dark:border-gray-700 ">
              <p className="align-middle font-medium text-gray-400">
                {session ? "Github Achievements" : ""}
              </p>
            </div>
            {achievements.map((item) => (
              <div className="flex items-center justify-start" key={item.src}>
                <img
                  className="m-2 inline-flex aspect-square w-7 rounded-full bg-gray-600"
                  src={item.src || ""}
                  alt=""
                />
                <p className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text p-2 text-lg font-bold text-transparent">
                  {item.alt || ""}
                </p>
              </div>
            ))}
          </Card>
        </>
      )}

      {session?.user.role !== UserRole.RECRUITER && (
        <GithubRepos />)}

      {/* <Card className="w-[600px] dark:bg-gray-800">
        <div className="flex flex-row items-center justify-between  border-gray-200 p-6 dark:border-gray-700 ">
          <div className="w-full">
            <div className="flex justify-between">
              <div>
                <p
                  className={
                    "text-2xl font-bold text-slate-900 dark:text-white"
                  }
                >
                  {`${session?.user.name}'s Room`}
                </p>
                <Badge variant="outline" className="ml-2">
                  Owner
                </Badge>
              </div>

              <div className="relative mr-4 h-20 w-20">
                <img
                  className="inline-flex aspect-square h-full w-full overflow-hidden rounded-full bg-gray-600"
                  src={session?.user.image!}
                  alt=""
                />
              </div>
            </div>

            <div className="flex flex-col pt-6">
              <Link
                href="/call/[personId]"
                as={`/call/${session?.user.name}`}
                className={buttonVariants({ variant: "default" })}
              >
                <Icons.User className="mr-2 h-4 w-4" />
                <span>Join Room</span>
              </Link>
            </div>
          </div>
        </div>
      </Card> */}
    </section>
  );
};

export default Profile;
