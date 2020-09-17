import React from "react";

function User({ userInfo }) {
	if (!userInfo) {
		return <h2>Acquiring user data, please hold...</h2>;
	}

	return (
		<div>
			<h2>
				{" "}
				{userInfo.first_name} {userInfo.last_name}{" "}
			</h2>
			<h3>Email: {userInfo.email} </h3>
		</div>
	);
}

export default User;
