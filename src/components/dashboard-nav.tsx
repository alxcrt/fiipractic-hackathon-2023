import Link from "next/link";
import Icons from "./icons";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";

interface DashboardNavProps {
  items: {
    title: string;
    href: string;
    icon?: keyof typeof Icons;
    disabled?: boolean;
  }[];
}

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname();
  const { data: session } = useSession();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item) => {
        const isActive = path === item.href;

        if (
          session?.user.role !== UserRole.RECRUITER &&
          item.href === "/explore/leaderboard"
        ) {
          return null;
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              path === item.href ? "bg-accent" : "transparent",
              item.disabled && "cursor-not-allowed opacity-80"
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
