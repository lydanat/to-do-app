<script setup>
import { ref } from 'vue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const props = defineProps({
  todos: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['toggle-todo', 'edit-todo', 'delete-todo'])

// Edit dialog state
const showEditDialog = ref(false)
const editingTodo = ref(null)
const editText = ref('')

const startEdit = (todo) => {
  editingTodo.value = todo
  editText.value = todo.text
  showEditDialog.value = true
}

const saveEdit = () => {
  if (editText.value.trim() && editingTodo.value) {
    emit('edit-todo', editingTodo.value.id, editText.value.trim())
  }
  cancelEdit()
}

const cancelEdit = () => {
  showEditDialog.value = false
  editingTodo.value = null
  editText.value = ''
}
</script>

<template>
  <div class="border rounded-lg overflow-hidden">
    <Table>
      <TableHeader class="bg-gray-50">
        <TableRow>
          <TableHead class="w-12">Status</TableHead>
          <TableHead>Task</TableHead>
          <TableHead class="w-32">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow 
          v-for="todo in todos" 
          :key="todo.id"
          class="border-b"
        >
          <TableCell>
            <Checkbox
              :checked="todo.completed"
              @click="$emit('toggle-todo', todo.id)"
            />
          </TableCell>
          <TableCell>
            <span 
              :class="{
                'line-through text-gray-400': todo.completed
              }"
            >
              {{ todo.text }}
            </span>
          </TableCell>
          <TableCell>
            <div class="flex gap-2">
              <Button
                @click="startEdit(todo)"
                variant="outline"
                size="sm"
                :disabled="todo.completed"
              >
                Edit
              </Button>
              <Button
                @click="$emit('delete-todo', todo.id)"
                variant="destructive"
                size="sm"
              >
                Delete
              </Button>
            </div>
          </TableCell>
        </TableRow>
        
        <!-- Empty state -->
        <TableRow v-if="todos.length === 0">
          <TableCell colspan="3" class="text-center py-8 text-gray-500">
            No tasks yet. Add your first task above! 👆
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>

  <!-- Edit -->
  <Dialog v-model:open="showEditDialog">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
      </DialogHeader>
      <div class="py-4">
        <Input
          v-model="editText"
          placeholder="Edit your task..."
          @keypress.enter="saveEdit"
          ref="editInput"
        />
      </div>
      <DialogFooter>
        <Button variant="outline" @click="cancelEdit">Cancel</Button>
        <Button @click="saveEdit">Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>