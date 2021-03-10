import React, { Component } from "react";
import ApiContext from "../ApiContext";
import config from "../config";

class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
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

  handleSubmit(event) {
    event.preventDefault();
    const query = this.state.name.value;

    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: `${query}`,
      }),
    };
    fetch(`${config.API_ENDPOINT}/folders/`, requestOptions)
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
        <div className="Folder_back_btn">
          <button onClick={() => this.props.history.goBack()}>Go Back</button>
        </div>
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
          <button type="submit" className="add_folder_btn">
            Add Folder
          </button>
        </form>
      </div>
    );
  }
}

export default AddFolder;
