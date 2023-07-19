import axios from 'axios'
import { BASE_URL } from '../../constants'

interface RequestDTO {
    method: any
    url: string
}
const sendRequest = async ({method, url}: RequestDTO) => {

    const {data} = await axios.post(`${BASE_URL}/`)

    return data
}