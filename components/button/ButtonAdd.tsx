import { FC } from 'react';
import { Button } from 'flowbite-react';
import PlusIcon from '@/components/icons/PlusIcon';

const ButtonAdd: FC<{ onClick: any }> = ({ onClick }) => {
  return (
    <Button pill={true} gradientMonochrome='info' onClick={onClick}>
      <PlusIcon/>
      Add
    </Button>
  );
};

export default ButtonAdd;
