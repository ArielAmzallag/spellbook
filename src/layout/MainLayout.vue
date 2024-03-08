<template>
    <div class="main-layout">
      <header>
        <button @click="toggleNavbar" class="navbar-toggle">☰</button>
        <nav v-show="isNavbarVisible">
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li v-if="!isLoggedIn"><router-link to="/register">Register</router-link></li>
            <li v-if="!isLoggedIn"><router-link to="/sign-in">Sign-In</router-link></li>
            <li v-if="isLoggedIn"><router-link to="/spell">Create a Spell</router-link></li>
            <li v-if="isLoggedIn"><router-link to="/spellbook">My Spellbook</router-link></li>
            <li><router-link to="/spelllist">The Spell List</router-link></li>
            <li><router-link to="/feed">Feed</router-link></li>
            <li v-if="isLoggedIn"><router-link to="/profile">Profile</router-link></li>
            <li v-if="userEmail">{{ userEmail }}</li>
            <li v-if="isLoggedIn"><button @click="handleSignOut">Sign out</button></li>
          </ul>
        </nav>
      </header>
      
  
      <main>
        <slot></slot> 
      </main>
  
      <footer>
        <p>© 2024 Palace of Fantasy. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script>
  import { onMounted, ref, reactive } from 'vue';
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'MainLayout',
    setup() {
      const isLoggedIn = ref(false);
      const userEmail = ref(localStorage.getItem('userEmail'));
      const router = useRouter();
      const isNavbarVisible = ref(false);
      let auth;
  
      onMounted(() => {
        auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          isLoggedIn.value = !!user;
          if (user) {
            userEmail.value = localStorage.getItem('userEmail');
          }
        });
      });
      
      const toggleNavbar = () => {
        console.log('Toggling navbar'); 
        isNavbarVisible.value = !isNavbarVisible.value;
        console.log('Is navbar visible:', isNavbarVisible.value);
      };


      const handleSignOut = () => {
        signOut(auth).then(() => {
          localStorage.removeItem('userEmail');
          userEmail.value = null;
          router.push("/");
        });
      };
  
      return {
        isLoggedIn,
        userEmail,
        handleSignOut,
        isNavbarVisible,
        toggleNavbar,
      };
    }
  }
  </script>
  
  

<style lang="scss" scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  header {
    background-color: var(--primary-color);
    padding: 20px 0;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;

    nav {
      width: 100%;
      ul {
        list-style-type: none;
        display: flex;
        justify-content: center;
        margin: 0;
        padding: 0;

        li {
          margin: 0 15px;
        }

        a {
          color: #fff;
          &:hover {
            color: var(--accent-color);
          }
        }
      }
      .navbar-toggle {
        background: none;
        border: none;
        color: #fff;
        font-size: 2rem;
        cursor: pointer;
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        padding: 20px;
        z-index: 101;
    
        &:focus {
          outline: none;
        }
      }
    }

    @media (max-width: 768px) {
      .navbar-toggle {
        display: block; 
      }
      nav ul {
        flex-direction: column;
        align-items: center;
        display: block;
        li {
          margin: 10px 0;
        }
        nav ul li {
          margin: 10px 0;
          text-align: center;
        }
      }
      
    }
  }

  main {
    padding: 20px;
    padding-top: 60px;
    flex-grow: 1;
    background-color: transparent;
  }

  footer {
    background-color: var(--primary-color);
    color: var(--text-color);
    text-align: center;
    padding: 10px;
    border-top: 1px solid var(--border-color);
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    main {
      padding-bottom: 50px;
    }

    p {
      margin: 0;
    }
  }
}

</style>

