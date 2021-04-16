import './login.style.scss'
import { useState, useEffect, useCallback, useContext } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/auth.context'

function LoginPage() {
  const auth = useContext(AuthContext)
  const [answer, setAnswer] = useState('')
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const message = useCallback((text, b) => {
    setAnswer('')
    if (text && b === false) {
      setAnswer({ text, class: 'auth__error' })
    }
    if (text && b === true) {
      setAnswer({ text, class: 'auth__check' })
    }
  }, [])

  useEffect(() => {
    message(error, false)
    clearError()
  }, [error, clearError, message])

  const formHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (error) {}
  }

  return (
    <div className="login">
      <div className="login__box">
        <form className="login__form" method="post">
          <h2 className="login__title">Вход</h2>
          {Object.keys(answer).length > 1 ? (
            <p className={answer.class}>{answer.text}</p>
          ) : null}
          <div className="login__input-block">
            <input
              className="login__email input"
              placeholder="Электронная почта"
              id="email"
              type="text"
              required
              name="email"
              onChange={formHandler}
            ></input>
          </div>
          <div className="login__input-block">
            <input
              className="login__passw input"
              placeholder="Пароль"
              id="password"
              type="password"
              name="password"
              onChange={formHandler}
            ></input>
          </div>
          <button
            type="submit"
            className="login__btn btn"
            onClick={loginHandler}
            disabled={loading}
          >
            Войти
          </button>
          <div className="login__reg">
            <p className="login__reg-descr">У Вас нет аккаунта?</p>
            <a href="/register" className="login__reg-link">
              Зарегистрироваться
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
