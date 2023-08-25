import React, { useEffect, useState } from 'react'
import { ICarts, Product } from '../models/ICarts'
import { allCarts, allProduct } from '../service'
import { Result } from '../models/Product'
import { NavLink } from 'react-router-dom'

function OrderManagement() {

  const [arr, setArr] = useState<ICarts[]>()
  const [bigImage, setBigImage] = useState('')
 

  useEffect(() => {
    allCarts().then(res =>{
      setArr(res.data)
      
      
    })
  }, [])
  
  
  

  return (
    <>
    <div style={{marginTop:50}}>
    <NavLink to={'/category-management'} type="button" className="btn btn-primary btn-lg" >Category Management</NavLink>
    <NavLink to={'/product-management'} style={{marginLeft:30}} type="button" className="btn btn-warning btn-lg">Product Management</NavLink>
    <NavLink to={'/order-management'} style={{marginLeft:30}} type="button" className="btn btn-secondary btn-lg">Order Management</NavLink>
    </div>
    <h2 style={{marginTop:20}} >Order List</h2>
      <table style={{marginTop:20}} className="table">
  <thead>
    <tr>
      <th scope="col">User Email</th>
      <th scope="col">Carts Id</th>
      
    </tr>
  </thead>
  <tbody>
    {arr?.map((item,index) =>
        <tr key={index} >
              <td >{item.userEmail}</td>
              <td>{item.carId}</td>
            </tr>
    )}
       
  </tbody>
</table>
    </>
  )
}

export default OrderManagement