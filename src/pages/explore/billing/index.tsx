import type { FC } from "react";
import { DashboardHeader } from "~/components/header";
import DashboardLayout from "~/layout/DashboardLayout";

const Billing: FC = ({}) => {
  return (
    <DashboardLayout>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
    </DashboardLayout>
  );
};

export default Billing;
