from textblob import TextBlob
# import torch
import asyncio
import tensorflow as tf

news_summary = """Harry Potter star Daniel Radcliffe expecting first child with longtime girlfriend Daniel, 33, has been dating Erin, 38, since 2013Harry Potter star Daniel Radcliffe is expecting his first child with longtime girlfriend Erin Darke.\nErin was pictured with her baby bump on Friday March 24 as the pair stepped out in New York City.\nErin and Daniel are expecting their first babyReps for Daniel confirmed the news to Us Weekly.\nDaniel has been in a relationship with Erin Darke since 2013; the two met on the set of Kill Your Darlings in 2013.\nErin and Daniel have veen dating since 2013Daniel is the second of the Harry Potter three - Daniel, Rupert Grint and Emma Watson - to welcome a child."""
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
    print(polarity_data)
    print(subjectivity_data)

polarity_data = []
subjectivity_data = []

        polarity_category = "negative"
        
        subjectivity_category = "subjective"
    else:
        subjectivity_category = "objective"
        
    polarity_data.append(polarity_category)
    subjectivity_data.append(subjectivity_category)

print("Polarity categories: ", polarity_data)