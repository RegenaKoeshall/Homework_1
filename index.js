
const form = document.querySelector("form");
const input = document.getElementsByTagName("input")[0];
const formAddButton = document.querySelector(".add");
const mainDiv = document.querySelector(".builder");
const ol = document.querySelector(".household");
const div = document.createElement('div');
const filterLabel = document.createElement("label");
const filterCheckBox = document.createElement("input");
const addButton = document.querySelector(".add");
const rel = document.querySelector("[name=rel]");
var isSmoker;
const smokerCheckBox = document.getElementsByTagName("input")[1];
const submitBtn = document.querySelector("[type=submit]");
const pre  = document.querySelector("pre");
var member;
const membersList = [];
var serialNumber = 0;
const style = document.querySelector("style");
const link = document.createElement("link");

document.body.onload = createLink;

function createLink() {
  link.setAttribute("href","css/main.css");
  link.setAttribute("rel", "stylesheet");
  document.head.insertBefore(link, style);
};


 function createArray() {
      serialNumber += 1;
      member = {
        serial: serialNumber,
        age: form.age.value,
        relationship: form.rel.value,
        smoker: isSmoker
      };
       membersList.push(member);
  }

function createMember(text) {
  const li = document.createElement("li");  
  const span = document.createElement("span");  
  span.textContent = "Age: " + text;
  li.appendChild(span);
  const label = document.createElement("label");
  label.textContent = "Relationship: " + rel.value;
  li.appendChild(label);
  const span2 = document.createElement("span");  
   span2.textContent = isSmoker;
   li.append(span2);
  const editButton = document.createElement("button");
  editButton.textContent = 'edit';
  li.appendChild(editButton);
  const removeButton = document.createElement("button");
  removeButton.textContent = 'remove';
  li.appendChild(removeButton);
  return li;
}

formAddButton.addEventListener('click', (e) => {
   e.preventDefault();
 if(form.age.value == "" || form.age.value <= 0 || form.rel.value == "") {
  alert("Age and Relationship are required.");
 } else {  
   if(form.smoker.checked) {
          isSmoker = "Smoker: Yes";
        } else {
           isSmoker = "Smoker: No";
        }
 createArray(ol.value, form.age.value, form.rel.value, isSmoker);  
  const text = input.value;
  input.value = '';
  const li = createMember(text);
  ol.appendChild(li);
   }
});
  
  
ol.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const li = button.parentNode;
    const ol = li.parentNode;
    if (button.textContent === 'remove') {   
      ol.removeChild(li);    
      membersList.pop(member);
    } else if (button.textContent === 'edit') { 
      const span = li.firstElementChild;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = span.textContent;
      li.insertBefore(input, span);
      li.removeChild(span);
      button.textContent = 'save';
    } else if (button.textContent === 'save') { 
      const input = li.firstElementChild;
      const span = document.createElement('span');
      span.textContent = input.value;
      li.insertBefore(span, input);
      li.removeChild(input);
      button.textContent = 'edit';
    }
  }
});  
   
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    var object = JSON.stringify(membersList); 
    pre.className = "debug_renamed";
    pre.textContent = object;
    object =""; 
  });
  
  
  
  
  
  
