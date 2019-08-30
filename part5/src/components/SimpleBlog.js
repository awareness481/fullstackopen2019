import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className='blog-header'>
      {blog.title} {blog.author}
    </div>
    <div className='blog-likes'>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog