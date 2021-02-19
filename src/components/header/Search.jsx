import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getDataAPI } from '../../utils/fetchData';
import { globalTypes } from '../../redux/globalTypes';
import UserCard from '../UserCard';

const Search = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  const [ search, setSearch ] = useState("")
  const [ users, setUsers ] = useState([])

  useEffect(() => {
    if (search) {
      getDataAPI(`search?username=${search}`, auth.token)
      .then(res => setUsers(res.data.users)).catch(error => {
        dispatch({
          type: globalTypes.ALERT, payload: { error: error.res.data.msg }
        })
      })
    } else {
      setUsers([])
    }
  },[auth.token, dispatch, search])

  const searchInput = useCallback((e) => {
    setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
  },[])

  const handleClose = () => {
    setSearch("")
    setUsers([])
  }

  return (
    <form className="search_form">
      <input
        type="text" name="search" id="search"
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
      <div className="users">
        {search && users.map((user) => (
          <Link key={user._id} to={`/profile/${user._id}`} onClick={handleClose}>
            <UserCard user={user} border="border" />
          </Link>
        ))}
      </div>
    </form>
  )
}

export default Search
