import { Link } from "lucide-react";
import { useSession } from "next-auth/react";
import type { FC } from "react";
import { DashboardHeader } from "~/components/header";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import DashboardLayout from "~/layout/DashboardLayout";

const availableTests = [
  {
    name: "HR Test",
    description: "A test to see if you're a good fit for the company.",
    image: "/hrr.webp",
  },
  {
    name: "Coding Test",
    description: "A test to see if you're a good fit for the company.",
    image: "/coding.webp",
  },
  {
    name: "Personality Test",
    description: "A test to see if you're a good fit for the company.",
    image: "/personality.jpg",
  },
];

const Explore: FC = ({}) => {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <DashboardLayout>
      <DashboardHeader
        heading="Featured"
        text="Explore the latest and greatest tests."
      />

      <div className="mx-auto mt-10 grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {availableTests.map((test) => (
          <Card className=" w-[450px] dark:bg-gray-800" key={test.name}>
            <div className="flex flex-row items-center justify-between  border-gray-200 p-6 dark:border-gray-700 ">
              <div className="w-full">
                <div className="flex flex-col items-center justify-between">
                  <div>
                    <p
                      className={
                        "text-2xl font-bold text-slate-900 dark:text-white"
                      }
                    >
                      {test.name}
                      {/* {`${session?.user.name || ""}'s Room`} */}
                    </p>
                    {/* <Badge variant="outline" className="ml-2">
                  Owner
                </Badge> */}
                  </div>

                  <div className=" flex h-[300px] w-[400px] items-center justify-center">
                    {/* <img
                    className="inline-flex aspect-square h-full w-full overflow-hidden rounded-full bg-gray-600"
                    src={test.image}
                    alt=""
                  /> */}
                    <img src={test.image} alt="" />
                  </div>

                  <Button>
                    <span>Take Test</span>
                  </Button>
                </div>

                {/* <div className="flex flex-col pt-6">
              <Link
                href="/call/[personId]"
                as={`/call/${session?.user.name}`}
                className={buttonVariants({ variant: "default" })}
              >
                <Icons.User className="mr-2 h-4 w-4" />
                <span>Join Room</span>
              </Link>
            </div> */}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Explore;
