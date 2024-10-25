import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Info as InfoIcon } from '@mui/icons-material';
import { GetAllKoiFishes } from '../../api/KoiFishApi';
import { addFishProfile, updateFishProfile, getFishProfilebyCustomerid, deleteFishProfile } from '../../api/FishProfileApi';

export default function AddFish() {
  const [fishes, setFishes] = useState([]);
  const [selectedFish, setSelectedFish] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [weight, setWeight] = useState(''); // New state for weight
  const [gender, setGender] = useState(''); // Initialize as empty string
  const [notes, setNotes] = useState('');   // Initialize as empty string


  const [koifish, setKoiFish] = useState([]);  // New state for species
  // const [description, setDescription] = useState(''); // New state for description
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false); // New state for image zoom
  const [selectedFishType, setSelectedFishType] = useState(''); // New state for selected fish type


  // KOI species
  useEffect(() => {
    const getSpeciesList= async () => {
      var koifishData = await GetAllKoiFishes();
      setKoiFish(koifishData);
    };
    getSpeciesList();
  }, []);


  useEffect(() => {
    fetchFishes(); // Fetches fish data on component mount
  }, []);

  //Get API By CustomerID
 const fetchFishes = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user')); // Lấy đối tượng user từ Local Storage
        const customerId = user?.customer?.customerId; // Lấy accountId
        const response = await getFishProfilebyCustomerid(customerId);
        setFishes(response);
    } catch (error) {
        console.error('Error fetching fishes:', error);
    }
  };

  const handleAddFish = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const customerId = user?.customer?.customerId; // Sử dụng đúng đường dẫn để lấy customerId
    const koiFishId = koifish.find(koi => koi.fishType === selectedFishType)?.koiFishId;

    const newFish = {
      weight: parseFloat(weight),
      gender: gender,
      notes: notes,
      image: "image",
      koiFishId: koiFishId,
      customerId: customerId
    };

    console.log('Adding new fish:', newFish);

    try {
      const addedFish = await addFishProfile(newFish);
      localStorage.setItem(`fish_${addedFish.fishProfileId}`, JSON.stringify(newFish));
      setIsFormOpen(false);
      fetchFishes(); // Refresh fish list
    } catch (error) {
      console.error('Error adding fish:', error);
    }
  };

  const handleEditFish = (fish) => {
    setSelectedFish(fish);
    setName(fish.name);
    setImage(fish.image);
    setWeight(fish.weight);
    setGender(fish.gender);
    setNotes(fish.notes);
    setSelectedFishType(fish.koiFish.fishType);
    setIsFormOpen(true);
  };

  const handleDeleteFish = (fish,id) => {
    setSelectedFish(fish,id);
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateFish = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const customerId = user?.accountId;
    const koiFishId = koifish.find(koi => koi.fishType === selectedFishType)?.koiFishId;

    const updatedFish = {
      weight: parseFloat(weight),
      gender: gender,
      notes: notes,
      image: "image",
      koiFishId: koiFishId,
      customerId: customerId
    };

    try {
      await updateFishProfile(selectedFish.fishProfileId, updatedFish);
      localStorage.setItem(`fish_${selectedFish.id}`, JSON.stringify({ ...selectedFish, ...updatedFish }));
      setIsFormOpen(false);
      fetchFishes(); // Refresh fish list
    } catch (error) {
      console.error('Error updating fish:', error);
    }
  };

  const handleFormSubmit = (e) => {
    if (selectedFish) {
      handleUpdateFish(e);
    } else {
      handleAddFish(e);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedFish) {
        await deleteFishProfile(selectedFish.fishProfileId); // Call the actual API to delete the fish profile
        localStorage.removeItem(`fish_${selectedFish.id}`); // Remove fish from Local Storage
        setIsDeleteDialogOpen(false);
        fetchFishes(); // Update the fish list
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            console.log('Image data:', reader.result); // Log the image data
            setImage(reader.result); // Update state with the image data
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleViewDetail = (fish) => {
    setSelectedFish(fish);
    setIsDetailDialogOpen(true);
  };

  const handleImageZoomOpen = () => {
    setIsImageZoomOpen(true);
  };

  const handleImageZoomClose = () => {
    setIsImageZoomOpen(false);
  };

  const handleOpenAddFishForm = () => {
    // Reset form fields to initial state
    setName('');
    setWeight('');
    setGender('');
    setNotes('');
    setImage('');
    setSelectedFishType('');
    setSelectedFish(null); // Ensure no fish is selected
    setIsFormOpen(true); // Open the form
  };

  return (
    <div>
      <p className="text-4xl font-semibold">Add your Fish</p>
      <p className="text-gray-600 text-lg my-2">
        This is your Fish profile. You can update your fish and picture here.
      </p>
      <div className="border-b border-gray-300 my-4"></div>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenAddFishForm}>
        Add Fish
      </Button>
      <List>
        {fishes.map((fish) => (
          <ListItem key={fish.id}>
            <Avatar src={fish.image} alt={fish.name} />
            <ListItemText primary={fish.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="view" onClick={() => handleViewDetail(fish)}>
                <InfoIcon />
              </IconButton>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEditFish(fish)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteFish(fish)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {/* Dialogs for form and delete confirmation */}
      <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <DialogTitle>{selectedFish ? 'Edit Fish' : 'Add Fish'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <TextField
              margin="dense"
              label="Weight"
              type="text"
              fullWidth
              value={weight}
              onChange={(e) => setWeight(e.target.value)} // New input for weight
              required
            />

            <FormControl fullWidth margin="dense">
              <InputLabel id="fish-type-label">Species</InputLabel>
              <Select
                labelId="fish-type-label"
                value={selectedFishType} // Update to use selected species
                onChange={(e) => setSelectedFishType(e.target.value)} // Update state for selected fish type
                displayEmpty // Allow empty value to show placeholder
                required
              >
                <MenuItem value="" disabled>Choose fish type</MenuItem>
                {koifish.map((koifish) => (
                  <MenuItem
                    key={koifish.koiFishId}
                    value={koifish.fishType}
                  >
                    {koifish.fishType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="dense">
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                value={gender} // Update to use selected gender
                onChange={(e) => setGender(e.target.value)} // Update state for gender
                required
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Notes"
              type="text"
              fullWidth
              value={notes} // New input for notes
              onChange={(e) => setNotes(e.target.value)} // Update state for notes
              required
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="image-upload">
              <Button variant="contained" component="span">
                Upload Image
              </Button>
            </label>
            {image && (
              <Avatar
                src={image}
                alt="Fish"
                sx={{ width: 100, height: 100, marginTop: 2 }}
              />
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsFormOpen(false)}>Cancel</Button>
          <Button onClick={handleFormSubmit} color="primary">
            {selectedFish ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} inert={isDeleteDialogOpen}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this fish?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isDetailDialogOpen} onClose={() => setIsDetailDialogOpen(false)}>
        <DialogTitle>Fish Details</DialogTitle>
        <DialogContent>
          {selectedFish && (
            <div>
              <Typography variant="h6">{selectedFish.name}</Typography>
              <Avatar
                src={selectedFish.image}
                alt={selectedFish.name}
                sx={{ width: 100, height: 100, cursor: 'pointer'}} // Add cursor pointer
                onClick={handleImageZoomOpen} // Open zoom on click
              />
              <Typography variant="body1"><strong>Weight:</strong> {selectedFish.weight}</Typography>
              <Typography variant="body1"><strong>Species:</strong> {selectedFish.koiFish.fishType}</Typography>
              <Typography variant="body1"><strong>Description:</strong> {selectedFish.koiFish.description}</Typography>
              <Typography variant="body1"><strong>Gender:</strong> {selectedFish.gender}</Typography>
              <Typography variant="body1"><strong>Notes:</strong> {selectedFish.notes}</Typography>
              {/* <Typography variant="body1">Customer ID: {selectedFish.customerId}</Typography>
              <Typography variant="body1">Fish Profile ID: {selectedFish.fishProfileId}</Typography> */}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDetailDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Image Zoom Dialog */}
      <Dialog open={isImageZoomOpen} onClose={handleImageZoomClose}>
        <DialogContent>
          <img
            src={selectedFish?.image}
            alt={selectedFish?.name}
            style={{ width: '100%', height: 'auto' }} // Adjust image size
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
