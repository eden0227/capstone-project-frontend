import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export default function ChatbotModal({ show, handleClose }) {
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);

    const sendMessage = async (e) => {
        e.preventDefault();
        const API_URL = "https://api.openai.com/v1/chat/completions";
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        const secretPrompt = import.meta.env.VITE_SECRET_PROMPT;

        const systemMessage = {
            role: 'system',
            content: secretPrompt
        };

        const messageToSend = [
            systemMessage,
            ...allMessages,
            {
                role: 'user',
                content: message
            }
        ];

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messageToSend
            })
        });

        const data = await response.json();

        if (data) {
            let newAllMessages = [
                ...allMessages,
                {
                    role: 'user',
                    content: message
                },
                data.choices[0].message
            ];
            setAllMessages(newAllMessages);
            setMessage('');
        }
    };

    const clearChatbox = () => {
        setAllMessages([]);
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered style={{ fontFamily: "Genos, cursive" }}>
            <Modal.Header closeButton className="d-flex justify-content-center" style={{ fontSize: "1.5rem" }}>
                <div className="w-100 text-center">AI Assistance</div>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column">
                <div className="rounded-3 p-3 chatbotmodal-custom-style">
                    {allMessages.map((msg, index) => (
                        <div key={index} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", marginBottom: "10px" }}>
                            <p style={{ maxWidth: "70%", padding: "10px", borderRadius: "10px", backgroundColor: "#E8E8E8", color: "#000", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
                                <strong>{msg.role.charAt(0).toUpperCase() + msg.role.slice(1)}:</strong> {msg.content}
                            </p>
                        </div>
                    ))}
                </div>
                <Form onSubmit={sendMessage} className="mt-5 mb-4 d-flex justify-content-center align-items-center">
                    <Form.Control
                        type="text"
                        placeholder="Enter your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ boxShadow: "none", outline: "none" }}
                    />
                    <div className="d-flex gap-2">
                        <Button type="submit" variant="dark" style={{ minWidth: "77px" }}>Send</Button>
                        <Button variant="danger" style={{ minWidth: "77px" }} onClick={clearChatbox}>Clear</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
