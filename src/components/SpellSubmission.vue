<template>
    <div class="spell-submission">
      <h2>Submit a New Spell</h2>
      <form @submit.prevent="submitSpell">
        <input v-model="newSpell.name" placeholder="Spell Name" required />
        <input v-model="newSpell.description" placeholder="Description" required />
        <select v-model="newSpell.category" required>
          <option value="" disabled>Select a Category</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const newSpell = ref({
    name: '',
    description: '',
    category: ''
  });
  
  const categories = ['Elemental', 'Healing', 'Necromancy', 'Illusion', 'Conjuration', 'Abjuration', 'Transmutation', 'Enchantment'];
  
  const submitSpell = async () => {
    try {
      await axios.post('http://localhost:3000/spells', newSpell.value);
      alert('Spell submitted successfully!');
      // Reset form
      newSpell.value = { name: '', description: '', category: '' };
    } catch (error) {
      console.error('There was an error submitting the spell:', error);
      alert('Failed to submit the spell.');
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  