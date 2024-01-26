/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { COLLECTION_ID, DATABASE_ID, client, database } from '../appwriteConfig';
import { ID, Permission, Query, Role } from 'appwrite';
import useInput from '../hooks/input';
import useAuth from '../hooks/auth';
import { Trash2 } from 'react-feather';

const RoomPage = () => {
	const [messages, setMessages] = useState([]);
	const [messageBody, setMessageBody, resetMessageBody] = useInput();
	const { user } = useAuth();

	useEffect(() => {
		getMessages();

		const unsubscribe = client.subscribe(
			`databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
			(response) => {
				if (response.events.includes('databases.*.collections.*.documents.*.create')) {
					console.log('A MESSAGE WAS CREATED');
					setMessages((prevState) => [response.payload, ...prevState]);
				}

				if (response.events.includes('databases.*.collections.*.documents.*.delete')) {
					console.log('A MESSAGE WAS DELETED!!!');
					setMessages((prevState) =>
						prevState.filter((message) => message.$id !== response.payload.$id)
					);
				}
			}
		);

		return () => {
			unsubscribe();
		};
	}, []);

	const getMessages = async () => {
		try {
			const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
				Query.orderDesc('$createdAt'),
				Query.limit(100),
			]);

			setMessages(response.documents);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			user_id: user.$id,
			username: user.name,
			body: messageBody,
		};

		const permissions = [Permission.write(Role.user(user.$id))];

		try {
			const message = await database.createDocument(
				DATABASE_ID,
				COLLECTION_ID,
				ID.unique(),
				payload,
				permissions
			);

			// setMessages((prev) => [message, ...prev]);
			resetMessageBody();
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async (messageId) => {
		try {
			await database.deleteDocument(DATABASE_ID, COLLECTION_ID, messageId);
			setMessages((prevState) => prevState.filter((message) => message.$id !== messageId));
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<main className="container">
			<Header />
			<div className="room--container">
				<form id="message--form" onSubmit={handleSubmit}>
					<div>
						<textarea
							required
							maxLength="250"
							placeholder="Say something..."
							onChange={setMessageBody}
							value={messageBody}
						></textarea>
					</div>

					<div className="send-btn--wrapper">
						<input className="btn btn--secondary" type="submit" value="send" />
					</div>
				</form>

				<div>
					{messages.map((message) => (
						<div key={message.$id} className={'message--wrapper'}>
							<div className="message--header">
								<p>
									{message?.username ? <span> {message?.username}</span> : 'Anonymous user'}

									<small className="message-timestamp">
										{' '}
										{new Date(message.$createdAt).toLocaleString()}
									</small>
								</p>

								{message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
									<Trash2
										className="delete--btn"
										onClick={() => {
											handleDelete(message.$id);
										}}
									/>
								)}
							</div>

							<div
								className={
									'message--body' + (message.user_id === user.$id ? ' message--body--owner' : '')
								}
							>
								<span>{message.body}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
};

export default RoomPage;
