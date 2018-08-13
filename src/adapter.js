
class Adapter {
  static getChores(){
    return fetch('http://localhost:3000/chores')
    .then(res => res.json())
  }

  static postChore(choreObj){
    return fetch('http://localhost:3000/chores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(choreObj)
    })
    .then(res => res.json())
  }

  static deleteChore(choreID){
    return fetch(`http://localhost:3000/chores/${choreID}`, {
      method:"DELETE"})
    }
}
