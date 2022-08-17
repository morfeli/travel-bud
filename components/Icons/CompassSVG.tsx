import { ActiveTab as CompassSVGProps } from "../UI/UserNavigation";
import classNames from "classnames";

export const CompassSVG = ({ activeTab, value, setTab }: CompassSVGProps) => {
  return (
    <div
      className={classNames("p-1 scale-150 rounded-md", {
        "bg-lightpurpleTwo": activeTab === "Compass",
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
        <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12S0 18.623 0 12 5.377 0 12 0zm0 2c5.519 0 10 4.481 10 10s-4.481 10-10 10S2 17.519 2 12 6.481 2 12 2zm1.476 12.955a3.763 3.763 0 002.116-2.216L18 6l-6.672 2.387a3.768 3.768 0 00-2.216 2.119L6.047 18l7.429-3.045zm-.122-4.286a1.412 1.412 0 11-1.997 1.996 1.412 1.412 0 011.997-1.996z"></path>
      </svg>
    </div>
  );
};
