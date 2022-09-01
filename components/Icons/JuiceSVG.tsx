import { CategoryType as Props } from "../UI/Categories";

export const JuiceSVG = ({ value }: Props) => {
  return (
    <div className="rounded-full bg-lightpurpleOne w-fit">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 155.883 155.883"
        viewBox="0 0 155.883 155.883"
        className="w-20 h-20 rounded-full"
      >
        <circle cx="98.922" cy="49.126" r="27.492" fill="#ff7500"></circle>
        <circle cx="99.304" cy="48.744" r="22.528" fill="#ffd01f"></circle>
        <circle cx="99.304" cy="48.744" r="22.528" fill="#ffd01f"></circle>
        <path
          fill="#ffb000"
          d="M98.255 47.472V30.184c-9.617.434-17.407 7.843-18.452 17.288h18.452zm20.55-.255c-1.584-9.02-8.963-16.036-18.167-17.056v17.056h18.167zm-20.55 2.801v17.287c-9.617-.434-17.407-7.842-18.452-17.287h18.452zm20.55.253c-1.584 9.02-8.963 16.037-18.167 17.056V50.271h18.167z"
        ></path>
        <path
          fill="#abd9d5"
          d="M94.687 155.883H37.939l-8.47-108h73.688z"
        ></path>
        <path
          fill="#cde8e6"
          d="M64.663 155.883H37.939l-8.47-108h35.194z"
        ></path>
        <path fill="#ddf0ee" d="M88.758 141.883h-44.89l-8.47-94h61.83z"></path>
        <path
          fill="#ff7500"
          d="M37.304 68.606l6.564 72.843h44.89l6.563-72.843z"
        ></path>
        <path
          fill="#ff4f0c"
          d="M66.736 68.606H37.304l6.564 72.843h22.868z"
        ></path>
        <path
          fill="#fff"
          d="M84.175 127.346a4.235 4.235 0 11-8.434-.778l4.048-43.857a4.235 4.235 0 118.434.778l-4.048 43.857z"
        ></path>
        <path fill="#f62d8d" d="M37.694 0l4.988 47.433h8.883L46.576 0z"></path>
      </svg>
    </div>
  );
};
