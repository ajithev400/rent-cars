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
            // console.log("objRole",obj);
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
   
    return role === userRole?true:false
}

export const isPathAllowed=(pathname)=>{
    const role = getRoleForPath(pathname)
    return isRouteRoleMatchs(role)
}

export const isCustomer = ()=>{
    const userRole = getRole()
    
    return userRole === 'Customer'?true:false
}

export const commonService ={
    isLoggedIn,
    isPathAllowed,
    isCustomer
}

export default commonService