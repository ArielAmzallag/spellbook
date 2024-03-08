import { initializeApp } from "firebase/app";
import { getDatabase, ref, remove, push, onValue, query, limitToLast } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAm1ozxEOLI6R6sK-ew0PvSOYdVwRJ78pw",
  authDomain: "spellbook-d52a0.firebaseapp.com",
  databaseURL: "https://spellbook-d52a0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "spellbook-d52a0",
  storageBucket: "spellbook-d52a0.appspot.com",
  messagingSenderId: "987827423144",
  appId: "1:987827423144:web:f40bffaf907fa8ee877f9d",
  measurementId: "G-7MPNW5JD2H"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const sendMessage = (messageContent, userId) => {
  const chatRef = ref(db, 'chats');
  push(chatRef, {
    text: messageContent,
    createdBy: userId,
    createdAt: Date.now(),
  });
};

export const clearChat = async (password) => {
    const expectedPassword = "Rampage120%";
    if (password === expectedPassword) {
      const chatRef = ref(db, 'chats');
      return remove(chatRef);
    } else {
      return Promise.reject(new Error("Incorrect password"));
    }
  };

export const subscribeToChat = (callback) => {
  const chatQuery = query(ref(db, 'chats'), limitToLast(20));
  onValue(chatQuery, (snapshot) => {
    const messages = [];
    snapshot.forEach((childSnapshot) => {
      messages.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });
    callback(messages);
  });
};
