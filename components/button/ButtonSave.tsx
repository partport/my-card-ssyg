import { FC } from 'react';
import { Button } from 'flowbite-react';
import UploadIcon from '../icon/UploadIcon';

const ButtonSave: FC<{ onClick: any }> = ({ onClick }) => {
  return (
    <Button pill={true} size='sm' onClick={onClick}>
      <UploadIcon />
    </Button>
  );
};

export default ButtonSave;
