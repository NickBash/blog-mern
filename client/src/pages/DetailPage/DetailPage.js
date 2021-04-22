import { useState, useEffect, useCallback, useContext } from 'react'
import { AuthContext } from './../../context/auth.context'
import { useHttp } from './../../hooks/http.hook'
import { useParams } from 'react-router-dom'
import { PostCard } from '../../components/PostCard/PostCard'
import Loader from '../../components/Loader/Loader'

function DetailPage() {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [post, setPost] = useState(null)
  const postId = useParams().id

  const getPost = useCallback(async () => {
    try {
      const data = await request(`/api/post/${postId}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setPost(data)
    } catch (error) {
      console.log(error)
    }
  }, [token, postId, request])

  useEffect(() => {
    getPost()
  }, [getPost])

  if (loading) {
    return <Loader />
  }

  return <>{!loading && post && <PostCard post={post} />}</>
}

export default DetailPage
