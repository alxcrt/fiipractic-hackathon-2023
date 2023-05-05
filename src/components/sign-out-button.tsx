import { signOut } from "next-auth/react";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";

const SignOutButton: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signOutWithGithub = async () => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (e) {
      toast.error("Error signing out");
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="lg"
        onClick={() => void signOutWithGithub()}
        isLoading={isLoading}
      >
        Sign out
      </Button>
    </>
  );
};

export default SignOutButton;
