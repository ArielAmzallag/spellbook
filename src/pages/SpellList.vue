<template>
    <MainLayout>
      <div class="public-spellbook">
        <h2>Public Spellbook</h2>
        <div class="spell-list">
          <div 
            v-for="spell in publicSpells" 
            :key="spell.id" 
            class="spell-card"
          >
            <div class="spell-details">
              <h3>{{ spell.name }}</h3>
              <p class="spell-school"><strong>School of Magic:</strong> {{ spell.schoolOfMagic }}</p>
              <p class="spell-creator">Created by: {{ spell.creatorName }}</p>
              <p class="spell-description">{{ spell.description }}</p>
            </div>
            <div v-if="spell.spellLogoUrl" class="spell-image-container">
              <img :src="spell.spellLogoUrl" alt="Spell Logo" class="spell-logo">
            </div>
                      <div v-else class="no-spells-message">
            <p>No public spells found.</p>
          </div>
          </div>

        </div>
      </div>
    </MainLayout>
  </template>
  

<script setup>
import MainLayout from "../layout/MainLayout.vue";
import { ref, onMounted } from 'vue';
import { getFirestore, collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';

const db = getFirestore();

const publicSpells = ref([]);

const fetchCreatorName = async (creatorId) => {
  if (!creatorId) {
    return "Unknown";
  }

  try {
    const userRef = doc(db, "users", creatorId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data().username : "Unknown";
  } catch (error) {
    console.error("Error fetching user name:", error);
    return "Unknown";
  }
};

onMounted(async () => {
  const q = query(collection(db, 'spells'), where('isPublic', '==', true));
  onSnapshot(q, async (querySnapshot) => {
    const spellsPromises = querySnapshot.docs.map(async (doc) => {
      const spellData = doc.data();
      const creatorName = await fetchCreatorName(spellData.creatorId);
      return { id: doc.id, creatorName, ...spellData };
    });

    // Await all promises and then set publicSpells
    publicSpells.value = await Promise.all(spellsPromises);
  });
});


onMounted(async () => {
  const q = query(collection(db, 'spells'), where('isPublic', '==', true));
  onSnapshot(q, async (querySnapshot) => {
    const spellsWithCreators = [];
    for (const spellDoc of querySnapshot.docs) {
      const spellData = spellDoc.data();
      const creatorName = await fetchCreatorName(spellData.creatorId);
      spellsWithCreators.push({
        id: spellDoc.id,
        creatorName,
        ...spellData
      });
    }
    publicSpells.value = spellsWithCreators;
  });
});
</script>

  
  
  <style lang="scss" scoped>
  .public-spellbook {
    h2 {
      color: var(--accent-color);
      text-align: center;
      margin-bottom: 2rem;
    }
  
    .spell-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
  
    .spell-card {
      background-color: var(--secondary-color);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
      .spell-details {
        padding: 1rem;
  
        h3 {
          color: var(--primary-color);
        }
  
        .spell-school, .spell-creator, .spell-description {
          color: var(--text-color);
          margin-top: 0.5rem;
        }
      }
  
      .spell-image-container {
        .spell-logo {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }
    }
  
    .no-spells-message {
      text-align: center;
      font-size: 1.5rem;
      color: var(--text-color);
    }
  }
  </style>
  
  
  