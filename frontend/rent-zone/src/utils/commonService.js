import routConfig from "./rout-config-main.json"
import { matchPath } from "react-router-dom"

export const isLoggedIn = ()=>{
    try{
        const val = localStorage.getItem("user")
        if(val){
            return !!val
        }
    }catch{
        return false
    }
}

const getRoleForPath = (pathname)=>{
    for (const [path,obj] of Object.entries(routConfig)){
        if(matchPath(path,pathname)){
            return obj.role
        }
    }
    return null
}

export const getRole = ()=>{
    try{
        const val = JSON.parse(localStorage.getItem('user')) || {}
        const role = val.role || ''
        return role
    }catch{
        return ''
    }
}

export const isRouteRoleMatchs = (role)=>{
    if(!role){
        return true
    }
    const userRole = getRole()
   
    // const filtered =  role.filter((item)=>userRole.includes(item))
    
    // return filtered.length ? true:false
    console.log("Role1:",role);
    console.log("role2:",userRole);
    if(role===userRole){
        return true
    }else{
        return false
    }
}

export const isPathAllowed=(pathname)=>{
    const role = getRoleForPath(pathname)
    return isRouteRoleMatchs(role)
}

export const commonService ={
    isLoggedIn,
    isPathAllowed,
}

export default commonService