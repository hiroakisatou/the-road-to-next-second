import { Sidebar } from "@/components/sidebar/components/sidebar";

import { sessionIsActive } from "@/futures/auth/utils/auth-utils";

export const SidebarWrapper = async () => {
  const loggedInState = await sessionIsActive();
  return <Sidebar isLoggedIn={loggedInState} />;
};