import requests
import bs4

text = "narendra modi"
url = 'https://google.com/search?q=' + text
  
googleResult=requests.get( url )
soup = bs4.BeautifulSoup(googleResult.text,"html.parser")
heading_object=soup.find_all( 'h3' )

for info in heading_object:
    print(info.getText())
    print("------")