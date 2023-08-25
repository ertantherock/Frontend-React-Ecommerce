import React, { useEffect, useState } from 'react'
import { allProduct, productDelete, productSave, productUpdate } from '../service'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'
import { Result } from '../models/Product'

export default function ProductUpdate() {

  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')
  const [price, setPrice] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [image, setImage] = useState('')
  const [cid, setCid] = useState('')
  const [pid, setPid] = useState('')

  const [proArr,setProArr] = useState<Result[]>([])

  useEffect(() => {
    allProduct().then( res =>{
        setProArr(res.data.result)
    }).catch(err => {

    })
  }, [])

  const proDelete = (pid:number) =>{
    productDelete(pid).then(res=>{
      console.log(res.data)
      toast.success("Delete Product Success!")
      window.location.reload()
    }).catch(err=>{
      toast.error("Unauthorized User")
    })
  }

  const sendForm = (evt:React.FormEvent) =>{
    evt.preventDefault()
    productUpdate(pid,title,detail,price,thumbnail,image,cid).then(res =>{
      const stData = JSON.stringify(res.data)
      toast.success("Product Update Success!")
      window.location.reload()
    }).catch(err =>{
      console.log(err.message)
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
      <form onSubmit={sendForm}  style={{marginTop:30}} className='col-sm-5'>
        <div className='mb-3'>
              <input onChange={(evt) => setPid(evt.target.value)} className='form-control' placeholder='Pid' />
          </div>
          <div className='mb-3'>
              <input onChange={(evt) => setTitle(evt.target.value)} className='form-control' placeholder='Title' />
          </div>
          <div className='mb-3'>
              <input onChange={(evt) => setDetail(evt.target.value)} className='form-control' placeholder='Detail' />
          </div>
          <div className='mb-3'>
              <input onChange={(evt) => setPrice(evt.target.value)} className='form-control' placeholder='Price' />
          </div>
          <div className='mb-3'>
              <input onChange={(evt) => setThumbnail(evt.target.value)} className='form-control' placeholder='Thumbnail' />
          </div>
          <div className='mb-3'>
              <input style={{height:150}} onChange={(evt) => setImage(evt.target.value)} className='form-control' placeholder='Images' />
          </div>
          <div className='mb-3'>
              <input onChange={(evt) => setCid(evt.target.value)} className='form-control' placeholder='Cid' />
          </div>
          <button className='btn btn-warning' >Product Update</button>
      </form>

      <table style={{marginTop:20}} className="table">
  <thead>
    <tr>
      <th scope="col">pid</th>
      <th scope="col">Title</th>
      <th scope="col">Detail</th>
      <th scope="col">Price</th>
      <th scope="col">Thumbnail</th>
      <th scope="col">Delete</th>
      <th scope="col">Update</th>
    </tr>
  </thead>
  <tbody>
    {proArr.map((item,index)=>
    <tr key={index} >
        <th scope="row">{item.pid}</th>
        <td>{item.title}</td>
        <td>{item.detail}</td>
        <td>{item.price}$</td>
        <td><img src={item.thumbnail} style={{height: 150,}} className="card-img-top"/></td>
        <td><button onClick={ () => proDelete(item.pid)}  type="button" className="btn btn-danger btn-sm">Delete</button></td>
        <td><NavLink to={'/product-update/'+item.pid} className="btn btn-warning btn-sm" >Update</NavLink></td>
      </tr>
    )}
      
    

  </tbody>
</table>
    </>
  )
}