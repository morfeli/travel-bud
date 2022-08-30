import { ActiveTab as HomeSVGProps } from "../UI/UserNavigation";
import classNames from "classnames";

export const HomeSVG = ({ activeTab, value, setTab }: HomeSVGProps) => {
  return (
    <div
      className={classNames("p-1 scale-150 rounded-md cursor-pointer md:w-8", {
        "bg-white": activeTab === "Home",
      })}
      onClick={() => setTab(value)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path d="M22 11.414V24H2V11.414L.707 12.707 0 12 12 0l12 12-.707.707L22 11.414zM16 23h5V10.414l-9-9-9 9V23h5v-9h8v9zm-1-7.889H9v7.778h6v-7.778z"></path>
      </svg>
    </div>
  );
};
