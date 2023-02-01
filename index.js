window.addEventListener('load', () =>
{
    const name_Input = document.querySelector('#Name-Input');
    const date_Input = document.querySelector('#Date-Input');
    const amount_Input = document.querySelector('#Amount-Input');
    const table_el = document.querySelector('#Table-Element');
    btn = document.querySelector("#submit");

    //Check if there are any stored rows and display them
    if(localStorage.getItem("saved_Rows") !== null)
    {
        console.log("found rows");
        jsonFile = localStorage.getItem("saved_Rows");
        parsedJSONFile = JSON.parse(jsonFile);
        
        let row_Array = Object.values(parsedJSONFile);
        console.log(row_Array);

        row_Array.forEach(row => {
            
            line = row.split(",");
            name = line[0];
            date = line[1];
            amount = line[2];
            Submit(name, date, amount, table_el);
        });
    }

    //Add Expense Button Clicked. Add row to table.
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        name = name_Input.value;
        date = date_Input.value;
        amount = amount_Input.value;
        if(isNaN(amount)){
            alert("Amount must be a number");
            return;
        }
        Submit(name, date, amount, table_el);
    });

});

//Create html elements
function Submit(name_Input, date_Input, amount_Input, table_el){
    
    console.log(name + date + amount);
    const row_el = document.createElement("tr");
    row_el.classList.add("Row");
    const name_el = document.createElement("td");
    name_el.classList.add("name");
    name_el.innerText = name;
    const date_el = document.createElement("td");
    date_el.classList.add("date");
    date_el.innerText = date;
    const amount_el = document.createElement("td");
    amount_el.classList.add("amount");
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
            temp = amount_el.innerText;
            amount_el.contentEditable = true;
            console.log("edit");
        }
        else{
            edit_button.innerText = "Edit";
            name_el.contentEditable = false;
            date_el.contentEditable = false;
            amount_el.contentEditable = false;
            if(isNaN(amount_el.innerText)){
                alert("Amount must be a number");
                edit_button.innerText = "Edit";
                amount_el.innerText = temp;
                return;
            }
            console.log("save");
            SaveRows();
        }
    });

    const delete_button = document.createElement("button");
    delete_button.innerText = "Delete";

    delete_button.addEventListener('click', () => {
        table_el.removeChild(row_el);
        SaveRows();
    });

    edit_el.appendChild(edit_button);
    edit_el.appendChild(delete_button);
    row_el.appendChild(name_el);
    row_el.appendChild(date_el);
    row_el.appendChild(amount_el);
    row_el.appendChild(edit_el);
    table_el.appendChild(row_el);
    SaveRows();
}
//Save rows to local storage as JSON.
function SaveRows()
{
    saved_Row_JSON = {};
    row_Arr = document.querySelectorAll('.Row');
    var i = 0;
    row_Arr.forEach(element =>{
        name = element.children[0].innerText;
        date = element.children[1].innerText;
        amount = element.children[2].innerText;
        row_String = name + "," + date + "," + amount;
        saved_Row_JSON[i]= row_String;
        i++;
    });

    localStorage.setItem('saved_Rows', JSON.stringify(saved_Row_JSON));
    console.log(localStorage.getItem('saved_Rows'));
}
