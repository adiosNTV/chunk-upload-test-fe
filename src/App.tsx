import { useState } from 'react'
import './App.css'
import { artworkService } from './services/artwork.service'

function App() {

  const [image, setImage] = useState<string | null>(null)
  const [fileupload, setFileupload] = useState<File | null>(null)

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileupload(event.target.files[0])
      setImage(URL.createObjectURL(event.target.files[0]));
    } else {
      setFileupload(null)
      setImage(null);
    }
  }

  const upload = async () => {


    const file = fileupload

    if (!file) {
      return
    }
    const chunkSize = 100 * 1024 * 1024; // Set the desired chunk size (100MB in this example)
    const totalChunks = Math.ceil(file.size / chunkSize);

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      // Make an API call to upload the chunk to the backend
      await artworkService.uploadArtWork(chunk, chunkIndex)
    }
  }
  return (
    <>
      <div>
        <input type='file' onChange={(e) => onImageChange(e)} />
        <button title='Upload' onClick={upload} >Upload</button>
      </div>

      {image && <img alt="preview image" src={image} style={{ maxHeight: "500px" }} />}
    </>
  )
}

export default App
