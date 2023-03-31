from newspaper import Article,ArticleException
import requests
import bs4
import json
import nltk
import engine
import os

try:
    home_directory = os.path.expanduser( '~' )
    path = os.path.join( home_directory, 'nltk_data', 'tokenizers','punkt.zip' )
    os.path.isfile(path)
    print('found')
except Exception:
    nltk.download('punkt')

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

def scrape_google(text):
    url = 'https://google.com/search?q=' + text
    request_result=requests.get( url )
    soup = bs4.BeautifulSoup(request_result.text,"html.parser")

    scrape_links = []
    scrape_links.append({"searchKey":text.capitalize()})
    for a in soup.find_all('a',href=True):
        for i in a.find_all('h3'):
            scrape_links.append({
                "title":i.getText(),
                "link": a['href'].split('/url?q=',1)[1].split('&',1)[0]
            },)
    return scrape_links

def write_json(links):
    i=0
    json_write = []
    for link in links[:10]:
        article = Article(link, language="en")
        try:
            article.download()
            article.parse()
            article.nlp()
        except ArticleException:
            pass
        print('-----------------------------------------> '+str(i))
        json_data = {
            "key":str(i),
            "url":link,
            "title": article.title.strip(),
            "description": article.text,
            "summary":article.summary.strip(),
            "keywords":article.keywords,
            "sentiment":engine.find_sentiment(article.text.strip()),
            "dark": "False",
        }
        json_write.append(json_data)
        i+=1
    with open('temp.json','w') as json_file:
        json.dump(json_write,json_file,indent=4, separators=(',', ': '))    

def extract_json():
    json_file = open('temp.json')
    data = list(json.load(json_file))
    return data

if __name__ == '__main__':
    links = (scrape_google_news('python'))
    write_json(links)
    extract_json()
    


