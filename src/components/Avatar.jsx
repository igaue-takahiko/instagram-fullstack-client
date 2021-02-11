import React from 'react'
import { useSelector } from 'react-redux';

const Avatar = ({ src }) => {
  const { theme } = useSelector(state => state)

  return (
    <img
      className="avatar" src={src} alt="avatar image" aria-hidden
      style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}
    />
  )
}

export default Avatar
