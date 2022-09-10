import { signOut } from "next-auth/react";

export const LogOutBtn = () => {
  return (
    <button className="px-2 rounded-md bg-slate-300" onClick={() => signOut()}>
      Log Out
    </button>
  );
};
