<template>
  <div class="sidebar">
    <div class="logo">
      <div class="logo__name">PROJECTUS</div>
    </div>
    <div class="main-menu-wrap">
      <div class="user">
        <div class="user__info">
          <div class="user__name">{{userName}}</div>
          <div class="user__role">{{userRole}}</div>
        </div>
        <div class="user__setting-button">
          <div class="dots"></div>
        </div>
      </div>
      <div class="tasks">
        <div @click="completeTask" class="completed-tasks">
          <div class="task__count">{{completedTaskCount}}</div>
          <div class="task__status">Completed Tasks</div>
        </div>
        <div class="open-tasks">
          <div class="task__count">{{openTaskCount}}</div>
          <div class="task__status">Open Tasks</div>
        </div>
      </div>
      <nav class="main-menu">
        <div class="main-menu__name">MENU</div>
        <ul class="main-menu__container">
          <li class="main-menu__item"><a href="#" class="main-menu__link">Home</a></li>
          <li class="main-menu__item"><a href="#" class="main-menu__link">My Tasks</a></li>
          <li class="main-menu__item"><a href="#" class="main-menu__link">Notifications
            <span class="count-highlight">{{notificationCount}}</span>
          </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainSidebar',

  data() {
    return {
      userName: 'Jean Gonzales',
      userRole: 'Product Owner',
      completedTaskCount: 372,
      openTaskCount: 3,
    }
  },

  props: {
    notificationCount: {
      type: Number,
      default: 3
    }
  },

  methods: {
    completeTask: function () {
      if (confirm('Are you sure you want to change the number of tasks?')) {
        if (this.openTaskCount === 0) {
          alert('No more open tasks');
          return;
        }

        if (typeof this.openTaskCount !== 'number' || typeof this.completedTaskCount !== 'number') {
          console.log('Task count is not a number');
          return;
        }

        this.completedTaskCount++;
        this.openTaskCount--;
      }
    }
  }
}
</script>

<style scoped>

</style>
