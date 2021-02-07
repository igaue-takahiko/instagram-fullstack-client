import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../redux/auth/actions';

const Login = () => {
  const dispatch = useDispatch()

  const [ userData, setUserData ] = useState({ email: "", password: "" })
  const [ typePass, setTypePass ] = useState(false)

  const { email, password } = userData

  const handleChangeInput = useCallback((e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  },[userData])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(userData))
  }

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h2 className="text-uppercase text-center mb-4">login</h2>
        <div className="form-group mb-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email" className="form-control" id="exampleInputEmail1"
            aria-describedby="emailHelp" placeholder="Enter email" name="email"
            value={email} onChange={handleChangeInput}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control" id="exampleInputPassword1"
              placeholder="Password" name="password"
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
