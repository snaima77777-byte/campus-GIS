<template>
  <div class="page">
    <div class="page-content">
      <section class="editorial-band">
        <p class="band-label">PROFILE</p>
        <h1 class="band-title">个人信息</h1>
        <p class="band-sub">学生资料 · 身份信息</p>
      </section>

      <div class="profile-layout">
        <div class="avatar-card">
          <div class="avatar-placeholder"><span>{{ studentStore.name.charAt(0) }}</span></div>
          <h2 class="avatar-name">{{ studentStore.name }}</h2>
          <p class="avatar-id">{{ studentStore.studentId }}</p>
        </div>

        <div class="info-cards">
          <div class="info-card">
            <h3 class="info-card-title">基本信息</h3>
            <div class="info-rows">
              <div class="info-row"><span class="info-key">姓名</span><span class="info-val">{{ studentStore.name }}</span></div>
              <div class="info-row"><span class="info-key">学号</span><span class="info-val">{{ studentStore.studentId }}</span></div>
              <div class="info-row"><span class="info-key">学院</span><span class="info-val">{{ studentStore.college }}</span></div>
              <div class="info-row"><span class="info-key">入学年份</span><span class="info-val">2026</span></div>
              <div class="info-row"><span class="info-key">学制</span><span class="info-val">四年制本科</span></div>
            </div>
          </div>

          <div class="info-card">
            <h3 class="info-card-title">校园状态</h3>
            <div class="status-grid">
              <div class="status-item"><span class="st-val green">✓ 已报到</span><span class="st-lab">报到状态</span></div>
              <div class="status-item"><span class="st-val">待分配</span><span class="st-lab">宿舍状态</span></div>
              <div class="status-item"><span class="st-val">未激活</span><span class="st-lab">校园卡</span></div>
              <div class="status-item"><span class="st-val green">已注册</span><span class="st-lab">网络账号</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStudentStore } from '@/stores/student'
const studentStore = useStudentStore()
</script>

<style scoped>
.page { width: 100%; height: 100vh; overflow-y: auto; background: var(--bg-canvas); }
.page-content { max-width: 800px; margin: 0 auto; padding: var(--sp-lg) var(--sp-md); }

.editorial-band { margin-bottom: var(--sp-lg); padding-bottom: var(--sp-md); border-bottom: 1px solid var(--hairline); }
.band-label { font: var(--font-caption-uppercase); letter-spacing: 1.1px; text-transform: uppercase; color: var(--primary); margin-bottom: var(--sp-xxs); }
.band-title { font: var(--font-display-xl); color: var(--text-ink); margin: 0; letter-spacing: -0.36px; }
.band-sub { font: var(--font-body-md); color: var(--text-body); margin-top: var(--sp-xxxs); }

.profile-layout { display: grid; grid-template-columns: 220px 1fr; gap: 1px; background: var(--hairline); }

.avatar-card { background: var(--bg-canvas); padding: var(--sp-lg); display: flex; flex-direction: column; align-items: center; text-align: center; }
.avatar-placeholder { width: 72px; height: 72px; background: var(--primary); display: flex; align-items: center; justify-content: center; margin-bottom: var(--sp-xs); }
.avatar-placeholder span { font: 500 32px/1 var(--font-family); color: var(--text-on-primary); }
.avatar-name { font: var(--font-display-md); color: var(--text-ink); margin: 0; font-weight: 500; }
.avatar-id { font: var(--font-body-sm); color: var(--text-muted); }

.info-cards { display: flex; flex-direction: column; gap: 1px; background: var(--hairline); }
.info-card { background: var(--bg-canvas); padding: var(--sp-sm); }
.info-card-title { font: var(--font-caption-uppercase); letter-spacing: 1.1px; text-transform: uppercase; color: var(--text-body-strong); margin: 0 0 var(--sp-xs); padding-bottom: var(--sp-xxs); border-bottom: 1px solid var(--hairline); }

.info-rows { display: flex; flex-direction: column; }
.info-row { display: flex; justify-content: space-between; padding: var(--sp-xxs) 0; border-bottom: 1px solid var(--hairline); }
.info-row:last-child { border-bottom: none; }
.info-key { font: var(--font-body-sm); color: var(--text-muted); }
.info-val { font: var(--font-body-sm); color: var(--text-ink); }

.status-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-xs); }
.status-item { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.st-val { font: var(--font-title-sm); color: var(--text-body); }
.st-val.green { color: var(--semantic-success); }
.st-lab { font: var(--font-caption-uppercase); letter-spacing: 1.1px; color: var(--text-muted); }

@media (max-width: 768px) { .profile-layout { grid-template-columns: 1fr; } .avatar-card { flex-direction: row; gap: var(--sp-xs); text-align: left; } .avatar-placeholder { margin-bottom: 0; } .page-content { padding: var(--sp-sm) var(--sp-xs); } }
</style>
