// eslint-disable-next-line
import { localhostUrl,baseUrl,headers } from './Url';
import axios from 'axios';

const loginUrl = baseUrl+"/Account/Login";

export async function LoginApi(value)
{
    var account = null
    console.log(value)
    await axios.post(loginUrl,value,headers)
    .then(response => {
        account = response.data;
        // Save the entire account object to Local Storage
        localStorage.setItem('user', JSON.stringify(account));
    })
    .catch(error => {
        console.error(error)
        alert('Error fetching Account data')
    })
    return account;
}
