import React, { useState, useEffect } from 'react';

import Notification from './components/Notification';

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

  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  const renderBlogs = () => (
    blogs.map(
      blog => 
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <h3>{blog.author}</h3>
          <span>likes: {blog.likes}</span>
          <a href={blog.url}>URL</a>
        </div>
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

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

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input
        value={title}
        name="title"
        onChange={({target}) => setTitle(target.value)}
        placeholder="Title"
      />
      <input
        value={author}
        name="author"
        onChange={({target}) => setAuthor(target.value)}
        placeholder="Author"
      />
      <input
        value={url}
        name="url"
        onChange={({target}) => setUrl(target.value)}
        placeholder="URL"
      />
      <button type="submit">save</button>
      <button onClick={resetUser}>Logout</button>  
    </form>
  );

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

      <h2>Login</h2>
      {user === null && loginForm()}
      {user !== null && blogForm()}
      
    </div>
  )
}

export default App;
