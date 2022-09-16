import { FC } from "react";
import { Button } from "flowbite-react";

const ButtonDelete: FC<{ onClick: any }> = ({ onClick }) => {
  return (
    <Button color="failure" pill={true} size="sm" onClick={onClick}>
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </Button>
  );
};

export default ButtonDelete;
