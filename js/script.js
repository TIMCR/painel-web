var getJSON = function (url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
        xhr.send();
    });
};

var noticias = [];
var init = 1;
function getNoticias() {
    getJSON('http://192.168.1.24/feed').then(function (data) {
        var i = 0;
        Object.keys(data).map(function (k, index) {
            noticias[i++] = data[k].title;
        });
    }, function (status) { //error detection....

    });
    if (init == 1) {
        init = 0;
        setTimeout(function () { document.getElementById("nomeNoticia").innerHTML = "NOTÍCIAS"; }, 1000);
        setTimeout(function () {changeNoticia(); }, 1000);
    }
    setTimeout(function(){ getNoticias() }, 1000*60*60*10);
}

var thisNoticia = 0;
function changeNoticia(){
    document.getElementById("tituloNoticia").innerHTML = noticias[thisNoticia++];
    if(thisNoticia > 3){
        thisNoticia = 0;
    }
    setTimeout(function () { changeNoticia() }, 1000*5);
}

setTimeout(function () { getNoticias() }, 1000 * 5);