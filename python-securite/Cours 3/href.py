from bs4 import BeautifulSoup
import requests

proxies = {"http": "120.234.135.251:9092"}
headers = {"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/5.1.3 Safari/534.53.10"}
FILE = "Epita.html"

with open(FILE) as f:
    soup = BeautifulSoup(f, features="html.parser")

count = 0

for elm in soup.find_all("a", href=True):
    print(elm["href"])
    try:
        r = requests.get(elm["href"], proxies=proxies, headers=headers)
        f = open(str(count) + ".html", "a")
        f.write(r.text)
        f.close()
        count = count - 1
    except:
        pass