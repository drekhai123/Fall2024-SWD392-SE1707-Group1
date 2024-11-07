import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
  Button,
  Modal,
} from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../common/navbar';
import AddFish from './AddFishForm';
import ViewOrderHistory from './ViewOrderHistory';
import ProfileForm from './ProfileForm';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../../config/ConfigFirebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateAvatar, GetAccountById } from "../../api/AccountApi"; // Import API functions

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function IndexUserProfile() {
  const [value, setValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState("");
  const [tempAvatarSrc, setTempAvatarSrc] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();
  const [lastToastTime, setLastToastTime] = useState(0);

  // Initialize methods with useForm
  const methods = useForm();

  useEffect(() => {
    navigate('/profile/Information');
  }, [navigate]);

  useEffect(() => {
    // Retrieve user data from session storage
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    if (sessionUser && sessionUser.accountId) {
      setUserData(sessionUser);
    } else {
      console.error('User data or account ID is missing in session');
    }
  }, []);

  useEffect(() => {
    async function fetchAccountData() {
      if (!userData || !userData.accountId) {
        console.error('User data or account ID is missing');
        return;
      }
      try {
        const response = await GetAccountById(userData.accountId);
        const accountData = response.data;

        if (accountData.avatar) {
          setAvatarSrc(accountData.avatar);
        } else {
          console.error('Avatar URL is missing in account data');
        }

        if (accountData.userName) {
          setUserData(prevData => ({ ...prevData, userName: accountData.userName }));
        } else {
          console.error('User name is missing in account data');
        }

        if (accountData.email) {
          setUserData(prevData => ({ ...prevData, email: accountData.email }));
        } else {
          console.error('Email is missing in account data');
        }

      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    }

    fetchAccountData();
  }, [userData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/profile/Information');
        break;
      case 1:
        navigate('/profile/AddFish');
        break;
      case 2:
        navigate('/profile/ViewOrderHistory');
        break;
      default:
        break;
    }
  };

  const handleAvatarClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setTempAvatarSrc(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newTempAvatarSrc = URL.createObjectURL(file);
      setTempAvatarSrc(newTempAvatarSrc);
      setSelectedFile(file);
    }
  };

  async function handleUploadAndUpdateAvatar(file, accountId) {
    try {
      console.log('Starting avatar upload for file:', file.name);
      const storageRef = ref(storage, `avatars/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: Handle upload progress here
        },
        (error) => {
          console.error("Error uploading avatar:", error);
        },
        async () => {
          const avatarURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('Download URL obtained:', avatarURL);

          // Update avatar in the database
          const updatedData = await updateAvatar(accountId, avatarURL);
          console.log('Avatar updated successfully:', updatedData);

          // Fetch updated account data
          const response = await GetAccountById(accountId);
          const accountData = response.data;

          // Update state with new avatar URL
          setAvatarSrc(accountData.avatar);

          // Show success toast with cooldown
          const currentTime = Date.now();
          if (currentTime - lastToastTime > 5000) { // 5 seconds cooldown
            toast.success("Avatar updated successfully!");
            setLastToastTime(currentTime);
          }
        }
      );
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  }

  const handleUpload = () => {
    if (selectedFile && userData && userData.accountId) {
      handleUploadAndUpdateAvatar(selectedFile, userData.accountId);
    }
    handleClose();
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 13, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 2, mt: 2 }}>
                <Avatar
                  alt="User Name"
                  src={avatarSrc}
                  sx={{ width: 128, height: 128, mb: 2 }}
                  onClick={handleAvatarClick}
                />
                <Typography variant="h7" component="h2">
                  {userData.userName}
                </Typography>
                <Typography variant="h5" component="h2">
                  {userData.email}
                </Typography>
                <Typography variant="h5" component="h2">
                  {userData.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            <Card>
              <CardContent>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="user profile tabs"
                    // variant={isMobile ? "scrollable" : "standard"}
                    // scrollButtons={isMobile ? "auto" : false}
                  >
                    <Tab label="Profile" {...a11yProps(0)} sx={{ minWidth: 120, fontWeight: 'bold' }} />
                    <Tab label="Add Fish" {...a11yProps(1)} sx={{ minWidth: 120, fontWeight: 'bold' }} />
                    <Tab label="Order History" {...a11yProps(2)} sx={{ minWidth: 120, fontWeight: 'bold' }} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <FormProvider {...methods}>
                    <ProfileForm methods={methods} />
                  </FormProvider>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <AddFish />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <ViewOrderHistory />
                </TabPanel>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Modal open={isModalOpen} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Upload Avatar
          </Typography>
          {tempAvatarSrc && (
            <img src={tempAvatarSrc} alt="Preview" className="mb-4 w-full h-auto" />
          )}
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: 'block', marginBottom: '16px' }}
          />
          <div className="flex justify-end">
            <Button onClick={handleClose} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleUpload}>
              Upload
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}