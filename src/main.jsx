import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./components/Login.jsx";
import Auth from './components/AuthContext.jsx';
import CreatePost from './components/CreatePost.jsx';
import Posts from './components/Posts.jsx';
import SinglePost from './components/SinglePost.jsx';
import EditPost from './components/EditPost.jsx';
import PublishedPosts from './components/PublishedPosts.jsx';
import UnpublishedPosts from './components/UnpublishedPosts.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/create-post",
    element: <CreatePost/>
  },
  {
    path: "/posts",
    element: <Posts/>
  },
  {
    path: "/posts/:id",
    element: <SinglePost/>
  },
  {
    path: "/editPost/:id",
    element: <EditPost/>
  },
  {
    path: "/posts/published",
    element: <PublishedPosts />,
  },
  {
    path: "/posts/unpublished",
    element: <UnpublishedPosts/>
  }
])

createRoot(document.getElementById('root')).render(
  <Auth.Provider>
    <RouterProvider router={router}/>
  </Auth.Provider>,
)
