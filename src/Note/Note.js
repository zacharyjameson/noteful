import React from 'react'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'

export default function Note(props) {
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      <button className='Note__delete' type='button'>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(parseISO(props.modified), 'dd MMM yyyy')}
          </span>
        </div>
      </div>
    </div>
  )
}
