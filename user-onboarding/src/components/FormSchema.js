import * as yup from "yup";

export default yup.object().shape({
	first_name: yup.string().required("First name is required"),
	last_name: yup.string().required("Last name is required"),
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup
		.string()
		.required("A password is required!")
		// Requires that there be a minimum amount of characters (x, 'error message here')
		.min(5, "Password must contain 5 or more characters"),
	serviceterms: yup
		.boolean()
		// Requires that one of the selected values in the array be true followed by an error message
		.oneOf([true], "Please accept out terms of service to continue"),
});
