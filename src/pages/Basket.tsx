import React, { useEffect, useState } from 'react'

function Basket() {

    const [proArr, setProArr] = useState<string[]>([])
    useEffect(() => {
      const stArr = localStorage.getItem("basket")
      if(stArr) {
        const arr:string[] = JSON.parse(stArr) as string[]
        console.log('Arr : '+arr)
        setProArr(arr)
      }
    }, [])
    
    const fncDelete =(index: number) => {
        const newArr = Object.assign([],proArr)
        newArr.splice(index, 1)
        setProArr(newArr)
        localStorage.setItem("basket", JSON.stringify(newArr))
    }

  return (
    <>
        <hr></hr>
        <h2>My Basket</h2>
        <hr></hr>
        {proArr.map( (item, index) =>
            <div key={index}>
            
            <h3 > {item} <span onClick={ () => fncDelete(index)} role='button' className='btn btn-danger' >Delete</span> </h3>
            
            </div>
        )}
    </>
  )
}

export default Basket