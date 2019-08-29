import React from 'react';

const BlogForm = ({
  addBlog,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  resetUser
}) => {
  return (
    <div>
      <h2>Create a blog</h2>
      <form onSubmit={addBlog}>
        <input
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Title"
        />
        <input
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="Author"
        />
        <input
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder="URL"
        />
        <button type="submit">save</button>
        <button onClick={resetUser}>Logout</button>
      </form>
    </div>
  );
};

export default BlogForm;