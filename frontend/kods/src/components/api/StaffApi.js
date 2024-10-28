import { baseUrl, localhostUrl, headers } from "./Url";
import axios from "axios";
const getAllStaffURL = baseUrl + "/Staff";

export async function GetAllStaffs() {
  var allStaff = null;
  await axios
    .get(getAllStaffURL, headers)
    .then((response) => {
      allStaff = response.data;
    })
    .catch((error) => {
      console.error(error);
      alert("Error fetching Staff data");
    });
  return allStaff;
}
