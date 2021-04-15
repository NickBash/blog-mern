import { React } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthPage from './pages/AuthPage/AuthPage'
import CreatePage from './pages/CreatePost/CreatePost'
import DetailPage from './pages/DetailPage/DetailPage'
import PostsPage from './pages/PostsPage/PostsPage'

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/posts" exact>
          <PostsPage></PostsPage>
        </Route>
        <Route path="/create" exact>
          <CreatePage></CreatePage>
        </Route>
        <Route path="/detail/:id">
          <DetailPage></DetailPage>
        </Route>
        <Redirect to="/create"></Redirect>
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage></AuthPage>
      </Route>
      <Redirect to="/"></Redirect>
    </Switch>
  )
}
