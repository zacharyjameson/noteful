import React, { Component } from "react";
import CircleButton from "../CircleButton/CircleButton.js";
import ApiContext from "../ApiContext.js";
import config from "../config.js";
import "../App/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ValidationError from "../ValidationError.js";
import PropTypes from "prop-types";

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      content: "",
      folder: "none",
    };
  }

  static contextType = ApiContext;

  updateName = (e) => {
    this.setState({
      name: e.target.value,
    });
    console.log(e.target.value);
  };

  updateContent = (e) => {
    this.setState({
      content: e.target.value,
    });
    console.log(e.target.value);
  };

  updateFolder = (e) => {
    this.setState({
      folder: e.target.value,
    });
    console.log(e.target.value);
  };

  validateName() {
    const validName = this.state.name.trim();
    if (validName.length === 0) {
      return "Note name is required";
    } else if (validName.length > 72) {
      return "That's way too long. Please be reasonable.";
    }
  }

  validateContent() {
    const validContent = this.state.content.trim();
    if (validContent.length === 0) {
      return "Pls. Content is required.";
    }
  }

  validateFolder() {
    const validFolder = this.state.folder.trim();
    if (validFolder === "none") {
      return "Please select a folder";
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const content = this.state.content;
    const folder = this.state.folder;

    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        note_name: `${name}`,
        content: `${content}`,
        folder_id: `${folder}`,
      }),
    };

    fetch(`${config.API_ENDPOINT}/note/`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something broke. Please try again later.");
        }
        return res.json();
      })
      .then(() => {
        this.props.history.goBack();
        this.context.fetchData();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  render() {
    const options = this.context.folders.map((folder, i) => {
      return (
        <option value={folder.id} key={i}>
          {folder.folder_name}
        </option>
      );
    });
    return (
      <div className="Add__note">
        <CircleButton type="button" onClick={() => this.props.history.goBack()}>
          <FontAwesomeIcon icon="chevron-left" />
          <br />
          Back
        </CircleButton>
        <form onSubmit={this.handleSubmit}>
          <legend>
            <h2>Create a Note</h2>
          </legend>
          <label htmlFor="addnote-label">Name: </label>
          <input
            type="text"
            name="addnote-label"
            id="addnote-label"
            onChange={this.updateName}
            required
          />
          <ValidationError message={this.validateName()} />
          <br />
          <br />
          <label htmlFor="addnote-content">Content: </label>
          <textarea
            type="text"
            name="addnote-content"
            id="addnote-content"
            onChange={this.updateContent}
            required
          />
          <ValidationError message={this.validateContent()} />
          <br />
          <label htmlFor="folderOption" className="add_note_label">
            Select a Folder
          </label>
          <select
            id="folder"
            name="folder"
            onChange={this.updateFolder}
            required
          >
            <option value="none">Select one...</option>
            {options}
          </select>
          <ValidationError message={this.validateFolder()} />
          <br />
          <CircleButton role="link" tag="button">
            <FontAwesomeIcon icon="plus" />
            <br />
            Add
          </CircleButton>
        </form>
      </div>
    );
  }
}

export default AddNote;

AddNote.propTypes = {
  history: PropTypes.object,
};
