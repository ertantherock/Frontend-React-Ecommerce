import axios from "axios";
import {Category, Products, Result } from "./models/Product";
import { ICategory } from "./models/ICategory";
import { ICarts } from "./models/ICarts";



var basicAuth = 'Basic ' + btoa('onder@mail.com' + ':' + '12345');
const config = axios.create({
    baseURL:'http://localhost:8090',
    timeout: 15000, 
    headers: { 'Authorization': + basicAuth },

})



export const login = (email: string, password: string) => {
    const sendObj = {
        email: email,
        password: password,
    }
    return config.post('user/login', sendObj)
}
export const register = (name:string,surname:string,age:string,email:string,password:string) => {
    const sendObj = {
        name: name,
        surname: surname,
        age: age,
        email:email,
        password:password 
    }
    return config.post('user/register',sendObj)
}
export const categorySave = (name:string) => {
    const sendObj = {
        name: name
    }
    return config.post('category/save',sendObj)
}
export const categoryUpdate = (cid:string,name:string) =>{
    const sendObj = {
        cid:cid,
        name:name
        }
    return config.post('category/update',sendObj)
}
export const productUpdate = (pid:string,title:string,detail:string,price:string,thumbnail:string,image:string,cid:string) =>{
    const sendObj = {
        pid:pid,
        title:title,
        detail:detail,
        price: price,
        thumbnail:thumbnail,
        images:[
          image,
        ],
        categories:[
            {cid:cid}
        ]
    }
    return config.post('product/update',sendObj)
}
export const productSave = (title:string,detail:string,price:string,thumbnail:string,image:string,cid:string) =>{
    const sendObj = {
        title:title,
        detail:detail,
        price: price,
        thumbnail:thumbnail,
        images:[
          image,
        ],
        categories:[
            {cid:cid}
        ]
    }
    return config.post('product/save',sendObj)
}

export const categoryDelete = (cid:string)=>{
    return config.get("category/delete/"+cid)
}
export const productDelete = (pid:number) =>{
    return config.get("product/delete/"+pid)
}


export const allProduct = () => {
    return config.get<Products>('product/list')
}
export const allCarts = () => {
    return config.get<ICarts[]>('carts/list')
}


export const singleProduct = (pid: string) => {
    return config.get<Result>('product/list/'+pid)
}

export const addCard = (userEmail: string, pid: string,title:string,price:string) => {
    const sendObj = {
            userEmail: userEmail,
            products: [
                {
                    pid:pid,
                    title:title,
                    price:price
                }
            ]
        }
      
      return config.post('carts/add',sendObj)
}

export const allCategories = () => {
    return config.get<ICategory[]>('category/list')
}

export const categoryProduct = (name:string) =>{
    return config.get<Result[]>('product/category/'+name)
}