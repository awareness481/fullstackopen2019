const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, e) => acc + e.likes, 0)
}

const favoriteBlog = (blogs) => {
  const max = Math.max(...blogs.map(e => e.likes), 0);
  return blogs.filter(e => e.likes === max)[0];
}

// const mostBlogs = (blogs) => {
  
// }

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}