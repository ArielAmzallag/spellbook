<template>
    <MainLayout>
      <div class="spellbook-container">
        <h2 class="spellbook-title">My Spellbook</h2>
        <div class="content-container">
          <div class="spell-list-container">
            <div 
              v-for="(spells, school) in organizedSpells" 
              :key="school" 
              class="school-section"
            >
              <h3 class="school-name" @click="toggleSchool(school)">
                {{ school }} ({{ spells.length }})
              </h3>
              <ul v-show="activeSchool === school" class="spell-list">
                <li 
                  v-for="spell in spells" 
                  :key="spell.id" 
                  @click="selectSpell(spell)"
                  class="spell-name"
                >
                  {{ spell.name }}
                </li>
              </ul>
            </div>
          </div>
          <div class="spell-details-container" v-if="selectedSpell">
            <div class="spell-card">
              <h3>{{ selectedSpell.name }}</h3>
              <p><strong>School of Magic:</strong> {{ selectedSpell.schoolOfMagic }}</p>
              <p>{{ selectedSpell.description }}</p>
              <p>This spell is <strong>{{ selectedSpell.isPublic ? 'Public' : 'Private' }}</strong>.</p>
              <img v-if="selectedSpell.spellLogoUrl" :src="selectedSpell.spellLogoUrl" alt="Spell Logo" class="spell-logo">
              <button @click="deleteSpell(selectedSpell.id)" class="delete-spell-button">Delete Spell</button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  </template>
  
  
  <script setup>
import MainLayout from '../layout/MainLayout.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { getFirestore, collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

const spells = ref([]);


let unsubscribe;
onAuthStateChanged(auth, user => {
  if (user) {
    const q = query(collection(db, 'spells'), where('wizardId', '==', user.uid));
    unsubscribe = onSnapshot(q, (querySnapshot) => {
      spells.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    }, error => {
      console.error("Error fetching spells: ", error);
    });
  } else {
    spells.value = []; 
  }
});

const organizedSpells = computed(() => {
  const bySchool = {};
  spells.value.forEach(spell => {
    if (!bySchool[spell.schoolOfMagic]) {
      bySchool[spell.schoolOfMagic] = [];
    }
    bySchool[spell.schoolOfMagic].push(spell);
  });
  return bySchool;
});
const activeSchool = ref(null);
const selectedSpell = ref(null);

const toggleSchool = (school) => {
  activeSchool.value = activeSchool.value === school ? null : school;
  selectedSpell.value = null;
};

const selectSpell = (spell) => {
  selectedSpell.value = spell;
};

const deselectSpell = () => {
  selectedSpell.value = null;
};

const deleteSpell = async (spellId) => {
  try {
    await deleteDoc(doc(db, 'spells', spellId));
    alert('Spell deleted successfully');
    

    // Update this line to use 'spells' instead of 'publicSpells'
    spells.value = spells.value.filter(spell => spell.id !== spellId);
    location.reload()
  } catch (error) {
    console.error("Error deleting spell:", error);
    alert(`There was an error: ${error.message}`);
  }
};



onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});
  </script>
  
  <style lang="scss" scoped>
  .spellbook-container {
    background: var(--background-color);
    color: var(--text-color);
    font-family: 'Cinzel', serif;
    padding: 2rem;
    max-width: 1000px;
    margin: 40px auto;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.7);
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 2rem;
  
    .spellbook-title {
      text-align: center;
      font-size: 3rem;
      color: var(--accent-color);
      grid-column: 1 / -1;
      margin-bottom: 2rem;
    }
  
    .content-container {
      display: contents;

      .spell-list-container {
        border-right: 2px solid var(--border-color);
        padding-right: 1rem;
  
        .school-section {
          margin-bottom: 1rem;
  
          .school-name {
            cursor: pointer;
            font-size: 1.5rem;
            &:hover {
              color: var(--primary-hover);
            }
          }
  
          .spell-list {
            list-style-type: none;
            padding: 0;
  
            .spell-name {
              cursor: pointer;
              margin: 0.5rem 0;
              &:hover {
                color: var(--primary-hover);
                text-decoration: underline;
              }
            }
          }
        }
      }
  
      .spell-details-container {
        padding-left: 1rem;
  
        .spell-card {
          background: var(--secondary-color);
          border-radius: 8px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
          padding: 1rem;
  
          .spell-name {
            font-size: 2rem;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
          }
  
          .spell-school,
          .spell-description,
          .spell-visibility {
            font-size: 1rem;
            line-height: 1.5;
            margin: 0.5rem 0;
          }
  
          .spell-logo {
            max-width: 100%;
            max-height: 200px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            margin-top: 1rem;
          }
        }
      }
    }
  
    .no-spells {
      text-align: center;
      font-size: 1.5rem;
      color: var(--text-color);
      grid-column: 1 / -1;
    }
  }
  
  </style>
  