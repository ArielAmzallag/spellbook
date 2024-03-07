<template>
    <div class="verify-email">
      <h1>Email Verification Required</h1>
      <p>Please check your inbox and click on the verification link to verify your email address.</p>
      <p>If you didn't receive the email, you can click the button below to resend the verification email.</p>
      <button @click="resendVerificationEmail" :disabled="isButtonDisabled">Resend Verification Email</button>
      <p v-if="emailSent">A new verification email has been sent.</p>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { getAuth, sendEmailVerification } from 'firebase/auth';
  
  const emailSent = ref(false);
  const isButtonDisabled = ref(false);
  const errorMessage = ref("");
  
  const resendVerificationEmail = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    isButtonDisabled.value = true;
    errorMessage.value = "";
  
    if (user) {
      sendEmailVerification(user)
        .then(() => {
          emailSent.value = true;
          setTimeout(() => emailSent.value = false, 60000); // Hide the message after 1 minute
          setTimeout(() => isButtonDisabled.value = false, 60000); // Re-enable the button after 1 minute
        })
        .catch((error) => {
          console.error("Error resending verification email:", error);
          isButtonDisabled.value = false; // Re-enable the button immediately if there's an error
          if (error.code === "auth/too-many-requests") {
            errorMessage.value = "Too many requests. Please wait a while before trying again.";
          } else {
            errorMessage.value = "There was an error resending the verification email. Please try again later.";
          }
        });
    } else {
      isButtonDisabled.value = false;
      errorMessage.value = "You must be signed in to resend a verification email.";
    }
  };
  </script>
  
  <style scoped>
  .verify-email {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  button {
    margin-top: 20px;
  }
  </style>
  