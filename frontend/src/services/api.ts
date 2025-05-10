const API_BASE = 'http://localhost:8000'

export type JournalResponse = {
    id: number;
    content: string;
    created_at: string;
    sentiment_score: number;
}


/**サーバ疎通確認用：/pingを呼び出す */
export async function ping(): Promise<string> {
    const res = await fetch(`${API_BASE}/ping`); // URLにアクセス, backend/main.pyから返される
    const data = await res.json(); // サーバから動いているとpongが返される
    return data.message
}

// ジャーナリング投稿用
export async function postJournal(content:string): Promise<JournalResponse> {
    const res = await fetch(`${API_BASE}/journal`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content}),
    });
    const data = await res.json();
    return data
}

export type Record = {
    date: string;
    created_at: string;
    content: string;
    sentiment_score: number;
};

export async function getRecords(): Promise<Record[]> {
    const res = await fetch(`${API_BASE}/records`);
    const data = await res.json()
    return data
}

export type Score = { date: string; score: number };

export async function getScores(): Promise<Score[]> {
  const res = await fetch(`${API_BASE}/scores`);
  return res.json();
}
