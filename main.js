let getdata = async () => {
  let res = await fetch("https://thawing-taiga-91949.herokuapp.com/api/user");
  res = await res.json();

  append(res);

  showPage();

  // console.log(res);
};
// getdata();

let addDetails = async (event) => {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let batch = document.getElementById("batch").value;
  let course = document.getElementById("course").value;
  let age = +document.getElementById("age").value;
  let mbl = +document.getElementById("mobile").value;
  let score = +document.getElementById("escore").value;

  let data1 = {
    Name: name,
    Batch: batch,
    course: course,
    Age: age,
    Mobile_No: mbl,
    Evaluation_Score: score,
    id:Date.now(),
  };

  let res = await fetch("https://thawing-taiga-91949.herokuapp.com/api/user", {
    method: "POST",
    body: JSON.stringify(data1),
    headers: {
      "Content-Type": "application/json"
    },
  });

  getdata();

   res = await res.json();
  console.log(res);

  document.getElementById("name").value="";
  document.getElementById("batch").value="";
  document.getElementById("course").value="";
  document.getElementById("age").value="";
  document.getElementById("mobile").value="";
  document.getElementById("escore").value="";
};


let append = (data) =>{

  let container = document.querySelector("tbody");
  container.innerHTML = null;
  data.forEach(({Name,Batch,course,Age,Mobile_No,Evaluation_Score,id}) => {
      let tr = document.createElement("tr");

  let name = document.createElement("td");
  name.innerText = Name

  let batch = document.createElement("td");
  batch.innerText = Batch;
  let Course = document.createElement("td");
  Course.innerText = course;
  let age = document.createElement("td");
  age.innerText = Age;
  let mbl = document.createElement("td");
  mbl.innerText = Mobile_No;
  let ev_score = document.createElement("td");
  ev_score.innerText = Evaluation_Score;

  let edit_evScore = document.createElement("td");

  let edit_btn = document.createElement("button");
  edit_btn.setAttribute("class","update");

  edit_btn.innerText = "EDIT"

  edit_btn.onclick = () => {
    editscore(id);
}
edit_evScore.append(edit_btn)

  let deleteUser = document.createElement("td");
  let btn = document.createElement("button");
  btn.innerText = "REMOVE";
  btn.setAttribute("class","remove")
  deleteUser.append(btn);
  deleteUser.onclick = () => {
      deleteuser(id);
  }

  tr.append(name, batch, Course, age, mbl, ev_score,edit_evScore,deleteUser);
  container.append(tr);
  });

}


let deleteuser = async(id) =>{
  let res = await fetch(`https://thawing-taiga-91949.herokuapp.com/api/user/${id}`,{
      method:"DELETE",
      headers: {
          "Content-Type": "application/json",
      }
  })
  getdata();

  res = await res.json();

  console.log(res);
}

let sortLH = async() =>{
  let res = await fetch(`https://thawing-taiga-91949.herokuapp.com/api/user?_sort=Age&_order=asc`);

  res = await res.json();

  append(res);
}
let sortHL = async() =>{
  let res = await fetch(`https://thawing-taiga-91949.herokuapp.com/api/user?_sort=Age&_order=desc`);

  res = await res.json();

  append(res);
}
let filter =  async() =>{

  let value = document.getElementById("filter_course").value;

  let res = await fetch(`https://thawing-taiga-91949.herokuapp.com/api/user?course=${value}`);

  res = await res.json();
  append(res)
}

let editscore = async(id) =>{
let nScore = prompt("Enter Score");
let data = {
  Evaluation_Score : nScore
}

let res = await fetch(`https://thawing-taiga-91949.herokuapp.com/api/user/${id}`,{
method:"PATCH",
body:JSON.stringify(data),
headers: {
  "Content-Type": "application/json"
}

});

res = await res.json()
getdata();
console.log(res)

}

let showPage = () =>{
  let nbrs = document.getElementById("btns");
  nbrs.innerHTML = "";

  for (let i=0;i<=5;i++){
    newBtn = document.createElement("button");
    newBtn.innerText = i+1;
    newBtn.setAttribute("id",`${i}`);
    newBtn.onclick = shownewpage;

    nbrs.append(newBtn);
  }
}

 async function shownewpage(){
let id = Number (this.id)+1;

let res = await fetch(`https://thawing-taiga-91949.herokuapp.com/api/user?_page=${id}&_limit=5`);
res = await res.json();

append(res)
}

getdata();