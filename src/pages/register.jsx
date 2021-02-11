import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from  'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { register } from '../redux/auth/actions';

const initialState = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  cf_password: "",
  gender: "male"
}

const Register = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { auth, alert } = useSelector(state => state)

  const [ userData, setUserData ] = useState(initialState)
  const [ typePass, setTypePass ] = useState(false)
  const [ typeCfPass, setTypeCfPass ] = useState(false)

  const { fullName, username, email, password, cf_password, } = userData

  useEffect(() => {
    if (auth.token) {
      history.push("/")
    }
  },[auth.token, history])

  const handleChangeInput = useCallback((e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  },[userData])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(register(userData))
  }

  return (
    <div className="auth_page">
      <Helmet>
        <title>Register</title>
        <meta name="description" content="register page"/>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <h2 className="text-uppercase text-center mb-4">Register</h2>
        <div className="form-group mb-2">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text" className="form-control" id="fullName"
            style={{ background: `${alert.fullName ? "#fd2d6a14" : ""}` }}
            name="fullName"
            value={fullName} onChange={handleChangeInput} autoComplete="false"
          />
          <small className="form-text text-danger">
            {alert.fullName ? alert.fullName : ""}
          </small>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="username">User Name</label>
          <input
            type="text" className="form-control" id="username"
            style={{ background: `${alert.username ? "#fd2d6a14" : ""}` }}
            name="username"
            value={username.toLocaleLowerCase().replace(/ /g, "")}
            onChange={handleChangeInput} autoComplete="false"
          />
          <small className="form-text text-danger">
            {alert.username ? alert.username : ""}
          </small>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="email">Email address</label>
          <input
            type="email" className="form-control" id="email"
            style={{ background: `${alert.email ? "#fd2d6a14" : ""}` }}
            aria-describedby="emailHelp" name="email"
            value={email} onChange={handleChangeInput} autoComplete="false"
          />
          <small className="form-text text-danger">
            {alert.email ? alert.email : ""}
          </small>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="password">Password</label>
          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control" id="Password"
              style={{ background: `${alert.password ? "#fd2d6a14" : ""}` }}
              placeholder="6 characters or more" name="password" autoComplete="false"
              value={password} onChange={handleChangeInput}
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.password ? alert.password : ""}
          </small>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="cf_password">Confirm Password</label>
          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control" id="cf_password"
              style={{ background: `${alert.cf_password ? "#fd2d6a14" : ""}` }}
              name="cf_password" autoComplete="false"
              value={cf_password} onChange={handleChangeInput}
            />
            <small onClick={() => setTypeCfPass(!typeCfPass)}>
              {typeCfPass ? "Hide" : "Show"}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.cf_password ? alert.cf_password : ""}
          </small>
        </div>
        <div className="row justify-content-between mx-0 mb-1">
          <label htmlFor="male">
            {"Male: "}
            <input
              type="radio" defaultChecked
              className="" id="male" name="gender"
              value="male" onChange={handleChangeInput}
            />
          </label>
          <label htmlFor="female">
            {"Female: "}
            <input
              type="radio"
              className="" id="female" name="gender"
              value="female" onChange={handleChangeInput}
            />
          </label>
          <label htmlFor="other">
            {"Other: "}
            <input
              type="radio"
              className="" id="other" name="gender"
              value="other" onChange={handleChangeInput}
            />
          </label>
        </div>
        <button
          type="submit" className="btn btn-dark w-100"
        >
          Register
        </button>
        <p>
          {"Already an account ? "}
          <Link to="/" style={{ color: "crimson", textDecoration: "none" }}>Login Now</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
