document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.querySelector('.index-posts');

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('article');
            
            // Format tags
            const tagsHtml = post.tags ? `<p>Tags: ${post.tags.join(', ')}</p>` : '';

            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <img src="${post.image}" alt="${post.title}">
                <p>${post.content}</p>
                ${post.link ? `<a href="${post.link}" target="_blank">${post.link}</a>` : ''}
                ${tagsHtml}
            `;
            postsContainer.appendChild(postElement);
        });
    }

    loadPosts();
});
