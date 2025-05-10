# DBテーブルの構造定義
from sqlalchemy import Column, Integer, Float, String, DateTime,func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class JournalEntry(Base):
    __tablename__ = "journal_entries" # テーブル名、以下はカラム
    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    sentiment_score = Column(Float, nullable=False, default=0.0)