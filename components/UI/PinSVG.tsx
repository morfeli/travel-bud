import { useTravelContext } from "../helper-functions/useTravelContext";

export const PinSVG = () => {
  const travelCtx = useTravelContext();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill={travelCtx.darkMode ? "white" : "black"}
      className="mr-2"
    >
      <path d="M12 0a5.997 5.997 0 00-1 11.91V20h2v-8.089A5.997 5.997 0 0012 0zm-.707 4.508c-.549.65-1.423.8-1.953.333s-.516-1.372.034-2.022c.548-.65 1.422-.799 1.952-.333.53.467.515 1.372-.033 2.022zM20 20c0 2.209-3.581 4-8 4s-8-1.791-8-4c0-1.678 2.069-3.113 5-3.707v2.052l-.436.106c-1.695.491-2.516 1.023-2.516 1.549s.82 1.058 2.516 1.548c2.088.603 4.777.605 6.874-.001 1.706-.493 2.496-1.027 2.507-1.547-.011-.52-.801-1.054-2.507-1.547L15 18.346v-2.052c2.931.593 5 2.028 5 3.706z"></path>
    </svg>
  );
};
