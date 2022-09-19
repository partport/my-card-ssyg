import { FC } from 'react';
import { Button } from 'flowbite-react';
import TrashIcon from '@/components/icons/TrashIcon';

const ButtonDelete: FC<{ onClick: any }> = ({ onClick }) => {
  return (
    <Button color='failure' pill={true} size='sm' onClick={onClick}>
      <TrashIcon />
    </Button>
  );
};

export default ButtonDelete;
