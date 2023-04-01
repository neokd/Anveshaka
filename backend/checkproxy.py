import threading 
import queue
import requests
import random

q = queue.Queue()

valid = []
with open('proxy.txt','r+') as file:
    proxies = file.read().split('\n')
    for p in proxies:
        q.put(p)
        print(p)

def check_proxies():
    global q
    while not q.empty():
        proxy = q.get()
        try:
            res = requests.get('http://ipinfo.io/json', proxies={"https":proxy})
        except:
            continue
        if res.status_code == 200:
            print(proxy)

for _ in range(10):
    threading.Thread(target=check_proxies).start()

def scrape_google_news(text):
    with open('valid_proxy.txt','r') as f:
        proxies = f.read().split('\n')

    random.shuffle(proxies)  # shuffle the list of proxies

    for proxy in proxies:
        try:
            print(f'Using proxy {proxy}')
            request_result = requests.get(f'https://news.google.com/search?for={text}', proxies={"https":proxy}, timeout=5)
            if request_result.status_code == 200:
                break
        except:
            print(f"Failed using proxy {proxy}")
    else:
        print("All proxies failed")
        return []

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
