# coding: UTF-8
import xlwt

from bs4 import BeautifulSoup
city="北京"
f = open("/Users/shentupenghui/Desktop/hospital/"+city+"医院_好大夫在线.html", encoding="gbk")
str = f.read()

soup = BeautifulSoup(str)
#获取所有医院
allHospital = soup.find_all("div",class_="m_ctt_green")
# 创建一个excel表 设置编码
workbook = xlwt.Workbook(encoding='utf-8')
# 创建一个excel sheet
worksheet = workbook.add_sheet(city+'医院汇总')
worksheet.write(0, 0, "医院名称")
worksheet.write(0, 1, "等级特色")
i=1
for eachLocationHospital in allHospital:
    #获得每个地区的医院列表
    hospitalList=eachLocationHospital.find_all('li')
    for hospital in hospitalList:
        # 第一个为医院名称，第二个为医院的特色（三甲，综合等等)
        worksheet.write(i, 0, hospital.find('a').text)
        worksheet.write(i, 1, hospital.find('span').text)
        i = i + 1

# 保存到工作表
workbook.save("0医院汇总/"+city+"医院汇总表.xls")
