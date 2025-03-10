"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { PanelSidebar } from "./panel-sidebar";

export default function SidebarWrapper() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // const isPublicPage = ["/", "/projects", "/projects", "/me"].includes(
  //   pathname
  // );
  const isPublicPage =
    pathname === "/" ||
    pathname === "/projects" ||
    pathname.startsWith("/projects/") || // Allow all project pages
    pathname === "/me";

  useEffect(() => {
    if (!isPublicPage && status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, status, isPublicPage, router]);

  return <AppSidebar />;
}
