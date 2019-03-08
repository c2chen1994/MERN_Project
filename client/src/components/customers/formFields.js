export default {
  firstName: {
    label: "First Name",
    name: "firstName",
    type: "text",
    values: [],
    noValueError: "You must provide your First Name"
  },
  lastName: {
    label: "Last Name",
    name: "lastName",
    type: "text",
    values: [],
    noValueError: "You must provide your Last Name"
  },
  sex: {
    label: "Sex",
    name: "sex",
    type: "radio",
    noValueError: "You must provide your Sex",
    values: ["Male", "Female"]
  },
  age: {
    label: "Age",
    name: "age",
    type: "text",
    values: [],
    noValueError: "You must provide your Age"
  },
  email: {
    label: "Email",
    name: "email",
    type: "email",
    values: [],
    noValueError: "You must provide an Email"
  },
  description: {
    label: "Description",
    name: "description",
    type: "textarea",
    values: [],
    noValueError: "You must provide a Description"
  },
  position: {
    label: "Pisition",
    name: "position",
    type: "select",
    values: ["Manager, Employee, Senior Manager"],
    noValueError: "You must provide a Pisition"
  },
  joinedTime: {
    label: "Joined Time",
    name: "joinedTime",
    type: "date",
    values: [],
    noValueError: "You must provide a Joined Time"
  }
};
