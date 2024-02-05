import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full h-[4rem] bg-[#111] px-10
    flex justify-between items-center'>
        <h1 className='text-white text-[1.5rem] font-bold'>Mentwala</h1>
        <div className='flex justify-center items-center gap-2'>
            <p className='text-white'>Hii</p>
            <img 
            src='https://imgs.search.brave.com/dle65jq6uxv07eAo4Nn8GU2-lJMyuJdsJdb88nz21-8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wbHVz/cG5nLmNvbS9pbWct/cG5nL3VzZXItcG5n/LWljb24teW91bmct/dXNlci1pY29uLTI0/MDAucG5n'
            className='w-8 h-8' />
        </div>
    </div>
  )
}

export default Navbar