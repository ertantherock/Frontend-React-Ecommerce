import React, { useEffect, useState } from 'react'
import { ICategory } from '../models/ICategory'
import { allCategories, categoryDelete, categorySave } from '../service'
import { toast } from 'react-toastify'
import axios from 'axios'
import { NavLink, useParams } from 'react-router-dom'
import { Result } from '../models/Product'


function CategoryManagement() {

  

  const [catArr, setCatArr] = useState<ICategory[]>([])

  const [name, setName] = useState('')

  

  const sendForm = (evt:React.FormEvent) =>{
    evt.preventDefault()
    categorySave(name).then( res =>{
      const stData = JSON.stringify(res.data)
      toast.success("Category Save Success!")
      window.location.reload()
      
    }).catch(err => {
      console.log(err.message)
      toast.error("Unauthorized User")
    })
  }


  useEffect(() => {
    allCategories().then( res =>{
        setCatArr(res.data)
    }).catch(err => {

    })
  }, [])

  const catDelete = (cid:string) =>{
    categoryDelete(cid).then(res=>{
      console.log(res.data)
      toast.success("Delete Category Success!")
      window.location.reload()
    }).catch(err =>{
      toast.error("Unauthorized User")
    })
  }
    


  return (
    <>
    <div style={{marginTop:50}}>
    <NavLink to={'/category-management'} type="button" className="btn btn-primary btn-lg" >Category Management</NavLink>
    <NavLink to={'/product-management'} style={{marginLeft:30}} type="button" className="btn btn-warning btn-lg">Product Management</NavLink>
    <NavLink to={'/order-management'} style={{marginLeft:30}} type="button" className="btn btn-secondary btn-lg">Order Management</NavLink>
    </div>
    <h2 style={{marginTop:30}}>Category Management</h2>

    <form onSubmit={sendForm} style={{marginTop:30}} className='col-sm-5'>
          <div className='mb-3'>
              <input onChange={(evt) => setName(evt.target.value)} className='form-control' placeholder='Category Name' />
          </div>
          <button className='btn btn-primary' >Category Add</button>
      </form>

    <table style={{marginTop:20}} className="table">
  <thead>
    <tr>
      <th scope="col">cid</th>
      <th scope="col">Name</th>
      <th scope="col">Delete</th>
      <th scope="col">Update</th>
      
    </tr>
  </thead>
  <tbody>
    {catArr.map((item,index) =>
      <tr  key={index}>
        <th scope="row">{item.cid}</th>
        <td>{item.name}</td>
        <td><button onClick={ () => catDelete(item.cid)} type="button" className="btn btn-danger btn-sm">Delete</button></td>
        <td><NavLink to={'/category-update/'+item.cid} className="btn btn-warning btn-sm" >Update</NavLink></td>
      </tr>
    )}

  </tbody>
</table>
    </>
  )
}

export default CategoryManagement