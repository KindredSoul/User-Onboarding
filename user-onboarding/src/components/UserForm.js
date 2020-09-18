import React from "react";

/* Form info
	Name, Email, Password, Terms of Service (checkbox), 
	A Submit button sending data to a server
*/

function UserForm({ values, submit, change, disabled, errors }) {
	const onSubmit = (e) => {
		e.preventDefault();
		submit();
	};

	const onChange = (e) => {
		const { name, value, type, checked } = e.target;
		const useValue = type === "checkbox" ? checked : value;
		change(name, useValue);
	};

	return (
		<form onSubmit={onSubmit}>
			<h1>User Form</h1>
			<div>
				<div>{errors.first_name}</div>
				<div>{errors.last_name}</div>
				<div>{errors.email}</div>
				<div>{errors.password}</div>
				<div>{errors.serviceterms}</div>
			</div>
			<div className="input-container">
				<label>
					First Name
					<input
						value={values.first_name}
						onChange={onChange}
						name="first_name"
						type="text"
					/>
				</label>
				<label>
					Last Name
					<input
						value={values.last_name}
						onChange={onChange}
						name="last_name"
						type="text"
					/>
				</label>
				<label>
					Email
					<input
						value={values.email}
						onChange={onChange}
						name="email"
						type="text"
					/>
				</label>
				<label>
					Password
					<input
						value={values.password}
						onChange={onChange}
						name="password"
						type="password"
					/>
				</label>
				<label>
					Terms of Service
					<input
						value={values.serviceterms}
						onChange={onChange}
						name="serviceterms"
						type="checkbox"
					/>
				</label>
			</div>
			<button id="submitBtn" disabled={disabled}>
				Submit
			</button>
		</form>
	);
}

export default UserForm;
