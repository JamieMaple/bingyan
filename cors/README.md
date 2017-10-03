# cors 请求探索

1. 实验目的：

   - 探寻浏览器解决跨域问题的cors方法
   - 同时进一步了解新 api -- fetch
  
2. 实验方法：

   - 利用 Express 使用本地服务器两个端口，3000，3001

   - 利用 fetch 方法（节省时间。。。）

3. 实验过程：

   - 直接用 3000 端口访问 3001 端口出现 'Access-Control-Allow-Origin' 跨域错误

   - 对浏览器发送请求的 mode 模式设置成 cors 依然出现错误，说明不能只靠浏览器的单向设置请求头，需要更进一步的服务器端设置 cors 请求

   - 设置服务器端（3001）的响应头为以下代码，请求成功

  ```javascript
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  ```

   - 安装 cors 库后，尝试对 3001 端口开放 cors 设置，然后再次进行测试 -- 结果请求成功

4. 实验结论

单纯的设置浏览器发送请求而没有设置服务器端的响应头是不能实现跨域的，所以正确的方法应该是两头都应当设置好头部信息，由此可见头部 header 信息的重要性。。。这大概都是前人为了网站安全而躺过的坑