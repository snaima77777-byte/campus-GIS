<template>
  <Teleport to="body">
    <div class="modal-mask" @click.self="$emit('cancel')">
      <div class="modal-card">
        <h3 class="modal-title">{{ title }}</h3>

        <div v-if="showStart" class="field">
          <label class="field-label">起点</label>
          <select
            class="form-select"
            :value="startValue"
            @change="$emit('update:startValue', ($event.target as HTMLSelectElement).value)"
          >
            <option v-for="opt in options" :key="opt.name" :value="opt.name">
              {{ opt.name }}
            </option>
          </select>
        </div>

        <div class="field">
          <label class="field-label">{{ showStart ? '终点' : '选择' }}</label>
          <select
            class="form-select"
            :value="modelValue"
            @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
          >
            <option v-for="opt in options" :key="opt.name" :value="opt.name">
              {{ opt.name }}
            </option>
          </select>
        </div>

        <div class="modal-actions">
          <button class="cta-primary" @click="$emit('confirm')">开始导航</button>
          <button class="btn-cancel" @click="$emit('cancel')">取消</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  options: { name: string; id?: number }[]
  modelValue: string
  showStart?: boolean
  startValue?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
  'update:startValue': [value: string]
  confirm: []
  cancel: []
}>()
</script>

<style scoped>
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal-card {
  width: 90%;
  max-width: 380px;
  background: var(--bg-canvas-elevated);
  padding: var(--sp-md);
}
.modal-title {
  font: var(--font-display-md);
  color: var(--text-ink);
  margin: 0 0 var(--sp-sm);
  font-weight: 500;
}
.field {
  margin-bottom: var(--sp-xs);
}
.field-label {
  display: block;
  font: var(--font-caption-uppercase);
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: var(--text-body);
  margin-bottom: var(--sp-xxxs);
}
.form-select {
  width: 100%;
  height: var(--cta-height);
  background: var(--bg-canvas);
  border: 1px solid var(--hairline);
  color: var(--text-ink);
  padding: 0 var(--sp-xs);
  font: var(--font-body-md);
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  cursor: pointer;
}
.form-select:focus { outline: none; border-color: var(--primary); }
.form-select option { background: var(--bg-canvas-elevated); color: var(--text-ink); }

.modal-actions {
  display: flex;
  gap: var(--sp-xxs);
  margin-top: var(--sp-sm);
}
.cta-primary {
  flex: 1;
  height: var(--cta-height);
  border: none;
  background: var(--primary);
  color: var(--text-on-primary);
  font: var(--font-button);
  letter-spacing: var(--font-button-spacing);
  text-transform: var(--font-button-transform);
  cursor: pointer;
}
.cta-primary:hover { background: var(--primary-active); }
.btn-cancel {
  flex: 1;
  height: var(--cta-height);
  border: 1px solid var(--hairline);
  background: transparent;
  color: var(--text-body);
  font: var(--font-button);
  letter-spacing: var(--font-button-spacing);
  text-transform: var(--font-button-transform);
  cursor: pointer;
  transition: all 0.15s;
}
.btn-cancel:hover { color: var(--text-ink); border-color: var(--text-muted); }
</style>
