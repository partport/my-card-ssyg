import { SongsNewType } from "@/constants/songs";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { FC, FormEvent, useRef } from "react";

const CreateSongModal: FC<{
  artist: Array<string>;
  modalOpen: boolean;
  onCloseModal?: any;
  onSubmit: any;
}> = ({ artist, modalOpen = false, onCloseModal, onSubmit }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const artist = e.currentTarget.elements["artist"];
    const title = e.currentTarget.elements["title"];
    const album = e.currentTarget.elements["album"];
    const track = e.currentTarget.elements["track"];
    const length = e.currentTarget.elements["song_length"];
    const notes = e.currentTarget.elements["notes"];
    const releaseDate = e.currentTarget.elements["release_date"];
    const newSong: SongsNewType = {
      artist: artist.value.trim(),
      title: title.value.trim(),
      album: album.value.trim(),
      track: parseInt(track.value.trim() || 0),
      length: parseInt(length.value.trim() || 0),
      notes: parseInt(notes.value.trim() || 0),
      releaseDate: releaseDate.value.trim(),
    };
    onSubmit(newSong);
  };
  return (
    <Modal show={modalOpen} size="xl" popup={true} onClose={onCloseModal}>
      <Modal.Header />
      <Modal.Body>
        <form
          ref={formRef}
          className="flex flex-col gap-4"
          onSubmit={handleOnSubmit}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="artist" value="Artist" />
            </div>
            <Select id="artist">
              {artist.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title" />
            </div>
            <TextInput id="title" type="text" placeholder="title" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="album" value="Album" />
            </div>
            <TextInput id="album" type="text" placeholder="album" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="release_date" value="Release Date" />
            </div>
            <TextInput id="release_date" type="text" placeholder="xxxx-xx-xx" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="track" value="Track" />
              </div>
              <TextInput id="track" type="number" placeholder="0" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="song_length" value="length" />
              </div>
              <TextInput id="song_length" type="number" placeholder="0" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="notes" value="notes" />
              </div>
              <TextInput id="notes" type="number" placeholder="0" />
            </div>
          </div>
          <div className="w-full">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateSongModal;
