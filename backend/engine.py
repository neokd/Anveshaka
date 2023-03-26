from textblob import TextBlob

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

    polarity_average = calculate_average(polarity_data)
    subjectivity_average= calculate_average(subjectivity_data)

    print()
    print("Polarity: " + calculate_sentiment(polarity_average, "polarity"))
    print("Subjectivity: " + calculate_sentiment(subjectivity_average, "subjectivity"))
        
def calculate_average(list):
    return sum(list) / len(list)

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

find_sentiment(news_summary)