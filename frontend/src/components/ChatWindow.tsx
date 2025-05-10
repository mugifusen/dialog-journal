import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput
} from '@chatscope/chat-ui-kit-react';
import { useState } from 'react';
import { postJournal } from '../services/api';

type ChatMessage = {
  message: string;
  direction: 'incoming' | 'outgoing'; // incoming: 左, outgoing:右　に発話表示
  sentTime: string;
  sender: string;
};

const questions = [
  'まず、今頭の中に思い浮かんでいることを教えてください',
  '続いて、今日の嬉しかったことを教えてください',
  '最後に、今日の嫌だったことを教えてください'
];


const ChatWindow = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      message: 'ジャーナリングを始めよう！\nそれぞれの質問に2分間で思っていることを書き出してみよう',
      direction: 'incoming',
      sentTime: new Date().toLocaleTimeString(),
      sender: 'Bot'
    },
    {
      message: questions[0],
      direction: 'incoming',
      sentTime: new Date().toLocaleTimeString(),
      sender: 'Bot'
    }
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const time = new Date().toLocaleTimeString();

    // 1) ユーザ発言を追加
    const userMsg: ChatMessage = {
      message: text,
      direction: 'outgoing',
      sentTime: time,
      sender: 'You'
    };
    setMessages(prev => [...prev, userMsg]);

    // 2) サーバーに投稿してスコア取得
    let sentimentScore = 0;
    try {
      const resp = await postJournal(text);
      sentimentScore = resp.sentiment_score;
      setScores(prev => [...prev, sentimentScore]);
    } catch (e) {
      console.error('journal API error', e);
    }

    // 3) 次のステップ
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      // 次の質問を Bot が発話
      const botMsg: ChatMessage = {
        message: questions[nextIndex],
        direction: 'incoming',
        sentTime: new Date().toLocaleTimeString(),
        sender: 'Bot'
      };
      setMessages(prev => [...prev, botMsg]);
      setCurrentQuestionIndex(nextIndex);
    } else {
      // 最終ステップ：今日の気分に応じた総合フィードバック
      const allScores = [...scores, sentimentScore];
      const avg = allScores.reduce((a, b) => a + b, 0) / allScores.length;
      const finalText =
        avg >= 0
          ? '日々の小さな幸せに目を向けるのも良いね'
          : '今日はゆっくり休んで、明日を楽しもうね。';
      const botMsg: ChatMessage = {
        message: finalText,
        direction: 'incoming',
        sentTime: new Date().toLocaleTimeString(),
        sender: 'Bot'
      };
      setMessages(prev => [...prev, botMsg]);
    }
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