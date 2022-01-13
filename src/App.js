import React, { useState, useEffect, useRef } from "react";

import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
	let list = localStorage.getItem("list");
	if (list) {
		return (list = JSON.parse(localStorage.getItem("list")));
	} else {
		return [];
	}
};

const App = () => {
	const [name, setName] = useState("");
	const [list, setList] = useState(getLocalStorage());
	const [isEditing, setIsEditing] = useState(false);
	const [editID, setEditID] = useState(null);
	const [alert, setAlert] = useState({
		show: false,
		msg: "",
		type: "",
	});
	const nameRef = useRef();

	//console.log(name);

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
			setList(
				list.map((item) => {
					if (item.id === editID) {
						return { ...item, title: name };
						//return { ...item, title: name, id: editID };
					}

					return item;
				})
			);

			setName("");
			setEditID(null);
			setIsEditing(false);
			showAlert(true, "success", "value changed");
		} else {
			//add item
			//console.log("hi");
			showAlert(true, "success", "item added to the list");
			const newItem = { id: new Date().getTime().toString(), title: name };
			//console.log(newItem);
			setList([...list, newItem]);
			//console.log(list);
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

	const removeItem = (id) => {
		showAlert(true, "danger", "item removed");
		setList(list.filter((item) => item.id !== id));
	};

	const editItem = (id) => {
		console.log(id);
		const specificItem = list.find((item) => item.id === id);
		setIsEditing(true);
		setEditID(id);
		setName(specificItem.title);
	};

	useEffect(() => {
		localStorage.setItem("list", JSON.stringify(list));
	}, [list]);

	return (
		<section className="section-center">
			<form className="grocery-form" onSubmit={handleSubmit}>
				{alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
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
					<List items={list} removeItem={removeItem} editItem={editItem} />
					<button className="clear-btn" onClick={clearList}>
						clear items
					</button>
				</div>
			)}
		</section>
	);
};

export default App;
