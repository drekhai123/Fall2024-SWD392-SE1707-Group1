import React, { useState, useEffect, useCallback } from 'react';
import {
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
import _ from "lodash";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Info as InfoIcon } from '@mui/icons-material';
import { GetAllKoiFishes } from '../../api/KoiFishApi';
import { addFishProfile, updateFishProfile, getFishProfileByCustomerId, deleteFishProfile, findProfileByName } from '../../api/FishProfileApi';
import { storage } from '../../../config/ConfigFirebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingScreen from '../../../utils/LoadingScreen';
import { getAllOrderDetails } from '../../api/OrdersApi';



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
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [error, setError] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [certificate, setCertificate] = useState(''); // New state for certificate
  const [weightError, setWeightError] = useState(false); // New state for weight error
  const [orderDetails, setOrderDetails] = useState([]); // New state for order details

  const user = JSON.parse(sessionStorage.getItem('user')); // Lấy đối tượng user từ Local Storage
  const customerId = user?.customer?.customerId; // Lấy accountId
  // KOI species
  useEffect(() => {
    const getSpeciesList = async () => {
      var koifishData = await GetAllKoiFishes();
      setKoiFish(koifishData);
    };
    //Get API By CustomerID
    const fetchFishes = async () => {
      try {
        setLoadingScreen(true);
        const token = sessionStorage.getItem('token'); // Retrieve the token from session storage
        const response = await getFishProfileByCustomerId(customerId, token);
        setFishes(response);
      } catch (error) {
        console.error('Error fetching fishes:', error);
      }
      setLoadingScreen(false)
    };

    // Fetch all order details
    const fetchOrderDetails = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Retrieve the token from session storage
        const response = await getAllOrderDetails(token); // Pass the token to the function
        setOrderDetails(response);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    getSpeciesList();
    fetchFishes();
    fetchOrderDetails();
  }, [refresh, customerId]);
  // Search Feature
  // eslint-disable-next-line
  const handleSearch = useCallback(
    _.debounce((name) => {
      setError(false)
      try {
        if (!name) {  // Check if `name` is empty
          console.log("no search!")
          setRefresh(() => !refresh)
        } else {
          searchResult(name);
        }
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 500),

  );
  const searchResult = async (name) => {
    const response = await findProfileByName(customerId, name);
    if (response.status >= 400) {
      toast.error("Fish not found", {
        autoClose: 2000 // Duration in milliseconds (10 seconds)
      });
      setError(true)
    }
    else
      setFishes(await response.data); // Update the fish list with the search results
    }

  // Update search term and call the debounced search
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };



  const handleAddFish = async (e) => {
    setLoadingScreen(true);
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
      customerId: customerId,
      certificate: certificate
    };
    console.log('Adding new fish with certificate:', certificate);

    try {
      await addFishProfile(newFish);
      toast.success("Add fish successfully", {
        autoClose: 2000 // Duration in milliseconds (10 seconds)
      });
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error adding fish:', error);
    }
    setRefresh(!refresh)
    setLoadingScreen(false)
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
    setImage(fish.image);
    setWeight(fish.weight);
    setGender(fish.gender);
    setNotes(fish.notes);
    setCertificate(fish.certificate);
    setSelectedFishType(fish.koiFish.fishType);
    setIsFormOpen(true);
  };

  const handleDeleteFish = (fish, id) => {
    setSelectedFish(fish, id);
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateFish = async (e) => {
    setLoadingScreen(true);
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
      customerId: customerId,
      certificate: certificate,
    };

    console.log('Updating fish with certificate:', certificate);

    try {
      await updateFishProfile(selectedFish.fishProfileId, updatedFish);
      toast.info("Update fish success", {
        autoClose: 2000 // Duration in milliseconds (2 seconds)
      });
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error updating fish:', error);
    }
    setRefresh(!refresh)
    setLoadingScreen(false)
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

    // Check if certificate is uploaded
    if (!certificate) {
      toast.error("Please upload a certificate.", {
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

  let toastCooldown = false; // Cooldown flag

  const handleDeleteConfirm = async () => {
    if (toastCooldown) return; // Exit if cooldown is active

    if (selectedFish) {
      const fishProfileId = selectedFish.fishProfileId;
      if (!fishProfileId) {
        console.error('Fish profile ID does not exist.');
        showToast("Fish profile ID does not exist.");
        return;
      }

      console.log('Deleting fish profile with ID:', fishProfileId);

      try {
        await deleteFishProfile(fishProfileId);
        showToast("Delete fish success", "success");
        setIsDeleteDialogOpen(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          showToast("Fish is part of an order and cannot be deleted.");
        } else {
          console.error('Error deleting fish:', error);
          showToast("An error occurred while deleting the fish.");
        }
      }
    }
    setRefresh(!refresh);
  };

  const showToast = (message, type = "error") => {
    if (!toastCooldown) {
      toast[type](message, {
        autoClose: 5000 // Duration in milliseconds (2 seconds)
      });
      toastCooldown = true;
      setTimeout(() => {
        toastCooldown = false;
      }, 5000); // Cooldown period of 5 seconds
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      const selectedImage = e.target.files[0];
      const storageRef = ref(storage, `images/${selectedImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedImage);

      uploadTask.on(
        "state_changed",
        //có thiếu snapshot thì không lấy ảnh được
        (snapshot) => {},
        (error) => {
          console.error("Error uploading image:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImage(downloadURL); // Set the image URL to state
          });
        }
      );
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
    setName('');
    setWeight('');
    setGender('');
    setNotes('');
    setImage('');
    setCertificate('');
    setSelectedFishType('');
    setSelectedFish(null);
    setIsFormOpen(true);

  };

  const handleCertificateUpload = (e) => {
    if (e.target.files[0]) {
      const selectedCertificate = e.target.files[0];
      const storageRef = ref(storage, `certificates/${selectedCertificate.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedCertificate);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error("Error uploading certificate:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setCertificate(downloadURL); // Set the certificate URL to state
            console.log('Certificate uploaded:', downloadURL);
          });
        }
      );
    }
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;

    // Ensure the value is a positive number
    if (isNaN(value) || value <= 0) {
      setWeightError(true);
    } else {
      setWeightError(false);
      setWeight(value); // Update weight only if it's valid
    }
  };

  return (
    <div>
      {loadingScreen ?? <LoadingScreen />}
      <ToastContainer />
      <p className="text-4xl font-semibold">Add your Fish</p>
      <p className="text-gray-600 text-lg my-2">
        This is your Fish profile. You can update your fish and picture here.
      </p>
      <input
        type="text"
        placeholder="Search Fish"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          padding: '10px',
          marginBottom: '20px',
          width: '100%',
          fontSize: '16px',
          border: '2px solid #ccc',
          borderRadius: '5px',
          zIndex: 10,
          position: 'relative',
        }}
      />
      <Divider />
      <div style={{ margin: "2%" }}></div>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenAddFishForm}>
        Add Fish
      </Button>
      <List>
        {error ? (
          <ListItem>
            <Typography variant="h4" fontWeight={"bold"} color="warning">
              No Fish Found With That Search
            </Typography>
          </ListItem>
        ) : (
          paginatedFishes.map((fish, index) => {
            const isFishInOrder = orderDetails.some(order => order.fishProfileId === fish.fishProfileId);
            return (
              <ListItem key={index}>
                <Avatar src={fish.image} alt={fish.name} style={{ marginRight: "3%" }} />
                <ListItemText primary={fish.name} />
                <IconButton edge="end" aria-label="view" onClick={() => handleViewDetail(fish)}>
                  <InfoIcon />
                </IconButton>
                {!isFishInOrder && ( // Check if fish is not part of an order
                  <>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditFish(fish)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteFish(fish)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </ListItem>
            );
          })
        )}
      </List>
      <div className='pagination-footer' style={{
        position: 'relative',
      }}>
        <Divider />
        {fishes.length > 5 && // Paging only if 5 or more fishes
        <div className="pagination">
            <Pagination
              count={Math.ceil(fishes.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
        </div>
          }
      </div>
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
              type="number"
              fullWidth
              value={weight}
              onChange={handleWeightChange}
              error={weightError}
              helperText={weightError ? "Please enter a valid number greater than 0" : ""}
              required
            />
            <FormControl required aria-selected fullWidth margin="dense">
              <InputLabel style={{ backgroundColor: "white", marginRight: "5px", marginLeft: "5px" }} required id="fish-type-label">Species</InputLabel>
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
              <InputLabel required id="gender-label" style={{ backgroundColor: "white", marginRight: "5px", marginLeft: "5px" }}>Gender</InputLabel>
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
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              rows={4}
            />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginTop: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                  id="certificate-upload"
                  type="file"
                  onChange={handleCertificateUpload}
                />
                <label htmlFor="certificate-upload">
                  <Button variant="contained" component="span">
                    Upload Certificate
                  </Button>
                </label>
                {certificate && (
                  <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
                    <a
                      href={certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'blue', textDecoration: 'underline' }}
                    >
                      View Certificate
                    </a>
                  </Typography>
                )}
              </div>
            </div>
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
              <Typography variant="h6"><strong>{selectedFish.name}</strong></Typography>
              <Avatar
                src={selectedFish.image}
                alt={selectedFish.name}
                sx={{ width: 150, height: 100, cursor: 'pointer', marginTop: 2, borderRadius: 0 }}
                onClick={handleImageZoomOpen}
              />
              <Typography variant="body1"><strong>Weight:</strong> {selectedFish.weight} kg</Typography>
              <Typography variant="body1"><strong>Species:</strong> {selectedFish.koiFish.fishType}</Typography>
              <Typography variant="body1"><strong>Description:</strong> {selectedFish.koiFish.description}</Typography>
              <Typography variant="body1"><strong>Gender:</strong> {selectedFish.gender}</Typography>
              <Typography variant="body1"><strong>Notes:</strong> {selectedFish.notes}</Typography>
              {selectedFish.certificate && (
                <Typography variant="body1">
                  <strong>Certificate: </strong>
                  <a
                    href={selectedFish.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'blue', textDecoration: 'underline' }}
                  >
                    View Certificate
                  </a>
                </Typography>
              )}
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
