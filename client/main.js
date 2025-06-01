import { loadUrl } from "./load.js";

/**
 * @typedef Config
 * @property {string} title
 * @property {string} url
 *
 * @typedef PostsData
 * @property {string} slug
 * @property {number} birthtimeMs
 * @property {string} createAt
 * @property {string} lastUpdate
 * @property {string} body
 * @property {string} title
 * @property {string} date
 * @property {string} description
 */

const postDirUrl = "./data/posts.br";
const appDiv = document.getElementById("content");

async function getPost(slug) {
  try {
    const posts = await fetchPosts(postDirUrl);
    return posts.find((post) => post.slug === slug);
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}
// Routing System တည်ဆောက်ခြင်း
// Router Implementation
function handleRoute() {
  const path = window.location.hash.substring(1);
  if (!path || path === "home") {
    appDiv.innerHTML = "<h2>Home Page</h2><p>This is home page.</p>";
  } else if (path.startsWith("postsList")) {
    const postId = path.split("/")[1];
    loadPostsList(postId);
  } else if (path.startsWith("post/")) {
    const postId = path.split("/")[1];
    loadPost(postId);
  } else if (path === "about") {
    appDiv.innerHTML = "<h2>About Us</h2><p>This is a simple blog app.</p>";
  } else {
    appDiv.innerHTML = '<div class="error">Page not found</div>';
  }
}
// Initial load
window.addEventListener("DOMContentLoaded", handleRoute);
window.addEventListener("hashchange", handleRoute);
//
async function loadHome() {
  appDiv.innerHTML = '<div class="loading">Loading posts...</div>';
  /** @type {PostsData[]} */
  const posts = await fetchPosts(postDirUrl);
  if (!posts || posts.length === 0) {
    appDiv.innerHTML = '<div class="error">No posts found</div>';
    return;
  }
  let html = "<h3>Recent Notes</h3>";
  html += `<hr class="bar" />`;
  posts.slice(0, 20).forEach((post) => {
    html += `
      <div class="post-card">
        <h4><a href="#post/${post.slug}" onclick="loadPost('${post.slug}')">${post.title}</a></h4>
        <p>${post.description}</p>
      </div>
    `;
  });
  appDiv.innerHTML = html;
}
//

// Page Components တည်ဆောက်ခြင်း
// Single Post Page
async function loadPost(slug) {
  appDiv.innerHTML = '<div class="loading">Loading post...</div>';
  const post = await getPost(slug);
  if (!post) {
    appDiv.innerHTML = '<div class="error">Post not found</div>';
    return;
  }
  let html = `
        <article>
          <h2>${post.title}</h2>
          <div>${post.body}</div>
        </article>
        `;

  appDiv.innerHTML = html;
}

const loadPostsList = async (index, size = 10) => {
  const idx = index ? parseInt(index) : 0;
  appDiv.innerHTML = '<div class="loading">Loading posts...</div>';
  /** @type {PostsData[]} */
  const posts = await loadUrl(postDirUrl);
  appDiv.innerHTML = posts;
};
