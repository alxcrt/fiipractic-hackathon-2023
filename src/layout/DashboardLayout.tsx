import { notFound } from "next/navigation";

// import { dashboardConfig } from "@/config/dashboard";
// import { getCurrentUser } from "@/lib/session";
// import { MainNav } from "@/components/main-nav";
// import { DashboardNav } from "@/components/nav";
// import { SiteFooter } from "@/components/site-footer";
// import { UserAccountNav } from "@/components/user-account-nav";
import { useSession } from "next-auth/react";
import { DashboardNav } from "~/components/dashboard-nav";
import Icons from "~/components/icons";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const sidebarNav: {
  title: string;
  href: string;
  disabled?: boolean;
}[] = [
  {
    title: "Featured",
    href: "/explore",
  },
  {
    title: "Leaderboard",
    href: "/explore/leaderboard",
  },
  {
    title: "Billing",
    href: "/explore/billing",
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = useSession();

  // if (!session) {
  //   return notFound();
  // }

  return (
    <div className="flex  flex-col space-y-6 pt-4">
      <div className="grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      {/* <SiteFooter className="border-t" /> */}
    </div>
  );
}
