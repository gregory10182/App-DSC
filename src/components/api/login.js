import axios from "axios";

// const baseurl = 'http://localhost:8080/'
const baseurl = 'https://cd-q3eh.onrender.com/'


const login = async credentials => {
    const { data } = await axios.post(baseurl + "login", credentials)
    return data
}

const signin = async credentials => {
    const {data} = await axios.post(baseurl + "CreateUser", credentials)

    return data
}


export default { login, signin }