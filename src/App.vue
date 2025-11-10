<script setup>
import NavBar from '@/components/NavBar.vue';
import { ref, computed, onMounted } from 'vue'
import TodoInput from '@/components/TodoInput.vue'
import FilterButtons from '@/components/FilterButtons.vue'
import TodosTable from '@/components/TodosTable.vue'
import { todoAPI } from '@/utils/api'

// reactive 
const tasks = ref([])
const filter = ref('all')
const loading = ref(false)

// Computed 
const totalTasks = computed(() => tasks.value.length)

const filteredTasks = computed(() => {
  switch (filter.value) {
    case 'active':
      return tasks.value.filter(task => !task.completed)
    case 'completed':
      return tasks.value.filter(task => task.completed)
    default:
      return tasks.value
  }
})

// Methods
const loadTodos = async () => {
  loading.value = true
  try {
    const data = await todoAPI.get()
    tasks.value = data
  } catch (error) {
    console.error('Error loading todos:', error)
  } finally {
    loading.value = false
  }
}

const addTask = async (text) => {
  const newTask = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date(),
    userId: 1
  }

  try {
    tasks.value.unshift(newTask)
    await todoAPI.create(newTask)
  } catch (error) {
    console.error('Error adding task:', error)
  }
}

const toggleTodo = async (id) => {
  const task = tasks.value.find(t => t.id === id)
  if (!task) return

  try {
    task.completed = !task.completed
    await todoAPI.update(id, { completed: task.completed })
  } catch (error) {
    console.error('Error updating task:', error)
  }
}

const editTodo = async (id, newText) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    task.text = newText
    try {
      await todoAPI.update(id, { text: newText })
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }
}

const deleteTodo = async (id) => {
  if (confirm('Are you sure you want to delete this task?')) {
    tasks.value = tasks.value.filter(t => t.id !== id)
    try {
      await todoAPI.deleteTodo(id)
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }
}

// lifecycle
onMounted(() => {
  loadTodos()
})
</script>

<template>
  <div class="h-screen">
    <div class="h-[10%]">
      <NavBar/>
    </div>

    <div class="h-[90%]">
      <div class="min-h-full bg-gray-50 py-8">
        <div class="container mx-auto max-w-4xl px-4">
          <!-- Header -->
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800">Vue To-Do Manager</h1>
            <p class="text-gray-600 mt-2">Simple task management</p>
          </div>
          
          <!-- Main Card -->
          <div class="bg-white rounded-lg shadow-md">
            <div class="bg-green-900 text-white p-4 rounded-t-sm">
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">All Tasks</h2>
                <span class="text-lg font-semibold">Total: {{ totalTasks }}</span>
              </div>
            </div>
            
            <!-- Content -->
            <div class="p-6">
              <TodoInput @add-task="addTask" />
              <FilterButtons 
                :active-filter="filter" 
                @filter-change="filter = $event" 
              />
              <TodosTable 
                :todos="filteredTasks"
                @toggle-todo="toggleTodo"
                @edit-todo="editTodo"
                @delete-todo="deleteTodo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>