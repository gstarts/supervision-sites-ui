## 开发

```bash
# 克隆项目
git clone http://192.168.11.199:9170/lhznsoft/supervision-sites-ui.git

# 进入项目目录
cd supervision-sites-ui

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:8800

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 部署
1. 按照生产环境方式打包后，会生成dist文件夹，里面生成站点的静态文件
2. 将 dist 文件夹的静态文件发布到 nginx 或者静态服务器即可，其中的 index.html 是后台服务的入口页面
3. nginx 配置 注意服务端发布的版本，对应的代理api地址可能会不同，需要向后端人员确认
```shell script
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;

		location / {
            root   /home/ruoyi/projects/ruoyi-ui;
			try_files $uri $uri/ /index.html;
            index  index.html index.htm;
        }
		
		location /prod-api/{
			proxy_set_header Host $http_host;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header REMOTE-HOST $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_pass http://localhost:8080/;
		}

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

