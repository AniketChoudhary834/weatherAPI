import React from 'react'

const SearchBar = ({city,setCity,setCities,getCities}) => {
  return (
    <div className='bg-gray-200 px-4 py-2'>
    <input
    className="outline-1 bg-white px-2 py-1 rounded-l-2xl"
    type="text"
    value={city}
    onChange={(e)=>{setCity(e.target.value)}}
    />
    <button
    className='bg-green-500 outline-1 px-4 py-1 rounded-r-2xl active:scale-95'
    onClick={getCities}
    >
        Search
    </button>
    </div>
  )
}

export default SearchBar
