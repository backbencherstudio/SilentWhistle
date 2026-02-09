"use client";

import { UserService } from "@/service/user/user.service";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function AdminRoute({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = UserService.isAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router, pathname]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
