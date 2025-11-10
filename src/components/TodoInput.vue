<script setup>
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const emit = defineEmits(['add-task'])

const newTask = ref('')

const addTask = () => {
  if (newTask.value.trim()) {
    emit('add-task', newTask.value.trim())
    newTask.value = ''
  }
}
</script>

<template>
  <div class="mb-6">
    <div class="flex gap-2">
      <Input
        v-model="newTask"
        placeholder="Enter a new task..."
        class="flex-1"
        @keypress.enter="addTask"
      />
      <Button @click="addTask" :disabled="!newTask.trim()">
        Add Task
      </Button>
    </div>
    <p class="text-sm text-gray-500 mt-2">
       Press Enter or click "Add Task" to create a new todo
    </p>
  </div>
</template>