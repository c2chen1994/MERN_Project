import React from "react";

class AuthorContact extends React.Component {
  state = {
    title: "",
    content: ""
  };

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleContentChange = event => {
    this.setState({ content: event.target.value });
  };

  renderForm() {
    return (
      <form className="ui form">
        <div class="field">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Title..."
            onChange={this.handleTitleChange}
          />
        </div>
        <div className="field">
          <label>Content:</label>
          <textarea
            rows="2"
            name="content"
            placeholder="Content..."
            onChange={this.handleContentChange}
          />
        </div>

        <a
          href={`mailto:c2chen1994@gmail.com?subject=${this.state.title}&body=${
            this.state.content
          }`}
        >
          Send Email
        </a>
      </form>
    );
  }

  render() {
    return (
      <div>
        <div>
          <h2>Send an email to the author Zhuo Chen:</h2>
          <br />
        </div>
        {this.renderForm()}
      </div>
    );
  }
}

export default AuthorContact;
