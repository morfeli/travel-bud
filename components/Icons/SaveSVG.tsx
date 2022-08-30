import { ActiveTab as SaveSVGProps } from "../UI/UserNavigation";
import classNames from "classnames";
export const SaveSVG = ({ activeTab, value, setTab }: SaveSVGProps) => {
  return (
    <div
      className={classNames("p-1 scale-150 rounded-md cursor-pointer md:w-8", {
        "bg-white": activeTab === "Save",
      })}
      onClick={() => setTab(value)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M16 2v17.582l-4-3.512-4 3.512V2h8zm2-2H6v24l6-5.269L18 24V0z"></path>
      </svg>
    </div>
  );
};
