//import './posts.style.scss'

import { useState, useContext, useCallback, useEffect } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/auth.context'
import Loader from '../../components/Loader/Loader'
import PostsList from '../../components/PostsList/PostsList'

function MyPage() {
  const [posts, setPosts] = useState([])
  const { loading, request } = useHttp()
  const { token } = useContext(AuthContext)

  const fetchPosts = useCallback(async () => {
    try {
      const data = await request('/api/post/main', 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      console.log(data)
      setPosts(data)
    } catch (error) {}
  }, [token, request])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  if (loading) {
    return <Loader />
  }

  return <>{!loading && <PostsList posts={posts} />}</>
}

export default MyPage
