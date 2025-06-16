import axios from 'axios'

const commonApi=(url,method,data,header)=>{
    const config={
        url:url,
        method:method,
        data:data,
        headers:header?header:{'Content-Type':'application/json'}
    }
    return axios(config)
}

export default commonApi