import { StarSVG } from "../Icons/StarSVG";

type UserProfilePageProps = {
  data: any[];
};

export const UserProfilePage = ({ data }: UserProfilePageProps) => {
  return (
    <section className="flex flex-col pb-4">
      {data.map((post, i) => {
        const rateNum = parseInt(post.rating);
        let starArray: any = [];

        for (let i = 1; i <= rateNum; i++) {
          starArray.push(i);
        }

        return (
          <div key={post._id} className="p-4 m-4 rounded-lg bg-lightpurpleTwo">
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
              <div>
                <h1>@{post.username}</h1>
              </div>
            </div>
            <p className="py-4 first-letter:capitalize">{post.post}</p>
            <div className="flex justify-end">
              {starArray.map((item: any, i: number) => {
                return <StarSVG key={i} />;
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
};
