import React, { Component } from "react";
import ApiContext from "../ApiContext";
import config from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton.js";
import ValidationError from "../ValidationError";
import PropTypes from "prop-types";

class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folder_name: "none",
    };
  }

  static contextType = ApiContext;

  updateName(event) {
    this.setState({
      folder_name: event,
    });
  }

  validateFolderName() {
    const folderName = this.state.folder_name.trim();
    if (folderName === "none") {
      return "Please enter a folder name";
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const query = this.state.folder_name;

    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        folder_name: `${query}`,
      }),
    };
    fetch(`${config.API_ENDPOINT}/folder/`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Whoops! There's an error. Please insert a coin and try again later"
          );
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
    return (
      <div className="Add_folder">
        <CircleButton type="button" onClick={() => this.props.history.goBack()}>
          <FontAwesomeIcon icon="chevron-left" />
          <br />
          Back
        </CircleButton>
        <br />
        <form
          className="add_folder_form"
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <legend>Create a Folder</legend>
          <label htmlFor="name" className="add_folder_label">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="add_folder"
            onChange={(e) => this.updateName(e.target.value)}
            required
          />
          <ValidationError message={this.validateFolderName()} />
          <br />
          <CircleButton tag="button">
            <FontAwesomeIcon icon="plus" />
            <br />
            Add
          </CircleButton>
        </form>
      </div>
    );
  }
}

export default AddFolder;

AddFolder.propTypes = {
  history: PropTypes.object,
};
