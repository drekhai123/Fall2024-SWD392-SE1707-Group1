// eslint-disable-next-line
import { localhostUrl, baseUrl, headers } from './Url';
import axios from 'axios';

const localhostAccount = localhostUrl + "/Account/Login";
const loginUrl = baseUrl + "/Account/Login";
const googleLoginUrl = baseUrl + "/Account/GoogleLogin";

export async function LoginApi(value) {
    try {
        const response = await axios.post(loginUrl, value, { headers })
        return response
    } catch (error) {
        return error
    }
}

export async function GoogleLoginApi(value) {
    try {
        const response = await axios.post(googleLoginUrl, value, { headers })
        return response
    } catch (error) {
        return error
    }
}

