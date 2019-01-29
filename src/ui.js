class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    // hidden field
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    // getting to it later on and it's default state
    this.forState = 'add';
  }

  // show all posts
  showPosts(posts) {
    // let since we are appending to it
    // console.log(posts);
     let output = '';

    // looping through and appending a template string, using bootstrap classes
    posts.forEach((post) => {
      output += `
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.body}</p>
          <a href="#" class="edit card-link" data-id="${post.id}">
          <i class="fa fa-edit"></i>
          </a>

          <a href="#" class="delete card-link" data-id="${post.id}">
          <i class="fa fa-eraser"></i>
          </a>
        </div>
      </div>
      `;
    }); 


    // turned out the issue was how I used the CSS and HTML in the index file
    this.post.innerHTML = output; 
  }

  // creating the area to show the alert in the UI
  showAlert(message, className) {
    this.clearAlert();

    // create div
    const div = document.createElement('div');
    // add classes
    div.className = className;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent to then sumbit to DOM
    const container = document.querySelector('.postsContainer');
    // Get posts
    const posts = document.querySelector('#posts');
    // Insert alert div before the Post section in the UI
    container.insertBefore(div, posts);

    // Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  // Clear alert
  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    // If there is a current alert remove it
    if(currentAlert) {
      currentAlert.remove();
    }
  }

  // Clear all fields
  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

// Fill form to edit
fillForm(data) {
  // adding .value since they are form fields
  this.titleInput.value = data.title;
  this.bodyInput.value = data.body;
  this.idInput.value = data.id;

  this.changeFormState('edit');
}

// Clear ID hidden value
clearIDINput() {
  this.idInput.value = '';
}


  // Change form state
  changeFormState(type) {
    if(type === 'edit') {
      this.postSubmit.textContent = 'Update Post';
      // we need to add all classNames even if we just want btn-block to change color
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';
      
      // Create cancel button to escape out
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel Edit'));

      // Get parent
      const cardForm = document.querySelector('.card-form');
      // Get element to insert before, using the earlier made weird index.html span
      const formEnd = document.querySelector('.form-end');
      // Insert cancel button, (what we are putting in, before this location)
      cardForm.insertBefore(button, formEnd);

    } else {
      this.postSubmit.textContent = 'Post it';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';
      // Remove cancel button if its there
      if(document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }
      // Clear ID from the hidden field
      this.clearIDINput();
      // Clear text
      this.clearFields();
    }
  }

}

export const ui = new UI();