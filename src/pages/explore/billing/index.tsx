import type { FC } from "react";
import { DashboardHeader } from "~/components/header";
import BillingPlan from "~/components/ui/billing-plan";
import ChooseRecruiterBillingPlan from "~/components/ui/billing-plan-recruiter";
import DashboardLayout from "~/layout/DashboardLayout";

const Billing: FC = ({}) => {
  return (
    <DashboardLayout>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />

      <div className="mt-10">
        <BillingPlan />

        <ChooseRecruiterBillingPlan />
      </div>
    </DashboardLayout>
  );
};

export default Billing;
