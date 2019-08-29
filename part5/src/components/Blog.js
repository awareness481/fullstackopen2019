import React, { useState} from 'react';
import blogService from '../services/blogs';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}


const handleDelete = (blog) => {
  if (window.confirm("Do you really want to delete this blog")) {
    console.log(blog.id)
    blogService.remove(blog.id)
  }
}

const Blog = ({rmv,  blog}) => {
  const [toggle, setToggle] = useState(false);
  const visibility = toggle 
    ? { display: 'block' }
    : { display: 'none' }

  return (
  <div style={blogStyle}>
    <h2 onClick={() => setToggle(!toggle)}>{blog.title}</h2>
    <div style={visibility}>
      <ul>
        <li>{blog.author}</li>
        <li><a href={blog.url}>Open Blog</a></li>
        <li>
          {blog.likes}<button onClick={() => blogService.update(blog)}>✔️</button>
        </li>
      </ul>
      {rmv ? <button onClick={() => handleDelete(blog)}>Remove</button> : ""}
    </div>
  </div>
  )

}

export default Blog