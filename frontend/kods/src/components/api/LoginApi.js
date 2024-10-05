import axios from 'axios';
import { localhostUrl,baseUrl,headers } from './Url';

const loginUrl = baseUrl+"/Login";

  export async function LoginApi(value) 
{
    var account = null
    console.log(value)
    await axios.post(loginUrl,value,headers)
    .then(response =>{ account=response.data;console.log(account)})
    .catch(error => {
      console.error(error)
      alert('Error fetching Account data')
    })
  return account;
}

