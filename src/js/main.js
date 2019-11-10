/* Task 2 */

/* Selectors */
const completedTaskBlock = document.querySelector(".completed-tasks");
const completedTaskCount = document.querySelector(".completed-tasks .task__count");
const openTaskCount = document.querySelector(".open-tasks .task__count");
const notificationCount = document.querySelector(".count-highlight");
const activityImgBlock = document.querySelector(".activity__img-box");
const activityImgs = document.querySelectorAll(".activity__img-item > img");

/* Event listeners */
completedTaskBlock.addEventListener("click", completeTask);
activityImgBlock.addEventListener("click", changeNotification);

/**
 * Complete task and reduce open tasks
 */
function completeTask() {
    if (confirm("Are you sure you want to change the number of tasks?")) {
        if (openTaskCount.innerText === "0") {
            alert("No more open tasks");
            return;
        }

        let openTasks = parseInt(openTaskCount.innerText);
        let completeTasks = parseInt(completedTaskCount.innerText);

        if (!openTasks || !completeTasks) {
            console.log("Task count is not a number");
            return;
        }

        completedTaskCount.innerText = ++completeTasks;
        openTaskCount.innerText = --openTasks;
    }
}

/**
 * Change notification on img index
 */
function changeNotification() {
    activityImgs.forEach((img, index) => {
            if (img === event.target) {
                notificationCount.innerText = index;
            }
        }
    );
}
