import http from "./midileware"
import  {ACCESS_POINT}  from "../Config/config.js"
import axios from "axios";

const  signup =async data =>{
    console.log(data,"data");
    const result =  await http.post(`${ACCESS_POINT}/formsubmit`, data);
    return result
}
const  getData =async data =>{
    // console.log(data,"data");
    const result =  await http.get(`${ACCESS_POINT}/getData`);
    return result
}

export default{
    signup,
    getData
}