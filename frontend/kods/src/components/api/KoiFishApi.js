// eslint-disable-next-line
import { baseUrl,localhostUrl,headers } from './Url'
import axios from 'axios'
const getAllFishURL = baseUrl+'/KoiFish'

export async function GetAllKoiFishes() {
    var allFishes = null
    await axios.get(getAllFishURL,headers)
    .then(response =>{allFishes = response.data;})
    .catch(error => {
      console.error(error)
      alert('Error fetching Fish data')
    })
  return allFishes
}
