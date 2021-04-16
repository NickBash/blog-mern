import './auth.style.scss'
import { useState, useEffect, useCallback } from 'react'
import { useHttp } from '../../hooks/http.hook'

function AuthPage() {
  const [answer, setAnswer] = useState('')
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const message = useCallback((text, b) => {
    console.log(text, b)
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

  const regHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      console.log('reg', data)
      message(data.message, true)
    } catch (error) {}
  }

  return (
    <div className="auth">
      <div className="auth__box">
        <form className="auth__form" method="post">
          <h2 className="auth__title">Регистрация</h2>
          {Object.keys(answer).length > 1 ? (
            <p className={answer.class}>{answer.text}</p>
          ) : null}
          <div className="auth__input-block">
            <input
              className="auth__email input"
              placeholder="Электронная почта"
              id="email"
              type="text"
              required
              name="email"
              onChange={formHandler}
            ></input>
          </div>
          <div className="auth__input-block">
            <input
              className="auth__passw input"
              placeholder="Пароль"
              id="password"
              type="password"
              name="password"
              onChange={formHandler}
            ></input>
          </div>
          <div className="auth__input-block">
            <input
              className="auth__passw input"
              placeholder="Повторите пароль"
              id="password2"
              type="password"
              name="password2"
            ></input>
          </div>
          <button
            type="submit"
            className="auth__btn btn"
            onClick={regHandler}
            disabled={loading}
          >
            Зарегистрироваться
          </button>
          <div className="auth__login">
            <p className="auth__login-descr">У вас уже есть аккаунт?</p>
            <a href="/login" className="auth__login-link">
              Войти
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthPage
