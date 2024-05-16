const box = document.getElementById("box");
const btn = document.getElementById("deleteall");

let allspicial = JSON.parse(localStorage.getItem('Newtodo')) || [];

function Newtodo( id, ntn, time, minut, second) {
    this.ids = id
    this.newuser = ntn;
    this.hours = time;
    this.minutes = minut;
    this.seconds = second;
}

document.getElementById('addUser').addEventListener('click', () => {
    const newUser = function () {
        let username = prompt("Foydalanuvchi nomini kiriting:");
        if (username.trim() !== "") {
            let id = String(allspicial.length + 1);
            let date = new Date();
            let time = date.getHours();
            let minut = date.getMinutes();
            let second = date.getSeconds();
            let newtodoresult = new Newtodo(id, username, time, minut, second);
            return newtodoresult;
        }
    }
    const newTodo = newUser();
    if (newTodo) {
        allspicial.push(newTodo);
        localStorage.setItem('Newtodo', JSON.stringify(allspicial));
    }
});

const DeleteOne = document.querySelector('#delete');
DeleteOne.addEventListener('click', () => {
    let storedUser = JSON.parse(localStorage.getItem('Newtodo'));
    let usernameToDelete = prompt("O'chirish uchun foydalanuvchi usernameni kiriting:");
    const result = storedUser.filter( Newtodo => Newtodo.ids !== usernameToDelete);
    localStorage.setItem('Newtodo', JSON.stringify(result));
    alert("Foydalanuvchi o'chirildi!");
    btnlist();
});

const showTodosBtn = document.getElementById("show");
showTodosBtn.addEventListener("click", btnlist);

btn.addEventListener("click", () => {
    const isAgree = confirm("Ishonchingiz komillmi?");
    if (isAgree) {
        localStorage.removeItem('Newtodo');
        btnlist();
    }
});

function btnlist() {
    const storedData = JSON.parse(localStorage.getItem("Newtodo"))
    const frag = document.createDocumentFragment();
    console.log();
    storedData?.forEach((element) => {
        const div = document.createElement("div");
        div.innerHTML = `
             <h1>${element.ids} ${element.newuser}</h1>
             <p>${element.hours}:${element.minutes}:${element.seconds}</p>
        `;
        frag.appendChild(div);
    });
    box.innerHTML = "";
    box.appendChild(frag);
}
