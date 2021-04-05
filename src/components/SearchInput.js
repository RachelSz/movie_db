import {useState} from 'react'

import "./SearchInput.css"

function SearchInput({handleSearch, handleReset}) {
  const[query,setQuery] = useState('')

  function handleInputChange(e) {
    setQuery(e.target.value)
  }

  function handleKeyDown(e) {
    if (!query) return
    e.key === 'Enter' && handleSearch(query)
    
  }

  function handleInputReset(){
    setQuery('');
    handleReset()
  }


  return (
    <span>
      <input 
        type='text' 
        value={query}
        onChange={handleInputChange}
        // pentru enter ==> 
        onKeyDown={handleKeyDown}
        className='search-input'
        placeholder='Type a movie name...'
      />
      <span 
        className='reset-btn'
        onClick={handleInputReset}
      >
        Reset
      </span>
    </span>
  )
}

export default SearchInput