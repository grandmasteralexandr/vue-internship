<template>
  <div class="sidebar">
    <div class="logo">
      <div class="logo-name">PROJECTUS</div>
    </div>
    <div class="main-menu-wrap">
      <div class="user">
        <div class="user-info">
          <div class="user-name">{{userName}}</div>
          <div class="user-role">{{userRole}}</div>
        </div>
        <div class="user-setting-button">
          <div class="dots"></div>
        </div>
      </div>
      <div class="tasks">
        <div @click="completeTask" class="completed-tasks">
          <div class="task-count">{{completedTaskCount}}</div>
          <div class="task-status">Completed Tasks</div>
        </div>
        <div class="open-tasks">
          <div class="task-count">{{openTaskCount}}</div>
          <div class="task-status">Open Tasks</div>
        </div>
      </div>
      <nav class="main-menu">
        <div class="main-menu-name">MENU</div>
        <ul class="main-menu-container">
          <li class="main-menu-item"><a href="#" class="main-menu-link">Home</a></li>
          <li class="main-menu-item"><a href="#" class="main-menu-link">My Tasks</a></li>
          <li class="main-menu-item"><a href="#" class="main-menu-link">Notifications
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

<style scoped lang="scss">
  .sidebar {
    background-color: $sidebar-background-color;
    color: $sidebar-main-font-color;
    display: flex;
    flex-direction: column;
    min-width: 270px;
  }

  .logo-name {
    font-weight: bold;
    padding: 30px;

    &:before {
      content: url("./../img/logo@3x.svg");
      float: left;
      position: relative;
      left: -13px;
      padding-left: 13px;
    }

    &:after {
      content: url("./../img/search@3x.svg");
      position: relative;
      left: 72px;
      top: 2px;
      cursor: pointer;
    }
  }

  .main-menu-wrap {
    display: flex;
    flex-direction: column;
  }

  .user {
    background-color: $user-block-color;
    min-height: 80px;
    display: flex;
    align-items: center;

    &:before {
      content: "";
      background: url("./../img/user-avatar.jpeg") center center;
      background-size: cover;
      @include square-block(48px);
      border-radius: 50%;
      margin-left: 30px;
      margin-right: 13px;
    }
  }

  .user-info {
    display: flex;
    flex-direction: column;
  }

  .user-name {
    font-size: 14px;
  }

  .user-role, .task-status, .main-menu-name {
    font-size: 12px;
    color: $sidebar-second-font-color;
  }

  .user-setting-button {
    @extend %dots-button;
    margin-left: auto;
    margin-right: 15px;
  }

  .dots {
    position: relative;
    @include square-block(4px);
    border-radius: 50%;
    background-color: $sidebar-second-font-color;

    &:before, &:after {
      content: "";
      position: absolute;
      @include square-block(inherit);
      background-color: inherit;
      border-radius: inherit;
    }

    &:before {
      left: -6px;
    }

    &:after {
      left: 6px;
    }
  }

  .tasks {
    display: flex;
    margin-top: 20px;
  }

  .completed-tasks {
    margin-left: 30px;
    cursor: pointer;
  }

  .open-tasks {
    margin-left: 20px;
  }

  .task-count {
    font-size: 20px;
    padding: 2px 0;
  }

  .main-menu {
    margin-top: 30px;
    padding-left: 30px;

    ul {
      padding: 0;
      margin: 20px 0;
      font-size: 14px;

      li {
        padding: 10px 0;
        list-style-type: none;

        a {
          text-decoration: none;
          color: $sidebar-main-font-color;
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .count-highlight {
    @include square-block(20px);
    @extend %flex-center;
    background-color: $gold-highlight;
    color: $content-font-color;
    font-size: 13px;
    border-radius: 50%;
    margin-left: 10px;
  }

  @media screen and (max-width: 700px) {
    .main-menu-wrap {
      display: none;
    }
  }
</style>
