import { object } from "prop-types";
import React from "react";
import { useState, useEffect } from "react";
import "../../styles/ToDoListApi.css";

const ToDoListApi = () => {
	const [input, setinput] = useState("");
	const [lista, setLista] = useState([]);

	function conseguirDatos() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/orealba")
			.then((response) => response.json())
			.then((result) => setLista(result))
			.catch((error) => console.log("error", error));
	}
	function actualizarDatos() {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(lista);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/orealba",
			requestOptions
		)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
	}
	useEffect(() => {
		conseguirDatos();
	}, []);
	useEffect(() => {
		if (lista.length > 0) {
			actualizarDatos();
		}
	}, [lista]);

	function borrar(i) {
		let re = lista.filter((valor, index) => {
			return index != i;
		});

		setLista(re);
	}
	return (
		<>
			<div>
				<div className="list">
					<h2>Lista de tareas pendientes</h2>

					<input
						placeholder="Agregar nueva tarea "
						type="text"
						id="inputNuevaTarea"
						onChange={(e) => {
							setinput(e.target.value);
						}}
					/>
					<button
						onClick={() => {
							setLista([...lista, { label: input, done: false }]);
						}}>
						OK
					</button>
					<ul id="contenedorTareas">
						{lista.map(function (valor, i) {
							return (
								<li key={i}>
									{valor.label}
									<button
										className="xbutton"
										onClick={() => {
											borrar(i);
										}}>
										X
									</button>{" "}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<div>
				<img
					className="flowers"
					src="https://i.pinimg.com/originals/27/4d/76/274d7614cd36432a341afdb087f10728.png"
					alt="flowers"
				/>
			</div>
		</>
	);
};

export default ToDoListApi;
