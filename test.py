# coding: UTF-8
import os

import xlwt

from bs4 import BeautifulSoup

path = '省份医院url'
    # 从本地读取所有的省份医院xls
files_name = os.listdir(path)
for name in files_name[10:]:
    print(name)