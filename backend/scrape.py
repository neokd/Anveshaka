from newspaper import Article,ArticleException
import requests
import bs4
import json

# Sample URL
#https://news.google.com/articles/CBMic2h0dHBzOi8vd3d3LmxpdmVtaW50LmNvbS9icmFuZC1zdG9yaWVzL2hvdy1nZWVrc2ZvcmdlZWtzLWlzLW1ha2luZy1wcm9ncmFtbWluZy1lYXNpZXItd29ybGR3aWRlLTExNjQ5MDc5ODQ3MDQ4Lmh0bWzSAXdodHRwczovL3d3dy5saXZlbWludC5jb20vYnJhbmQtc3Rvcmllcy9ob3ctZ2Vla3Nmb3JnZWVrcy1pcy1tYWtpbmctcHJvZ3JhbW1pbmctZWFzaWVyLXdvcmxkd2lkZS9hbXAtMTE2NDkwNzk4NDcwNDguaHRtbA?hl=en-IN&gl=IN&ceid=IN%3Aen


def scrape_google_news(text):
    url = f'https://news.google.com/search?for={text}'
    request_result = requests.get( url )
    soup = bs4.BeautifulSoup(request_result.text,"html.parser")
    main_tag = soup.find_all('main')
    for div in main_tag:
        div_tag = div.find('div')
    scrape_links = []
    for div in div_tag:
        a_tag = div.find('a', href=True)
        if a_tag != None:
            scrape_links.append('https://news.google.com'+a_tag['href'][1:])  
    return scrape_links



links = scrape_google_news('earthquake')
i=0
json_write = []
for link in links:
    article = Article(link, language="en")
    try:
        i+=1
        article.download()
        article.parse()
        article.nlp()
    except ArticleException:
        pass
    print('-----------------------------------------> '+str(i))
    json_data = {
        "url":link,
        "title": article.title,
        "description": article.text,
        "summary":article.summary,
        "keywords":article.keywords
    }
    json_write.append(json_data)
with open('backend/temp.json','w') as json_file:
    json.dump(json_write,json_file,indent=4, separators=(',', ': '))
   
# import json
# json_file = open('backend/temp.json')
# data = json.load(json_file)
# for i in data:
#     print(i['summary'])
