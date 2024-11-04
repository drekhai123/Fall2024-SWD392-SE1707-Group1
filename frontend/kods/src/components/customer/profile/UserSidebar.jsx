import React, { useState, useEffect } from "react";
import { Avatar, Button, Modal, Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { updateAvatar, GetAccountById } from "../../api/AccountApi";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../../config/ConfigFirebase';

const Sidebar = ({ items, userData }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(userData?.avatar || "https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar1.jpg");
  const [tempAvatarSrc, setTempAvatarSrc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    async function fetchAccountData() {
      if (!userData || !userData.accountId) {
        console.error('User data or account ID is missing');
        return;
      }
      try {
        const response = await GetAccountById(userData.accountId);
        const accountData = response.data;
        // Update state with fetched account data if needed
        console.log('Fetched account data:', accountData);
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    }

    fetchAccountData();
  }, [userData]); // Updated dependency array

  const isActiveLink = (link) => {
    return currentPath === link;
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

          const updatedData = await updateAvatar(accountId, avatarURL);
          console.log('Avatar updated successfully:', updatedData);

          setAvatarSrc(avatarURL);
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
    <aside className="group/sidebar flex flex-col h-full shrink-0 lg:w-[350px] w-[300px] transition-all duration-300 ease-in-out m-0 relative bg-white border-r border-r-dashed border-r-neutral-200">
      <div className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center mr-5">
          <Avatar
            className="w-[40px] h-[40px] shrink-0 inline-block rounded-[.95rem] cursor-pointer"
            src={avatarSrc}
            alt="avatar image"
            onClick={handleAvatarClick}
          />
          <div className="mr-2">
            <div className="hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium text-secondary-inverse">
              {userData?.userName || "User Name"}
            </div>
            <span className="text-secondary-dark font-medium block text-[0.85rem]">
              {userData?.role || "unknown"}
            </span>
          </div>
        </div>
      </div>

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

      <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>

      <div className="relative pl-3 my-5 overflow-hidden">
        <div className="flex flex-col w-full font-medium">
          {items.map((item, index) => (
            <div key={index}>
              <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                <Link
                  to={item.link}
                  className={`flex items-center flex-grow text-[1.15rem] ${
                    isActiveLink(item.link)
                      ? "bg-gray-100 text-black font-bold rounded-md"
                      : "text-black"
                  } p-2 transition-all duration-200`}
                >
                  {item.label}
                </Link>
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
