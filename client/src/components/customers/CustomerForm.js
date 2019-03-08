import _ from "lodash";
import React from "react";
import { Field, reduxForm } from "redux-form";
import formFields from "./formFields";

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

  renderInput = ({ input, label, meta, tp }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input
          {...input}
          autoComplete="off"
          type={tp === "date" ? "date" : "text"}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  onSumbit = formValues => {
    // preventDefault: redux-form does for us
    //console.log(formValues);
    this.props.onSubmit(formValues);
  };

  renderFields = () => {
    return _.map(formFields, ({ label, name, type }) => {
      return (
        <Field
          key={name}
          component={this.renderInput}
          label={label}
          name={name}
          tp={type}
        />
      );
    });
  };

  renderForm = () => {};

  render() {
    return (
      <form
        className="ui form error" // error to show error message
        onSubmit={this.props.handleSubmit(this.onSumbit)}
      >
        {this.renderFields()}
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.firstName) {
    errors.firstName = "Last Name Required";
  } else if (formValues.firstName.length > 25) {
    errors.firstName = "Must be 25 characters or less";
  }
  if (!formValues.lastName) {
    errors.lastName = "Last Name Required";
  } else if (formValues.lastName.length > 25) {
    errors.lastName = "Must be 25 characters or less";
  }
  if (!formValues.sex) {
    errors.sex = "Sex Required";
  }
  if (!formValues.favoriteColor) {
    errors.favoriteColor = "Favorite Color Required";
  }
  if (!formValues.email) {
    errors.email = "Email Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
  ) {
    errors.email = "Invalid email address";
  }
  if (!formValues.age) {
    errors.age = "Age Required";
  } else if (isNaN(Number(formValues.age))) {
    errors.age = "Must be a number";
  } else if (formValues.age < 0) {
    errors.age = "Must be positive";
  } else if (formValues.age > 120) {
    errors.age = "Must be less than or equal to 120";
  }
  if (!formValues.joinedTime) {
    errors.joinedTime = "Joined Time Required";
  }
  return errors;
};

export default reduxForm({
  form: "customerForm",
  validate
})(CustomerForm);
