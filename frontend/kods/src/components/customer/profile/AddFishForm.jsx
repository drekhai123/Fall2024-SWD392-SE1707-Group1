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
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Info as InfoIcon } from '@mui/icons-material';

// Mock API functions (replace these with actual API calls in a real application)
const mockApi = {
  getFishes: () => Promise.resolve([
    {
      id: 1,
      name: 'Koi Fish 1',
      image: '/placeholder.svg?height=50&width=50',
      weight: '1kg',
      species: 'Koi',
      description: 'A beautiful koi fish.'
    },
    {
      id: 2,
      name: 'Koi Fish 2',
      image: '/placeholder.svg?height=50&width=50',
      weight: '1.5kg',
      species: 'Koi',
      description: 'Another beautiful koi fish.'
    },
  ]),
  addFish: (fish) => Promise.resolve({ ...fish, id: Date.now() }),
  updateFish: (fish) => Promise.resolve(fish),
  deleteFish: (id) => Promise.resolve(),
};

export default function AddFish() {
  const [fishes, setFishes] = useState([]);
  const [selectedFish, setSelectedFish] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [weight, setWeight] = useState(''); // New state for weight
  const [species, setSpecies] = useState(''); // New state for species
  const [description, setDescription] = useState(''); // New state for description
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false); // New state for image zoom

  useEffect(() => {
    fetchFishes(); // Fetches fish data on component mount
  }, []);

  const fetchFishes = async () => {
    const fetchedFishes = await mockApi.getFishes(); // Fetches from mockApi
    const localFishes = Object.keys(localStorage)
      .filter(key => key.startsWith('fish_'))
      .map(key => JSON.parse(localStorage.getItem(key)));
    setFishes([...fetchedFishes, ...localFishes]); // Cập nhật state với dữ liệu từ mockApi và Local Storage
  };

  const handleAddFish = () => {
    setSelectedFish(null);
    setName('');
    setImage('');
    setIsFormOpen(true);
  };

  const handleEditFish = (fish) => {
    setSelectedFish(fish);
    setName(fish.name);
    setImage(fish.image);
    setIsFormOpen(true);
  };

  const handleDeleteFish = (fish) => {
    setSelectedFish(fish);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newFish = { name, image, weight, species, description }; // Tạo đối tượng cá mới
    if (selectedFish) {
      await mockApi.updateFish({ ...selectedFish, ...newFish }); // Cập nhật cá đã chọn
    } else {
      await mockApi.addFish(newFish); // Thêm cá mới
      localStorage.setItem(`fish_${Date.now()}`, JSON.stringify(newFish)); // Lưu cá mới vào Local Storage
    }
    setIsFormOpen(false);
    fetchFishes(); // Cập nhật danh sách cá
  };

  const handleDeleteConfirm = async () => {
    if (selectedFish) {
      await mockApi.deleteFish(selectedFish.id);
      setIsDeleteDialogOpen(false);
      fetchFishes();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
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

  return (
    <div>
      <p className="text-4xl font-semibold">Add your Fish</p>
      <p className="text-gray-600 text-lg my-2">
        This is your Fish profile. You can update your fish and picture here.
      </p>
      <div className="border-b border-gray-300 my-4"></div>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddFish}>
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
            <TextField
              margin="dense"
              label="Species"
              type="text"
              fullWidth
              value={species}
              onChange={(e) => setSpecies(e.target.value)} // New input for species
              required
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)} // New input for description
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
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
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
                sx={{ width: 100, height: 100, cursor: 'pointer' }} // Add cursor pointer
                onClick={handleImageZoomOpen} // Open zoom on click
              />
              <Typography variant="body1">Weight: {selectedFish.weight}</Typography>
              <Typography variant="body1">Species: {selectedFish.species}</Typography>
              <Typography variant="body1">Description: {selectedFish.description}</Typography>
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
