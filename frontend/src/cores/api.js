import axios from 'axios'

export const getAriportList = async() => {
    const { data: { status, data } } = await axios({
        url: 'http://localhost:3000/get-airports',
    })
    return status == 'ok' ? data : []
}