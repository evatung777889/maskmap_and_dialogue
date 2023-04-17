<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="aaa">
        <ul class="nav">
          <li class="nav-item">
            <router-link
              :to="'/'"
              class="nav-link active"
              aria-current="page"
              >口罩地圖</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :to="'/dialogue'"
              class="nav-link active"
              aria-current="page"
              >對話框</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
}
.aaa {
  display: flex;
  margin-left: 20px;
}
</style>
