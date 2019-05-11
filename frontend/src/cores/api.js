import axios from 'axios'

export const getAriportList = async() => {
    const { data: { status, data } } = await axios({
        url: 'http://192.168.1.220:3000/get-airports',
    })
    return status == 'ok' ? data : []
}