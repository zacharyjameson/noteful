import React, { Component } from "react";
import CircleButton from "../CircleButton/CircleButton.js";
import ApiContext from "../ApiContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "../config.js";

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
      },
      content: {
        value: "",
      },
      folder: {
        value: "",
      },
    };
  }

  static contextType = ApiContext;

  updateName(name) {
    this.setState({
      name: {
        value: name,
      },
    });
  }

  updateContent(content) {
    this.setState({
      name: {
        value: content,
      },
    });
  }

  updateFolder(folder) {
    this.setState({
      name: {
        value: folder,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = this.state.name.value;
    const content = this.state.content.value;
    const folder = this.state.folder.value;

    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: `${name}`,
        content: `${content}`,
        folder: `${folder}`,
      }),
    };
    fetch(`${config.API_ENDPOINT}/notes/`, requestOptions)
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
  }

  render() {
    const options = this.context.folders.map((folder, i) => {
      return (
        <option value={folder.id} key={i}>
          {folder.name}
        </option>
      );
    });
    return (
      <div className="Add_note">
        <CircleButton type="button" onClick={() => this.props.history.goBack()}>
          Go Back
        </CircleButton>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <legend>
            <h2>Create a Note</h2>
          </legend>
          <label htmlFor="addnote-label">Name: </label>
          <input
            type="text"
            name="addnote-label"
            id="addnote-label"
            onChange={(e) => this.updateName(e.target.value)}
            required
          />
          <br />
          <br />
          <label htmlFor="addnote-content">Content: </label>
          <textarea
            type="text"
            name="addnote-content"
            id="addnote-content"
            onChange={(e) => this.updateContent(e)}
            required
          />
          <br />
          <label htmlFor="folderOption" className="add_note_label">
            Select a Folder
          </label>
          <select
            id="folder"
            name="folder"
            onChange={(e) => this.updateFolder(e)}
            required
          >
            <option value="none">Select one...</option>
            {options}
          </select>
          <button type="submit">Add Note</button>
        </form>
      </div>
    );
  }
}

export default AddNote;

/*<CircleButton type="button">
            <FontAwesomeIcon icon="plus" />
            <br />
            Note
          </CircleButton>*/
