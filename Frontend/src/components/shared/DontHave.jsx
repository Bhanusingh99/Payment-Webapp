import React from 'react'
import {Link} from "react-router-dom"

const DontHave = ({label,href,text}) => {
  return (
    <div className='flex gap-1 mt-1'>
        <p>{label}</p>
        <Link to={href} className='underline text-blue-600 line-clamp-1'>{text}</Link>
    </div>
  )
}

export default DontHave