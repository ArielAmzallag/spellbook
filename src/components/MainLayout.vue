<template>
    <div class="main-layout">
      <header>
        <nav>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/spellbook">Spellbook</router-link></li>
            <li><router-link to="/spellcreator">Spell Creator</router-link></li>
            <!-- Add other navigation links as needed -->
          </ul>
        </nav>
      </header>
  
      <main>
        <slot></slot> <!-- Main content will be injected here -->
      </main>
  
      <footer>
        <p>© 2024 Fantasy World. All rights reserved.</p>
        <!-- You can add additional footer content here -->
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MainLayout'
  }
  </script>
  
  <style scoped>
  .main-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  header {
  background-color: var(--nav-background);
  padding: 1em;
  width: 100%; /* Ensure it's full width */
}

header nav ul {
  padding: 0;
  margin: 0 auto; /* Center the nav items */
  max-width: 1280px; /* Match the app max width */
  display: flex;
  justify-content: center; /* Center items for better balance */
  list-style-type: none;
}

header nav ul li {
  margin: 0 1em;
}

header nav a {
  color: var(--nav-text-color);
  padding: 0.5em 1em; /* Add padding for a larger click area */
  border-radius: 4px; /* Optional: rounded corners */
  transition: background-color 0.3s; /* Smooth transition for hover effect */
}

header nav a:hover,
header nav a:focus {
  background-color: var(--nav-hover-background);
  color: var(--text-light);
}

  
  main {
    flex-grow: 1;
    padding: 20px;
  }
  
  footer {
    color: white;
    text-align: center;
    padding: 1em;
    margin-top: 20px;
    background-color: var(--primary-color);
    color: var(--text-light);
  }
  </style>
  