import React from 'react'
import Navbar from './shared/Navbar'
import Balance from './Balance'
import { Users } from './User'


const DashBoard = () => {
  return (
    <div>
      <Navbar />
      <div className='px-10 mt-5'>
        <Balance balance={100}/>
        <Users />
      </div>
    </div>

    )
}

export default DashBoard