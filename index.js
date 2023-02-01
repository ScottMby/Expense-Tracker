window.addEventListener('load', () =>
{
    const name_Input = document.querySelector('#Name-Input');
    const date_Input = document.querySelector('#Date-Input');
    const amount_Input = document.querySelector('#Amount-Input');
    const table_el = document.querySelector('#Table-Element');
    btn = document.querySelector("#submit");

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        Submit(name_Input, date_Input, amount_Input, table_el);
    });

});


function Submit(name_Input, date_Input, amount_Input, table_el){
    name = name_Input.value;
    date = date_Input.value;
    amount = amount_Input.value;
    console.log(name + date + amount);
    //now add table records
    const row_el = document.createElement("tr");
    row_el.classList.add("Row");
    const name_el = document.createElement("td");
    name_el.innerText = name;
    const date_el = document.createElement("td");
    date_el.innerText = date;
    const amount_el = document.createElement("td");
    amount_el.innerText = amount;
    const edit_el = document.createElement("td");
    edit_el.classList.add("Edit-Element");
    const edit_button = document.createElement("button");
    edit_button.innerText = "Edit";

    name_el.contentEditable = false;
    date_el.contentEditable = false;
    amount_el.contentEditable = false;

    edit_button.addEventListener('click', () => {
        if(edit_button.innerText.toLowerCase() == "edit")
        {
            edit_button.innerText = "Save";
            name_el.contentEditable = true;
            date_el.contentEditable = true;
            amount_el.contentEditable = true;
            console.log("edit");
        }
        else{
            edit_button.innerText = "Edit";
            name_el.contentEditable = false;
            date_el.contentEditable = false;
            amount_el.contentEditable = false;
            console.log("save");
        }
    });

    const delete_button = document.createElement("button");
    delete_button.innerText = "Delete";

    delete_button.addEventListener('click', () => {
        table_el.removeChild(row_el);
    });
    
    edit_el.appendChild(edit_button);
    edit_el.appendChild(delete_button);
    row_el.appendChild(name_el);
    row_el.appendChild(date_el);
    row_el.appendChild(amount_el);
    row_el.appendChild(edit_el);
    table_el.appendChild(row_el);
}
