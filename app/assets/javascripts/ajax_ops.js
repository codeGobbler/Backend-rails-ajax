function handle_ajax(event) {
  console.log('DOM fully loaded and parsed');
  const resultsDiv = document.getElementById('results-div');
  const restOpsDiv = document.getElementById('rest-ops');
  const listUsersButton = document.getElementById('list-users');
  const listFactsButton = document.getElementById('list-facts-button');
  const createUserButton = document.getElementById('create-user');
  const createFactsButton = document.getElementById('create-facts-button');
  const userName = document.getElementById('user-username');
  const userPassword = document.getElementById('user-password');
  const updateUserButton = document.getElementById('update-user');
  const updateFactsButton = document.getElementById('update-facts-button');
  const deleteFactButton = document.getElementById('delete-fact-button');
  const deleteFactsButton = document.getElementById('delete-facts-button');
  const userID = document.getElementById('user-id')
  const userID2 = document.getElementById('user-id-two')
  const userID3 = document.getElementById('user-id-three')
  const userIDUpdateFact = document.getElementById('user-id-update-fact')
  const userIDDeleteFact = document.getElementById('user-id-delete-fact')
  const userIDDeleteFacts = document.getElementById('user-id-delete-fact-mass')
  const fact = document.getElementById('user-fact')
  const factID = document.getElementById('fact-id')
  const factUpdate = document.getElementById('user-fact-update')
  const factIDDelete = document.getElementById('fact-id-delete')
  const factLikes = document.getElementById('fact-likes')
  const factLikesUpdate = document.getElementById('fact-likes-update')
  const userName1 = document.getElementById('user-username1')
  const userPassword1 = document.getElementById('user-password1')
  const deleteUserButton = document.getElementById('delete-user')
  const deleteUserId = document.getElementById('delete-user-id')
  const users_path = 'http://localhost:3001/api/v1/users'

  restOpsDiv.addEventListener('click', (event) => {
    if (event.target === listUsersButton) {
      fetch(users_path).then((response) => {
        if (response.status === 200) {
          resultsDiv.innerHTML = '';
          response.json().then((data) => {
            for (let i=0; i<data.length; i++) {
              let parag = document.createElement('P');
              parag.textContent = JSON.stringify(data[i]);
              resultsDiv.appendChild(parag);
            }
          });
        } else {
          alert(`Return code ${response.status} ${response.statusText}`);
        }
      }).catch((error) => {
        console.log(error);
        alert(error);
      });
    } else if (event.target === createUserButton) {
      var dataObject = {
        username: userName.value,
        password: userPassword.value
      }
      fetch(users_path,
        { method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataObject)
        }
      ).then((response) => {
        if (response.status === 201) {
          response.json().then((data) => {
            resultsDiv.innerHTML = '';
            let parag = document.createElement('P');
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response.json().then((data) => {
            alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
          }).catch((error) => {
            console.log(error);
            alert(error);
          });
        }
      });
    } else if (event.target === updateUserButton) {
      var dataObject = {
        username: userName1.value,
        password: userPassword1.value
      }
      if (dataObject.username === "") {  // blank usernames not supported
        delete dataObject.username;
      }
      if (dataObject.password === "") { // blank passwords not supported
        delete dataObject.password;
      }
      fetch(`${users_path}/${userID.value}`,
        { method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataObject)
        }
      ).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            resultsDiv.innerHTML = '';
            let parag = document.createElement('P');
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response.json().then((data) => {
            alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
          }).catch((error) => {
            console.log(error);
            alert(error);
          });
        }
      });
    } else if (event.target === deleteUserButton) {
      var dataObject = {
        username: deleteUserId.value
      }
      fetch(`${users_path}/${deleteUserId.value}`,
        { method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        }
      ).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            resultsDiv.innerHTML = '';
            let parag = document.createElement('P');
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response.json().then((data) => {
            alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
          }).catch((error) => {
            console.log(error);
            alert(error);
          });
        }
      });
    } else if (event.target === listFactsButton) {
      fetch(`${users_path}/${userID2.value}/facts/`).then((response) => {
        if (response.status === 200) {
          resultsDiv.innerHTML = '';
          response.json().then((data) => {
            for (let i=0; i<data.length; i++) {
              let parag = document.createElement('P');
              parag.textContent = JSON.stringify(data[i]);
              resultsDiv.appendChild(parag);
            }
          });
        } else {
          alert(`Return code ${response.status} ${response.statusText}`);
        }
      }).catch((error) => {
        console.log(error);
        alert(error);
      });
    } else if (event.target === createFactsButton) {
      var dataObject = {
        user_id: userID3.value,
        fact_text: fact.value,
        likes: factLikes.value
      }
      fetch(`${users_path}/${userID3.value}/facts`,
        { method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataObject)
        }
      ).then((response) => {
        if (response.status === 201) {
          response.json().then((data) => {
            resultsDiv.innerHTML = '';
            let parag = document.createElement('P');
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response.json().then((data) => {
            alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
          }).catch((error) => {
            console.log(error);
            alert(error);
          });
        }
      });
    } else if (event.target === updateFactsButton) {
      var dataObject = {
        user_id: userIDUpdateFact.value,
        fact_text: factUpdate.value,
        likes: factLikesUpdate.value
      }
      if (dataObject.user_id === "") {  // blank user_ids not supported
        delete dataObject.user_id;
      }
      if (dataObject.fact_text === "") { // blank fact_text not supported
        delete dataObject.fact_text;
      }
      if (dataObject.likes === "") {
        delete dataObject.likes;
      }
      fetch(`${users_path}/${userIDUpdateFact.value}/facts/${factID.value}`,
        { method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataObject)
        }
      ).then((response) => {
        if (response.status === 200 || response.status === 204) {
          response.json().then((data) => {
            resultsDiv.innerHTML = '';
            let parag = document.createElement('P');
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response.json().then((data) => {
            alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
          }).catch((error) => {
            console.log(error);
            alert(error);
          });
        }
      });
    } else if (event.target === deleteFactButton) {
      fetch(`${users_path}/${userIDDeleteFact.value}/facts/${factIDDelete.value}`,
        { method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        }
      ).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            resultsDiv.innerHTML = '';
            let parag = document.createElement('P');
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response.json().then((data) => {
            alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
          }).catch((error) => {
            console.log(error);
            alert(error);
          });
        }
      });
    }
  });
}
