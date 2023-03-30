from textblob import TextBlob
# import torch
import asyncio
import tensorflow as tf

def find_sentiment(news_story):
    news = TextBlob(news_story)
    sentiments = []
    for sentence in news.sentences:
        sentiment = sentence.sentiment
        for metric in sentiment:
            sentiments.append(metric)

    polarity_data=[]
    subjectivity_data=[]
    for i in range(len(sentiments)):
        if i % 2 == 0:
            polarity_data.append(sentiments[i])
        else:
            subjectivity_data.append(sentiments[i])
    # print(polarity_data)
    # print(subjectivity_data)

    polarity_average = calculate_average(polarity_data)
    subjectivity_average= calculate_average(subjectivity_data)

    # print("Polarity: " + calculate_sentiment(polarity_average, "polarity"))
    # print("Subjectivity: " + calculate_sentiment(subjectivity_average, "subjectivity"))
    return polarity_average,subjectivity_average
        
def calculate_average(list):
    try:
        return sum(list) / len(list)
    except:
        return sum(list) / 1      #Handle Zero Divison error

def calculate_sentiment(sentiment, type):
    sentiment_category = ""
    if type == "polarity":
        if sentiment > 0.75:
            sentiment_category = "Extremely positive.rate > 0.75"
        elif sentiment > 0.5:
            sentiment_category = "Significantly positive.rate > 0.5"
        elif sentiment > 0.3:
            sentiment_category = "Fairly positive.rate > 0.3"
        elif sentiment > 0.1:
            sentiment_category = "Slightly positive.rate > 0.1"
        elif sentiment < -0.1:
            sentiment_category = "Slightly negative. rate < -0.1"
        elif sentiment < -0.3:
            sentiment_category = "Fairly negative. rate < -0.3"
        elif sentiment < -0.5:
            sentiment_category = "Significantly negative.rate < -0.5"
        elif sentiment < -0.75:
            sentiment_category = "Extremely negative.rate < -0.75"
        else:
            sentiment_category = "Neutral.rate = 0 "
        return sentiment_category
    elif type == "subjectivity":
        if sentiment > 0.75:
            sentiment_category = "Extremely subjective. rate > 0.75"
        elif sentiment > 0.5:
            sentiment_category = "Fairly subjective.rate > 0.5"
        elif sentiment > 0.3:
            sentiment_category = "Fairly objective.rate > 0.3"
        elif sentiment > 0.1:
            sentiment_category = "Extremely objective.rate > 0.1"
        return sentiment_category
    else:
        print("Invalid Input.")


if __name__ == '__main__': 
    news_summary = 'GPT-2 vs GPT-3'
    # text_generation(news_summary)
    # generate_text(news_summary)
    # find_sentiment(news_summary)
    