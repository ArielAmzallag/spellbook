<template>
    <div v-if="visible" class="debug-log-container">
      <div class="debug-log" v-for="log in logs" :key="log.id">
        <p class="log-type">{{ log.type.toUpperCase() }}</p>
        <pre class="log-message">{{ log.message }}</pre>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const logs = ref([]);
  const visible = ref(false);
  
  function addLog(type, message) {
    logs.value.push({
      id: logs.value.length + 1,
      type,
      message: typeof message === 'object' ? JSON.stringify(message, null, 2) : message.toString(),
    });
  }
  
  function clearLogs() {
    logs.value = [];
  }
  
  function toggleVisibility() {
    visible.value = !visible.value;
  }
  
  onMounted(() => {
    const toggleVisibilityShortcut = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'K') {
        toggleVisibility();
      }
    };
  
    window.addEventListener('keydown', toggleVisibilityShortcut);
  
    // Expose the logging functions globally so they can be called from anywhere in your app
    window.debugLog = addLog;
    window.clearDebugLogs = clearLogs;
  
    onUnmounted(() => {
      window.removeEventListener('keydown', toggleVisibilityShortcut);
    });
  });
  </script>
  
  <style scoped>
  .debug-log-container {
    position: fixed;
    bottom: 0;
    left: 0;
    max-height: 50vh;
    overflow-y: auto;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 14px;
    z-index: 10000; /* Ensure it's above everything else */
    box-sizing: border-box;
    padding: 10px;
  }
  
  .debug-log {
    border-bottom: 1px solid #444;
    padding: 5px 0;
  }
  
  .log-type {
    font-weight: bold;
    color: #FFD700; /* Gold color for log type */
  }
  
  .log-message {
    white-space: pre-wrap;
    margin: 5px 0;
  }
  </style>
  