from textblob import TextBlob
# import torch
import asyncio
import tensorflow as tf

news_summary = """Github copilot x is an replacement of programmer"""


def find_sentiment(text):
    news = TextBlob(news_summary)
    polarity_data = []
    subjectivity_data = []
    sentiments = []
    avg_polarity = 0
    polarity_count = 0

    for sentence in news.sentences:
        sentiment = sentence.sentiment
        polarity = sentiment.polarity
        subjectivity = sentiment.subjectivity
      
        if polarity > 0:
            polarity_category = 1
        elif polarity < 0:
            polarity_category = -1
        else:
            polarity_category = 0
        
        if subjectivity > 0.5:
            subjectivity_category = "subjective"
        else:
            subjectivity_category = "objective"
        
        polarity_data.append(polarity_category)
        subjectivity_data.append(subjectivity_category)
        
        for type,avg in enumerate(polarity_data):
            (avg_polarity ) += (avg)
        avg_polarity = avg_polarity / len(polarity_data)
        print(avg_polarity)
        if avg_polarity > 0:
            return ['positive',avg_polarity]
        elif avg_polarity < 0:
            return ['negative',avg_polarity]
        else:
            return ['neutral']

    # print("Polarity categories: ", polarity_data)
    # print(sentiments)
    # print("Subjectivity categories: ", subjectivity_data)

if __name__ == '__main__':
    find_sentiment(news_summary)