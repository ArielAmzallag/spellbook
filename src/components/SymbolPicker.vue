<template>
    <div class="symbol-picker">
      <button @click="previousSymbol" class="nav-button">&#8592;</button>
      <img :src="currentSymbol.path" :alt="currentSymbol.name" class="symbol-image">
      <button @click="nextSymbol" class="nav-button">&#8594;</button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // Define the emits function to communicate the selected symbol back to the parent component.
  const emit = defineEmits(['update:symbol'])
  
  
  // Use a ref to keep track of the current index in the symbol list.
  const currentSymbolIndex = ref(0)
  
  const symbolList = ref([
    { name: 'BloodMage_1', path: new URL('../data/img/BloodMage_1.png', import.meta.url).href },
    { name: 'BloodMage_2', path: new URL('../data/img/BloodMage_2.png', import.meta.url).href },
    { name: 'BloodMage_3', path: new URL('../data/img/BloodMage_3.png', import.meta.url).href },
    { name: 'BloodMage_4', path: new URL('../data/img/BloodMage_4.png', import.meta.url).href },
    { name: 'BloodMage_5', path: new URL('../data/img/BloodMage_5.png', import.meta.url). href },
    { name: 'BloodMage_6', path: new URL('../data/img/BloodMage_6.png', import.meta.url). href },
    { name: 'BloodMage_7', path: new URL('../data/img/BloodMage_7.png', import.meta.url).href },
    { name: 'BloodMage_8', path: new URL('../data/img/BloodMage_8.png', import.meta.url).href },
    { name: 'BloodMage_9', path: new URL('../data/img/BloodMage_9.png', import.meta.url).href },
    { name: 'BloodMage_10', path: new URL('../data/img/BloodMage_10.png', import.meta.url).href },
    { name: 'Druid_1', path: new URL('../data/img/Druid_1.png', import.meta.url).href },
    { name: 'Druid_2', path: new URL('../data/img/Druid_2.png', import.meta.url).href },
    { name: 'Druid_3', path: new URL('../data/img/Druid_3.png', import.meta.url).href },
    { name: 'Druid_4', path: new URL('../data/img/Druid_4.png', import.meta.url).href },
    { name: 'Druid_5', path: new URL('../data/img/Druid_5.png', import.meta.url).href },
    { name: 'Druid_6', path: new URL('../data/img/Druid_6.png', import.meta.url).href },
    { name: 'Druid_7', path: new URL('../data/img/Druid_7.png', import.meta.url).href },
    { name: 'Druid_8', path: new URL('../data/img/Druid_8.png', import.meta.url).href },
    { name: 'Druid_9', path: new URL('../data/img/Druid_9.png', import.meta.url).href },
    { name: 'Druid_10', path: new URL('../data/img/Druid_10.png', import.meta.url).href },
    { name: 'Druid_11', path: new URL('../data/img/Druid_11.png', import.meta.url).href },
    { name: 'Druid_12', path: new URL('../data/img/Druid_12.png', import.meta.url).href },
    { name: 'Druid_13', path: new URL('../data/img/Druid_13.png', import.meta.url).href },
    { name: 'Druid_14', path: new URL('../data/img/Druid_14.png', import.meta.url).href },
    { name: 'Druid_15', path: new URL('../data/img/Druid_15.png', import.meta.url).href },
    { name: 'Druid_16', path: new URL('../data/img/Druid_16.png', import.meta.url).href },
    { name: 'Druid_17', path: new URL('../data/img/Druid_17.png', import.meta.url).href },
    { name: 'Druid_18', path: new URL('../data/img/Druid_18.png', import.meta.url).href },
    { name: 'Druid_19', path: new URL('../data/img/Druid_19.png', import.meta.url).href },
    { name: 'Druid_20', path: new URL('../data/img/Druid_20.png', import.meta.url).href },
    { name: 'Druid_21', path: new URL('../data/img/Druid_21.png', import.meta.url).href },
    { name: 'Druid_22', path: new URL('../data/img/Druid_22.png', import.meta.url).href },
    { name: 'Druid_23', path: new URL('../data/img/Druid_23.png', import.meta.url).href },
    { name: 'Druid_24', path: new URL('../data/img/Druid_24.png', import.meta.url).href },
    { name: 'Druid_25', path: new URL('../data/img/Druid_25.png', import.meta.url).href },
    { name: 'EarthMage_1', path: new URL('../data/img/EarthMage_1.png', import.meta.url).href },
    { name: 'EarthMage_2', path: new URL('../data/img/EarthMage_2.png', import.meta.url).href },
    { name: 'EarthMage_3', path: new URL('../data/img/EarthMage_3.png', import.meta.url).href },
    { name: 'EarthMage_4', path: new URL('../data/img/EarthMage_4.png', import.meta.url).href },
    { name: 'EarthMage_5', path: new URL('../data/img/EarthMage_5.png', import.meta.url).href },
    { name: 'EarthMage_6', path: new URL('../data/img/EarthMage_6.png', import.meta.url).href },
    { name: 'EarthMage_7', path: new URL('../data/img/EarthMage_7.png', import.meta.url).href },
    { name: 'EarthMage_8', path: new URL('../data/img/EarthMage_8.png', import.meta.url).href },
    { name: 'EarthMage_9', path: new URL('../data/img/EarthMage_9.png', import.meta.url).href },
    { name: 'EarthMage_10', path: new URL('../data/img/EarthMage_10.png', import.meta.url).href },
    { name: 'EarthMage_11', path: new URL('../data/img/EarthMage_11.png', import.meta.url).href },
    { name: 'EarthMage_12', path: new URL('../data/img/EarthMage_12.png', import.meta.url).href },
    { name: 'EarthMage_13', path: new URL('../data/img/EarthMage_13.png', import.meta.url).href },
    { name: 'EarthMage_14', path: new URL('../data/img/EarthMage_14.png', import.meta.url).href },
    { name: 'EarthMage_15', path: new URL('../data/img/EarthMage_15.png', import.meta.url).href },
    { name: 'EarthMage_16', path: new URL('../data/img/EarthMage_16.png', import.meta.url).href },
    { name: 'EarthMage_17', path: new URL('../data/img/EarthMage_17.png', import.meta.url).href },
    { name: 'EarthMage_18', path: new URL('../data/img/EarthMage_18.png', import.meta.url).href },
    { name: 'EarthMage_19', path: new URL('../data/img/EarthMage_19.png', import.meta.url).href },
    { name: 'EarthMage_20', path: new URL('../data/img/EarthMage_20.png', import.meta.url).href },
    { name: 'EarthMage_21', path: new URL('../data/img/EarthMage_21.png', import.meta.url).href },
    { name: 'EarthMage_22', path: new URL('../data/img/EarthMage_22.png', import.meta.url).href },
    { name: 'EarthMage_23', path: new URL('../data/img/EarthMage_23.png', import.meta.url).href },
    { name: 'EarthMage_24', path: new URL('../data/img/EarthMage_24.png', import.meta.url).href },
    { name: 'EarthMage_25', path: new URL('../data/img/EarthMage_25.png', import.meta.url).href },
    { name: 'EarthMage_26', path: new URL('../data/img/EarthMage_26.png', import.meta.url).href },
    { name: 'EarthMage_27', path: new URL('../data/img/EarthMage_27.png', import.meta.url).href },
    { name: 'EarthMage_28', path: new URL('../data/img/EarthMage_28.png', import.meta.url).href },
    { name: 'EarthMage_29', path: new URL('../data/img/EarthMage_29.png', import.meta.url).href },
    { name: 'EarthMage_30', path: new URL('../data/img/EarthMage_30.png', import.meta.url).href },
    { name: 'EarthMage_31', path: new URL('../data/img/EarthMage_31.png', import.meta.url).href },
    { name: 'EarthMage_32', path: new URL('../data/img/EarthMage_32.png', import.meta.url).href },
    { name: 'EarthMage_33', path: new URL('../data/img/EarthMage_33.png', import.meta.url).href },
    { name: 'EarthMage_34', path: new URL('../data/img/EarthMage_34.png', import.meta.url).href },
    { name: 'EarthMage_35', path: new URL('../data/img/EarthMage_35.png', import.meta.url).href },
    { name: 'EarthMage_36', path: new URL('../data/img/EarthMage_36.png', import.meta.url).href },
    { name: 'EarthMage_37', path: new URL('../data/img/EarthMage_37.png', import.meta.url).href },
    { name: 'EarthMage_38', path: new URL('../data/img/EarthMage_38.png', import.meta.url).href },
    { name: 'EarthMage_39', path: new URL('../data/img/EarthMage_39.png', import.meta.url).href },
    { name: 'EarthMage_40', path: new URL('../data/img/EarthMage_40.png', import.meta.url).href },
    { name: 'FireMage_1', path: new URL('../data/img/FireMage_1.png', import.meta.url).href },
    { name: 'FireMage_2', path: new URL('../data/img/FireMage_2.png', import.meta.url).href },
    { name: 'FireMage_3', path: new URL('../data/img/FireMage_3.png', import.meta.url).href },
    { name: 'FireMage_4', path: new URL('../data/img/FireMage_4.png', import.meta.url).href },
    { name: 'FireMage_5', path: new URL('../data/img/FireMage_5.png', import.meta.url).href },
    { name: 'FireMage_6', path: new URL('../data/img/FireMage_6.png', import.meta.url).href },
    { name: 'FireMage_7', path: new URL('../data/img/FireMage_7.png', import.meta.url).href },
    { name: 'FireMage_8', path: new URL('../data/img/FireMage_8.png', import.meta.url).href },
    { name: 'FireMage_9', path: new URL('../data/img/FireMage_9.png', import.meta.url).href },
    { name: 'FireMage_10', path: new URL('../data/img/FireMage_10.png', import.meta.url).href },
    { name: 'FireMage_11', path: new URL('../data/img/FireMage_11.png', import.meta.url).href },
    { name: 'FireMage_12', path: new URL('../data/img/FireMage_12.png', import.meta.url).href },
    { name: 'FireMage_13', path: new URL('../data/img/FireMage_13.png', import.meta.url).href },
    { name: 'FireMage_14', path: new URL('../data/img/FireMage_14.png', import.meta.url).href },
    { name: 'FireMage_15', path: new URL('../data/img/FireMage_15.png', import.meta.url).href },
    { name: 'FireMage_16', path: new URL('../data/img/FireMage_16.png', import.meta.url).href },
    { name: 'FireMage_17', path: new URL('../data/img/FireMage_17.png', import.meta.url).href },
    { name: 'FireMage_18', path: new URL('../data/img/FireMage_18.png', import.meta.url).href },
    { name: 'FireMage_19', path: new URL('../data/img/FireMage_19.png', import.meta.url).href },
    { name: 'FireMage_20', path: new URL('../data/img/FireMage_20.png', import.meta.url).href },
    { name: 'FireMage_21', path: new URL('../data/img/FireMage_21.png', import.meta.url).href },
    { name: 'FireMage_22', path: new URL('../data/img/FireMage_22.png', import.meta.url).href },
    { name: 'FireMage_23', path: new URL('../data/img/FireMage_23.png', import.meta.url).href },
    { name: 'FireMage_24', path: new URL('../data/img/FireMage_24.png', import.meta.url).href },
    { name: 'FireMage_25', path: new URL('../data/img/FireMage_25.png', import.meta.url).href },
    { name: 'FireMage_26', path: new URL('../data/img/FireMage_26.png', import.meta.url).href },
    { name: 'FireMage_27', path: new URL('../data/img/FireMage_27.png', import.meta.url).href },
    { name: 'FireMage_28', path: new URL('../data/img/FireMage_28.png', import.meta.url).href },
    { name: 'FireMage_29', path: new URL('../data/img/FireMage_29.png', import.meta.url).href },
    { name: 'FireMage_30', path: new URL('../data/img/FireMage_30.png', import.meta.url).href },
    { name: 'FireMage_31', path: new URL('../data/img/FireMage_31.png', import.meta.url).href },
    { name: 'FireMage_32', path: new URL('../data/img/FireMage_32.png', import.meta.url).href },
    { name: 'FireMage_33', path: new URL('../data/img/FireMage_33.png', import.meta.url).href },
    { name: 'FireMage_34', path: new URL('../data/img/FireMage_34.png', import.meta.url).href },
    { name: 'FireMage_35', path: new URL('../data/img/FireMage_35.png', import.meta.url).href },
    { name: 'FireMage_36', path: new URL('../data/img/FireMage_36.png', import.meta.url).href },
    { name: 'FireMage_37', path: new URL('../data/img/FireMage_37.png', import.meta.url).href },
    { name: 'FireMage_38', path: new URL('../data/img/FireMage_38.png', import.meta.url).href },
    { name: 'FireMage_39', path: new URL('../data/img/FireMage_39.png', import.meta.url).href },
    { name: 'FireMage_40', path: new URL('../data/img/FireMage_40.png', import.meta.url).href },
    { name: 'FrostMage_1', path: new URL('../data/img/FrostMage_1.png', import.meta.url).href },
    { name: 'FrostMage_2', path: new URL('../data/img/FrostMage_2.png', import.meta.url).href },
    { name: 'FrostMage_3', path: new URL('../data/img/FrostMage_3.png', import.meta.url).href },
    { name: 'FrostMage_4', path: new URL('../data/img/FrostMage_4.png', import.meta.url).href },
    { name: 'FrostMage_5', path: new URL('../data/img/FrostMage_5.png', import.meta.url).href },
    { name: 'FrostMage_6', path: new URL('../data/img/FrostMage_6.png', import.meta.url).href },
    { name: 'FrostMage_7', path: new URL('../data/img/FrostMage_7.png', import.meta.url).href },
    { name: 'FrostMage_8', path: new URL('../data/img/FrostMage_8.png', import.meta.url).href },
    { name: 'FrostMage_9', path: new URL('../data/img/FrostMage_9.png', import.meta.url).href },
    { name: 'FrostMage_10', path: new URL('../data/img/FrostMage_10.png', import.meta.url).href },
    { name: 'FrostMage_11', path: new URL('../data/img/FrostMage_11.png', import.meta.url).href },
    { name: 'FrostMage_12', path: new URL('../data/img/FrostMage_12.png', import.meta.url).href },
    { name: 'FrostMage_13', path: new URL('../data/img/FrostMage_13.png', import.meta.url).href },
    { name: 'FrostMage_14', path: new URL('../data/img/FrostMage_14.png', import.meta.url).href },
    { name: 'FrostMage_15', path: new URL('../data/img/FrostMage_15.png', import.meta.url).href },
    { name: 'FrostMage_16', path: new URL('../data/img/FrostMage_16.png', import.meta.url).href },
    { name: 'FrostMage_17', path: new URL('../data/img/FrostMage_17.png', import.meta.url).href },
    { name: 'FrostMage_18', path: new URL('../data/img/FrostMage_18.png', import.meta.url).href },
    { name: 'FrostMage_19', path: new URL('../data/img/FrostMage_19.png', import.meta.url).href },
    { name: 'FrostMage_20', path: new URL('../data/img/FrostMage_20.png', import.meta.url).href },
    { name: 'FrostMage_21', path: new URL('../data/img/FrostMage_21.png', import.meta.url).href },
    { name: 'FrostMage_22', path: new URL('../data/img/FrostMage_22.png', import.meta.url).href },
    { name: 'FrostMage_23', path: new URL('../data/img/FrostMage_23.png', import.meta.url).href },
    { name: 'FrostMage_24', path: new URL('../data/img/FrostMage_24.png', import.meta.url).href },
    { name: 'FrostMage_25', path: new URL('../data/img/FrostMage_25.png', import.meta.url).href },
    { name: 'Necromancer_1', path: new URL('../data/img/Necromancer_1.png', import.meta.url).href },
    { name: 'Necromancer_2', path: new URL('../data/img/Necromancer_2.png', import.meta.url).href },
    { name: 'Necromancer_3', path: new URL('../data/img/Necromancer_3.png', import.meta.url).href },
    { name: 'Necromancer_4', path: new URL('../data/img/Necromancer_4.png', import.meta.url).href },
    { name: 'Necromancer_5', path: new URL('../data/img/Necromancer_5.png', import.meta.url).href },
    { name: 'Necromancer_6', path: new URL('../data/img/Necromancer_6.png', import.meta.url).href },
    { name: 'Necromancer_7', path: new URL('../data/img/Necromancer_7.png', import.meta.url).href },
    { name: 'Necromancer_8', path: new URL('../data/img/Necromancer_8.png', import.meta.url).href },
    { name: 'Necromancer_9', path: new URL('../data/img/Necromancer_9.png', import.meta.url).href },
    { name: 'Necromancer_10', path: new URL('../data/img/Necromancer_10.png', import.meta.url).href },
    { name: 'Necromancer_11', path: new URL('../data/img/Necromancer_11.png', import.meta.url).href },
    { name: 'Necromancer_12', path: new URL('../data/img/Necromancer_12.png', import.meta.url).href },
    { name: 'Necromancer_13', path: new URL('../data/img/Necromancer_13.png', import.meta.url).href },
    { name: 'Necromancer_14', path: new URL('../data/img/Necromancer_14.png', import.meta.url).href },
    { name: 'Necromancer_15', path: new URL('../data/img/Necromancer_15.png', import.meta.url).href },
    { name: 'Necromancer_16', path: new URL('../data/img/Necromancer_16.png', import.meta.url).href },
    { name: 'Necromancer_17', path: new URL('../data/img/Necromancer_17.png', import.meta.url).href },
    { name: 'Necromancer_18', path: new URL('../data/img/Necromancer_18.png', import.meta.url).href },
    { name: 'Necromancer_19', path: new URL('../data/img/Necromancer_19.png', import.meta.url).href },
    { name: 'Necromancer_20', path: new URL('../data/img/Necromancer_20.png', import.meta.url).href },
    { name: 'Necromancer_21', path: new URL('../data/img/Necromancer_21.png', import.meta.url).href },
    { name: 'Necromancer_22', path: new URL('../data/img/Necromancer_22.png', import.meta.url).href },
    { name: 'Necromancer_23', path: new URL('../data/img/Necromancer_23.png', import.meta.url).href },
    { name: 'Necromancer_24', path: new URL('../data/img/Necromancer_24.png', import.meta.url).href },
    { name: 'Necromancer_25', path: new URL('../data/img/Necromancer_25.png', import.meta.url).href },
])

  
// Computed property to get the current symbol.
const currentSymbol = computed(() => symbolList.value[currentSymbolIndex.value])

function updateSymbol() {
  emit('update:symbol', currentSymbol.value.path)
}

// Function to transform the symbol path
const transformSymbolPath = (fullPath) => {
  // Extract the relative path from the full URL
  const relativePath = fullPath.split('/').slice(-3).join('/');
  return `../${relativePath}`;
};


// Function to go to the next symbol.
function nextSymbol() {
  if (symbolList.value.length > 0) {
    currentSymbolIndex.value = (currentSymbolIndex.value + 1) % symbolList.value.length
    emit('update:symbol', currentSymbol.value.path);
  }
}

// Function to go to the previous symbol.
function previousSymbol() {
  if (symbolList.value.length > 0) {
    currentSymbolIndex.value = (currentSymbolIndex.value - 1 + symbolList.value.length) % symbolList.value.length
    emit('update:symbol', currentSymbol.value.path);
  }
}

// Emit the initial symbol when the component is mounted
updateSymbol();
</script>

<style scoped>
.symbol-picker {
  display: flex;
  align-items: center;
}

.nav-button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.5em;
}

.symbol-image {
  width: 100px; /* Adjust size as needed */
  height: 100px; /* Adjust size as needed */
}
</style>
  