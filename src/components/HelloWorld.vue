<template>
  <MainLayout>
    <div class="fantasy-world">
      <h1>Welcome to the World of Magic !</h1>
      <MagicButton @cast="handleSpellCast"></MagicButton>
      <SpellDisplay :spell="currentSpell"></SpellDisplay>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from './MainLayout.vue'
import MagicButton from './MagicButton.vue'
import SpellDisplay from './SpellDisplay.vue'
import { ref } from 'vue'

const currentSpell = ref('')

const handleSpellCast = (spellType) => {
  currentSpell.value = spellType
}
</script>

<style scoped>
.fantasy-world {
  border: 3px solid #d3c2ce;
  padding: 30px;
  border-radius: 15px;
  color: #3a2c41;
  text-align: center;
  background-color: var(--background-light);
  color: var(--text-dark);
  margin: 2rem auto; /* Add margin to the top and bottom */
  padding: 3rem; /* Increase padding for more breathing room */
  max-width: 768px; /* Limit the max width for better readability */
  width: 100%; /* Use full width within the constraints */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); /* Enhance the shadow for depth */
}

h1 {
  color: #5a4870;
  font-size: 2.5em;
  margin-bottom: 20px;
  text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
}
</style>

