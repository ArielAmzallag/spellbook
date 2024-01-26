<template>
    <div class="magic-controls">
      <button v-for="spell in spells" :key="spell.type" class="magic-button" @click="castSpell(spell.type)">
        {{ spell.label }}
      </button>
    </div>
  </template>
  
  <script setup>
  import { defineEmits } from 'vue'
  
  const emit = defineEmits(['cast'])
  
  const spells = [
    { type: 'fire', label: '🔥 Cast Fire' },
    { type: 'ice', label: '❄️ Cast Ice' },
    { type: 'lightning', label: '⚡ Cast Lightning' },
    { type: 'wind', label: '💨 Cast Wind' }
  ]
  
  const castSpell = (spellType) => {
    emit('cast', spellType)
  }
  </script>
  
  <style scoped>
  .magic-controls {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }
  
  .magic-button {
    color: #f0e6f6;
    border: 2px solid #d3c2ce;
    padding: 10px 15px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    box-shadow: 0 4px #392842;
    transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
    background-color: var(--secondary-color);
    color: var(--text-light);
  }
  
  .magic-button:hover {
    background-color: #5a4870;
    transform: translateY(-2px);
    box-shadow: 0 6px #392842;
  }
  
  .magic-button:active {
    background-color: #392842;
    box-shadow: none;
    position: relative;
    top: 4px;
  }
  </style>
  
  