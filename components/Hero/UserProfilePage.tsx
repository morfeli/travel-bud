import { StarSVG } from "../Icons/StarSVG";

type UserProfilePageProps = {
  data: any[];
};

export const UserProfilePage = ({ data }: UserProfilePageProps) => {
  return (
    <section className="flex flex-col h-screen">
      <h1 className="self-center">Public User Reviews</h1>
      {data.map((post, i) => {
        const rateNum = parseInt(post.rating);
        let starArray: any = [];

        for (let i = 1; i <= rateNum; i++) {
          starArray.push(i);
        }

        return (
          <div key={post._id} className="p-2 m-4 bg-red-300 rounded-lg">
            <p>{post.username}</p>
            <h1>{post.venue}</h1>
            <p>{post.post}</p>
            <div className="flex">
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
