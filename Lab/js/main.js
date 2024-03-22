function submitForm(event) {
    event.preventDefault();
    const datetimeInput = document.getElementById("datetime");
    const selectedDatetime = new Date(datetimeInput.value);
    const nameInput = document.getElementById("name");
    const selectedName = nameInput.value;
    const categoryInput = document.getElementById("service");
    const selectedCategory = categoryInput.value;

    // Проверка на время работы (с 8 утра до 8 вечера)
    const isWorkingHours = selectedDatetime.getHours() >= 8 && selectedDatetime.getHours() < 20;

    // Проверка на прошедшее время
    const isPastTime = selectedDatetime < new Date();

    if (
        selectedDatetime !== "" &&
        selectedName.trim() !== "" &&
        selectedCategory.trim() !== ""
    ) {
        if (!isWorkingHours) {
            alert("Пожалуйста, выберите время в рабочие часы с 8:00 до 20:00.");
        } else if (isPastTime) {
            alert("Невозможно записаться на прошедшее время.");
        } else {
            datetimeInput.value = "";
            document.getElementById("service").value = "";
            document.getElementById("name").value = "";
            alert("Вы записаны! Ждём вас!");
        }
    } else if (selectedCategory.trim() === "") {
        alert("Пожалуйста, выберите услугу.");
    } else if (selectedDatetime === "") {
        alert("Пожалуйста, выберите дату и время.");
    } else if (selectedName.trim() === "") {
        alert("Пожалуйста, введите имя.");
    }
}

function generator(event)
{
    event.preventDefault();
    let randomNumber = Math.floor(Math.random() * 5)
    let randomText = ["Расслабляющий массаж","Увлажняющий массаж","Эксфолиация","Очищающая процедура","Предоставь выбор мастеру"]
    document.getElementById("randomSpaService").value = randomText[randomNumber]
    document.getElementById("randomSpaService").style.color = "#000000FF"
}