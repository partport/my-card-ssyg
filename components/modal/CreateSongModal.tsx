import { Button, Label, Modal, Select, TextInput } from 'flowbite-react';
import { FC } from 'react';
import ButtonAdd from '../button/ButtonAdd';

const CreateSongModal: FC<{
  modalOpen: boolean;
  onCloseModal?: any;
  artist: Array<string>;
}> = ({ modalOpen = false, onCloseModal, artist }) => {
  return (
    <Modal show={modalOpen} size='xl' popup={true} onClose={onCloseModal}>
      <Modal.Header />
      <Modal.Body>
        <form className='flex flex-col gap-4'>
          <div id='select'>
            <div className='mb-2 block'>
              <Label htmlFor='artist' value='Artist' />
            </div>
            <Select id='artist' required={true}>
              {artist.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </Select>
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='title' value='Title' />
            </div>
            <TextInput id='title' type='text' required={true} />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='album' value='Album' />
            </div>
            <TextInput id='album' type='text' required={true} />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='releaseDate' value='Release Date' />
            </div>
            <TextInput
              id='releaseDate'
              type='text'
              required={true}
              placeholder='xxxx-xx-xx'
            />
          </div>
          <div className='grid grid-cols-3 gap-2'>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='track' value='Track' />
              </div>
              <TextInput id='track' type='number' required={true} />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='length' value='length' />
              </div>
              <TextInput id='length' type='number' required={true} />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='notes' value='notes' />
              </div>
              <TextInput id='notes' type='number' required={true} />
            </div>
          </div>
          <div className='w-full'>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateSongModal;
