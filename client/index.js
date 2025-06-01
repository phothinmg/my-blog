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

const postDirUrl = "./data/posts.json";
const pageDirUrl = "./data/pages.json";
const siteDataUrl = "./data/siteData.json";

const appDiv = document.getElementById("content");
const titelEl = document.querySelector("title");
const desEl = document.getElementById("des");

async function fetchPosts(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch posts");
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
}

async function loadSiteData(_title, _des) {
  try {
    const siteData = await fetchPosts(siteDataUrl);
    const tit = _title ? `${siteData.title} | ${_title}` : `${siteData.title}`;
    titelEl.innerHTML = tit;
    if (_des) {
      desEl.setAttribute("content", _des);
    } else {
      desEl.setAttribute("content", siteData.description);
    }
  } catch (error) {
    console.error("Error fetching site data:", error);
    return null;
  }
}
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
    loadHome();
  } else if (path.startsWith("postsList")) {
    const postId = path.split("/")[1];
    loadPostsList(postId);
  } else if (path.startsWith("post/")) {
    const postId = path.split("/")[1];
    loadPost(postId);
  } else if (path.startsWith("page/")) {
    const pageId = path.split("/")[1];
    loadPage(pageId);
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
  const pages = await fetchPosts(pageDirUrl);
  const home = pages.find((i) => i.slug === "home");
  if (!home) {
    appDiv.innerHTML = '<div class="error">Home page not found</div>';
    return;
  }
  loadSiteData(home.title);
  let html = `
        <article>
          <div>${home.body}</div>
        </article>
        `;

  appDiv.innerHTML = html;
}
//
async function loadPage(slug) {
  appDiv.innerHTML = '<div class="loading">Loading posts...</div>';
  /** @type {PostsData[]} */
  const pages = await fetchPosts(pageDirUrl);
  const page = pages.find((i) => i.slug === slug);
  if (!page) {
    appDiv.innerHTML = '<div class="error">Page not found</div>';
    return;
  }
  loadSiteData(page.title);
  let html = `
        <article>
          <div>${page.body}</div>
        </article>
        `;

  appDiv.innerHTML = html;
}
// Page Components တည်ဆောက်ခြင်း
// Single Post Page
async function loadPost(slug) {
  appDiv.innerHTML = '<div class="loading">Loading post...</div>';
  const post = await getPost(slug);
  if (!post) {
    appDiv.innerHTML = '<div class="error">Post not found</div>';
    return;
  }
  loadSiteData(post.title, post.description);
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
  const posts = await fetchPosts(postDirUrl);
  if (!posts || posts.length === 0) {
    appDiv.innerHTML = '<div class="error">No posts found</div>';
    return;
  }
  loadSiteData("All Posts");
  const page_count = Math.ceil(posts.length / size);
  const pages = Array.from({ length: page_count }, (_, i) => {
    const index = i * size;
    const _posts = posts.slice(index, index + size);
    const html = _posts
      .map(
        (post) => `
      <div class="post-card">
        <h4><a href="#post/${post.slug}" onclick="loadPost('${post.slug}')">${post.title}</a></h4>
        <p>${post.description}</p>
      </div>
    `
      )
      .join("");
    return { page: html, id: i };
  });
  const { page } = pages[idx];
  appDiv.innerHTML = `
    <h3>Recent Notes</h3>
    <hr class="bar" />
    ${page}
    <div class="on">
     ${
       idx < page_count - 1
         ? `<a href="#postsList/${idx + 1}">Older Posts</a>`
         : `<p>No older posts</p>`
     }
      ${
        idx > 0
          ? `<a href="#postsList/${idx - 1}">Newer Posts</a>`
          : `<p>No newer posts</p>`
      }
    </div>
  `;
};
