<template>
  <MainLayout>
    <div class="spell-creation-form">
      <h2>Create Your Spell</h2>
      <div class="input-group">
        <label for="spell-name">Spell Name</label>
        <input type="text" id="spell-name" v-model="spell.name" placeholder="Enter spell name" />
      </div>

      <div class="input-group">
        <label for="school-of-magic">School of Magic</label>
        <select id="school-of-magic" v-model="spell.schoolOfMagic">
          <option disabled value="">Select a School of Magic</option>
          <option>Divination</option>
          <option>Abjuration</option>
          <option>Necromancy</option>
          <option>Conjuration</option>
          <option>Enchantment</option>
          <option>Illusion</option>
          <option>Evocation</option>
          <option>Transmutation</option>
          <option>Chronurgy</option>
          <option>Graviturgy</option>
          <option>War Magic</option>
          <option>Arcane Magic</option>
        </select>
      </div>

      <div class="input-group">
        <label for="spell-description">Description</label>
        <textarea id="spell-description" v-model="spell.description" placeholder="Describe your spell"></textarea>
      </div>

      <div class="input-group">
        <label for="spell-file">Spell Logo</label>
        <input type="file" id="spell-file" @change="onFileChange" />
      </div>

      <div class="checkbox-group">
        <input type="checkbox" id="make-spell-public" v-model="spell.isPublic" />
        <label for="make-spell-public">Make spell public</label>
      </div>

      <button @click="createSpell">Create Spell</button>
    </div>
  </MainLayout>
</template>
  
<script setup>
import MainLayout from '../layout/MainLayout.vue';
import { ref } from 'vue';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

const spell = ref({
  name: '',
  schoolOfMagic: '',
  description: '',
  spellLogoUrl: '',
  wizardId: '',
  creatorName: '',
  isPublic: false 
});
const spellLogo = ref(null);

const onFileChange = (e) => {
  spellLogo.value = e.target.files[0];
};

const uploadSpellLogo = async () => {
  if (spellLogo.value) {
    const fileRef = storageRef(storage, `spellLogos/${spellLogo.value.name}`);
    await uploadBytes(fileRef, spellLogo.value).then(async snapshot => {
      spell.value.spellLogoUrl = await getDownloadURL(snapshot.ref);
    });
  }
};

const createSpell = async () => {
  if (!auth.currentUser) {
    alert('You must be logged in to create a spell.');
    return;
  }
  spell.value.wizardId = auth.currentUser.uid;
  spell.value.creatorName = auth.currentUser.displayName || "Valerh the Unknown Traveler";

  await uploadSpellLogo();
  await addDoc(collection(db, 'spells'), { ...spell.value, createdAt: new Date() }).then(() => {
    alert('Spell created successfully!');
  }).catch(error => {
    console.error("Error adding spell: ", error);
  });
};
</script>


<style lang="scss" scoped>


.spell-creation-form {
  max-width: 90%;
  margin: 40px auto;
  padding: 20px;
  background: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  color: var(--text-color);

  h2 {
    text-align: center;
    color: --var(accent-color);
    margin-bottom: 30px;
  }

  .input-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 5px;
    }

    input[type="text"],
    select,
    textarea {
      width: 90%;
      padding: 12px; 
      border-radius: 4px;
      border: 1px solid var(--border-color);
      background-color: var(--background-light);
      color: var(--text-dark);
      font-size: 1rem;
      
      &:focus {
        outline: 2px solid  --var(accent-color);
      }
    }

    input[type="file"] {
      width: 100%;
      border: none;
      color: var(--text-color);
      margin-top: 10px;
    }

    textarea {
      height: 150px;
    }
  }

  .checkbox-group {
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    label {
      margin-left: 10px;
    }
  }

  button {
    display: block;
    width: 100%;
    padding: 12px 0;
    border: none;
    background-color: --var(accent-color);
    color: var(--text-color);
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease;

  }
}

  
</style>