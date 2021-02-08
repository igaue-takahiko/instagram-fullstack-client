import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../redux/auth/actions';

const initialState = {
  email: "",
  password: ""
}

const Login = () => {
  const dispatch = useDispatch()

  const [ userData, setUserData ] = useState(initialState)
  const [ typePass, setTypePass ] = useState(false)

  const { email, password } = userData

  const handleChangeInput = useCallback((e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  },[userData])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(userData))
    setUserData(initialState)
  }

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h2 className="text-uppercase text-center mb-4">login</h2>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email" className="form-control" id="email"
            aria-describedby="emailHelp" name="email"
            value={email} onChange={handleChangeInput} autoComplete="true"
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="password">Password</label>
          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control" id="password"
              placeholder="6 characters or more" name="password" autoComplete="true"
              value={password} onChange={handleChangeInput}
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
        </div>
        <button
          type="submit" className="btn btn-dark w-100"
          disabled={email && password ? false :true}
        >
          Login
        </button>
        <p>
          {"You don't have an account ? "}
          <Link to="/register" style={{ color: "crimson", textDecoration: "none" }}>Register Now</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
