document.addEventListener('DOMContentLoaded', () => {
  getChores()
  //--------------------------- Fetch Actions (REST/CRUD) ------------------------------
  function getChores(){
    fetch('http://localhost:3000/chores')
    .then(res => res.json())
    .then(choreObject)
  }

  function postChore(choreObj){
    fetch('http://localhost:3000/chores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(choreObj)
    })
    .then(res => res.json())
    .then(choreObject)
  }

  function deleteChore(choreID){
    fetch(`http://localhost:3000/chores/${choreID}`, {
      method:"DELETE"})
    }


// ---------------------Grab Container divs from html ----------------
  const choreList = document.getElementById('chore-list')
  const newChoreForm = document.getElementById('new-chore-form')
  choreList.addEventListener('click', targetChoreToDelete)
  newChoreForm.addEventListener('submit', newChoreInputs)

// ----------------------Function to Manipulate Dom Elements---------------

  function newChoreInputs(e){ //Gets chore object from form input fields
    e.preventDefault()
    const titleInput = document.getElementById('title').value
    const priorityInput = document.getElementById('priority').value
    const durationInput = document.getElementById('duration').value

    let choreObject = {
      title: titleInput,
      priority: priorityInput,
      duration: durationInput
    }

    postChore(choreObject)
    newChoreForm.reset()
  }

  function choreObject(res){ //Takes responce from both GET and POST methods and gives correct format to dispalyChores()
    if (Array.isArray(res)) {
      res.forEach(chore => displayChores(chore))
    }else{
      displayChores(res)
    }
  }

  function displayChores(chore){ //takes a chore object and displays it to the dom
    const choreDiv = document.createElement('div')
    const deleteButton = document.createElement('button')

    choreDiv.innerHTML = `
      <h3> Title: ${chore.title} </h3>
      <p>${chore.priority}</p>
      <p>${chore.duration}</p>
      <button class='delete-button' data-id=${chore.id}>X</button>
    `
    choreDiv.className = 'chore-card'
    choreList.appendChild(choreDiv)

  }

  function targetChoreToDelete(e){
    if (event.target.className == "delete-button"){
      event.target.parentElement.remove()
      let choreID = event.target.getAttribute('data-id')
      deleteChore(choreID)
    }
  }

})
