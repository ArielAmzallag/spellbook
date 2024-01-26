<template>
    <MainLayout>
      <div class="create-spell-container">
        <h1>Create Your Spell</h1>
        <div class="spell-creation-layout">
          <div class="symbol-display">
            <!-- Listen for the update:symbol event -->
            <SymbolPicker v-on:update:symbol="handleSymbolUpdate" />
          </div>
          <div class="spell-form">
            <div class="form-group">
              <label for="spell-name">Spell Name</label>
              <input type="text" id="spell-name" v-model="newSpell.name" placeholder="Enter spell name" required />
            </div>
            <div class="form-group">
              <label for="spell-description">Spell Description</label>
              <textarea id="spell-description" v-model="newSpell.description" placeholder="Describe the spell" required></textarea>
            </div>
            <div class="form-group">
              <label for="spell-category">Category</label>
              <select id="spell-category" v-model="newSpell.category" required>
                <option value="">Select a category</option>
                <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
              </select>
            </div>
            <button type="button" @click="addNewSpell">Create Spell</button>
          </div>
        </div>
      </div>
    </MainLayout>
  </template>
  
    
    <script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import MainLayout from './MainLayout.vue';
    import SymbolPicker from './SymbolPicker.vue';
    
    const categories = ['Elemental', 'Healing', 'Necromancy', 'Illusion', 'Conjuration', 'Abjuration', 'Transmutation', 'Enchantment'];
    const newSpell = ref({
      name: '',
      description: '',
      category: '',
      symbol: ''
    });
    
    

    const handleSymbolUpdate = (fullUrl) => {
        if (typeof fullUrl === 'string') {
            // Extract the relative path from the full URL
            const relativePath = fullUrl.split('/').slice(-3).join('/');
            newSpell.value.symbol = `../${relativePath}`;
        } else {
            console.error('Expected symbol path to be a string, received:', fullUrl);
        }
    };

    
    const addNewSpell = async () => {
      try {
        // Post the new spell data to the server
        await axios.post('http://localhost:3000/spells', newSpell.value);
    
        // Log the added spell to the console (for debugging purposes)
        console.log('Added new spell:', newSpell.value);
    
        // Reset the form fields after submission
        newSpell.value = {
          name: '',
          description: '',
          category: '',
          symbol: ''
        };
      } catch (error) {
        console.error('Error adding new spell:', error);
      }
    };
    </script>
    
    
  
  
  
  <style scoped>
  .create-spell-container {
    max-width: 800px;
    margin: auto;
    padding: 2rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .create-spell-container h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .spell-creation-layout {
    display: flex;
    justify-content: space-between;
  }
  
  .symbol-display {
    flex-basis: 30%;
  }
  
  .spell-form {
    flex-basis: 70%;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: .5rem;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: .5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .form-group button {
    padding: .5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #5a4870;
    cursor: pointer;
  }
  
  .form-group button:hover {
    background-color: #4c3a51;
  }
  </style>
  