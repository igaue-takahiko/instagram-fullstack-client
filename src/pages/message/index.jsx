import React from 'react'
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';

import { LeftSide } from "../../components/message";

const Message = () => {
  return (
    <div className="message d-flex">
      <Helmet>
        <title>Message</title>
        <meta name="description" content="message page"/>
      </Helmet>
      <div className="col-md-4 border-right px-0">
        <LeftSide />
      </div>
      <div className="col-md-8">
        <div className="d-flex justify-content-center align-items-center flex-column h-100">
          <FontAwesomeIcon className="text-primary" icon={faMedal} size="lg" />
        </div>
      </div>
    </div>
  )
}

export default Message
