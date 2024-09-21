
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ChatContainer = styled.div`
  width: 400px;
  margin: 50px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.div`
  background-color: #007BFF;
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 18px;
`;

const ChatBody = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding: 15px;
  background-color: #f1f1f1;
`;

const Message = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  background-color: ${props => (props.isUser ? '#007BFF' : '#e2e2e2')};
  color: ${props => (props.isUser ? 'white' : 'black')};
  border-radius: 10px;
  max-width: 80%;
  align-self: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
`;

const ChatFooter = styled.div`
  display: flex;
  padding: 10px;
  background-color: #fff;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #007BFF;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
  margin-left: 10px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ChatQuery = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const sendQuery = async () => {
    if (query.trim() === '' || loading) return;
    setLoading(true);
    const userMessage = { isUser: true, text: query };
    setMessages([...messages, userMessage]);
    setQuery('');

    try {
      const response = await axios.post(
        `https://hackndore.onrender.com/chat`,
        { query: query },
        {
          headers: {
            'accept': 'application/json'
          }
        }
      );

      const botMessage = { isUser: false, text: response.data.response };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      const botMessage = { isUser: false, text: 'Sorry, something went wrong. Please try again later.' };
      setMessages([...messages, userMessage, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContainer>
      <Header>Chat with Us</Header>
      <ChatBody>
        {messages.map((message, index) => (
          <Message key={index} isUser={message.isUser}>
            {message.text}
          </Message>
        ))}
      </ChatBody>
      <ChatFooter>
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter your question"
          disabled={loading}
        />
        <Button onClick={sendQuery} disabled={loading}>
          Send
        </Button>
        {loading && <Loader />}
      </ChatFooter>
    </ChatContainer>
  );
};

export default ChatQuery;
