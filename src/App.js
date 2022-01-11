import React, { useState, useEffect } from "react";

import List from "./List";
import Alert from "./Alert";

const App = () => {
	const [name, setName] = useState("");
	const [list, setList] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [editID, setEditID] = useState(null);
	const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Hello World");
	};

	return (
		<section className="section-center">
			<form className="grocery-form" onSubmit={handleSubmit}>
				{alert.show && <Alert />}
				<h3>grocery bud proj</h3>
				<div className="form-control">
					<input
						type="text"
						placeholder="e.g eggs"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="grocery"
					/>
					<button type="submit" className="submit-btn">
						{isEditing ? "edit" : "submit"}
					</button>
				</div>
			</form>
			<div className="grocery-container">
				<List />
				<button className="clear-btn">clear items</button>
			</div>
		</section>
	);
};

export default App;
