import React, { useState, useEffect, useRef } from "react";

import List from "./List";
import Alert from "./Alert";

const App = () => {
	const [name, setName] = useState("");
	const [list, setList] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [editID, setEditID] = useState(null);
	const [alert, setAlert] = useState({
		show: false,
		msg: "",
		type: "",
	});
	const nameRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		//console.log("Hello World");

		if (!name) {
			//display alert
			//setAlert({ show: true, msg: "please enter value", type: "danger" });
			showAlert("true", "danger", "pls enter value");
			//console.log("1");
		} else if (name && isEditing) {
			//deal with edit
			//console.log("2");
		} else {
			//add item
			//console.log("hi");
			showAlert(true, "success", "item added to the list");
			const newItem = { id: new Date().getTime().toString(), title: name };
			setList([...list, newItem]);
			setName("");
			nameRef.current.focus();
		}
	};

	//setAlert
	const showAlert = (show = false, type = "", msg = "") => {
		setAlert({ show, type, msg });
	};

	const clearList = () => {
		showAlert(true, "danger", "empty list");
		setList([]);
	};

	return (
		<section className="section-center">
			<form className="grocery-form" onSubmit={handleSubmit}>
				{alert.show && (
					<Alert {...alert} removeAlert={showAlert} clearList={clearList} />
				)}
				<h3>grocery bud proj</h3>
				<div className="form-control">
					<input
						ref={nameRef}
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

			{list.length > 0 && (
				<div className="grocery-container">
					<List items={list} />
					<button className="clear-btn" onClick={clearList}>
						clear items
					</button>
				</div>
			)}
		</section>
	);
};

export default App;
