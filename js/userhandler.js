var db = openDatabase('mydb', '1.0', 'User database', 2 * 1024 * 1024);

db.transaction(function (tx) {
    //tx.executeSql('DROP TABLE users');
    tx.executeSql('CREATE TABLE IF NOT EXISTS users (email unique, password, name)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS nt (email unique, calories, sugar, fats, carbohydrates)')
    tx.executeSql('SELECT * FROM users', [], function (tx, results) {
        var len = results.rows.length, i;
        for (i = 0; i < len; i++) {
            console.log(results.rows.item(i));
        }
    });
    console.log("user handler opened!")
});

function addUser(name, email, password) {
    console.log("name: " + name + "\nemail: " + email + "\npassword: " + password);
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        tx.executeSql('INSERT INTO nt (email, 0, 0, 0, 0)');
        console.log(`Added user ${name}`);
    })
};

function authUser(email, password) {
    //console.log("email: " + email + "\npassword: " + password);
    db.transaction(function(tx) {
        tx.executeSql(`SELECT * FROM users WHERE password =? AND email=?`, [password, email], function(tx, results) {
            var len = results.rows.length, i;
            //console.log(len)
            if (len === 0) {
                alert("User not found, please try again");
            } else {
                console.log(results.rows.item(0).name + " signed in");
                window.location.href = "./home.html";
            }
        })
    })
};