//
const key = "ScoreBoard720";
const team_1 = "TEAM A";
const team_2 = "TEAM B";
function add(num, id) {
    let number = Number(document.getElementById(id).innerText);
    if (number + num >= 0) {
        document.getElementById(id).innerText = number + num;
    };
    let date = new Date();
    let obj = {
        hh: date.getHours(),
        mm: date.getMinutes(),
        score: num
    }
    let data1 = [], data2 = [];
    if (id == 'score-1') {
        data1 = (GetLocalStore(key)[0].data)
        data1.push(obj);
        ScoreCard(GetLocalStore(key)[0].data, 'scoreCard-1')
    } else if (id == 'score-2') {
        data2 = (GetLocalStore(key)[1].data)
        data2.push(obj);
        ScoreCard(GetLocalStore(key)[1].data, 'scoreCard-2')
    }
    let ScoreBoard = [{
        name: team_1,
        score: Number(document.getElementById('score-1').innerText),
        data: data1
    }, {
        name: team_2,
        score: Number(document.getElementById('score-2').innerText),
        data: data2
    }];
    SetLocalStore(key, ScoreBoard);
}
//Store Data in LocalStore
let ScoreBoard = [{
    name: team_1,
    score: 0,
    data: []
}, {
    name: team_2,
    score: 0,
    data: []
}];
function SetLocalStore(key, value) {
    localStorage.removeItem(key);
    value = JSON.stringify(value);
    window.localStorage.setItem(key, value);
    return key;
}
if (localStorage.getItem(key) == null) {
    SetLocalStore(key, ScoreBoard);
} else {
    document.getElementById('score-1').innerText = GetLocalStore(key)[0].score;
    document.getElementById('score-2').innerText = GetLocalStore(key)[1].score;
    ScoreCard(GetLocalStore(key)[0].data, 'scoreCard-1')
    ScoreCard(GetLocalStore(key)[1].data, 'scoreCard-2')
}
function GetLocalStore(key) {
    return JSON.parse(localStorage.getItem(key));
}
function removeData() {
    (localStorage.removeItem(key));
    window.location.reload();
}
function ScoreCard(array, id) {
    array.forEach(element => {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        let center = document.createElement('center');
        center.innerText = `+${element.score}`;
        td.appendChild(center);
        let td2 = document.createElement('td');
        let center2 = document.createElement('center');
        center2.innerText = `${element.hh}:${element.mm}`
        td2.appendChild(center2);
        tr.appendChild(td)
        tr.appendChild(td2);
        document.getElementById(id).appendChild(tr);
    });
}