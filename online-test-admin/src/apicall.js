import axios from 'axios'
import swal from 'sweetalert'
 const baseURL = 'http://localhost:9000/node'
// const baseURL="http://code-api.codingmart.xyz/node"

export const plainApi = axios.create({baseURL})
export const authApi = axios.create({baseURL})

authApi.interceptors.request.use(config => {
    config.headers['token'] = JSON.parse(localStorage.getItem('token')).token
    config.headers['userid']= JSON.parse(localStorage.getItem('token')).tokenId    
    return config
})

authApi.interceptors.response.use(
    config => config, error => {
    if(error.response){
        const { response : { status } } = error
        if (status === 403) {
            swal({icon:"error",text:"Invalid User Credentials"})
            window.localStorage.clear()
            window.history.go('/')
        }
    }else {
        window.localStorage.clear()
        window.history.go('/')
        swal({icon:"error",text:"Network Error"})
        
    }
    return Promise.reject(error)
})
