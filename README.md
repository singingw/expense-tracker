# expense-tracker 支出紀錄表
## 功能描述
* 使用者需要登入才能獲得進入首頁的權限
* 使用者可自行創建帳號，或使用 Facebook、Google 登入
* 使用者可在首頁看到自己所有的支出
* 可依類別觀看支出紀錄
* 可新增、編輯、刪除支出

## 頁面呈現


## 安裝與執行步驟
1.  在終端機輸入指令 Clone 此專案至本機電腦
```js
git clone https://github.com/singingw/expense-tracker.git
```
2.  移至檔案夾
```js
cd expense-tracker
```
3.  安裝相關套件
```js
npm install
```
4.  process.env.MONGODB_URI 環境變數的設定
```js
set MONGODB_URI = < 連線 mongoDB 的 URI > //密碼、資料庫名稱要自行更改
```
5.  運行種子數據
```js
node models/seeds/categorySeeder.js
node models/seeds/userSeeder.js
node models/seeds/recordSeeder.js
```
6.  打開終端
```js
npm run dev
```
7.  使用瀏覽器開啟：http://localhost:3000 即可瀏覽本專案
8.  目前提供兩組測試用帳號給使用者，可以登入並看到預設的餐廳資訊。
```js
name: 廣志
email: user1@example.com
password: 12345678
```
```js
name: 小新
email: matcha@example.com
password: 12345678
```

## 環境建置與需求
1. Node.js & npm - JavaScript 運行環境
2. Express.js - Web 應用程序框架
3. Express-Handlebars - 模板引擎
4. mongoDB 資料庫
5. mongoose
6. passport
7. express-session
8. connect-flash
9. dotenv
10. method-override
11. bycryptjs
