<template>
    <div v-if="activeSpell" class="spell-effect" :class="activeSpell + '-effect'">
      <h3>{{ spellEffects[activeSpell]?.title }}</h3>
      <p>{{ spellEffects[activeSpell]?.description }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineProps } from 'vue'
  
  const props = defineProps({
    spell: String
  })
  
  const activeSpell = ref('')
  
  const spellEffects = {
    fire: { title: 'Flames of Fury', description: 'The room is engulfed in warm flames!' },
    ice: { title: 'Frostbite', description: 'A chill spreads, frosting over surfaces.' },
    lightning: { title: 'Thunder Strike', description: 'Sparks fly, lighting up the surroundings.' },
    wind: { title: 'Gale Force', description: 'A strong wind whirls around, rustling everything.' }
  }
  
  watch(() => props.spell, (newSpell) => {
    activeSpell.value = newSpell
  })
  </script>
  
  <!-- ... existing style ... -->
  <style scoped>
  .spell-effect {
    margin-top: 20px;
    padding: 20px;
    border-radius: 12px;
    border: 2px solid #d3c2ce;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    animation: fadeIn 0.5s ease;
    background-color: var(--background-light);
    color: var(--text-dark);
    margin: 1rem auto; /* Add margin to the top and bottom */
    padding: 2rem; /* Increase padding */
    max-width: 768px; /* Consistent with the main content width */
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .spell-effect h3 {
    color: #5a4870;
    font-size: 1.8em;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .spell-effect p {
    color: #3a2c41;
    font-size: 1.2em;
    line-height: 1.5;
  }
  
  .fire-effect {
    background: linear-gradient(to right top, #ff7a7a, #ffbbbb);
  }
  
  .ice-effect {
    background: linear-gradient(to right top, #7abaff, #bbefff);
  }
  
  .lightning-effect {
    background: linear-gradient(to right top, #ffff7a, #ffffbb);
  }
  
  .wind-effect {
    background: linear-gradient(to right top, #7aff7a, #bbffbb);
  }
  </style>
  