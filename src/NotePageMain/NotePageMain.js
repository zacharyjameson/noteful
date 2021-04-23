import React from "react";
import Note from "../Note/Note";
import ApiContext from "../ApiContext";
import { findNote } from "../notes-helpers";
import "./NotePageMain.css";
import PropTypes from "prop-types";

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };

  static contextType = ApiContext;

  handleDeleteNote = (noteId) => {
    this.props.history.push("/");
  };

  render() {
    const { notes = [] } = this.context;
    console.log("notesContext=", notes);
    const { noteId } = this.props.match.params;
    console.log("noteId =", noteId);
    const note = findNote(notes, Number(noteId)) || { content: "" };
    console.log("findNotesResult=",note);
    return (
      <section className="NotePageMain">
        <Note
          id={note.id}
          name={note.note_name}
          modified={note.modified}
          content={note.content}
          onDeleteNote={this.handleDeleteNote}
        />
      </section>
    );
  }
}

NotePageMain.propTypes = {
  history: PropTypes.object,
};
