import './postcard.style.scss'

export const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h2 className="post-card__title">{post.title}</h2>
      <p className="post-card__descr">{post.description}</p>
      <p className="post-card__date">
        <strong>{new Date(post.date).toLocaleDateString()}</strong>
      </p>
    </div>
  )
}
