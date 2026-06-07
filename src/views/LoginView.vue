<template>
  <div class="login-page">
    <!-- Cinematic hero background -->
    <div class="login-hero">
      <div class="hero-gradient"></div>
      <div class="login-card">
        <!-- Cavallino mark -->
        <div class="brand-mark">
          <span class="brand-text">HLJIT</span>
        </div>

        <p class="section-label">FRESHMAN GUIDE</p>
        <h1 class="hero-title">黑龙江工程学院</h1>
        <p class="hero-sub">新生智慧导航系统</p>

        <div class="form-group">
          <label class="form-label">姓名</label>
          <input v-model="name" placeholder="请输入姓名" class="form-input" />
        </div>

        <div class="form-group">
          <label class="form-label">学号</label>
          <input v-model="studentId" placeholder="请输入学号" class="form-input" />
        </div>

        <div class="form-group">
          <label class="form-label">学院</label>
          <select v-model="college" class="form-input form-select">
            <option value="">请选择学院</option>
            <option>土木与建筑工程学院</option>
            <option>测绘工程学院</option>
            <option>机电工程学院</option>
            <option>汽车与交通工程学院</option>
            <option>电气与信息工程学院</option>
            <option>计算机科学与技术学院</option>
            <option>经济管理学院</option>
            <option>艺术与设计学院</option>
            <option>外国语学院</option>
            <option>人文与社会科学学院</option>
            <option>理学院</option>
            <option>马克思主义学院</option>
            <option>继续教育学院</option>
          </select>
        </div>

        <button class="cta-primary" @click="enterSystem">
          进入校园
        </button>

        <div class="login-footer">HEILONGJIANG INSTITUTE OF TECHNOLOGY</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStudentStore } from '@/stores/student'

const router = useRouter()
const studentStore = useStudentStore()

const name = ref('')
const studentId = ref('')
const college = ref('')

function enterSystem() {
  if (!name.value || !studentId.value || !college.value) {
    alert('请填写完整信息')
    return
  }
  studentStore.save(name.value, studentId.value, college.value)
  router.push('/dashboard')
}
</script>

<style scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  background: var(--bg-canvas);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.login-hero {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Subtle dark gradient atmosphere — Ferrari-style */
.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #3c3c3c00 0%, #181818 100%);
  pointer-events: none;
}

.login-card {
  width: 90%;
  max-width: 400px;
  padding: var(--sp-lg) var(--sp-md);
  background: var(--bg-canvas-elevated);
  position: relative;
  z-index: 1;
}

.brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--sp-sm);
}

.brand-text {
  font: var(--font-display-mega);
  color: var(--primary);
  letter-spacing: -1.6px;
}

/* Section label — Ferrari caption-uppercase */
.section-label {
  font: var(--font-caption-uppercase);
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: var(--primary);
  text-align: center;
  margin-bottom: var(--sp-xxs);
}

.hero-title {
  font: var(--font-display-xl);
  color: var(--text-ink);
  text-align: center;
  margin: 0 0 var(--sp-xxxs);
  letter-spacing: -0.36px;
}

.hero-sub {
  font: var(--font-body-md);
  color: var(--text-muted);
  text-align: center;
  margin: 0 0 var(--sp-md);
}

.form-group {
  margin-bottom: var(--sp-xs);
}

.form-label {
  display: block;
  font: var(--font-caption-uppercase);
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: var(--text-body);
  margin-bottom: var(--sp-xxxs);
}

.form-input {
  width: 100%;
  height: var(--cta-height);
  background: var(--bg-canvas);
  border: 1px solid var(--hairline);
  color: var(--text-ink);
  padding: 0 var(--sp-xs);
  font: var(--font-body-md);
  transition: border-color 0.15s;
  -webkit-appearance: none;
  appearance: none;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
}

.form-input::placeholder {
  color: var(--text-muted);
}

.form-select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
}

.form-select option {
  background: var(--bg-canvas-elevated);
  color: var(--text-ink);
}

/* Primary CTA — Rosso Corsa, sharp corners, uppercase, 1.4px tracking */
.cta-primary {
  width: 100%;
  height: var(--cta-height);
  margin-top: var(--sp-xxs);
  border: none;
  background: var(--primary);
  color: var(--text-on-primary);
  font: var(--font-button);
  letter-spacing: var(--font-button-spacing);
  text-transform: var(--font-button-transform);
  cursor: pointer;
  transition: background 0.15s;
}

.cta-primary:hover {
  background: var(--primary-active);
}

.cta-primary:active {
  background: var(--primary-hover);
}

.login-footer {
  text-align: center;
  margin-top: var(--sp-sm);
  font: var(--font-caption-uppercase);
  letter-spacing: 1.1px;
  color: var(--text-muted);
}
</style>
