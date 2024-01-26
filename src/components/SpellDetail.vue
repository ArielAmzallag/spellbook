<template>
  <div v-if="spell" class="spell-detail">
    <img :src="imagePath" alt="Symbol" class="spell-symbol" />
    <h2>{{ spell.name }}</h2>
    <p>{{ spell.description }}</p>
  </div>
  <div v-else class="spell-detail">
    <p>Select a spell to see its details.</p>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  spell: Object
})

// Compute the full path for the image based on the spell's symbol path.
const imagePath = computed(() => {
  // Ensure that the spell object and symbol property are defined.
  if (props.spell && props.spell.symbol) {
    // Adjust the path as necessary based on your project structure.
    return new URL(`../${props.spell.symbol}`, import.meta.url).href
  }
  return ''
})
</script>
  
  <style scoped>
  .spell-detail {
    flex: 0 0 70%; /* Do not grow, do not shrink, start at 70% width */
    padding: 10px;
    border-radius: 10px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: var(--background-light);
    color: var(--text-dark);
    margin: 1rem auto; /* Add margin to the top and bottom */
    padding: 2rem; /* Increase padding */
    max-width: 768px; /* Consistent with the main content width */
  }
  
  .spell-detail .spell-symbol {
  width: 100px; /* or any size you prefer */
  height: 100px; /* or any size you prefer */
  margin-bottom: 1rem;
}
  .spell-detail h2 {
    color: #3a2c41;
    margin-bottom: 10px;
  }
  
  .spell-detail p {
    color: #333;
    line-height: 1.6;
  }
  </style>
  