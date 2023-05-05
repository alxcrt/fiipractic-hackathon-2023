import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";

const SignInButton: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInWithGithub = async () => {
    try {
      setIsLoading(true);
      await signIn("github");
    } catch (e) {
      toast.error("Error signing in");
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="lg"
        onClick={() => void signInWithGithub()}
        isLoading={isLoading}
      >
        Sign in
      </Button>
    </>
  );
};

export default SignInButton;
