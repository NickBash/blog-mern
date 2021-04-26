import './postslist.style.scss'
import { Link } from 'react-router-dom'

const PostsList = ({ posts }) => {
  if (!posts.length) {
    return <p>Постов пока нет</p>
  }
  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Заголовок</th>
          <th>Текст</th>
          <th>Ссылка</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, i) => {
          return (
            <tr key={post._id}>
              <td>{i + 1}</td>
              <td>{post.title}</td>
              <td>{post.description}</td>
              <td>
                <Link to={`/detail/${post._id}`}>Открыть</Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default PostsList
