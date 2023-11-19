import requests

def getURL(url):
    response = requests.head(url)
    print(response.content)
    print(response.headers['location'])