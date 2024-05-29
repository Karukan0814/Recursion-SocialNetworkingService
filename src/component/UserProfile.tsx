import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    name: "",
    age: "",
    location: "",
    hobbies: "",
    bio: "",
    image: null,
  });

  const handleClose = () => setOpen(false);

  const handleChange = (event: any) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      setUser((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setUser((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSave = () => {
    // Save data logic here
    handleClose();
  };

  return (
    <div>
      {" "}
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Edit Your Profile
      </Typography>
      <TextField
        margin="dense"
        id="name"
        label="Name"
        type="text"
        fullWidth
        variant="standard"
        name="name"
        value={user.name}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        id="age"
        label="Age"
        type="number"
        fullWidth
        variant="standard"
        name="age"
        value={user.age}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        id="location"
        label="Location"
        type="text"
        fullWidth
        variant="standard"
        name="location"
        value={user.location}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        id="hobbies"
        label="Hobbies"
        type="text"
        fullWidth
        variant="standard"
        name="hobbies"
        value={user.hobbies}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        id="bio"
        label="Bio"
        type="text"
        fullWidth
        multiline
        rows={4}
        variant="standard"
        name="bio"
        value={user.bio}
        onChange={handleChange}
      />
      <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
        Upload Image
        <input
          type="file"
          hidden
          accept="image/*"
          name="image"
          onChange={handleChange}
        />
      </Button>
      <Button
        onClick={handleSave}
        style={{ marginTop: 20 }}
        variant="contained"
      >
        Save
      </Button>
    </div>
  );
};

export default UserProfile;
