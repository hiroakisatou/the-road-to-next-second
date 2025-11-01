"use client";

import  Link from "next/link"
import { usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { accountPasswordPath, accountProfilePath } from "@/path";

const AccountTabs = () => {
  const pathName = usePathname();

  return (
    <Tabs value={pathName.split("/").at(-1)}>
      <TabsList>
        <TabsTrigger value="profile" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground" asChild>
          <Link href={accountProfilePath()}>Profile</Link>
        </TabsTrigger>
        <TabsTrigger value="password" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground" asChild>
          <Link href={accountPasswordPath()}>Password</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export { AccountTabs };