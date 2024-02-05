import React from 'react'

const Button = ({label}) => {
  return (
    <div className='bg-black text-white rounded-lg cursor-pointer
    py-2 px-3 flex justify-center items-center'>{label}</div>
  )
}

export default Button