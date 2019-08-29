import React, { useState} from 'react';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}


const Blog = ({ blog }) => {
  const [toggle, setToggle] = useState(false);

  const visibility = toggle 
    ? { display: 'block' }
    : { display: 'none' }

  return (
  <div style={blogStyle}  onClick={() => setToggle(!toggle)}>
    {blog.title}
    <div style={visibility}>
      <ul>
        <li>{blog.author}</li>
        <li><a href={blog.url}>Open Blog</a></li>
        <li>{blog.likes}</li>
      </ul>
    </div>
  </div>
  )

}

export default Blog