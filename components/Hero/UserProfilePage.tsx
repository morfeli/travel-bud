import { StarSVG } from "../Icons/StarSVG";
import { useTravelContext } from "../helper-functions/useTravelContext";
import classNames from "classnames";

type UserProfilePageProps = {
  data: any[];
};

export const UserProfilePage = ({ data }: UserProfilePageProps) => {
  const travelCtx = useTravelContext();

  const divStyle = classNames("p-4 m-4 rounded-lg", {
    "bg-white": travelCtx.darkMode,
    "bg-lightpurpleTwo": !travelCtx.darkMode,
  });

  return (
    <section className="flex flex-col md:h-screen md:overflow-y-scroll md:scroll-smooth">
      {data.map((post, i) => {
        const rateNum = parseInt(post.rating);
        let starArray: any = [];

        for (let i = 1; i <= rateNum; i++) {
          starArray.push(i);
        }

        return (
          <div key={post._id} className={divStyle}>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="pb-1 text-lg font-bold border-b-2 w-fit border-darkpurpleThree">
                  {post.venue}
                </h1>
                <p className="pt-2">
                  {post.address}
                  {post.localilty}
                </p>
              </div>
              <div className="flex pl-1">
                {starArray.map((item: any, i: number) => {
                  return <StarSVG key={i} />;
                })}
              </div>
            </div>
            <p className="py-4 first-letter:capitalize">{post.post}</p>

            <div className="flex justify-end">
              <h1 className="italic">@{post.username}</h1>
            </div>
          </div>
        );
      })}
    </section>
  );
};
