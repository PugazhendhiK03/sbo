// Handle image preview for new posts
document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postImageInput = document.getElementById('postImage');
    const postImagePreview = document.getElementById('postImagePreview');
    
    // Preview image for new posts
    postImageInput.addEventListener('change', () => {
        const file = postImageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                postImagePreview.src = reader.result;
                postImagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    postForm.addEventListener('submit', event => {
        event.preventDefault();
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;
        const image = postImagePreview.src;
        const link = document.getElementById('postLink').value;
        const tags = document.getElementById('postTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);

        if (title && content && image) {
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts.unshift({ title, content, image, link, tags, date: new Date().toISOString() });
            localStorage.setItem('posts', JSON.stringify(posts));
            alert('Post added successfully!');
            postForm.reset();
            postImagePreview.src = '#';
            postImagePreview.style.display = 'none';
            loadPosts();
        } else {
            alert('Please fill all fields and upload an image.');
        }
    });

    // Preview image for editing posts
    const editImageInput = document.getElementById('editPostImage');
    const editImagePreview = document.getElementById('editImagePreview');

    editImageInput.addEventListener('change', () => {
        const file = editImageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                editImagePreview.src = reader.result;
                editImagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
});


// Load posts into the manage section
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post-item');
        
        postElement.innerHTML = `
            <img src="${post.image}" alt="Post Image" class="post-image">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            ${post.link ? `<a href="${post.link}" target="_blank">${post.link}</a>` : ''}
            ${post.tags.length > 0 ? `<p>Tags: ${post.tags.join(', ')}</p>` : ''}
            <button onclick="editPost(${index})">Edit</button>
            <button onclick="deletePost(${index})">Delete</button>
        `;

        postsContainer.appendChild(postElement);
    });
}

// Edit a post
function editPost(index) {
    const posts = JSON.parse(localStorage.getItem('posts'));
    const post = posts[index];
    
    document.getElementById('editPostTitle').value = post.title;
    document.getElementById('editPostContent').value = post.content;
    document.getElementById('editImagePreview').src = post.image;
    document.getElementById('editPostLink').value = post.link || '';
    document.getElementById('editPostTags').value = post.tags.join(', ') || '';

    document.getElementById('createPostSection').style.display = 'none';
    document.getElementById('managePostsSection').style.display = 'none';
    document.getElementById('editPostSection').style.display = 'block';
    
    document.getElementById('updateButton').onclick = function () {
        updatePost(index);
    };
    document.getElementById('editCancelButton').style.display = 'block';
}

// Update a post
function updatePost(index) {
    const title = document.getElementById('editPostTitle').value;
    const content = document.getElementById('editPostContent').value;
    const image = document.getElementById('editImagePreview').src;
    const link = document.getElementById('editPostLink').value;
    const tags = document.getElementById('editPostTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);

    const posts = JSON.parse(localStorage.getItem('posts'));
    if (posts) {
        posts[index] = { title, content, image, link, tags, date: posts[index].date };
        localStorage.setItem('posts', JSON.stringify(posts));

        resetForm();
        document.getElementById('managePostsSection').style.display = 'block';
        document.getElementById('createPostSection').style.display = 'block';
        document.getElementById('editPostSection').style.display = 'none';
        document.getElementById('editCancelButton').style.display = 'none';

        loadPosts();
    } else {
        alert('Error: Could not find posts in storage.');
    }
}

// Cancel creating or editing
document.getElementById('createCancelButton').addEventListener('click', function () {
    resetForm();
    document.getElementById('managePostsSection').style.display = 'block';
    document.getElementById('createPostSection').style.display = 'block';
});

document.getElementById('editCancelButton').addEventListener('click', function () {
    resetForm();
    document.getElementById('managePostsSection').style.display = 'block';
    document.getElementById('createPostSection').style.display = 'block';
    document.getElementById('editPostSection').style.display = 'none';
});

// Delete a post
function deletePost(index) {
    if (confirm('Are you sure you want to delete this post?')) {
        const posts = JSON.parse(localStorage.getItem('posts'));
        posts.splice(index, 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
    }
}

// Reset form
function resetForm() {
    document.getElementById('postForm').reset();
    document.getElementById('postImagePreview').src = '#';
    document.getElementById('postImagePreview').style.display = 'none';
    document.getElementById('editImagePreview').src = '#';
    document.getElementById('editImagePreview').style.display = 'none';
}

// Initial load
loadPosts();
