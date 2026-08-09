import urllib.request
import re

url = "https://www.google.com/search?q=kohinoor+the+arena&sca_esv=67b648e858f86603&authuser=6&sxsrf=APpeQnul_b1e3DqeyB0urA_sXj5OE8Pfaw%3A1786271473177&source=hp&ei=8VZ4aoW9CIyQnesPwJyWiQU&iflsig=ABILxe8AAAAAanhlAa4l12iWCXlg1cwYSfKFSqrQ2Ti3&ved=0ahUKEwjF-YPlq5OWAxUMSGcHHUCOJVEQ4dUDCCw&uact=5&oq=kohinoor+the+arena&gs_lp=Egdnd3Mtd2l6IhJrb2hpbm9vciB0aGUgYXJlbmEyBhAAGBYYHjIGEAAYFhgeMgsQABiABBiKBRiGAzILEAAYgAQYigUYhgMyCxAAGIAEGIoFGIYDMgsQABiABBiKBRiGAzILEAAYgAQYigUYhgNIjCxQwgVY-SpwAXgAkAEAmAGFAqAB9BiqAQYwLjEzLjS4AQPIAQD4AQGYAhKgAsQZqAIKwgIQECMYnQYY6AYY3QUY6gIYJ8ICEBAjGKIHGJ4GGPAFGOoCGCfCAgcQIxjqAhgnwgIEECMYJ8ICChAAGIAEGIoFGEPCAhMQLhiABBiKBRhDGMcBGK8BGI4FwgIQEC4YgAQYigUYQxjHARivAcICFBAuGIAEGIoFGJECGMcBGK8BGI4FwgIREC4YgAQYigUYkQIYxwEYrwHCAgoQIxjJAhjwBRgnwgINEAAYgAQYigUYQxixA8ICEBAAGIAEGIoFGEMYsQMYyQPCAgsQABiABBiKBRiSA8ICCxAuGIAEGMcBGK8BwgIOEC4YgAQYxwEYrwEYjgXCAgUQABiABMICCxAAGIAEGIoFGJECwgIFEC4YgASYAwjxBceKNGjfAY3XkgcGMS4xMy40oAf4lwKyBwYwLjEzLjS4B7sZwgcGMC4xMS43yAc0gAgB&sclient=gws-wiz#irp=&lpg=cid:CgIgAQ%3D%3D,ik:CAoSHENJQUJJaEJNcnBWRVJXOUJDUHo3Mm9DTjhtZXk%3D"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    mp4s = set(re.findall(r'https?://[^"\'\s]+\.mp4[^"\'\s]*', html))
    yt = set(re.findall(r'https?://(?:www\.)?youtube\.com/watch\?v=[^"\'\s&]+', html))
    print("MP4s:", mp4s)
    print("YouTube:", yt)
except Exception as e:
    print(e)
