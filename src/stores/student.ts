import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useStudentStore = defineStore('student', () => {
  const name = ref('')
  const studentId = ref('')
  const college = ref('')

  const isLoggedIn = computed(() => !!name.value && !!studentId.value && !!college.value)

  function hydrate() {
    const raw = localStorage.getItem('studentInfo')
    if (raw) {
      try {
        const data = JSON.parse(raw)
        name.value = data.name || ''
        studentId.value = data.studentId || ''
        college.value = data.college || ''
      } catch {
        // corrupt data — stay logged out
      }
    }
  }

  function save(n: string, id: string, col: string) {
    name.value = n
    studentId.value = id
    college.value = col
    localStorage.setItem('studentInfo', JSON.stringify({ name: n, studentId: id, college: col }))
  }

  function clear() {
    name.value = ''
    studentId.value = ''
    college.value = ''
    localStorage.removeItem('studentInfo')
  }

  return { name, studentId, college, isLoggedIn, hydrate, save, clear }
})
