import { endPoint } from "./endPoint";
import { axiosClient } from "./Url";

const signUp = async(data)=> {
  return await axiosClient.post(endPoint.auth.signUp, data)
}
const regCus = async(data) => {
  return await axiosClient.post(endPoint.customer.post, data)
}
export {signUp, regCus}