let employees = JSON.parse(localStorage.getItem("employee")) || [];
let editIndex=null;

const form=document.getElementById("employee-form");
const nameInput=document.getElementById("name");
const emailInput=document.getElementById("email");
const roleInput=document.getElementById("role");
const tableBody=document.querySelector("#employee-table tbody");

form.addEventListener("submit",function(e){
    e.preventDefault();
    const name=nameInput.value.trim();
    const email=emailInput.value.trim();
    const role=roleInput.value.trim();

    if(!name ||!email ||!role)
        return;
    
    const employeeData={name,email,role};

    if(editIndex === null)
    {
        employees.push(employeeData);
    }
    else
    {
        employees[editIndex]=employeeData;
        editIndex=null;
        form.querySelector("button").textContent ="Add Employee";
    }
    localStorage.setItem("employee", JSON.stringify(employees));    
    form.reset();
    renderTable();
});

function renderTable()
{
    tableBody.innerHTML="";
    const employeesLocal = JSON.parse(localStorage.getItem("employee")) || [];
    employees = employeesLocal;
    employees.forEach((emp,index)=>{
        const row=document.createElement("tr");
        row.innerHTML=`<td>${emp.name}</td>
                        <td>${emp.email}</td>
                        <td>${emp.role}</td>
                        <td>
                            <button class="action-btn edit-btn" onclick="editEmployee(${index})">Edit</button>
                            <button class="action-btn delete-btn" onclick="deleteEmployee(${index})">Delete</button>
                        </td>`;
        tableBody.append(row);
    });
}

function editEmployee(index)
{
    const employeesLocal = JSON.parse(localStorage.getItem("employee")) || [];
    const emp = employeesLocal[index];
    nameInput.value=emp.name;
    emailInput.value=emp.email;
    roleInput.value=emp.role;
    editIndex=index;
    localStorage.setItem("employee", JSON.stringify(emp));    

    form.querySelector("button").textContent ="Update Employee";
}

function deleteEmployee(index)
{
    const employeesLocal = JSON.parse(localStorage.getItem("employee")) || [];
    const emp = employeesLocal[index];
    if(confirm(`Are you sure, you want to delete Employee : ${emp.name}?`))
    {
        employees.splice(index,1);
        localStorage.setItem("employee", JSON.stringify(employeesLocal));
        employees = employeesLocal;
        renderTable();
    }
    renderTable();
}
renderTable();