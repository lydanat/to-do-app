<script setup>
import { Button } from '@/components/ui/button'

defineProps({
  activeFilter: {
    type: String,
    default: 'all'
  }
})

defineEmits(['filter-change'])

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' }
]
</script>

<template>
  <div class="flex gap-2 mb-4">
    <Button
      v-for="option in filterOptions"
      :key="option.value"
      @click="$emit('filter-change', option.value)"
      :variant="activeFilter === option.value ? 'default' : 'outline'"
      size="sm"
    >
      {{ option.label }}
    </Button>
  </div>
</template>

