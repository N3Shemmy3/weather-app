<template>
  <div
    v-if="show"
    class="snackbar"
    :class="{ online: isOnline, offline: !isOnline }"
  >
    {{ message }}
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const isOnline = ref(navigator.onLine); // Initial online status
const show = ref(false);
const message = ref("");

// Handle connection changes
const updateConnectionStatus = () => {
  isOnline.value = navigator.onLine;
  message.value = isOnline.value
    ? "You are back online!"
    : "You are offline. Please check your internet connection.";
  show.value = true;

  // Automatically hide snackbar after 3 seconds
  setTimeout(() => (show.value = false), 3000);
};

// Add event listeners
window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);

// Cleanup listeners when the component is destroyed
onUnmounted(() => {
  window.removeEventListener("online", updateConnectionStatus);
  window.removeEventListener("offline", updateConnectionStatus);
});
</script>

<style scoped>
.snackbar {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: fade-in 0.3s ease-in-out;
  font-size: 14px;
  z-index: 100;
}
.snackbar.online {
  background-color: #4caf50;
}
.snackbar.offline {
  background-color: #f44336;
}
@keyframes fade-in {
  from {
    opacity: 0;
    bottom: 10px;
  }
  to {
    opacity: 1;
    bottom: 20px;
  }
}
</style>
