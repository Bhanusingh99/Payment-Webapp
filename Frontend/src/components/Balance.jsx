import React from 'react'

const Balance = ({balance}) => {
  return (
    <div className='text-[1.25rem] font-bold'>Your Balance 
    <span className='text-green-500'> {`-${balance}`}</span></div>
  )
}

export default Balance