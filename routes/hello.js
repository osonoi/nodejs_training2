const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3');

// データベースオブジェクトの取得
const db = new sqlite3.Database('mydb.sqlite3');

// GETアクセスの処理
router.get('/',(req, res, next) => {
  db.serialize(() => {
    var rows = "";
    var link1 = "<a href='/hello/show?id=";  //osonoi
    var link2 = "'> 詳細表示 </a>";           //osonoi
    db.each("select * from mydata",(err, row) => {
      if (!err) {
        rows += "<tr><th>" + row.id + "</th><td>"
          + row.name + "</td><td>"
          + link1 + row.id+ link2 + "</td></tr>";   //osonoi
      }   
    }, (err, count) => {
      if (!err){
        var data = {
          title: 'コールメモ一覧',
          content: rows
        };
        res.render('hello/index', data);        
      }
    }); 
  });
});

router.get('/add', (req, res, next) => {
  var data = {
      title: 'コールメモ追加',
      content: '新しいレコードを入力：'
  }
  res.render('hello/add', data);
});

router.post('/add', (req, res, next) => {
  const nm = req.body.name;
  const ml = req.body.call_to; 
  const ag = req.body.memo; 
  db.serialize(() => {
    db.run('insert into mydata (name, call_to, memo) values (?, ?, ?)',
      nm, ml, ag);
  });
  res.redirect('/hello');
});

router.get('/show', (req, res, next) => {
  const id = req.query.id;
  db.serialize(() => {
      const q = "select * from mydata where id = ?";
      db.get(q, [id], (err, row) => {
          if (!err) {
              var data = {
              title: 'コールメモ詳細',
              content: 'id = ' + id + ' のレコード：',
              mydata: row,
          }
          res.render('hello/show', data);
          }   
      }); 
  }); 
});

router.get('/edit', (req, res, next) => {
  const id = req.query.id;
  db.serialize(() => {
      const q = "select * from mydata where id = ?";
      db.get(q, [id], (err, row) => {
          if (!err) {
              var data = {
              title: 'コールメモ編集',
              content: 'id = ' + id + ' のレコードを編集：',
              mydata: row
          }
          res.render('hello/edit', data);
          }   
      }); 
  }); 
});

router.post('/edit', (req, res, next) => {
  const id = req.body.id;
  const nm = req.body.name;
  const ml = req.body.call_to;
  const ag = req.body.memo;
  const q = "update mydata set name = ?, call_to = ?, memo = ? where id = ?";
  db.serialize(() => {
    db.run(q, nm, ml, ag, id);
  });
  res.redirect('/hello');
});

router.get('/delete', (req, res, next) => {
  const id = req.query.id;
  db.serialize(() => {
      const q = "select * from mydata where id = ?";
      db.get(q, [id], (err, row) => {
          if (!err) {
              var data = {
              title: 'コールメモ削除',
              content: 'id = ' + id + ' のレコードを削除：',
              mydata: row
          }
          res.render('hello/delete', data);
          }   
      }); 
  }); 
});

router.post('/delete', (req, res, next) => {
  const id = req.body.id;
  db.serialize(() => {
    const q = "delete from mydata where id = ?";
    db.run(q, id);
  });
  res.redirect('/hello');
});

router.get('/find',(req, res, next) => {
  db.serialize(() => {
    db.all("select * from mydata",(err, rows) => {
      if (!err) {
        var data = {
          title: 'コールメモ　検索',
          find:'',
          content:'検索条件を入力して下さい。',
          mydata: rows
        };
        res.render('hello/find', data);
      }   
    }); 
  }); 
});

router.post('/find', (req, res, next) => {
  var find = req.body.find;
  db.serialize(() => {
    var q = "select * from mydata where ";
    db.all(q + find, [], (err, rows) => {
      if (!err) {
        var data = {
          title: 'Hello/find',
          find:find,
          content: '検索条件 ' + find,
          mydata: rows
        }
        res.render('hello/find', data);
      } 
    }); 
  }); 
});


module.exports = router;
