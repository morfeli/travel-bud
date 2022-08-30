import { Data as iData } from "./SearchBar";

type DestinationCardProps = {
  error: boolean;
  loading: boolean;
  data: iData[];
};

export const DestinationCard = ({
  error,
  loading,
  data,
}: DestinationCardProps) => {
  if (error) {
    return <p>There has been an error! Please try again.</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (data) {
    data.map((item) => (
      <div key={item.fsq_id}>
        <p>{item.name}</p>
        <p>{item.location.address}</p>
      </div>
    ));
  }

  return <p>elloh</p>;
};
