import requests
import bs4

text = "narendra modi"
# url = 'https://google.com/search?q=' + text
url = f'https://www.google.com/search?q={text}&source=lnms&tbm=nws&sa=X'
googleResult=requests.get( url )
soup = bs4.BeautifulSoup(googleResult.text,"html.parser")
headers = soup.find_all( 'h3' )
links = soup.find_all('a')

for i in links:
    for j in headers:
        print(i['href'])
    print(j.getText())


# for info in headers:
#     print(info.getText())
#     print("------")