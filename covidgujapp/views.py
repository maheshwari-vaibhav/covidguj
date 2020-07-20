from django.shortcuts import render
import requests
from django.http import HttpResponse
from bs4 import BeautifulSoup
import urllib.parse
import time
import json

# Create your views here.

def home(request):
	url='https://gujcovid19.gujarat.gov.in/Home.aspx/GetDistDataForCovid'
	headers={'Host':'gujcovid19.gujarat.gov.in','User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0','Accept':'application/json, text/javascript, */*; q=0.01','Accept-Language':'en-US,en;q=0.5','Cache-Control':'no-store','X-Requested-With':'XMLHttpRequest','Connection':'close','Content-Type':'application/json; charset=utf-8'}
	s=requests.session()
	r=s.post(url=url,allow_redirects=False,headers=headers,timeout=10)
	if(r.status_code==200):
		soup=BeautifulSoup(r.text,'html.parser')
		a=str(soup)
		data2= a.replace('\\','')
		data3 = data2.replace('/','')
		s=data3[6:-2]
		b=json.loads(str(s))
		totalConfirm = 0
		totalRecover = 0
		totalDeath = 0
		for c in b:
			totalConfirm = totalConfirm + c['ConfirmedCount']
			totalDeath = totalDeath + c['TotalDath']
			totalRecover = totalRecover + c['PatientCuredCount']
			date = c['LastUpdatedDate']
	return render(request,'index.html',{'data':b,'totalDeath':totalDeath,'totalRecover':totalRecover,'totalConfirm':totalConfirm,'date':date})
	#return HttpResponse(b)

def districtDetail(request):
	data =request.GET.get('d')
	return render(request,'districtDetail.html',{'data':data})
