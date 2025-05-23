import React from 'react'
import { Link } from 'react-router-dom'
import Tagasi from '../components/Tagasi'

function SeadmeteJuhtimine() {
  const ruumid = ["A-001", "A-002", "A-003"]
  return (
    <>
        <div id="header">
          <Tagasi/> 
          <h1>Seadmete juhtimine</h1>
        </div>
        <div id="roomSelection">
        {ruumid.map(ruum => (
          <Link
            to={`/admin/seadmete-juhtimine/${ruum}`}
            key={ruum}
          >
            <button className='room-button'>{ruum}</button>
          </Link>
        ))}
        </div>
    </>
  )
}

export default SeadmeteJuhtimine