import React from 'react'

const LoadingSign = () => {
  return (
    <div className="flex items-center justify-center w-full h-full m-auto">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a487ad]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default LoadingSign
