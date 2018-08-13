document.addEventListener('DOMContentLoaded', () => {

  const choreList = document.getElementById('chore-list')
  const newChoreFormSubmit = document.getElementById('submit-btn')
  choreList.addEventListener('click', deleteChore)
  newChoreFormSubmit.addEventListener('click', newChoreInputs)


  fetch('http://localhost:3000/chores')
  .then(res => res.json())
  .then(displayChores)


  function newChoreInputs(e){
    e.preventDefault()
    const titleInput = document.getElementById('title').value
    const priorityInput = document.getElementById('priority').value
    const durationInput = document.getElementById('duration').value

    let choreObject = {
      title: titleInput,
      priority: priorityInput,
      duration: durationInput
    }

    fetch('http://localhost:3000/chores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(choreObject)
    })
    .then(res => res.json())
    .then(console.log)

    // console.log(choreObject);

    // console.log(titleInput, priorityInput, durationInput);
  }


  function displayChores(res){
    res.forEach(chore => {
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

    })
  }

  function deleteChore(e){
    // console.log(e.target);
  }

})
