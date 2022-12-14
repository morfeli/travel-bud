import { CheckSVG } from "../Icons/CheckSVG";

type InnerButtonProps = {
  captureSortOption: (e: any) => void;
  sortValue: string;
  rate: string;
};

export const InnerButton = ({
  rate,
  captureSortOption,
  sortValue,
}: InnerButtonProps) => {
  return (
    <>
      <button
        type="button"
        className="flex items-center justify-between p-5"
        onClick={captureSortOption}
        value={rate}
        name="dropdown-btn"
      >
        {rate}
        {sortValue == rate ? <CheckSVG /> : null}
      </button>

      <hr />
    </>
  );
};
