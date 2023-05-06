import { useSession } from "next-auth/react";
import type { FC } from "react";
import { DashboardHeader } from "~/components/header";
import LeaderBoard from "~/components/table-leaderboard";
import DashboardLayout from "~/layout/DashboardLayout";

const LeaderBoardPage: FC = ({}) => {
  const { data: sessions } = useSession();

  return (
    <DashboardLayout>
      <DashboardHeader
        heading="Leaderboard"
        text="See who's on top of the leaderboard."
      />
      <div className="mt-10">
        <LeaderBoard />
      </div>
    </DashboardLayout>
  );
};

export default LeaderBoardPage;
