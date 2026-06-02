<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo-tag">FRESHMAN GUIDE</div>

      <h1 class="school-title">黑龙江工程学院</h1>

      <p class="system-title">新生智慧导航系统</p>

      <div class="form-group">
        <label>姓名</label>
        <input v-model="name" placeholder="请输入姓名" />
      </div>

      <div class="form-group">
        <label>学号</label>
        <input v-model="studentId" placeholder="请输入学号" />
      </div>

      <div class="form-group">
        <label>学院</label>
        <select v-model="college">
          <option value="">请选择学院</option>

          <option>土木与建筑工程学院</option>
          <option>机电工程学院</option>
          <option>汽车与交通工程学院</option>
          <option>测绘工程学院</option>
          <option>计算机科学与技术学院</option>
          <option>材料科学与工程学院</option>
        </select>
      </div>

      <button class="enter-btn" @click="enterSystem">进入校园 →</button>

      <div class="footer">HEILONGJIANG INSTITUTE OF TECHNOLOGY</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const name = ref("");
const studentId = ref("");
const college = ref("");

function enterSystem() {
  if (!name.value || !studentId.value || !college.value) {
    alert("请填写完整信息");
    return;
  }

  localStorage.setItem(
    "studentInfo",
    JSON.stringify({
      name: name.value,
      studentId: studentId.value,
      college: college.value,
    }),
  );

  router.push("/home");
}
</script>
<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;

  background: linear-gradient(135deg, #0f0f0f, #1a1a1a);

  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 90%;
  max-width: 420px;

  padding: 32px;

  background: rgba(24, 24, 24, 0.95);

  border: 1px solid #303030;

  border-radius: 20px;
}

.logo-tag {
  color: #da291c;

  font-size: 12px;

  letter-spacing: 4px;

  margin-bottom: 10px;
}

.school-title {
  color: white;

  margin: 0;

  font-size: 34px;
}

.system-title {
  color: #888;

  margin-top: 8px;

  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;

  color: #888;

  margin-bottom: 8px;

  font-size: 12px;
}

input,
select {
  width: 100%;

  height: 52px;

  background: #2a2a2a;

  border: 1px solid #3a3a3a;

  color: white;

  padding: 0 15px;

  box-sizing: border-box;

  border-radius: 10px;
}

.enter-btn {
  width: 100%;

  height: 56px;

  margin-top: 10px;

  border: none;

  border-radius: 12px;

  background: #da291c;

  color: white;

  font-size: 16px;

  font-weight: 700;

  cursor: pointer;
}

.footer {
  text-align: center;

  margin-top: 20px;

  color: #666;

  font-size: 12px;
}
</style>
