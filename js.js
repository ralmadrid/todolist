let savedTasks = localStorage.getItem("mySavedTask");

let tasks = JSON.parse(savedTasks) || [];
let listTasks = document.getElementById("listTasks");

/* inputs */
let addTasks = document.getElementById("addTasks");
let checkBox = document.getElementById("checkBox");

/* for Filter btn */
let filterForTaskComplet = document.getElementById("filterForTaskComplet");
let filterForTaskNonComplet = document.getElementById("filterForTaskNonComplet");
let filterFOrdisplayAll = document.getElementById("filterFOrdisplayAll");

/* for btn input */
let add = document.getElementById("add");

/* خاص بالاعلام */
let notificate = document.getElementById("notificate");

/* functionSave */
function saveAndAsync() {
    localStorage.setItem("mySavedTask", JSON.stringify(tasks));
}

/* function for add tasks */
function addToTasks() {
    if (addTasks.value.trim() === "") {
        alert("اكتب شيئا اولا");
        return;
    }
    tasks.push({
        id: Date.now(),
        title: addTasks.value,
        completed: checkBox.checked,
    });
    notificate.innerHTML = "تمت الاضافة بنجاح";
    setTimeout(() => {
        notificate.innerHTML = "";
    }, 1000);

    addTasks.value = "";
    checkBox.checked = false;
    creatTaskCard(tasks);
    saveAndAsync();
}

/* function for delete tasks */
function deletTasks(deleteID) {
    let Index = tasks.findIndex(task => task.id === deleteID);
    if (Index !== -1) {
        tasks.splice(Index, 1);
        notificate.innerHTML = "تم الحذف بنجاح";
        setTimeout(() => {
            notificate.innerHTML = "";
        }, 1000);
    }
}

/* دالة انشاء البطاقة */
function creatTaskCard(arraysTask) {
    listTasks.innerHTML = "";

    arraysTask.forEach(task => {
        let cardTask = document.createElement("li");
        listTasks.appendChild(cardTask);

        // 1. عنصر عرض المهمة
        let forDisplay = document.createElement("p");
        forDisplay.innerHTML = `title: ${task.title} <br> isCompleted: ${task.completed}`;
        cardTask.appendChild(forDisplay);

        // 2. إنشاء Div خاص بالتعديل (مخفي افتراضياً)
        let editDiv = document.createElement("div");
        editDiv.style.width = "100%";
        editDiv.style.marginTop = "8px";
        editDiv.style.gap = "8px";
        editDiv.style.display = "none";

        let editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = task.title;
        editInput.style.flex = "1";
        editInput.style.padding = "8px";
        editInput.style.borderRadius = "6px";
        editInput.style.border = "1px solid #cbd5e0";

        let saveEditBtn = document.createElement("button");
        saveEditBtn.innerHTML = "حفظ";
        saveEditBtn.style.backgroundColor = "#38a169";
        saveEditBtn.style.color = "white";

        editDiv.appendChild(editInput);
        editDiv.appendChild(saveEditBtn);
        cardTask.appendChild(editDiv);

        // 3. أزرار التحكم
        let hideBtn = document.createElement("button");
        hideBtn.innerHTML = 'لقد فهمت';
        cardTask.appendChild(hideBtn);
        hideBtn.addEventListener("click", () => {
            cardTask.style.display = "none";
        });

        let btnDelete = document.createElement("button");
        btnDelete.innerHTML = "الحذف النهائي";
        cardTask.appendChild(btnDelete);
        btnDelete.addEventListener("click", () => {
            deletTasks(task.id);
            cardTask.style.display = 'none';
            saveAndAsync();
        });

        let changeStateBtn = document.createElement("button");
        changeStateBtn.innerHTML = task.completed ? "لم تتم بعد" : "تمت";
        cardTask.appendChild(changeStateBtn);

        changeStateBtn.addEventListener("click", () => {
            task.completed = !task.completed;
            saveAndAsync();
            creatTaskCard(arraysTask);
        });

        // 4. زر التعديل
        let editBtn = document.createElement("button");
        editBtn.innerHTML = "تعديل";
        editBtn.style.backgroundColor = "#d69e2e";
        editBtn.style.color = "white";
        cardTask.appendChild(editBtn);

        editBtn.addEventListener("click", () => {
            forDisplay.style.display = "none";
            editBtn.style.display = "none";
            editDiv.style.display = "flex";
            editInput.focus();
        });

        saveEditBtn.addEventListener("click", () => {
            let updatedText = editInput.value.trim();
            if (updatedText === "") {
                alert("لا يمكن ترك المهمة فارغة!");
                return;
            }
            task.title = updatedText;
            saveAndAsync();
            creatTaskCard(arraysTask);
        });
    });
}

/* دوال تطبيق الفلاتر على الازرار */
filterForTaskComplet.addEventListener("click", () => {
    let myComplitedTask = tasks.filter(task => task.completed === true);
    creatTaskCard(myComplitedTask);
});

filterForTaskNonComplet.addEventListener("click", () => {
    let noneCompleted = tasks.filter(task => task.completed === false);
    creatTaskCard(noneCompleted);
});

filterFOrdisplayAll.addEventListener("click", () => {
    creatTaskCard(tasks);
});

add.addEventListener("click", () => {
    addToTasks();
});

// التشغيل الأولي عند فتح الصفحة
creatTaskCard(tasks);
