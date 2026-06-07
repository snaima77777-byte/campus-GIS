<template>
  <div class="page">
    <div class="page-content">
      <section class="editorial-band">
        <p class="band-label">REGISTRATION</p>
        <h1 class="band-title">报到注册</h1>
        <p class="band-sub">新生信息采集 · 在线报到流程</p>
      </section>

      <div class="steps">
        <div v-for="(step, i) in steps" :key="i" class="step" :class="{ active: i === currentStep, completed: i < currentStep }">
          <div class="step-circle">
            <span v-if="i < currentStep"><i class="fa fa-check"></i></span>
            <span v-else>{{ i + 1 }}</span>
          </div>
          <span class="step-label">{{ step }}</span>
        </div>
      </div>

      <div class="step-content">
        <div v-if="currentStep === 0" class="form-card">
          <h3 class="form-title">基本信息确认</h3>
          <div class="form-grid">
            <div class="fg"><label class="fg-label">姓名</label><input class="fg-input" :value="studentStore.name" readonly /></div>
            <div class="fg"><label class="fg-label">学号</label><input class="fg-input" :value="studentStore.studentId" readonly /></div>
            <div class="fg"><label class="fg-label">学院</label><input class="fg-input" :value="studentStore.college" readonly /></div>
            <div class="fg"><label class="fg-label">身份证号</label><input class="fg-input" v-model="form.idNumber" placeholder="请输入身份证号" /></div>
            <div class="fg"><label class="fg-label">手机号码</label><input class="fg-input" v-model="form.phone" placeholder="请输入手机号码" /></div>
            <div class="fg"><label class="fg-label">紧急联系人</label><input class="fg-input" v-model="form.emergencyContact" placeholder="姓名 + 电话" /></div>
          </div>
        </div>

        <div v-if="currentStep === 1" class="form-card">
          <h3 class="form-title">材料上传</h3>
          <div class="upload-grid">
            <div v-for="doc in documents" :key="doc.name" class="upload-card" :class="{ uploaded: doc.uploaded }">
              <div class="upload-icon"><i :class="doc.uploaded ? 'fa fa-check-circle' : 'fa fa-cloud-upload'"></i></div>
              <span class="upload-name">{{ doc.name }}</span>
              <span class="upload-status">{{ doc.uploaded ? '已上传' : '待上传' }}</span>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 2" class="form-card">
          <h3 class="form-title">确认提交</h3>
          <div class="confirm-list">
            <div v-for="item in confirmItems" :key="item.label" class="confirm-row">
              <span class="confirm-label">{{ item.label }}</span>
              <span class="confirm-value">{{ item.value }}</span>
            </div>
          </div>
          <div class="confirm-check">
            <label><input type="checkbox" v-model="agreed" /> 本人确认以上信息真实有效</label>
          </div>
        </div>
      </div>

      <div class="step-actions">
        <button v-if="currentStep > 0" class="btn-secondary" @click="currentStep--">上一步</button>
        <span v-else></span>
        <button v-if="currentStep < 2" class="btn-secondary" @click="currentStep++">下一步</button>
        <button v-else class="cta-primary" :disabled="!agreed" @click="submit">提交报到</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useStudentStore } from '@/stores/student'

const studentStore = useStudentStore()
const currentStep = ref(0)
const steps = ['基本信息', '材料上传', '确认提交']

const form = reactive({ idNumber: '', phone: '', emergencyContact: '' })
const documents = [
  { name: '录取通知书', uploaded: true }, { name: '身份证复印件', uploaded: true },
  { name: '高考准考证', uploaded: false }, { name: '一寸照片(电子版)', uploaded: false },
]
const agreed = ref(false)

const confirmItems = [
  { label: '姓名', value: studentStore.name }, { label: '学号', value: studentStore.studentId },
  { label: '学院', value: studentStore.college }, { label: '身份证号', value: '' },
  { label: '手机号码', value: '' }, { label: '紧急联系人', value: '' },
]

function submit() { alert('报到提交成功！欢迎来到黑龙江工程学院！'); currentStep.value = 0 }
</script>

<style scoped>
.page { width: 100%; height: 100vh; overflow-y: auto; background: var(--bg-canvas); }
.page-content { max-width: 800px; margin: 0 auto; padding: var(--sp-lg) var(--sp-md); }

.editorial-band { margin-bottom: var(--sp-lg); padding-bottom: var(--sp-md); border-bottom: 1px solid var(--hairline); }
.band-label { font: var(--font-caption-uppercase); letter-spacing: 1.1px; text-transform: uppercase; color: var(--primary); margin-bottom: var(--sp-xxs); }
.band-title { font: var(--font-display-xl); color: var(--text-ink); margin: 0; letter-spacing: -0.36px; }
.band-sub { font: var(--font-body-md); color: var(--text-body); margin-top: var(--sp-xxxs); }

.steps { display: flex; justify-content: center; gap: var(--sp-lg); margin-bottom: var(--sp-lg); }
.step { display: flex; flex-direction: column; align-items: center; gap: var(--sp-xxxs); }
.step-circle { width: 36px; height: 36px; border-radius: var(--radius-full); border: 2px solid var(--hairline); display: flex; align-items: center; justify-content: center; font: var(--font-title-sm); color: var(--text-muted); }
.step.active .step-circle { border-color: var(--primary); color: var(--primary); }
.step.completed .step-circle { border-color: var(--semantic-success); background: var(--semantic-success); color: var(--text-ink); }
.step-label { font: var(--font-caption-uppercase); letter-spacing: 1.1px; color: var(--text-muted); }
.step.active .step-label { color: var(--primary); }
.step.completed .step-label { color: var(--semantic-success); }

.form-card { background: var(--bg-canvas); border: 1px solid var(--hairline); padding: var(--sp-md); margin-bottom: var(--sp-xs); }
.form-title { font: var(--font-display-md); color: var(--text-ink); margin: 0 0 var(--sp-sm); font-weight: 500; }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-xs); }
.fg { display: flex; flex-direction: column; gap: var(--sp-xxxs); }
.fg-label { font: var(--font-caption-uppercase); letter-spacing: 1.1px; color: var(--text-body); text-transform: uppercase; }
.fg-input { width: 100%; height: var(--cta-height); background: var(--bg-canvas-elevated); border: 1px solid var(--hairline); color: var(--text-ink); padding: 0 var(--sp-xxs); font: var(--font-body-md); }
.fg-input:focus { outline: none; border-color: var(--primary); }
.fg-input[readonly] { opacity: 0.5; }

.upload-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--sp-xxs); }
.upload-card { display: flex; flex-direction: column; align-items: center; gap: var(--sp-xxs); padding: var(--sp-sm); background: var(--bg-canvas-elevated); border: 1px solid var(--hairline); cursor: pointer; }
.upload-card.uploaded { border-color: var(--semantic-success); }
.upload-card:hover { border-color: var(--primary); }
.upload-icon i { font-size: 24px; color: var(--text-muted); }
.upload-card.uploaded .upload-icon i { color: var(--semantic-success); }
.upload-name { font: var(--font-body-sm); color: var(--text-body); }
.upload-status { font: var(--font-caption-uppercase); letter-spacing: 1.1px; color: var(--text-muted); }
.upload-card.uploaded .upload-status { color: var(--semantic-success); }

.confirm-list { display: flex; flex-direction: column; gap: 1px; background: var(--hairline); }
.confirm-row { display: flex; justify-content: space-between; padding: var(--sp-xs) var(--sp-sm); background: var(--bg-canvas-elevated); }
.confirm-label { font: var(--font-body-sm); color: var(--text-muted); }
.confirm-value { font: var(--font-body-sm); color: var(--text-ink); }
.confirm-check { margin-top: var(--sp-sm); }
.confirm-check label { font: var(--font-body-sm); color: var(--text-body); display: flex; align-items: center; gap: var(--sp-xxs); }
.confirm-check input { accent-color: var(--primary); }

.step-actions { display: flex; justify-content: space-between; margin-top: var(--sp-sm); }
.btn-secondary { height: var(--cta-height); padding: 0 var(--sp-sm); background: transparent; border: 1px solid var(--hairline); color: var(--text-body); font: var(--font-button); letter-spacing: var(--font-button-spacing); text-transform: var(--font-button-transform); cursor: pointer; }
.btn-secondary:hover { color: var(--text-ink); border-color: var(--text-muted); }
.cta-primary { height: var(--cta-height); padding: 0 var(--sp-lg); border: none; background: var(--primary); color: var(--text-on-primary); font: var(--font-button); letter-spacing: var(--font-button-spacing); text-transform: var(--font-button-transform); cursor: pointer; }
.cta-primary:hover:not(:disabled) { background: var(--primary-active); }
.cta-primary:disabled { opacity: 0.3; cursor: not-allowed; }

@media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; } .upload-grid { grid-template-columns: repeat(2, 1fr); } .page-content { padding: var(--sp-sm) var(--sp-xs); } }
</style>
