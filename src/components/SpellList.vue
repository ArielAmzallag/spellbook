<template>
  <div class="spell-list">
    <h2>Spells</h2>
    <div v-for="(categorySpells, category) in filteredSpells" :key="category">
      <h3>{{ category }}</h3>
      <ul>
        <li v-for="spell in categorySpells" :key="spell.name" @click="selectSpell(spell)">
          {{ spell.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import allSpells from '../data/spells.json'


const emit = defineEmits(['selectSpell'])
const route = useRoute()

const filteredSpells = computed(() => {
  let spells = allSpells

  const searchQuery = route.query.search?.toLowerCase()
  const categoryFilter = route.params.category

  if (searchQuery) {
    spells = spells.filter(spell => spell.name.toLowerCase().includes(searchQuery))
  }

  if (categoryFilter) {
    spells = spells.filter(spell => spell.category === categoryFilter)
  }

  return spells.reduce((acc, spell) => {
    if (!acc[spell.category]) acc[spell.category] = []
    acc[spell.category].push(spell)
    return acc
  }, {})
})

const selectSpell = (spell) => {
  emit('selectSpell', spell)
}
</script>


<style scoped>
.spell-list {
  /* Adjustments for the spell list, as previously suggested */
  flex: 0 0 25%;
  max-height: 600px;
  overflow-y: auto;
  padding: 10px;
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
  color: #4c3a51;
  max-height: 400px;
  overflow-y: auto;
  background-color: var(--background-light);
  color: var(--text-dark);
  margin: 1rem auto; /* Add margin to the top and bottom */
  padding: 2rem; /* Increase padding */
  max-width: 768px; /* Consistent with the main content width */
}

/* Scrollbar styles */
.spell-list::-webkit-scrollbar {
  width: 8px;
}

.spell-list::-webkit-scrollbar-track {
  background: #f1e8e6;
  border-radius: 4px;
}

.spell-list::-webkit-scrollbar-thumb {
  background-color: #b396ac;
  border-radius: 4px;
  border: 2px solid #f1e8e6;
}

.spell-list::-webkit-scrollbar-thumb:hover {
  background-color: #9e7a8b;
}


.spell-categories {
  margin-bottom: 20px;
}

.spell-list h2 {
  color: #4c3a51;
  margin-bottom: 10px;
}

.spell-list h3 {
  color: #7a5c83;
  margin-top: 15px;
}

.spell-list ul {
  list-style: none;
  padding: 0;
}

.spell-list li {
  cursor: pointer;
  padding: 5px 10px;
  transition: background-color 0.3s;
}

.spell-list li:hover {
  background-color: #e0d4e5;
}
</style>
