async function fetchPosts() {
  try {
    const response = await fetch("./data/posts.json");
    if (!response.ok) throw new Error("Failed to fetch posts");
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
}
async function getPost(slug) {
  try {
    const posts = await fetchPosts();
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
  const appDiv = document.getElementById("content");

  if (!path || path === "home") {
    loadHome();
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
async function loadHome() {
  const appDiv = document.getElementById("content");
  appDiv.innerHTML = '<div class="loading">Loading posts...</div>';

  const posts = await fetchPosts();
  if (!posts || posts.length === 0) {
    appDiv.innerHTML = '<div class="error">No posts found</div>';
    return;
  }

  let html = "<h3>Recent Notes</h3>";
  posts.slice(0, 20).forEach((post) => {
    html += `
      <div class="post">
        <h4><a href="#post/${post.slug}" onclick="loadPost('${post.slug}')">${post.title}</a></h4>
        <p>${post.description}</p>
      </div>
    `;
  });

  appDiv.innerHTML = html;
}

// Page Components တည်ဆောက်ခြင်း
// Single Post Page
async function loadPost(slug) {
  const appDiv = document.getElementById("content");
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
