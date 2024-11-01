// eslint-disable-next-line
import { baseUrl, localhostUrl, headers, getJwtToken } from './Url'
import axios from 'axios'
const getAllFishURL = baseUrl + '/KoiFish'

export async function GetAllKoiFishes() {
  const token = getJwtToken();

  var allFishes = null
  await axios.get(getAllFishURL, {
    headers: {
      ...headers,
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => { allFishes = response.data; })
    .catch(error => {
      console.error(error)
      alert('Error fetching Fish data')
    })
  return allFishes
}
