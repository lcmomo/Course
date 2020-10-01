#coding=utf-8
'''
Created on 2019年8月29日

@author: 李刘超
'''
from urllib import request
import re,os
import pymysql
import time



base_url="https://so.gushiwen.org/"
gushiwen_url="https://www.gushiwen.org/shiwen/"

def get_model_url(gushiwen_url):
    
    html=get_html(gushiwen_url)
    res='<a href="https://so\.gushiwen\.org/(.*?)\.aspx">(.*?)</a>'
    urls=re.compile(res).findall(html)
    
    return urls

def get_html(url):
    try:
        
    
        html=request.urlopen(url).read().decode("utf-8")
    
        return html
    except:
        print('request failure')
        return None
       

def get_url_list(html):
    
    res='<span><a href="(.*?)" target="_blank">.*?</a>.*?</span>'
    try:
        url1=re.compile(res).findall(html)
        url_list=[]
        for u in url1:
            url_list.append(base_url+u)
            
        return url_list
    except:
        print("request failure")
        return None
        

def get_poem_content(url):
                     
    res='<h1 style="font-size:.*?;">(.*?)</h1>\n<p class="source"><a href=".*?">(.*?)</a>.*?<a href=".*?">(.*?)</a> </p>\n<div class="contson" id="contson.*?">\n([\s\S]*?)\n</div>'
    try:
        html=get_html(url)
        poem_content=re.compile(res).findall(html)
        return poem_content
    except:
        print("null")
        


def conn_mysql(url,username,password,dbname):
    db=pymysql.connect(url,username,password,dbname)
    return  db

def createtable_poem(url,username,password,dbname):
    sql='create table if not exists poem(model_name varchar(50),poem_name varchar(50),author_name varchar(50),dynasty varchar(50),content text)'
    db=conn_mysql(url, username, password, dbname)
    db.cursor().execute(sql)
    db.commit()
   
                  
def main():
    
#     try:
#         
#         db= conn_mysql("59.110.141.166","llchao","1234",'mytest')
#         print("connect success")
#     except:
#         print("connect error")
#         
    
    
   
    start=time.clock()
#     db= conn_mysql("59.110.141.166","llchao","1234",'mytest')
#     createtable_poem("59.110.141.166","llchao","1234",'mytest')
    
    model_name=[]
    i=0
    j=0
    for g in get_model_url(gushiwen_url):
         
        url=base_url+list(g)[0]+'.aspx'
        model_name.append(list(g)[1])
        html=get_html(url)
        url_list=get_url_list(html)
        
        if url_list is None or len(url_list)==0:
            continue
         
        for s in url_list:
            i+=1
            LL=get_poem_content(s)
            if  LL is None or len(LL)==0:
                #pl=['NULL','NULL','NULL','NULL']
                continue
            else:
                pl=LL[0]
                sql= 'insert into poem(model_name,poem_name,author_name,dynasty,content) values (%s,%s,%s,%s,%s)'
                data=[model_name[j],pl[0],pl[2],pl[1],re.sub('<br />|<p>|</p>','',pl[3])]
                print(data)
#                 try:
#                     
#                     db.cursor().execute(sql,data)
#                     db.commit()
#                     print(pl)
#                 except:
#                     print ("invalied data")
#                     continue 
                 
        j+=1
#     db.close()
    print("End")
    end=time.clock()
    print('time: %s Seconds' % (end-start))
                
if __name__ == "__main__":
    main()