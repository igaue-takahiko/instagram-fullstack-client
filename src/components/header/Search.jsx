import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { getDataAPI } from '../../utils/fetchData';
import { globalTypes } from '../../redux/globalState/types';
import UserCard from '../UserCard';
import LoadIcon from '../../images/load-icon.gif';

const Search = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  const [ search, setSearch ] = useState("")
  const [ users, setUsers ] = useState([])
  const [ load, setLoad ] = useState(false)

  const searchInput = useCallback((e) => {
    setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
  },[setSearch])

  const handleClose = () => {
    setSearch("")
    setUsers([])
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!search) {
      return
    }

    try {
      const res = await getDataAPI(`search?username=${search}`, auth.token)
      setUsers(res.data.users)
      setLoad(false)
    } catch (error) {
      dispatch({
        type: globalTypes.ALERT, payload: { error: error.res.data.msg }
      })
    }
  }

  return (
    <form className="search_form" onSubmit={handleSearch}>
      <input
        type="text" name="search" id="search" title="Enter to Search"
        value={search} onChange={searchInput}
      />
      <div className="search_icon" style={{ opacity: search ? 0 : 0.3  }}>
        <span className="material-icons">search</span>
        <span>Search</span>
      </div>
      <div
        className="close_search" style={{ opacity: users.length === 0 ? 0 : 1 }}
        onClick={handleClose}
      >
        &times;
      </div>
      <button
        type="submit"
        style={{ display: "none" }}
      >
        Search
      </button>
      {load && <img className="loading" src={LoadIcon} alt="loading" />}
      <div className="users">
        {search && users.map((user) => (
          <UserCard
            key={user._id} user={user} border="border"
            handleClose={handleClose}
          />
        ))}
      </div>
    </form>
  )
}

export default Search
