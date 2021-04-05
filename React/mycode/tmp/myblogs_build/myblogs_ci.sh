#!/bin/bash

echo "hello world";

set -x;

CURRENTDIR=`pwd`
echo "aaa${CURRENTDIR}"

CLIENT_BASE_DIR="/usr/local/var/www"
SERVER_BASE_DIR="/usr/local/var/nodeapp"
ITEM_NAME="myblogs_client"

echo $SERVER_BASE_DIR

checkEnv() {

  echo "环境检查....................";

  GITVERSION=`git --version `
  NODEVERSION=`node -v`
  NPMVERSION=`npm -v`
  PM2VERSION=`pm2 -v`


  NOTFOUND="command not found"
  if [ $GITVERSION == *$NOTFOUND* || $NODEVERSION == *$NOTFOUND* || $NPMVERSION == *$NOTFOUND* || $PM2VERSION == *$NOTFOUND* ]
  then
    echo "环境检查失败，退出构建"
    exit -1
  fi
  echo "环境检查完成..............";

}

build_client() {

  cd  $CURRENTDIR/${ITEM_NAME}
  echo "构建客户端..............."
  echo "安装依赖.............."

  npm install

  echo "下载依赖完成......"
  echo "构建ing..............."

  npm run build

  echo "客户端构建 完成"

}

build_server() {
  echo "构建服务端...."
  echo "部署server..........."

  cd $CURRENTDIR/$ITEM_NAME

  cp  -rf $CURRENTDIR/$ITEM_NAME/server $SERVER_BASE_DIR/myblogs
  cd $SERVER_BASE_DIR/myblogs
  echo "下载依赖............"
  npm i

  echo "启动服务"

  pm2 start app.js -f --name="myblogs"

  echo "部署服务端完成......."
}

deploy_client() {
  echo "部署client..............."

  cd ${CURRENTDIR}/${ITEM_NAME}
  cp -rf ${CURRENTDIR}/${ITEM_NAME}/dist  ${CLIENT_BASE_DIR}

  mv ${CLIENT_BASE_DIR}/dist ${CLIENT_BASE_DIR}/myblogs

  echo "部署client完成....."

}

echo "下载代码开始..................";

git clone https://github.com/lcmomo/myblogs_client.git


echo "代码下载完成..................";

checkEnv

build_client

build_server

deploy_client

