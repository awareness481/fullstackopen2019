import React, { useState, useEffect } from 'react';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Blog from './components/Blog'

//services
import  blogService from './services/blogs';
import loginService from './services/login';


const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [newBlog, setNewBlog] = useState('')
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [ message, setMessage ] = useState(null);
  // const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  const renderBlogs = () => (
    blogs.map(
      blog => <Blog blog={blog} />
    )
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Successfully logged in!')
    } catch (exception) {
      setErrorMessage('Unable to login')
      console.log(exception)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const addBlog = (e) => {
    e.preventDefault();
    setNewBlog({
      title,
      author,
      url,
      id: user.id
    })
    blogService.create(newBlog)
      .then((newBlog) => setMessage(`Successfully added ${newBlog.title}`))
      .catch((e) => setErrorMessage('We encountered an error, please try again'))
  }

  const resetUser = (e) => {
    e.preventDefault();
    setUser(null);
    window.localStorage.removeItem('loggedBlogappUser')
    setMessage('Sucessfully logged out!')
  }


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification message={message} />
      <Notification message={errorMessage} error={true} />
      <h1>Blogs</h1>

      {/* <Notification message={errorMessage} /> */}
      { user && renderBlogs()}

      {user === null ? loginForm() :
        <Togglable buttonLabel='new blog'>
          <BlogForm 
            addBlog={addBlog}
            author={author}
            setAuthor={setAuthor}
            title={title}
            setTitle={setTitle}
            url={url}
            setUrl={setUrl}
            resetUser={resetUser}
          />
        </Togglable>      
      }
      
    </div>
  )
}

export default App;
