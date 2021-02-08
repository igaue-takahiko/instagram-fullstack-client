import React from 'react'
import { Toast as ToastComponent, ToastHeader, ToastBody } from 'react-bootstrap';


const Toast = ({ message, handleShow, bgColor }) => {
  return (
    <ToastComponent
      className={`position-fixed text-light ${bgColor}`}
      style={{ top: 15, right: 15, minWidth: 200, zIndex: 50 }}
      onClose={handleShow}
    >
      <ToastHeader
        className={`text-light ${bgColor}`}
        style={{ outline: "none" }}
      >
        <strong className="mr-auto">{message.title}</strong>
      </ToastHeader>
      <ToastBody>{message.body}</ToastBody>
    </ToastComponent>
  )
}

export default Toast
