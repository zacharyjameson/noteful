import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import config from "../config";
import ApiContext from "../ApiContext";
//import { getNotesForFolder, findNote, findFolder } from "../notes-helpers";
import "./App.css";
import AddFolder from "../AddFolder/AddFolder";
import AddNote from "../AddNote/AddNote";
import AppError from "../Error";

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    this.fetchAllData();
  }

  fetchAllData = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/note`),
      fetch(`${config.API_ENDPOINT}/folder`),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then((e) => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then((e) => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch((error) => {
        console.error({ error });
        console.log(this.state.folders);
        console.log(this.state.notes);
      });
  };

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId),
    });
  };

  renderNavRoutes() {
    return (
      <AppError>
        <>
          {["/", "/folder/:folderId"].map((path) => (
            <Route exact key={path} path={path} component={NoteListNav} />
          ))}
          <Route path="/note/:noteId" component={NotePageNav} />
          <Route path="/add-folder" component={AddFolder} />
        </>
      </AppError>
    );
  }

  renderMainRoutes() {
    return (
      <AppError>
        <>
          {["/", "/folder/:folderId"].map((path) => (
            <Route exact key={path} path={path} component={NoteListMain} />
          ))}
          <Route path="/note/:noteId" component={NotePageMain} />
          <Route path="/add-note" component={AddNote} />
        </>
      </AppError>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      fetchData: this.fetchAllData,
    };

    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{" "}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
