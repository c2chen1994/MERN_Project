import _ from "lodash";
import React from "react";
import { Field, reduxForm } from "redux-form";
import formFields from "./formFields";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import MenuItem from "material-ui/MenuItem";
import { RadioButton } from "material-ui/RadioButton";
import {
  //Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  //Toggle,
  DatePicker
} from "redux-form-material-ui";

class CustomerForm extends React.Component {
  renderError({ touched, error }) {
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
        {tp === "radio" ? "" : <label>{label}</label>}
        <input {...input} autoComplete="off" type={tp} />
        {this.renderError(meta)}
      </div>
    );
  };

  onSumbit = formValues => {
    // preventDefault: redux-form does for us
    //console.log(formValues);
    this.props.onSubmit(formValues);
  };

  renderFields2 = () => {
    return (
      <React.Fragment>
        <div>
          <label>{formFields.firstName.label}</label>
          <Field
            name="firstName"
            component={({ input, meta }) => (
              <div>
                <input
                  type="text"
                  {...input}
                  autoComplete="off"
                  placeholder="First Name"
                />
                {this.renderError(meta)}
              </div>
            )}
          />
        </div>
        <div>
          <label>{formFields.lastName.label}</label>
          <Field
            name="lastName"
            component={({ input, meta }) => (
              <div>
                <input
                  {...input}
                  autoComplete="off"
                  type="text"
                  placeholder="Last Name"
                />
                {this.renderError(meta)}
              </div>
            )}
          />
        </div>
        <div>
          <label>{formFields.email.label}</label>
          <Field
            name="email"
            component={({ input, meta }) => (
              <div>
                <input
                  type="email"
                  {...input}
                  autoComplete="off"
                  placeholder="Email"
                />
                {this.renderError(meta)}
              </div>
            )}
          />
        </div>
        <div>
          <label>{formFields.sex.label}</label>
          <div>
            <label>
              <Field
                name="sex"
                component={({ input, meta }) => (
                  <div>
                    <input type="radio" {...input} value="Male" />
                    {this.renderError(meta)}
                  </div>
                )}
              />
              Male
            </label>
            <label>
              <Field
                name="sex"
                component={({ input, meta }) => (
                  <div>
                    <input type="radio" {...input} value="Female" />
                    {this.renderError(meta)}
                  </div>
                )}
              />
              Female
            </label>
          </div>
        </div>
        <div>
          <label>{formFields.age.label}</label>
          <Field
            name="age"
            component={({ input, meta }) => (
              <div>
                <input
                  autoComplete="off"
                  type="number"
                  {...input}
                  placeholder="Age"
                />
                {this.renderError(meta)}
              </div>
            )}
          />
        </div>
        <div>
          <label>{formFields.position.label}</label>
          <Field
            name="position"
            component={({ input, meta }) => (
              <div>
                <select {...input}>
                  <option />
                  <option value="ff0000">Red</option>
                  <option value="00ff00">Green</option>
                  <option value="0000ff">Blue</option>
                </select>
                {this.renderError(meta)}
              </div>
            )}
          />
        </div>
      </React.Fragment>
    );
  };

  renderFields = () => {
    return _.map(formFields, ({ label, name, type }) => {
      if (type === "radio") {
        return (
          <div>
            <label>Sex!!</label>
            <div>
              <label>
                <Field
                  name="sex"
                  component={this.renderInput}
                  type="radio"
                  value="male"
                  tp={type}
                />{" "}
                Male
              </label>
              <label>
                <Field
                  name="sex"
                  component={this.renderInput}
                  type="radio"
                  value="female"
                  tp={type}
                />{" "}
                Female
              </label>
            </div>
          </div>
        );
      }
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

  renderFields3 = () => {
    return (
      <React.Fragment>
        <MuiThemeProvider>
          <div>
            <Field
              name="firstName"
              component={TextField}
              hintText="First Name"
              fullWidth
              floatingLabelText="First Name"
              value="asdsad"
            />
            <Field
              name="lastName"
              component={TextField}
              hintText="Last Name"
              fullWidth
              floatingLabelText="Last Name"
            />

            <br />
            <br />

            <label>Sex</label>
            <Field
              name="sex"
              component={this.renderRadioButtonGroup}
              floatingLabelText="Last Name"
              value={"Male"}
            >
              <RadioButton value="Male" label="Male" />
              <RadioButton value="Female" label="Famale" />
            </Field>

            <Field
              name="age"
              component={TextField}
              hintText="Age"
              fullWidth
              floatingLabelText="Age"
            />
            <Field
              name="email"
              component={TextField}
              hintText="Email"
              fullWidth
              floatingLabelText="Email"
            />
            <Field
              name="position"
              component={
                this.props.initialValues || false
                  ? this.renderSelectField
                  : SelectField
              }
              floatingLabelText="Position"
              value="Manager"
            >
              <MenuItem value="Employee" primaryText="Employee" />
              <MenuItem value="Manager" primaryText="Manager" />
              <MenuItem value="Senior Manager" primaryText="Senior Manager" />
            </Field>

            <Field
              name="joinedTime"
              component={
                this.props.initialValues || false
                  ? this.renderDatePicker
                  : DatePicker
              }
              format={null}
              hintText="When did he/she join in?"
            />

            <Field
              name="description"
              component={TextField}
              hintText="Describe him/her"
              floatingLabelText="Description"
              multiLine={true}
              rows={3}
            />

            {/* <Field
            name="agreeToTerms"
            component={Checkbox}
            label="Agree to terms?"
          /> */}

            {/* <Field
            name="receiveEmails"
            component={Toggle}
            label="Please spam me!"
          /> */}
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  };

  renderDatePicker = props => {
    const date = new Date(this.props.initialValues.joinedTime);
    if (!props.meta.dirty) props.input.value = date || null;

    return (
      <div>
        <DatePicker {...props} />
      </div>
    );
  };

  renderTextField = props => {
    return (
      <div>
        <TextField {...props} />
      </div>
    );
  };

  renderSelectField = props => {
    if (props.meta.invalid)
      props.input.value = this.props.initialValues.position;
    return (
      <div>
        <SelectField value={props.value} {...props} />
      </div>
    );
  };

  renderRadioButtonGroup = props => {
    if ((this.props.initialValues || false) && props.meta.invalid)
      props.input.value = this.props.initialValues.sex;
    return (
      <div>
        <RadioButtonGroup {...props} />
        {this.renderError(props.meta)}
      </div>
    );
  };

  render() {
    return (
      <form
        className="ui form error" // error to show error message
        onSubmit={this.props.handleSubmit(this.onSumbit)}
      >
        {this.renderFields3()}
        <button
          disabled={
            !(this.props.initialValues || false) &&
            (this.props.pristine || this.props.submitting)
          }
          className="ui button primary"
        >
          Submit
        </button>
        <button
          disabled={this.props.pristine || this.props.submitting}
          className="ui button secondary"
          onClick={this.props.reset}
        >
          {this.props.initialValues || false ? "Reset" : "Clear"}
        </button>
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
  if (!formValues.position) {
    errors.position = "Position Required";
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
