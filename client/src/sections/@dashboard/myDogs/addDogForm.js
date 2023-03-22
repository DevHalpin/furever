import { useState, useId } from 'react';
import { Box, TextField, } from '@mui/material';
import axios from 'axios'

import UploadDogImg from './UploadDogImg'

// ----------------------------------------------------------------------

export default function AddDogForm() {

  const [uploadURL, setUploadURL] = useState('');

  const bioTextAreaId = useId();
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    console.log(formData.get('dog_profile_picture'));

    // You can pass formData as a fetch body directly:
    // fetch('/some-api', { method: form.method, body: formData }).then()
    const formJson = Object.fromEntries(formData.entries());
    formJson.dog_profile_picture = uploadURL

    axios({method: "post", data: formJson, url: "/dogs"}).then((response) => {
      console.log(response);
    })

 
  }

  return (
    <>
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <form method="post" onSubmit={handleSubmit}>
      <div>
        <TextField required id="filled-required" label="Required" defaultValue="Name" variant="filled" name="dog_name" />
      </div>

      <div>
        <TextField required id="filled-required" label="Required" defaultValue="Birthday" variant="filled" name="date_birth" />
      </div>
      <div>
        <TextField required id="filled-required" label="Required" defaultValue="Date of passing" variant="filled" name="date_passing"/>
      </div>

      <div> 
      <label htmlFor={bioTextAreaId}>
        Write bio:
        <textarea   id={bioTextAreaId}  name="dog_description" defaultValue="Bio" rows={4} cols={30}  />
      </label>
      </div> 

     { uploadURL && <img src={uploadURL} height="100" width="100" alt="Dog Profile" /> } 
      <UploadDogImg  name="dog_profile_picture" setUploadURL={setUploadURL}/>
      <button type="submit">Save Dog</button>
      </form>
    </Box>
    </>
  );
}
