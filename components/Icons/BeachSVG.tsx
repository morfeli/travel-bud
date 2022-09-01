import { CategoryType as Props } from "../UI/Categories";
import { useTravelContext } from "../helper-functions/useTravelContext";

export const BeachSVG = ({ value }: Props) => {
  const travelCtx = useTravelContext();

  const toggleFetch = () => {
    travelCtx.toggleUserSearch(value);
    travelCtx.fetchData();
  };

  return (
    <div className="bg-white rounded-full w-fit" onClick={() => toggleFetch()}>
      <svg
        className="w-20 h-20 rounded-full"
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 512 512"
        viewBox="0 0 512 512"
      >
        <path fill="#3fa9f5" d="M0 270.327h512v104.49H0z"></path>
        <path fill="#ffd46a" d="M0 374.817h512v130.612H0z"></path>
        <path
          fill="#ffd248"
          d="M412.735 71.799c34.586 0 62.694 28.108 62.694 62.694s-28.108 62.694-62.694 62.694-62.694-28.108-62.694-62.694 28.108-62.694 62.694-62.694z"
        ></path>
        <path
          fill="#b3b3b3"
          d="M245.551 197.186h-62.694c0-62.694-36.571-99.265-36.571-99.265 54.857 0 99.265 44.408 99.265 99.265z"
        ></path>
        <path
          fill="#ccc"
          d="M146.286 97.921s36.571 36.571 36.571 99.265H104.49c0-52.245 41.796-99.265 41.796-99.265z"
        ></path>
        <path
          fill="#e6e6e6"
          d="M146.286 97.921s-41.796 47.02-41.796 99.265H47.02c0-54.857 44.409-99.265 99.266-99.265z"
        ></path>
        <path d="M180.245 40.452h15.673c0-5.186 4.472-9.757 13.292-13.59 8.089-3.514 16.479-4.765 16.563-4.776l-1.12-7.756-1.109-7.758c-10.65 1.522-26.184 6.3-35.463 15.703-9.279-9.403-24.813-14.181-35.463-15.703l-2.216 15.517c6.304.899 29.843 6.655 29.843 18.363zm83.592 52.245h15.673c0-5.186 4.472-9.757 13.292-13.59 8.089-3.514 16.479-4.765 16.563-4.776l-1.12-7.756-1.109-7.758c-10.65 1.521-26.185 6.3-35.463 15.703-9.279-9.403-24.813-14.181-35.463-15.703l-2.216 15.517c6.304.899 29.843 6.654 29.843 18.363zM26.122 450.572H47.02v15.673H26.122zm41.796-41.796h20.898v15.673H67.918zm0 62.694h20.898v15.673H67.918zm62.694-10.449h20.898v15.673h-20.898zm73.143 10.449h20.898v15.673h-20.898zm0-52.245h20.898v15.673h-20.898zm62.694-10.449h20.898v15.673h-20.898zm73.143 31.347h20.898v15.673h-20.898zm-52.245 31.347h20.898v15.673h-20.898zm104.49-62.694h20.898v15.673h-20.898zm0 62.694h20.898v15.673h-20.898zm73.143-31.347h20.898v15.673H464.98zM219.429 309.511h47.02v15.673h-47.02zm57.469 0h20.898v15.673h-20.898zm-256 20.898h47.02v15.673h-47.02zm57.469 0h20.898v15.673H78.367zm329.143 0h47.02v15.673h-47.02zm-31.347 0h20.898v15.673h-20.898z"></path>
        <path d="M512 262.492H154.122v-57.469h99.265v-7.837c0-59.057-48.045-107.102-107.102-107.102S39.184 138.13 39.184 197.186v7.837h99.265v57.469H0v15.673h138.449v88.816H0v15.673h138.449v31.347h-23.51v15.673h62.694v-15.673h-23.51v-31.347H512v-15.673H154.122v-88.816H512v-15.673zM112.666 189.35c2.868-34.181 23.526-65.466 33.763-79.066 9.151 12.074 26.295 39.7 28.364 79.066h-62.127zm124.716 0h-46.891c-1.768-38.054-16.039-66.042-26.755-81.921 39.596 7.684 70.155 41.001 73.646 81.921zm-108.279-81.966c-12.07 17.268-29.727 47.89-32.165 81.966H55.189c3.5-41.012 34.189-74.38 73.914-81.966z"></path>
        <path d="M412.735 205.023c38.891 0 70.531-31.64 70.531-70.531s-31.64-70.531-70.531-70.531-70.531 31.64-70.531 70.531 31.64 70.531 70.531 70.531zm0-125.388c30.248 0 54.857 24.608 54.857 54.857s-24.609 54.857-54.857 54.857-54.857-24.608-54.857-54.857 24.609-54.857 54.857-54.857z"></path>
      </svg>
    </div>
  );
};
