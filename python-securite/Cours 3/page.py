import requests

proxies = {"http": "120.234.135.251:9092"}
headers = {"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5)"}

r = requests.get("https://epita.fr", proxies=proxies, headers=headers)

print(r.text)

for cookie in r.cookies:
    print(cookie)

f = open("Epita.html", "a")
f.write(r.text)
# f.write(str(cookie))  # This line is commented out
f.close()