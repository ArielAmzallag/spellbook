<template>
  <MainLayout layout>
  <div class="spellbook-container">
    <div class="spellbook-header">
      <h1 class="spellbook-title">Arcane Spellbook</h1>
      <div class="spellbook-controls">
        <input type="text" placeholder="Search spells..." v-model="searchQuery" @input="updateSearch" />
        <select v-model="selectedCategory" @change="updateCategory">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
    </div>
    <div class="spellbook-body">
      <SpellList @selectSpell="selectSpell" />
      <SpellDetail :spell="selectedSpell" />
    </div>
  </div>
</MainLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import SpellList from './SpellList.vue'
import SpellDetail from './SpellDetail.vue'
import MainLayout from './MainLayout.vue'




const router = useRouter()
const selectedSpell = ref(null)

const categories = ['Elemental', 'Healing', 'Necromancy', 'Illusion', 'Conjuration', 'Abjuration', 'Transmutation', 'Enchantment']
const searchQuery = ref('')
const selectedCategory = ref('')

const selectSpell = (spell) => {
  selectedSpell.value = spell
}

const updateSearch = () => {
  router.push({ path: `/spellbook/${selectedCategory.value}`, query: { search: searchQuery.value } })
}

const updateCategory = () => {
  router.push({ path: `/spellbook/${selectedCategory.value}`, query: { search: searchQuery.value } })
}
</script>


<style scoped>
.spellbook-container {
  display: flex;
  flex-wrap: wrap; /* Prevent wrapping to ensure side-by-side layout */
  align-items: flex-start; /* Align to the top */
  gap: 20px; /* Add space between list and details */
  padding: 20px;
  background-color: #fdf6ee;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  max-width: 1280px; /* Or any other max width you prefer */
  margin: auto; /* Center the container */
}


.spellbook-title {
  font-size: 2.2em;
  color: #4c3a51;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
  color: var(--accent-color);
}

.spellbook-header {
  /* Style for the header, ensuring it's full width */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1em; /* Add some space below the header */
}

.spellbook-controls {
  /* Styling for the search and category filter bar */
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 100%;
  max-width: 1280px; /* Match the width of the list and detail sections */
}

.spellbook-controls input, .spellbook-controls select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.spellbook-body {
  /* This will house both the list and detail components */
  display: flex;
  flex-direction: row;
  width: 100%;
}
</style>

  
  