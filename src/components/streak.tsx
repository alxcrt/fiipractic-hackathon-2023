import type { FC } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import Icons from "./icons";
import { Button } from "./ui/button";

const Streak: FC = () => {
  return (
    <div className="flex items-center justify-center">
      <HoverCard>
        <HoverCardTrigger className="flex items-center justify-center hover:cursor-pointer">
          <Icons.Flame />
          <span className="ml-2">69</span>
        </HoverCardTrigger>
        <HoverCardContent>
          {"Solve today's Daily Challenge to refresh your streak!"}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default Streak;
