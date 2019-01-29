// bringing over an earlier course file, easyHTTP3 so that it can be used in this project
// went back and reviewed the earlier HTTP course project files that I finished earlier

import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', sumbitPost);


// If you start up another Git Bash console you can run the command, npm run json:server
// this starts up the JSON server that you can access at localhost:3000

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

//Get Posts
function getPosts() {
  // getting our API URL's response data, since its a async -> promise we have to use, .then()
  // allows us to access the db.json values
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
  //.then(data => console.log(data))
  .catch(err => console.log(err));
}

// Sumbit Posts, add & edit using http.js' async post
function sumbitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  // else moving this up here that it should work as normal
  // can keep it simple if title = title below
  const data = {
    title,
    body
  }

  // Checking for input title and body, ie accidentally clicking Post It button
  // validate input
  if(title === '' || body === '') {
    ui.showAlert('Please fill in all fields', 'alert alert-danger');
  } else {

  // Using our hidden id status it would be zero if adding, and used if in edit
  // Checking for ID
    if(id === '') {
  // Create Post
  http.post('http://localhost:3000/posts', data)
  // promise response, getting the new posts that have been added
    .then(data => {
      ui.showAlert('Post was added', 'alert alert-success');
      ui.clearFields('');
      getPosts();
    })
    .catch(error => console.log(error));
    } else {
  // Update post as a PUT request
  http.put(`http://localhost:3000/posts/${id}`, data)
  // promise response, getting the new posts that have been added
    .then(data => {
      ui.showAlert('Post was updated', 'alert alert-success');
      // form state already calls clearFields so we don't need to call it a second time
      ui.changeFormState('add');
      getPosts();
      })
      .catch(error => console.log(error));
    }





  }

}

// Delete post, e - event parameter
function deletePost(e) {
  e.preventDefault();
  // inital click is on the icon so looking for the class to target it
  if(e.target.parentElement.classList.contains('delete')) {
    // looking for ui's data-id
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
      // promise back
      .then(data => {
        ui.showAlert('Post was removed', 'alert alert-success');
        getPosts();
      })
      .catch(error => console.log(error));
    }
  }
}

// Enable Edit State
function enableEdit(e) {
  // need to target the parent of the icon
  if(e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    // we have to move up two levels, getting the post body and post title
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    }

    // Fill form with current post
    ui.fillForm(data);
  }

  e.preventDefault();
}

// Cancel Edit State
function cancelEdit(e) {
  // if event target classlist has the cancel button, then change it back to the add state
  if(e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
  e.preventDefault();
}