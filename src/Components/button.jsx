import React from 'react'

function Button({title,onClick}) {
  return (
    <div  onClick={onClick} className='shadow-md hover:bg-gray-300 rounded p-10'>
          <div className='flex flex-col justify-center'>
              <div className='flex justify-center text-3xl'>
                  {title}
              </div>
          </div>
    </div>
  )
}

export default Button