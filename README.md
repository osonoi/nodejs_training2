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

## Cloud foundryで動作

 Manifest.yam のname, "my-nodejs-app"をユニーク（他のものと重ならない）に変更

```
$ ibmcloud login
$ ibmcloud target --cf
$ ibmcloud cf push
```
