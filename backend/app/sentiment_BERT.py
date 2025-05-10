from transformers import pipeline, AutoModelForSequenceClassification, BertJapaneseTokenizer

# 感情分析
class EmotionAnalyzer:
    def __init__(self):
        # 1. 学習済みモデルの準備
        self.model = AutoModelForSequenceClassification.from_pretrained("koheiduck/bert-japanese-finetuned-sentiment")
        self.tokenizer = BertJapaneseTokenizer.from_pretrained("koheiduck/bert-japanese-finetuned-sentiment")
        # 3. 感情分析モデルの生成
        self.nlp = pipeline("sentiment-analysis", model=self.model, tokenizer=self.tokenizer)

    def analyze_emotion(self, text):
        emotion_data = self.nlp(text)
        return emotion_data

    def analyze_score(self, emotion_data):
        if not emotion_data:    # 感情分析の結果がNEUTRALの時
            return None
        score = emotion_data[0]["score"]
        label = emotion_data[0]["label"]

        if label == "NEGATIVE":
            return -score
        elif label == 'POSITIVE':
            return score
        else: # NEUTRAL
            return 0.0

if __name__=='__main__':
    text = "美味しいごはんが好きなんだー"
    analyzer = EmotionAnalyzer()

    # テキストの感情分析を実行
    emotion_data = analyzer.analyze_emotion(text)
    kaomoji = analyzer.analyze_score(emotion_data)
    print(kaomoji)