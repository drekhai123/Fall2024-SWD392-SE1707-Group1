import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import UserProfileForm from "./ProfileForm";
import CustomerForm from "./CustomerForm"; // Import form khách hàng
import Sidebar from "./UserSidebar";
import Footer from "../../common/footer";
import NavbarUser from "./NavbarUser";
import { GetAccountById, UpdateAccount } from "../../api/AccountApi";
import { GetCustomerById, UpdateCustomer } from "../../api/CustomerApi"; // API khách hàng
import { useSnackbar } from "notistack";
import { useLocation } from "react-router-dom"; // Import useLocation để lấy đường dẫn
import AddFishForm from "./AddFishForm"; // Import AddFishForm

const menuItems = [
  { label: "Profile", link: "/profile" },
  { label: "Information", link: "/profile/customer" },
  { label: "Add Fish", link: "/profile/addfish" }, // Thêm mục Add Fish
];

const UserProfilePage = () => {
  const location = useLocation(); // Lấy current path
  const currentPath = location.pathname;
  const [userData, setUserData] = useState(null); // Dữ liệu tài khoản
  const [customerData, setCustomerData] = useState(null); // Dữ liệu khách hàng
  // const userId = 4; // Lấy ID của tài khoản
  const user = JSON.parse(localStorage.getItem("account"));
  const userId = user.accountId;
  const methodsProfile = useForm(); // useForm cho ProfileForm
  const methodsCustomer = useForm(); // useForm cho CustomerForm
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await GetAccountById(userId);
        setUserData(response.data);
        methodsProfile.reset(response.data);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    const fetchCustomerData = async () => {
      try {
        const response = await GetCustomerById(userId);
        setCustomerData(response.data);
        methodsCustomer.reset(response.data); // Reset CustomerForm với dữ liệu khách hàng
      } catch (error) {
        console.error("Error fetching customer data: ", error);
      }
    };

    fetchUserData();
    fetchCustomerData();
  }, [userId, methodsProfile, methodsCustomer]);

  const onSubmitProfile = async (data) => {
    try {
      // Create a copy of the data and remove the password field
      const { password, ...updatedData } = data;

      // Call UpdateAccount with the updatedData that doesn't include the password
      const response = await UpdateAccount(userId, updatedData);

      setUserData(response.data);
      methodsProfile.reset(response.data);

      enqueueSnackbar("Profile updated successfully!", { variant: "success" });
    } catch (error) {
      console.error("Error submitting profile form: ", error);
      enqueueSnackbar("Error updating profile. Please try again.", {
        variant: "error",
      });
    }
  };


  const onSubmitCustomer = async (data) => {
    try {
      const response = await UpdateCustomer(userId, data);
      setCustomerData(response.data);
      enqueueSnackbar("Customer information updated successfully!", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error submitting customer form: ", error);
      enqueueSnackbar(
        "Error updating customer information. Please try again.",
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <div>
      <NavbarUser />
      <div className="mx-auto px-1 md:px-16">
        <div>
          <p className="text-4xl font-semibold">User Profile</p>
          <p className="text-gray-600 text-lg my-4">
            This is your profile page. Update your information below.
          </p>
          <div className="border-b border-gray-300 mt-4"></div>
        </div>
        <div className="flex min-h-screen">
          <div>
            <Sidebar items={menuItems} userData={userData} />
          </div>

          <div className="flex-1 p-8">
            {currentPath === "/profile" && (
              <FormProvider {...methodsProfile}>
                <div className="flex-1 p-8">
                  <UserProfileForm
                    userData={userData}
                    onSubmit={onSubmitProfile}
                    methods={methodsProfile}
                  />
                </div>
              </FormProvider>
            )}

            {/* Form Customer */}
            {currentPath === "/profile/customer" && (
              <FormProvider {...methodsCustomer}>
                <div className="flex-1 p-8">
                  <CustomerForm
                    customerData={customerData}
                    onSubmit={onSubmitCustomer}
                    methods={methodsCustomer}
                  />
                </div>
              </FormProvider>
            )}

            {/* Form Add Fish */}
            {currentPath === "/profile/addfish" && (
              <div className="flex-1 p-8">
                <AddFishForm />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfilePage;
