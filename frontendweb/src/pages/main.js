import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import './main.css';
import api from '../serviços/api';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import itsamatch from '../assets/itsamatch.png'

export default function Main({ match }) {
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null)

  useEffect(() => {
    async function loadUsers() {
      const resultado = await api.get('/devs', {
        headers: { user: match.params.id }
      })
      setUsers(resultado.data);
    }

    loadUsers();
  }, [match.params.id]);

  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: { user: match.params.id }
    });

    socket.on('match', (dev) => {
      setMatchDev(dev)
    })

  }, [match.params.id])

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id }
    })
    setUsers(users.filter((user) => user._id !== id))
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id }
    })
    setUsers(users.filter((user) => user._id !== id))
  }
  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="tindev" />
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map(user => {
            return (
              <li key={user._id}>
                <img src={user.avatar} alt={user.name} />
                <footer>
                  <strong>{user.name}</strong>
                  <p>{user.bio}</p>
                </footer>
                <div className="buttons">
                  <button type="button" onClick={() => handleDislike(user._id)}>
                    <img src={dislike} alt="dislike"
                    />
                  </button>
                  <button type="button" onClick={() => handleLike(user._id)}>
                    <img src={like} alt="like" />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
          <div className="empty">Acabou D:</div>
        )}
      {matchDev && (
        <div className="matchcontainer">
          <img src={itsamatch} alt="It's a match" />
          <img className="avatar" src={matchDev.avatar} />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>
          <button type="button" onclick={() => { setMatchDev(null) }}>FECHAR</button>
        </div>
      )}
    </div>
  )
}