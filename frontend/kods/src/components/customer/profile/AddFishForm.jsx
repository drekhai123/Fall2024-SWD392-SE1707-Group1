import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
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
  Pagination,
  Divider
} from '@mui/material';

import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Info as InfoIcon } from '@mui/icons-material';
import { GetAllKoiFishes } from '../../api/KoiFishApi';
import { addFishProfile, updateFishProfile, getFishProfilebyCustomerid, deleteFishProfile } from '../../api/FishProfileApi';
import { storage } from '../../../config/ConfigFirebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function AddFish() {
  const [fishes, setFishes] = useState([]);
  const [selectedFish, setSelectedFish] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [notes, setNotes] = useState('');
  const [koifish, setKoiFish] = useState([]);  //state for species
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false); // state for image zoom
  const [selectedFishType, setSelectedFishType] = useState(''); //  state for selected fish type


  // KOI species
  useEffect(() => {
    const getSpeciesList= async () => {
      var koifishData = await GetAllKoiFishes();
      setKoiFish(koifishData);
    };
      //Get API By CustomerID
 const fetchFishes = async () => {
  try {
      const user = JSON.parse(sessionStorage.getItem('user')); // Lấy đối tượng user từ Local Storage
      const customerId = user?.customer?.customerId; // Lấy accountId
      const response = await getFishProfilebyCustomerid(customerId);
      setFishes(response);
      console.log(fishes)
  } catch (error) {
      console.error('Error fetching fishes:', error);
  }
};
    getSpeciesList();
    fetchFishes();
  }, []);


  const handleAddFish = async (e) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem('user')); // Changed to sessionStorage
    const customerId = user?.customer?.customerId;
    const koiFishId = koifish.find(koi => koi.fishType === selectedFishType)?.koiFishId;
    const newFish = {
        name: name,
        weight: parseFloat(weight),
        gender: gender,
        notes: notes,
        image: image,
        koiFishId: koiFishId,
        customerId: customerId
    };
    console.log('Adding new fish:', newFish);

    try {
        await addFishProfile(newFish);
        toast.success("Add fish successfully", {
            autoClose: 2000 // Duration in milliseconds (10 seconds)
        });
        setIsFormOpen(false);
    } catch (error) {
        console.error('Error adding fish:', error);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFishes = fishes.slice(startIndex, startIndex + itemsPerPage);


  const handleEditFish = (fish) => {
    setSelectedFish(fish);
    setName(fish.name);
    setImage(fish.image );
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
    const user = JSON.parse(sessionStorage.getItem('user'));
    const customerId = user?.accountId;
    const koiFishId = koifish.find(koi => koi.fishType === selectedFishType)?.koiFishId;

    const updatedFish = {
        name: name,
        weight: parseFloat(weight),
        gender: gender,
        notes: notes,
        image: image, // Use the image URL from state
        koiFishId: koiFishId,
        customerId: customerId
    };

    try {
        await updateFishProfile(selectedFish.fishProfileId, updatedFish);
        toast.info("Update fish success", {
            autoClose: 2000 // Duration in milliseconds (2 seconds)
        });
        setIsFormOpen(false);
    } catch (error) {
        console.error('Error updating fish:', error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if all required fields are filled
    if (!name || !weight || !gender || !selectedFishType || !image) {
        toast.error("Please fill out all required fields.", {
            autoClose: 2000 // Duration in milliseconds (10 seconds)
        });
        return;
    }

    if (selectedFish) {
        handleUpdateFish(e);
    } else {
        handleAddFish(e);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedFish) {
        try {
            await deleteFishProfile(selectedFish.fishProfileId); // Call the actual API to delete the fish profile
            toast.error("Delete fish success", {
                autoClose: 2000 // Duration in milliseconds (2 seconds)
            });
            setIsDeleteDialogOpen(false);
        } catch (error) {
            console.error('Error deleting fish:', error);
        }
    }
  };


  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      const selectedImage = e.target.files[0];
      const storageRef = ref(storage, `images/${selectedImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          console.error("Error uploading image:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImage(downloadURL); // Set the image URL to state
          });
        }
      );
    }
  };

  const fetchImageFromFirebase = async (imageName) => {
    try {
      const storageRef = ref(storage, `images/${imageName}`);
      const url = await getDownloadURL(storageRef);
      setImage(url); // Set the image URL to state
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    // Call this function with the specific image name you want to fetch
    fetchImageFromFirebase('your-image-name.jpg');
  }, []);

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
    setName('');
    setWeight('');
    setGender('');
    setNotes('');
    setImage('');
    setSelectedFishType('');
    setSelectedFish(null);
    setIsFormOpen(true);
  };


  return (
    <div>
      <ToastContainer />
      <p className="text-4xl font-semibold">Add your Fish</p>
      <p className="text-gray-600 text-lg my-2">
        This is your Fish profile. You can update your fish and picture here.
      </p>
      <div className="border-b border-gray-300 my-4"></div>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenAddFishForm}>
        Add Fish
      </Button>
      <List>
        {paginatedFishes.map((fish,index) => (
          <ListItem key={index}>
            <Avatar src={fish.image} alt={fish.name} style={{marginRight:"3%"}} />
            <ListItemText primary={fish.name} />
              <IconButton edge="end" aria-label="view" onClick={() => handleViewDetail(fish)}>
                <InfoIcon />
              </IconButton>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEditFish(fish)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteFish(fish)}>
                <DeleteIcon />
              </IconButton>
              <Divider/>
          </ListItem>
        ))}
      </List>
      {paginatedFishes.length>5?
       <Pagination
       count={Math.ceil(fishes.length / itemsPerPage)}
       page={currentPage}
       onChange={handlePageChange}
       color="primary"
     />
     :
     "" // Paging only if 5 or more fishes
    }
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
              onChange={(e) => setWeight(e.target.value)}
              required
            />
            <FormControl required aria-selected fullWidth margin="dense">
            <InputLabel style={{backgroundColor:"white",marginRight:"5px",marginLeft:"5px"}} required id="fish-type-label">Species</InputLabel>
              <Select
                labelId="fish-type-label"
                value={selectedFishType} // Update to use selected species
                onChange={(e) => setSelectedFishType(e.target.value)} // Update state for selected fish type
                placeholder='Koi Type'
                required
              >
                <MenuItem value="Koi Type">Choose Koi type</MenuItem>
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
              <InputLabel required id="gender-label" style={{backgroundColor:"white",marginRight:"5px",marginLeft:"5px"}}>Gender</InputLabel>
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
                sx={{ width: 100, height: 100, cursor: 'pointer'}} // Add cursor pointer
                onClick={handleImageZoomOpen} // Open zoom on click
              />
              <Typography variant="body1"><strong>Weight:</strong> {selectedFish.weight} kg</Typography>
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
