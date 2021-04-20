import React from 'react'

import { LeftSide, RightSide } from "../../components/message";

const Conversation = () => {
  return (
    <div className="message d-flex">
      <div className="col-md-4 border-right px-0">
        <LeftSide />
      </div>
      <div className="col-md-8">
        <RightSide />
      </div>
    </div>
  )
}

export default Conversation
