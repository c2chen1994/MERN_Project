import React from "react";
import { Field, reduxForm } from "redux-form";

class CustomerForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSumbit = formValues => {
    // preventDefault: redux-form does for us
    //console.log(formValues);
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className="ui form error" // error to show error message
        onSubmit={this.props.handleSubmit(this.onSumbit)}
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "title required";
  }

  if (!formValues.description) {
    errors.description = "description required"; // to highlight error field
  }

  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate
})(CustomerForm);
