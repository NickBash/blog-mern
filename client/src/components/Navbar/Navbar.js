import { NavLink, useHistory } from 'react-router-dom'
import './navbar.style.scss'
import { useContext } from 'react'
import { AuthContext } from './../../context/auth.context'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = (e) => {
    e.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <nav className="nav">
      <div className="container">
        <ul className="nav__list">
          <li className="nav__link">
            <NavLink to="/posts">Посты</NavLink>
          </li>
          <li className="nav__link">
            <NavLink to="/create">Создание</NavLink>
          </li>
          <li className="nav__link">
            <a href="/" onClick={logoutHandler}>
              Выход
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
