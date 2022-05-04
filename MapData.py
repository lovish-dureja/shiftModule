# -*- coding: utf-8 -*-
"""
Created on Fri Feb 15 11:49:30 2021

@author: lduan
"""
from facebook_scraper import get_posts
from geopy.geocoders import GoogleV3
import re
import pandas as pd
from pymongo import MongoClient

loc_lat = []
loc_long = []
date = []
geolocator = GoogleV3(api_key="AIzaSyC10O0_UrRTtFJOdYo4VfuloSVk7zVbaV0")
for post in get_posts('Windsorfirefighters', pages=100):
    if re.search(r'(\d+) block of', post['text'], re.M|re.I) or re.search(r'(\d+) (\S+) St', post['text'], re.M|re.I) or re.search(r'(\d+) (\S+) Blvd', post['text'], re.M|re.I) or re.search(r'(\d+) (\S+) Dr', post['text'], re.M|re.I) or re.search(r'(\d+) (\S+) Crt', post['text'], re.M|re.I) or re.search(r'(\d+) (\S+) Cir', post['text'], re.M|re.I):
        clean_posts = re.sub('(http\S+)', '', post['text']).strip().replace('\n', '')
        loc_extract = [tuple(i for i in record if i) for record in re.findall(r'((\d+) block of (\S+) (\S+))|((\d+) (\S+) St)|((\d+) (\S+) Blvd)|((\d+) (\S+) Dr)|((\d+) (\S+) Crt)', post['text'], re.M|re.I)]
        for loc in loc_extract:
            loc_temp = loc[0].replace(',','').replace('.','')
            loc_word_list = loc_temp.split()
            if loc_word_list[-1] not in {'Avenue', 'avenue', 'Ave', 'ave', 'Boulevard', 'boulevard', 'Blvd', 'blvd', 'Circle', 'circle', 'Cir', 'cir', 'Court', 'court', 'Crt', 'crt', 'Drive', 'drive', 'Dr', 'dr', 'Road', 'road', 'Rd', 'rd', 'Street', 'street', 'St', 'st'}:
                loc = loc_temp.rsplit(' ', 1)[0] + ", " + "Windsor" + ", " + "Ontario" + ", " + "Canada"
            else:
                loc = loc_temp + ", " + "Windsor" + ", " + "Ontario" + ", " + "Canada"
            loc_lat.append(geolocator.geocode(loc).latitude)
            loc_long.append(geolocator.geocode(loc).longitude)
            date.append(post['time'].strftime("%Y-%m-%d"))
dict = {'latitude': loc_lat, 'longitude': loc_long, 'date': date}
df = pd.DataFrame(dict)
df.drop_duplicates(subset=['latitude', 'longitude'], keep='last', inplace=True)

client =  MongoClient("mongodb+srv://ASE2021:WindsorBillboard@clusterase.nood0.mongodb.net/ASE_DB?retryWrites=true&w=majority")
db = client['ASE_DB']
collection = db['map_data']
collection.delete_many({})
df.reset_index(inplace=True)
data_dict = df.to_dict(orient='records')
collection.insert_many(data_dict)
