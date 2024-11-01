const baseUrl = "https://kdosdreapiservice.azurewebsites.net/api";
const localhostUrl = "http://localhost:2377/api";

const getJtwToken = ()=>{
  const token = sessionStorage.getItem("token")
  return token
}

const headers = {
  "Content-Type": "application/json",
  // Add headers such as Authorization if required
  // 'Authorization': 'Bearer your-token',
};


export { headers, baseUrl, localhostUrl ,getJtwToken};
