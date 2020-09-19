import React, { useEffect, useState } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import axios from "axios";
import * as yup from "yup";
import User from "./components/User";
import FormSchema from "./components/FormSchema";

/* Form info
  Name, Email, Password, Terms of Service (checkbox),
  A Submit button sending data to a server
*/

// Initial values of form state and error state
const initialValues = {
	first_name: "",
	last_name: "",
	email: "",
	password: "",
	// Checkbox value is a boolean
	serviceterms: false,
};
const initialUsers = [];

function App() {
	// =================== STATES ===========================
	const [users, setUsers] = useState(initialUsers);
	const [formValues, setFormValues] = useState(initialValues);
	const [errorValues, setErrorValues] = useState(initialValues);
	const [disabled, setDisabled] = useState(true);

	const getUsers = () => {
		axios
			.get(`https://reqres.in/api/users`)
			.then((res) => {
				// console.log(res.data.data);
				setUsers(res.data.data);
			})
			.catch((error) => console.log(error));
	};

	const postNewUsers = (newUser) => {
		axios
			.post(`https://reqres.in/api/users`, newUser)
			.then((res) => {
				// console.log(res.data);
				setUsers([...users, res.data]);
				setFormValues(initialValues);
			})
			.catch((error) => console.log(error));
	};

	// Form Validation
	// Validating specific key/value pairs
	const validate = (name, value) => {
		yup
			.reach(FormSchema, name)
			.validate(value)
			// If no errors, set error values to nothing
			.then((valid) => {
				setErrorValues({
					...errorValues,
					[name]: "",
				});
			})
			// If errors, set errors to their values
			.catch((err) => {
				setErrorValues({
					...errorValues,
					[name]: err.errors[0],
				});
			});
	};
	// End Validation

	// Event Handlers
	const inputHandler = (name, value) => {
		validate(name, value);
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const formSubmit = () => {
		const newUser = {
			first_name: formValues.first_name.trim(),
			last_name: formValues.last_name.trim(),
			email: formValues.email.trim(),
			password: formValues.password.trim(),
			serviceterms: formValues.serviceterms,
		};
		postNewUsers(newUser);
	};

	useEffect(() => {
		getUsers();
	}, []);

	useEffect(() => {
		FormSchema.isValid(formValues).then((valid) => {
			setDisabled(!valid);
		});
	}, [formValues]);

	return (
		<div className="App">
			<h1>Welcome! Please signup below!</h1>

			<UserForm
				values={formValues}
				change={inputHandler}
				submit={formSubmit}
				disabled={disabled}
				errors={errorValues}
			/>

			<div className="user-container">
				{users.map((user, i) => {
					return <User userInfo={user} />;
				})}
			</div>
		</div>
	);
}

export default App;
