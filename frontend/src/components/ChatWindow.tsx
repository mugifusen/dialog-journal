import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput
} from '@chatscope/chat-ui-kit-react';
import { useState } from 'react';
import { sensitiveHeaders } from 'http2';

type ChatMessage = {
  message: string;
  direction: 'incoming' | 'outgoing'; // incoming: 左, outgoing:右　に発話表示
  sentTime: string;
  sender: string;
};

const ChatWindow = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { message: 'こんにちは！', direction: 'incoming', sentTime: 'now', sender: 'Bot' }
  ]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // ユーザ発言（右側）
    const userMsg: ChatMessage = {
      message: text,
      direction: 'outgoing',
      sentTime: new Date().toLocaleTimeString(),
      sender: 'You',
    };
    // Bot応答（左側）
    const botMsg: ChatMessage = {
      message: `Bot: 「${text}」ですね！`,
      direction: 'incoming',
      sentTime: new Date().toLocaleTimeString(),
      sender: 'Bot',
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
  };

  return (
    <MainContainer style={{ height: '500px' }}>
      <ChatContainer>
        <MessageList>
          {messages.map((m, i) => (
            <Message
              key={i}
              model={{
                message: m.message,
                sentTime: m.sentTime,
                sender: m.sender,
                direction: m.direction,
                position: 'single'
              }}
            />
          ))}
        </MessageList>
        <MessageInput placeholder="メッセージを入力..." onSend={handleSend} />
      </ChatContainer>
    </MainContainer>
  );
};

export default ChatWindow;
