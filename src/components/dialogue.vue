<template>
  <div class="chatroom mt-3">
    <div class="hello container mt-5">
      <div class="hello1">
        <!--訊息輸入框 -->
        <div class="input-group mb-5">
          <input
            type="text"
            class="form-control"
            placeholder="請輸入您的訊息"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            v-model="tempMessage"
            :disabled="!username"
          /><!--tempMessage = 使用者輸入的訊息 ; !username = 使用者沒輸入姓名就不能輸入訊息-->
          <button
            class="btn btn-outline-primary btn2"
            type="button"
            id="button-addon2"
            @click="submitMessage()"
            :disabled="!username"
          >
            確認
          </button>
        </div>
        <!--對話框 -->
        <div
          class="d-flex align-items-center media my-3"
          v-for="item in messages"
        >
          <div class="flex-shrink-0">
            <!-- 使用者名稱不相等時，頭像顯示在左邊 -->
            <img v-if="item.username != username" :src="item.src" />
          </div>
          <div class="flex-grow-1 ms-3">
            <h5 class="mt-0">{{ item.username }}</h5>
            <p>{{ item.message }}</p>
          </div>
          <!-- 使用者名稱相等時，頭像顯示右邊 -->
          <img v-if="item.username == username" :src="item.src" />
        </div>
      </div>
      <div class="hello2">
        <!-- 姓名輸入框 -->
        <div class="bbb">
          <div class="card">
            <div class="card-header">
              你的資料
            </div>
            <div class="card-block">
              <div class="form-group">
                <label for="username">姓名</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="tempUsername"
                  id="username"
                  placeholder="輸入姓名"
                />
                <small class="form-text text-muted"
                  >請輸入個人姓名開始使用聊天室</small
                >
              </div>
              <button
                type="button"
                class="btn btn-primary"
                @click="updateUsername()"
              >
                送出
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      tempUsername: "",
      tempMessage: "",
      messages: [
        {
          username: "Ted",
          message: "你好,今天天氣很不錯呢",
          src: "https://picsum.photos/id/237/100/100"
        },
        {
          username: "Eva",
          message: "Hello!你好~",
          src: "https://picsum.photos/seed/picsum/100/100"
        }
      ]
    };
  },
  methods: {
    updateUsername() {
      let vm = this;
      //讓 資料欄輸入的姓名 = 使用者姓名 才可以輸入訊息
      vm.username = vm.tempUsername;
      console.log(vm.username, vm.tempUsername);
    },
    submitMessage() {
      let vm = this;
      if (vm.tempUsername == "Eva") {
        vm.messages.unshift({
          username: vm.tempUsername,
          message: vm.tempMessage,
          src: "https://picsum.photos/seed/picsum/100/100"
        });
      } else if(vm.tempUsername == "Ted"){
        vm.messages.unshift({
          username: vm.tempUsername,
          message: vm.tempMessage,
          src: "https://picsum.photos/id/237/100/100"
        });
      }else{
        vm.messages.unshift({
          username: vm.tempUsername,
          message: vm.tempMessage,
          src: "https://picsum.photos/100/100"
        });
      }
      vm.tempMessage = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;
  margin: 0;
  padding: 0;
}
.bbb {
  margin-left: 30%;
  width: 150%;
  line-height: 2;
}
.hello1 {
  width: 100%;
  margin-left: 12%;
}
.card-block {
  padding-left: 2%;
  padding-right: 2%;
}

.btn {
  margin-left: 35%;
  margin-top: 2%;
  margin-bottom: 2%;
}
.input-group {
  width: 100%;
}
.btn2 {
  margin: 0;
}
</style>
