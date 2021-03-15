# nodejs_training
##準備

```
$ git clone https://github.com/osonoi/nodejs_training2.git
$ cd nodejs_training2.git
```
## ローカルで動作

```
$ npm install
$ npm start
```
ブラウザーの別タブで　http://localhost:3000
にアクセス

## Cloud foundryで動作

 Manifest.yam のname, "my-nodejs-app"をユニーク（他のものと重ならない）に変更(例　"my-nodejs-app-osonoi2021")

```
$ ibmcloud login        (シングルサインインの場合は　ibmcloud login --sso)
$ ibmcloud target --cf
$ ibmcloud cf push
```

終了するまで数分お待ちください。終了したら、

```
$ ibmcloud cf apps | grep my-nodejs-app
```
でURLが出てくるのでブラウザーの別タブで表示
