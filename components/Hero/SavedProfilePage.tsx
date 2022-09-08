type SavedProfilePageProps = {
  length: number;
  data: any[];
};

export const SavedProfilePage = ({ length, data }: SavedProfilePageProps) => {
  return (
    <section className="pt-10">
      <div className="flex items-center justify-between w-48 mx-auto">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-medpurpleOne">
          {length}
        </div>
        <h1 className="text-xl text-center">Saved Venues</h1>
      </div>

      <div className="grid sm:grid-cols-4">
        {data[0].savedVenues.map((item: any, i: number) => (
          <div key={i} className="p-4 m-4 rounded-md bg-lightpurpleThree">
            <h1>{item.name}</h1>
            <p>
              {item.address}, {item.locality}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
