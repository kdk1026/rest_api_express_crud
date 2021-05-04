const express = require('express');
const router = express.Router();
const getConnection = require('../libs/mysql_pool.js');

// 모든 항목 가져오기
router.get('/', function(req, res) {
    getConnection((conn) => {
        let sql = 'select * from movie';
        let query = conn.query(sql, function(err, rows) {
            if (err) {
                res.json( {code:400, message:err.message} );
                throw err;
            } else {
                res.json( {code:200, message:'', data:rows} );
            }
        });

        conn.release();
    });
});

// 추가
router.post('/', function(req, res) {
    let title = req.body.title;
    let type = req.body.type;
    let grade = req.body.grade;

    if ( !title ) {
        res.json( {code:400, message:'제목 항목은 필수 입니다.'} );
        return false;
    }

    if ( !type ) {
        res.json( {code:400, message:'장르 항목은 필수 입니다.'} );
        return false;
    }

    if ( !grade ) {
        res.json( {code:400, message:'평점 항목은 필수 입니다.'} );
        return false;
    }

    getConnection((conn) => {
        let sql = 'select * from movie where title = ?';
        let query = conn.query(sql, [title], function(err, rows) {
            if (err) {
                res.json( {code:400, message:err.message} );
                throw err;
            }

            if (rows.length) {
                res.json( {code:400, message:'이미 등록된 제목입니다.'} );
            } else {
                let sql = 'insert into movie (title, type, grade) values (?, ?, ?)';
                let query = conn.query(sql, [title, type, grade], function(err, rows) {
                    if (err) {
                        res.json( {code:400, message:err.message} );
                        throw err;
                    } else {
                        res.json( {code:200, message:''} );
                    }
                });
            }
        });

        conn.release();
    });
});

// 해당 항목 가져오기
router.get('/:id', function(req, res) {
    let id = req.params.id;

    getConnection((conn) => {
        let sql = 'select * from movie where id = ?';
        let query = conn.query(sql, [id], function(err, rows) {
            if (err) {
                res.json( {code:400, message:err.message} );
                throw err;
            } else {
                res.json( {code:200, message:'', data:rows[0]} );
            }
        });

        conn.release();
    });
});

// 수정
router.put('/:id', function(req, res) {
    let id = req.params.id;

    let title = req.body.title;
    let type = req.body.type;
    let grade = req.body.grade;

    if ( !title ) {
        res.json( {code:400, message:'제목 항목은 필수 입니다.'} );
        return false;
    }

    if ( !type ) {
        res.json( {code:400, message:'장르 항목은 필수 입니다.'} );
        return false;
    }

    if ( !grade ) {
        res.json( {code:400, message:'평점 항목은 필수 입니다.'} );
        return false;
    }

    getConnection((conn) => {
        let sql = 'select * from movie where id = ?';
        let query = conn.query(sql, [id], function(err, rows) {
            if (err) {
                res.json( {code:400, message:err.message} );
                throw err;
            }

            if (rows.length) {
                let sql = 'select * from movie where title = ?';
                let query = conn.query(sql, [title], function(err, rows) {
                    if (err) {
                        res.json( {code:400, message:err.message} );
                        throw err;
                    }
        
                    if (rows.length) {
                        res.json( {code:400, message:'이미 등록된 제목입니다.'} );
                    } else {
                        let sql = 'update movie set title=?, type=?, grade=? where id=?';
                        let query = conn.query(sql, [title, type, grade, id], function(err, rows) {
                            if (err) {
                                res.json( {code:400, message:err.message} );
                                throw err;
                            } else {
                                res.json( {code:200, message:''} );
                            }
                        });
                    }
                });
            } else {
                res.json( {code:400, message:'해당 영화가 존재하지 않습니다.'} );
            }            
        });

        conn.release();
    });
});

// 삭제
router.delete('/:id', function(req, res) {
    let id = req.params.id;

    getConnection((conn) => {
        let sql = 'select * from movie where id = ?';
        let query = conn.query(sql, [id], function(err, rows) {
            if (err) {
                res.json( {code:400, message:err.message} );
                throw err;
            }

            if (rows.length) {
                let sql = 'delete from movie where id=?';
                let query = conn.query(sql, [id], function(err, rows) {
                    if (err) {
                        res.json( {code:400, message:err.message} );
                        throw err;
                    } else {
                        res.json( {code:200, message:''} );
                    }
                });
            } else {
                res.json( {code:400, message:'해당 영화가 존재하지 않습니다.'} );
            }
        });

        conn.release();
    });
});

module.exports = router;