import { FC } from 'react';
import { Button } from 'flowbite-react';
import PencilAltIcon from '../icon/PencilAltIcon';

const ButtonEdit: FC<{ onClick: any }> = ({ onClick }) => {
  return (
    <Button color='gray' pill={true} size='sm' onClick={onClick}>
      <PencilAltIcon />
    </Button>
  );
};

export default ButtonEdit;
