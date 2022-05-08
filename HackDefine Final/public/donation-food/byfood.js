
document.querySelector("#cooked-btn").addEventListener('click', changeA);
document.querySelector("#raw-btn").addEventListener('click', changeB);
document.querySelector("#plus").addEventListener('click', addItem);
document.querySelector("#submit").addEventListener('click', submit);
function changeA() {
    let button = document.querySelector("#cooked-btn")
    if (button.className == "changed") {
        button.classList.remove("changed");
        button.className = "btns";
    }
    else {
        if (document.querySelector("#raw-btn").className == "changed") {
            document.querySelector("#raw-btn").classList.remove("changed");
            document.querySelector("#raw-btn").classList = "btns";
            button.classList = "changed";
        }
        else {
            button.classList = "changed";
        }
    }

}
function changeB() {
    let button = document.querySelector("#raw-btn");
    if (button.className == "changed") {
        button.classList.remove("changed");
        button.className = "btns";
    }
    else {
        if (document.querySelector("#cooked-btn").className == "changed") {
            document.querySelector("#cooked-btn").classList.remove("changed");
            document.querySelector("#cooked-btn").classList = "btns";
            button.classList = "changed";
        }
        else {
            button.classList = "changed";
        }

    }

}
function addItem() {
    let div = document.createElement("div");
    div.className = "item";
    div.innerHTML = '<input type="text"  name="txt" class="itemName" placeholder="Item Name *" value="" /><br/> <input type="text"  name="txt" class="itemQty"  placeholder="Item Qty *" value="" />';
    document.querySelector("#items").appendChild(div);
}
function submit() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var days = document.getElementById("days").value;

    const type = document.querySelectorAll(".changed")[0].innerText;

    const radioButtons = document.querySelectorAll('input[name="donor"]');
    let selectedDonor;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedDonor = radioButton.value;
            break;
        }
    }

    var obj = {
        FoodType: type,
        DaysOld: days,
        name: name,
        email: email,
        phone: phone,
        donorType: selectedDonor,
        items: []
    }
    let n = document.querySelectorAll(".itemName").length;
    let i = 0;
    while (i < n) {


        var itemName = document.querySelectorAll(".itemName")[i].value;
        var itemQty = document.querySelectorAll(".itemQty")[i].value;
        obj.items[i] = [
            {
                itemName: itemName,
                itemQty: itemQty

            }]
        i++;
    }

    console.log(obj);
    fireBaseOperations.add(obj);
}