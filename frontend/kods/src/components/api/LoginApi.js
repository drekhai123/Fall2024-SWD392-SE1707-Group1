import axios from 'axios';

const URL = "http://localhost:2377/api/Account/Login";
const headers = {
    'Content-Type': 'application/json',
    // Add headers such as Authorization if required
    // 'Authorization': 'Bearer your-token',
  };

  export async function LoginApi(value) 
{
    var account = null
    console.log(value)
    await axios.post(URL,value,headers)
    .then(response =>{ account=response.data;console.log(account)})
    .catch(error => {
      console.error(error)
      alert('Error fetching Account data')
    })
  return account;
}

