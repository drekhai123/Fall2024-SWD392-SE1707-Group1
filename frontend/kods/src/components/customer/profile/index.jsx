import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form"; // Import react-hook-form
import UserProfileForm from "./ProfileForm"; // Keep the import for the form component
import Sidebar from "./UserSidebar";
import Footer from "../../common/footer";
import NavbarUser from "./NavbarUser";
import { GetAccountById, UpdateAccount } from "../../api/AccountApi"; // Import API functions
import { useSnackbar } from "notistack"; // Import useSnackbar from notistack

const menuItems = [
  { label: "Profile", link: "/profile" },
  // Additional menu items...
];

const UserProfilePage = () => {
  const [userData, setUserData] = useState(null); // State to hold user data
  const userId = 4; // Assuming userId is hardcoded for this example
  const methods = useForm(); // Initialize useForm hook
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await GetAccountById(userId);
        setUserData(response.data);
        methods.reset(response.data); // Reset form values with fetched user data
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, [userId, methods]);

  const onSubmit = async (data) => {
    try {
      const response = await UpdateAccount(userId, data);
      console.log(response.data);

      setUserData(response.data);
      methods.reset(response.data);

      enqueueSnackbar("Profile updated successfully!", { variant: "success" });
    } catch (error) {
      console.error("Error submitting form: ", error);
      enqueueSnackbar("Error updating profile. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <div>
      <NavbarUser />
      <div className="mx-auto px-1 md:px-16">
        <div>
          <p className="text-4xl font-semibold">User Profile</p>
          <p className="text-gray-600 text-lg my-4">
            This is your user profile. You can update your name and email here.
          </p>
          <div className="border-b border-gray-300 mt-4"></div>
        </div>
        <div className="flex min-h-screen">
          <FormProvider {...methods}>
            <div>
              <Sidebar items={menuItems} userData={userData} />
            </div>

            <div className="flex-1 p-8">
              <UserProfileForm
                userData={userData}
                onSubmit={onSubmit}
                methods={methods}
              />
            </div>
          </FormProvider>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfilePage;
