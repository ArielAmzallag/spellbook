<template>
  <main class="home__main">
    <MainLayout>
      <h1>Spellbook of Infinite Nothing</h1>
      <section class="introduction">
        <p>Welcome to the mystical and arcane Spellbook of Infinite Nothing. Explore the depths of unknown magic, uncover hidden spells, and embark on a journey through the endless void.</p>
      </section>
      <section class="featured-spells">
        <h2>Featured Spells</h2>
        <div class="spells-list">
          <div class="spell" v-for="spell in featuredSpells" :key="spell.id">
            <h3>{{ spell.name }}</h3>
            <p>{{ spell.description }}</p>
          </div>
        </div>
      </section>
    </MainLayout>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import MainLayout from '../layout/MainLayout.vue';

const db = getFirestore();
const featuredSpells = ref([]);

const fetchRandomPublicSpells = async () => {
  // Fetch all public spells
  const q = query(collection(db, 'spells'), where('isPublic', '==', true));
  const querySnapshot = await getDocs(q);
  const allPublicSpells = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  // Shuffle array and pick 3 random spells
  for (let i = allPublicSpells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allPublicSpells[i], allPublicSpells[j]] = [allPublicSpells[j], allPublicSpells[i]];
  }
  featuredSpells.value = allPublicSpells.slice(0, 3);
};

onMounted(fetchRandomPublicSpells);
</script>

<style lang="scss" scoped>
.home__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: var(--background-color);
  color: var(--text-color);

  h1 {
    font-size: 2.5rem;
    color: var(--secondary-color);
    margin-bottom: 20px;
  }

  .introduction {
    margin-bottom: 40px;
    text-align: center;
  }

  .featured-spells {
    .spells-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .spell {
      background-color: var(--primary-color);
      color: var(--text-light);
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

      h3 {
        margin-top: 0;
      }
    }
  }
}
</style>
