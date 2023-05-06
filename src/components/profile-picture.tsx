import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Icons from "./icons";
import Link from "next/link";
import { useRouter } from "next/router";

const ProfilePicture = ({}) => {
  const router = useRouter();

  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  const handleLogout = async () => {
    await signOut();
  };

  const handleSettings = () => {
    console.log("settings");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={session?.user.image || ""} />
          <AvatarFallback>{session?.user.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => void router.push(`/profile`)}>
          <Icons.User className="mr-2 h-4 w-4 " />
          <span>
            <span>{session?.user.name}</span>
          </span>
        </DropdownMenuItem>

        {/* <DropdownMenuItem onClick={handleSettings}>
          <Icons.Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem> */}

        <DropdownMenuItem onClick={() => void handleLogout()}>
          <Icons.LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfilePicture;
