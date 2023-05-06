import { Link } from "lucide-react";
import { useSession } from "next-auth/react";
import type { FC } from "react";
import Icons from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

const Profile: FC = ({}) => {
  const { data: session } = useSession();

  return (
    <section className="flex flex-col items-center gap-10 p-6">
      {/* <p className="text-xl">{"🚧 DASHBAORD 🚧"}</p> */}

      <Card className="w-[600px] dark:bg-gray-800">
        <div className="flex flex-row items-center justify-between  border-gray-200 p-6 dark:border-gray-700 ">
          {/* <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription> */}

          <div className="flex">
            <div className="relative mr-4 h-20 w-20">
              <img
                className="inline-flex aspect-square h-full w-full overflow-hidden rounded-full bg-gray-600"
                src={session?.user.image || ""}
                alt=""
              />
              <div className="animate-fade-in absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full  bg-gray-200 text-xs ring-4 ring-white dark:bg-gray-700 dark:ring-gray-800">
                <Icons.Github className="h-4 w-4 stroke-current dark:text-white" />
              </div>
            </div>

            <div>
              <p className="font-medium text-gray-400">Welcome back,</p>
              <p
                className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-2xl font-bold text-transparent
              "
              >
                {session?.user.name}
              </p>
              <p className="font-medium text-gray-400">You look nice today!</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button>
              <Icons.User className="mr-2 h-4 w-4 " />
              <span>Account</span>
            </Button>
            <Button>
              <Icons.Newspaper className="mr-2 h-4 w-4" />
              <span>Subscriptions</span>
            </Button>
          </div>
        </div>
      </Card>

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
