const baseUrl = "https://kdosdreapiservice.azurewebsites.net/api";
const localhostUrl = "https://localhost:7250/api";

const getJwtToken = () => {
  const token = sessionStorage.getItem("token")
  return token
}

const headers = {
  "Content-Type": "application/json",
  // Add headers such as Authorization if required
  // 'Authorization': 'Bearer your-token',
};


export { headers, baseUrl, localhostUrl, getJwtToken };
