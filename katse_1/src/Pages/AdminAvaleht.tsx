import React, {useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import LogoutButton from '../components/Logout';
import ResetColors from '../components/TaastaVarv';

export default function AdminAvaleht() {
  const [controlCount, setControlCount] = useState(0);
  const [editCount, setEditCount] = useState(0);

  useEffect(() => {
    setControlCount(parseInt(localStorage.getItem('controlCount') || '0', 10));
    setEditCount(parseInt(localStorage.getItem('editCount') || '0', 10));
  }, []);

  function increaseCount(key, setter) {
    const current = parseInt(localStorage.getItem(key) || '0', 10);
    const newValue = current + 1;
    localStorage.setItem(key, newValue.toString());
    setter(newValue);
  }

  return (
    <>
      <ResetColors />
      <header>
        <LogoutButton/>
      </header>
      <div className='buttonContainer'>
        <Link to={'/admin/seadmete-juhtimine'}>
          <button onClick={() => increaseCount('controlCount', setControlCount)}>Seadmete juhtimine</button>
        </Link>
        <Link to={'/admin/automatiseerimine'}>
          <button>Ajapõhine automatiseerimine</button>
        </Link>
        <Link to={'/admin/redigeerimine'}>
          <button onClick={() => increaseCount('editCount', setEditCount)}>Kasutajaliidese redigeerimine</button>
        </Link>
      </div>
      <div style={{ marginTop: 30, fontSize: '16pt', color: 'white', textAlign: 'center' }}>
        Seadmete juhtimist avatud: {controlCount} korda<br />
        Kasutajaliidese redigeerimist avatud: {editCount} korda
      </div>
    </>
  )
}
