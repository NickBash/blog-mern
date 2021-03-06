//import './posts.style.scss'

import { useState, useContext, useCallback, useEffect } from 'react'
import { useHttp } from './../../hooks/http.hook'
import { AuthContext } from './../../context/auth.context'
import Loader from './../../components/Loader/Loader'
import { PostCard } from '../../components/PostCard/PostCard'

function PostsPage() {
  const [posts, setPosts] = useState([])
  const { loading, request } = useHttp()
  const { token } = useContext(AuthContext)

  const fetchPosts = useCallback(async () => {
    try {
      const data = await request('/api/post', 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setPosts(data)
    } catch (error) {}
  }, [token, request])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  if (loading) {
    return <Loader />
  }

  const cards = posts.map((post) => <PostCard key={post._id} post={post} />)
  return <>{!loading && cards} </>
}

export default PostsPage
