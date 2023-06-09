import React, { useState, useEffect } from "react";
import styles from "../stylesheets/card.module.css";
import { useNavigate } from "react-router-dom/dist";

const Mentors = ({ mentid, notifications }) => {
	const navigate = useNavigate();

	const handleGoToChat = () => {
		navigate(`/mentor/chat/${mentid}`);
	};

	const [creadentials, setCredentials] = useState({ email: "", mname: "", topper: [] });
	const [imags, setImgarr] = useState([]);

	let url = "";
	process.env.NODE_ENV === "production" ? (url = "") : (url = "http://localhost:6100");

	useEffect(() => {
		const getdata = async () => {
			const response = await fetch(url + `/api/admin/mentor/dets/${mentid}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			const json = await response.json();

			if (json.success) {
				setCredentials({ email: json.mentdets.email, mname: json.mentdets.name, topper: json.mentdets.toparea });
				setImgarr(...imags, json.mentdets.idurl);
			}
		};

		getdata();
	}, [imags, mentid]);

	return (
		<div className={styles.cardstyle}>
			<div className={styles.statscontainer}>
				<div className={styles.innerdiv}>
					<div className={styles.innermost1}>
						<p className={styles.cardcontent}>Name: {creadentials.mname}</p>
						<p className={styles.cardcontent}>Fields: {creadentials.topper} </p>
						<p className={styles.cardcontent}>Notifications: {notifications}</p>
						<p className={styles.cardcontent}>
							<button onClick={handleGoToChat}>Go to chat</button>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Mentors;
