import random
import os, sys

FILE_NAME_FULL_PATH_1 = "resources/sample1.txt"
FILE_NAME_FULL_PATH_2 = "resources/sample2.txt"
FILE_NAME_FULL_PATH_3 = "resources/sample3.txt"
FILE_NAME_FULL_PATH_4 = "resources/sample4.txt"  # UTF_8で保存したファイル
FILE_NAME_FULL_PATH_5 = "resources/sample5.txt"  # shift_jisで保存したファイル
ENC = "shift_jis"

"""
ファイル存在チェック
"""
if not os.path.exists(FILE_NAME_FULL_PATH_1):
    print("File not EXIST")
    sys.exit()

"""
read
"""
# 基本操作
file = open(FILE_NAME_FULL_PATH_1, "r", encoding="utf_8")
lines = file.read()
print(lines)
file.close()

# With句を使用（close不要）
with open(FILE_NAME_FULL_PATH_1, "r", encoding="utf_8") as file:
    for i, line in enumerate(file):
        print("{:4d}:{}".format(i + 1, line.rstrip("\n")))


# # 読み込む文字数を指定
# file = open(FILE_NAME_FULL_PATH_1, "r", encoding="utf_8")
# lines = file.read(2) #最初の2文字
# print(lines)
# lines = file.read(2) #次の2文字
# print(lines)
# file.close()

# # ファイル各行をリスト分割
# file = open(FILE_NAME_FULL_PATH_1, "r", encoding="utf_8")
# lines = file.readlines()
# for i, line in enumerate(lines):
#     print("{:4d}:{}".format(i + 1, line), end="") #改行をカットする
#    #print("{:4d}:{}".format(i + 1, line.rstrip("\n")))
# print("")

# # １行ずつ読み込む（ファイルオブジェクトをイテレート）
# file = open(FILE_NAME_FULL_PATH_1, "r", encoding="utf_8")
# for i, line in enumerate(file):
#     print("{:4d}:{}".format(i + 1, line.rstrip("\n")))
# file.close()

# # １行ずつ読み込む（whileを使うパターン）
# file = open(FILE_NAME_FULL_PATH_1, "r", encoding="utf_8")
# i = 0
# while True:
#     line = file.readline()
#     if line == "":
#         break
#     print("{:4d}:{}".format(i + 1, line.rstrip("\n")))
#     i += 1
# file.close()

# """
# write
# """
# #基本操作（上書きモード）
# with open(FILE_NAME_FULL_PATH_2, "w", encoding="utf_8") as file:
#     file.write("Hello")
#     file.write("World\n")
#     file.write(str(2017) + "年")

# #基本操作（追記モード）
# with open(FILE_NAME_FULL_PATH_2, "a", encoding="utf_8") as file:
#     file.write("add line")

# #リストの要素をまとめて書き出す
# weekdays = [day + "曜日" + "\n" for day in "月火水木金土日"]
# with open(FILE_NAME_FULL_PATH_3, "w", encoding="utf_8") as file:
#     file.writelines(weekdays)


# """
# エンコーディング
# """
# with open(FILE_NAME_FULL_PATH_4, "r", encoding="utf_8") as in_f:
#     with open(FILE_NAME_FULL_PATH_5, "w", encoding=ENC) as out_f:
#         for str in in_f:
#             out_f.write(str)

# print("aa")