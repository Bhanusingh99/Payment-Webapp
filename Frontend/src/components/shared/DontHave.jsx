import React from 'react'

const DontHave = ({label,href,text}) => {
  return (
    <div className='flex gap-1 mt-1'>
        <p>{label}</p>
        <a href={href} className='underline text-blue-600'>{text}</a>
    </div>
  )
}

export default DontHave