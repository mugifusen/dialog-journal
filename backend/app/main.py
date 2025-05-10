from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from sqlalchemy.orm import Session
from . import models, schemas
from .deps import get_db
from .database import SessionLocal, engine
from .sentiment_BERT import EmotionAnalyzer

# モデルのメタデータを初回のみ作成
models.Base.metadata.create_all(bind=engine)
app = FastAPI()

analyzer = EmotionAnalyzer() # 起動時

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # frontのurl
    allow_credentials=True,
    allow_methods=["*"], # 全てのHTTPメソッドを許可
    allow_headers=["*"], # 全てのHTTPヘッダーを許可
)


# ユーザの入力をDBに保管、そのレコードを返す
@app.post('/journal', response_model=schemas.JournalResponse)
def create_journal(entry: schemas.JournalCreate, db: Session = Depends(get_db)):
    # 感情scoreを取得
    sentiment_data = analyzer.analyze_emotion(entry.content)
    sentiment_score = analyzer.analyze_score(sentiment_data)

    journal = models.JournalEntry(content=entry.content, sentiment_score=sentiment_score)
    db.add(journal)
    db.commit()
    db.refresh(journal)
    return journal

# 保管したジャーナル一覧を取得し、フロントでテーブル表示
@app.get('/records', response_model=List[schemas.JournalResponse])
def read_records(db: Session = Depends(get_db)):
    return db.query(models.JournalEntry).order_by(models.JournalEntry.created_at.desc()).all()


# 直近7日の感情scoreを計算してグラフで利用
@app.get("/scores", response_model=List[schemas.ScoreResponse])
def read_scores(db: Session = Depends(get_db)):
    entries = db.query(models.JournalEntry).order_by(models.JournalEntry.created_at.desc()).limit(7).all()
    # 例：文字数／10 をスコアとする
    return [{"date": e.created_at.date().isoformat(), "score": len(e.content) / 10} for e in reversed(entries)]


@app.get('/ping')
async def ping():
    return {'message': 'pong'}