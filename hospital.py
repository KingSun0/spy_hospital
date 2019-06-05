import os
import random
import time

import xlrd
import xlwt
from bs4 import BeautifulSoup
import requests

# 定制请求头列表
headersList = [
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv2.0.1) Gecko/20100101 Firefox/4.0.1",
    "Mozilla/5.0 (Windows NT 6.1; rv2.0.1) Gecko/20100101 Firefox/4.0.1",
    "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; en) Presto/2.8.131 Version/11.11",
    "Opera/9.80 (Windows NT 6.1; U; en) Presto/2.8.131 Version/11.11",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11",
]

# 随机选择其中一个进行请求
userAgent = random.choice(headersList)
headers = {
    'User-Agent': userAgent,
}
proxie = [
    "http://119.180.128.167:8060",
    "http://117.63.1.137:9999",
    "http://118.180.166.195:8060",
    "http://60.13.42.82:9999",
    "http://180.121.132.168:3128",
    "http://124.94.199.253:9999"
]
userProxies = random.choice(proxie)
proxies = {
    "http": userProxies,
}


# 获取每个省的每个医院的相关信息
def get_hospital_info():
    path = '省份医院url'
    # 从本地读取所有的省份医院xls
    files_name = os.listdir(path)
    # 循环打开所有省份表
    for province_hospital_file_name in files_name[8:]:
        province_all_hospital_excel = xlrd.open_workbook(path + '/' + province_hospital_file_name)
        # 获取第一个工作簿
        hospital_sheet = province_all_hospital_excel.sheet_by_index(0)
        # 第二列为省份url
        all_hospital_url = hospital_sheet.col_values(1)
        # 创建excel表
        workbook = xlwt.Workbook(encoding='utf-8')
        # 创建一个excel sheet
        worksheet = workbook.add_sheet(province_hospital_file_name.rstrip('url.xls'))
        # 设置相关表头
        worksheet.write(0, 0, '医院名称')
        worksheet.write(0, 1, '医院等级')
        worksheet.write(0, 2, '医院特色')
        worksheet.write(0, 3, '医院简介')
        worksheet.write(0, 4, '医院电话')
        worksheet.write(0, 5, '医院地址')
        worksheet.write(0, 6, '医院交通')
        # 循环爬取所有的链接
        hospital_index = 1
        for hospital_url in all_hospital_url:
            get_hospital_page = requests.get(hospital_url, headers=headers)
            # 获取医院的文档树
            hospital_page_soup = BeautifulSoup(get_hospital_page.text, features="html5lib")
            # 医院名称
            hospital_name = hospital_page_soup.find('h1', class_='hospital-name').text
            worksheet.write(hospital_index, 0, hospital_name)
            # 获取医院的等级特色等
            j = 1
            hospital_rank = []
            for lable in hospital_page_soup.find_all('span', class_='hospital-label-item'):
                hospital_rank.append(lable.text)
                j = j + 1
            if len(hospital_rank) == 1:
                # 只有等级时候
                worksheet.write(hospital_index, 1, hospital_rank[0])
            elif len(hospital_rank) > 1:
                worksheet.write(hospital_index, 1, hospital_rank[0])
                worksheet.write(hospital_index, 2, hospital_rank[1:])
            else:
                print('warn:' + hospital_name + '没有等级和特色')

            # 医院的电话
            hospital_phone = hospital_page_soup.find('span', class_='h-d-c-item-text js-phone-text').text
            if hospital_phone != '':
                worksheet.write(hospital_index, 4, hospital_phone)
            # 医院信息块
            hospital_tmp = hospital_page_soup.find_all('p', class_='h-d-c-item')
            hospital_text = hospital_tmp[:2]
            if hospital_text[0].find('span', class_='h-d-c-item-text').text.strip() != '暂无简介' and hospital_text[0].find(
                    'a', class_='h-d-c-item-link') != None:
                breif_url = hospital_text[0].find('a', class_='h-d-c-item-link')['href']
            if hospital_text[1].find('a', class_='h-d-c-item-link') != None:
                map_url_soup = hospital_text[1].find('a', class_='h-d-c-item-link')['href']
            # 简介链接不为为空时
            if len(breif_url) != 0:
                # 获取医院的简介页面
                hospital_breif_url = 'https://' + breif_url.lstrip('/')
                get_hospital_info_page = requests.get(hospital_breif_url, headers=headers)
                hospital_info_soup = BeautifulSoup(get_hospital_info_page.text, features="html5lib")
                # 获取医院的简介
                hospital_brief = hospital_info_soup.find('td', style='font-size:14px; line-height:20px;').text
                worksheet.write(hospital_index, 3, hospital_brief)
            # 当看地图url存在时候
            if len(map_url_soup) != 0:
                # 地址，路线的链接
                hospital_map_url = 'https://' + map_url_soup.lstrip('/')
                print('开始爬：', hospital_name)
                # 获取链接的页面
                get_hospital_map_page = requests.get(hospital_map_url, headers=headers)
                hospital_map_soup = BeautifulSoup(get_hospital_map_page.text, features="html5lib")
                table = hospital_map_soup.find('table', width="100%", cellpadding="0", cellspacing="0",
                                               style="margin: 10px 0px 0px 0px")
                hospital_info = table.tbody

                items = hospital_info.find_all('td', valign="top")
                location_id = 0
                router_id = 0
                index = 0
                for item in items:
                    if item.text == ' 地址：':
                        location_id = index + 1
                    elif item.text == '怎么走：':
                        router_id = index + 1
                    index = index + 1
                if location_id != 0:
                    location = items[location_id].text
                    worksheet.write(hospital_index, 5, location)
                if router_id != 0:
                    router = items[router_id].text
                    worksheet.write(hospital_index, 6, router)
                # 保存
            workbook.save("省份医院信息汇总/" + province_hospital_file_name.rstrip('url.xls') + '信息汇总表.xls')
            print("成功爬取" + hospital_name + "的相关信息")
            time.sleep(random.randint(0, 15))
            hospital_index = hospital_index + 1
        print("成功爬取了", province_hospital_file_name.rstrip('医院url.xls'), "的所有医院相关信息，休息5s....")
        time.sleep(15)


get_hospital_info()


# 获取每个省份的医院名称和url
def get_province_all_hospital():
    # 从excel读取省份的url
    province_excel = xlrd.open_workbook('省份url表.xls')
    # 获取第一个表
    province_sheet = province_excel.sheet_by_index(0)
    # 第一列为省份名称
    all_province_name = province_sheet.col_values(0)
    # 第二列为省份url
    all_province_url = province_sheet.col_values(1)

    index = 0
    for province_url in all_province_url:
        get_province_page = requests.get(province_url, headers=headers)
        # 获取所有医院页面的文档树
        all_province_soup = BeautifulSoup(get_province_page.text, features="html5lib")
        # 获得每个区的医院名称和url
        all_hospital = all_province_soup.find_all("div", class_="m_ctt_green")
        # 获得每个区的医院列表
        # 将获取到的省份名字和对应的url存入excel
        workbook = xlwt.Workbook(encoding='utf-8')
        # 创建一个excel sheet
        worksheet = workbook.add_sheet(all_province_name[index] + '医院')
        id = 0
        for hospital_url in all_hospital:
            hospital_block_list = hospital_url.find_all('a')
            for hospitalUrl in hospital_block_list:
                # 医院名称
                worksheet.write(id, 0, hospitalUrl.text)
                worksheet.write(id, 1, "https://www.haodf.com" + hospitalUrl['href'])
                id = id + 1
        # 写完一张表后保存
        workbook.save('省份医院url/' + all_province_name[index] + '医院url表.xls')
        time.sleep(5)
        print('爬好了' + all_province_name[index] + '的医院，休息5s.....')
        index = index + 1


# 获取每个省份的url
def get_province_url():
    # 所有医院的url
    all_province_url = "https://www.haodf.com/yiyuan/all/list.htm"
    # 获取所有医院页面
    get_all_province_page = requests.get(all_province_url, headers=headers)
    # 获取所有医院页面的文档树
    all_province_soup = BeautifulSoup(get_all_province_page.text, features="html5lib")
    # 获取医院左侧省份的部分
    all_province_res = all_province_soup.find_all("div", class_="kstl")

    # 将获取到的省份名字和对应的url存入excel
    workbook = xlwt.Workbook(encoding='utf-8')
    # 创建一个excel sheet
    worksheet = workbook.add_sheet('省份医院url')
    worksheet.write(0, 0, "北京")
    worksheet.write(0, 1, "https://www.haodf.com/yiyuan/beijing/list.htm")
    i = 1
    for provinceUrl in all_province_res:
        worksheet.write(i, 0, provinceUrl.a.text)
        worksheet.write(i, 1, 'https://' + provinceUrl.a['href'].lstrip('/'))
        i = i + 1
    workbook.save("省份url表.xls")
# get_province_url()
