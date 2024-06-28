import React, { useContext, useEffect, useState } from 'react';
import "./DiscussPages.css";
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const ExpertDiscussion = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [ANSWER, setANSWER] = useState('');
    const [question, setQuestion] = useState('');
    const [quesStatus, setQuesStatus] = useState('');
    const [input, setInput] = useState("");

    const getQuestion = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/chat/getQuestionById", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,  // Assuming token should be included in the authorization header
                },
                body: JSON.stringify({ Q_ID: id }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.data[0]);
                setQuestion(data.data[0].QUESTION);
                setQuesStatus(data.data[0].QUES_STATUS);
            } else {
                const errorData = await response.json();
                console.error("Error fetching queries:", errorData);
                alert(`Failed to fetch queries: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Fetch request error:", error);
            alert("An error occurred while fetching the queries. Please try again.");
        }
    };

    const handleSendMessage = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/chat/expertAnswer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,  // Assuming token should be included in the authorization header
                },
                body: JSON.stringify({ Q_ID: id, ANSWER, USER_TYPE: 'EXPERT' }),
            });

            if (response.ok) {
                const data = await response.json();
                setANSWER("");
                getAnswer();
            } else {
                const errorData = await response.json();
                console.error("Error fetching queries:", errorData);
                alert(`Failed to fetch queries: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Fetch request error:", error);
            alert("An error occurred while fetching the queries. Please try again.");
        }
    };

    const getAnswer = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/chat/getConvobyId", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,  // Assuming token should be included in the authorization header
                },
                body: JSON.stringify({ Q_ID: id }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.data);
                setMessages(data.data);
            } else {
                const errorData = await response.json();
                console.error("Error fetching queries:", errorData);
                alert(`Failed to fetch queries: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Fetch request error:", error);
            alert("An error occurred while fetching the queries. Please try again.");
        }
    };

    const handleEndChat = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/chat/resolve", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,  // Assuming token should be included in the authorization header
                },
                body: JSON.stringify({ Q_ID: id }),
            });

            if (response.ok) {
                const data = await response.json();
                navigate('/seller/discuss');
            } else {
                const errorData = await response.json();
                console.error("Error fetching queries:", errorData);
                alert(`Failed to fetch queries: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Fetch request error:", error);
            alert("An error occurred while fetching the queries. Please try again.");
        }
    };

    useEffect(() => {
        getQuestion();
        getAnswer();
    }, [id]);

    return (
        <div className="chat-page">
            <div className="chat-header">
                <h2>Chat with Expert</h2>
            </div>
            <div className="chat-body">
                <div className={`chat-message FARMER`}>
                    {question}
                </div>
                {messages.map((message, index) => (
                    <div key={index} className={`chat-message ${message.USER_TYPE}`}>
                        <strong>{message.USER_NAME}:</strong> {message.ANSWER}
                    </div>
                ))}
            </div>
            {quesStatus === 1 && (
                <div className="chat-footer">
                    <input
                        type="text"
                        value={ANSWER}
                        onChange={(e) => setANSWER(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            )}
        </div>
    );
};

export default ExpertDiscussion