const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const tabs = document.querySelectorAll(".tab");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// current active tab
let currentTab = "To Do";

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){

taskList.innerHTML="";

tasks.forEach((task,index)=>{

// filter tasks by tab
if(task.status !== currentTab) return;

const div=document.createElement("div");
div.classList.add("task");

div.innerHTML=`
<span>${task.text}</span>

<select data-index="${index}">
<option ${task.status=="To Do"?"selected":""}>To Do</option>
<option ${task.status=="Ongoing"?"selected":""}>Ongoing</option>
<option ${task.status=="Done"?"selected":""}>Done</option>
</select>
`;

taskList.appendChild(div);

});

}

addBtn.addEventListener("click",()=>{

const text=input.value.trim();

if(text==="") return;

tasks.push({
text:text,
status:"To Do"
});

input.value="";

saveTasks();
renderTasks();

});

taskList.addEventListener("change",(e)=>{

if(e.target.tagName==="SELECT"){

const index=e.target.dataset.index;

tasks[index].status=e.target.value;

saveTasks();
renderTasks();

}

});

// TAB SWITCHING
tabs.forEach(tab=>{

tab.addEventListener("click",()=>{

// remove active class
tabs.forEach(t=>t.classList.remove("active"));

// activate clicked tab
tab.classList.add("active");

// update current tab
currentTab = tab.textContent;

renderTasks();

});

});

renderTasks();