/*global chrome*/
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [title, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function openPopup() {
    setIsOpen(true);
  }

  function closePopup() {
    setIsOpen(false);
  }

  // if clicked somewhere outside of the popup, close the popup
  window.onclick = function (event) {
    if (event.target.id === 'popup-container') {
      openPopup();
    }
  }

  let userurl = "";

  function submitForm(e) {
    e.preventDefault(); // Prevent default form submission

    console.log("submitting form" + title + email + notes);

    // Get the current URL of the active tab
    function getOpenedUrl() {
      return chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        userurl = tabs[0].url;
      });
    }

    console.log("URL: " + getOpenedUrl());

    getOpenedUrl();

    fetch("http://localhost:4000/submit", {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        email: email,
        notes: notes,
        url: userurl
      })
    })
      .then(response => response.json())
      .then(data => {console.log("SUCCESS!!! " + data)})
      .catch(error => console.log("ERROR!!! " + error));
  }


  return (
    <div className="App" id='popup-container'>
      <div className="form-container">
        <h1 className="form-title">NoteNest 📝</h1>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={title} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea name="notes" id="notes" cols="30" rows="10" value={notes} onChange={(e) => setMessage(e.target.value)}></textarea>
          </div>
          <a href = "https://www.notion.so/SE-NoteNest-bc50c4ab7d91420785cd86adf2e8d8f8" className = "idk">Notion DB</a>
          <button type="submit" className="submit-button" onClick={submitForm}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
