import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from './../../context/auth.context'
import { useHttp } from '../../hooks/http.hook'
import './create.style.scss'

function CreatePage() {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const [form, setForm] = useState({
    title: '',
    description: '',
  })

  const formHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const pressHandler = async (e) => {
    e.preventDefault()
    if (form.title.length > 0 && form.description.length > 0) {
      try {
        const data = await request(
          '/api/post/generate',
          'POST',
          { ...form },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        )
        history.push(`/detail/${data.post._id}`)
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <div className="create">
      <div className="create__box">
        <form className="create__form" method="POST">
          <h2 className="create__title">Создать пост</h2>
          <div className="create__input-block">
            <input
              className="create__title-text input"
              type="text"
              name="title"
              onChange={formHandler}
              placeholder="Заголовок"
            />
          </div>
          <div className="create__textarea-block">
            <textarea
              className="create__text"
              cols="30"
              rows="10"
              name="description"
              onChange={formHandler}
              placeholder="Текст"
            ></textarea>
          </div>
          <button
            onClick={pressHandler}
            type="submit"
            className="create__btn btn"
          >
            Опубликовать
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePage
