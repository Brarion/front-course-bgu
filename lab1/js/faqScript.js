document.addEventListener("DOMContentLoaded", function () {
    var questions = document.getElementsByClassName("question");
    Array.from(questions).forEach(function (question) {
        question.addEventListener("click", function () {
            this.classList.toggle("active");
            var answer = this.nextElementSibling;
            if (answer.style.display === "none" || answer.style.display === "") {
                answer.style.display = "block";
            } else {
                answer.style.display = "none";
            }
        });
    });
});
