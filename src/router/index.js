import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import RegisterView from '../pages/RegisterView.vue'
import SignInView from '../pages/SignInView.vue'
import FeedView from '../pages/FeedView.vue'
import VerifyEmail from '../pages/VerifyMail.vue'
import Spell from '../pages/Spell.vue'
import Spellbook from '../pages/SpellBook.vue'
import SpellList from '../pages/SpellList.vue'
import Profile from '../pages/Profile.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignInView
  },
  {
    path: '/feed',
    name: 'Feed',
    component: FeedView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/verify-email',
    name: 'Verification',
    component: VerifyEmail
  },
  {
    path: '/spell',
    name: 'Spell',
    component: Spell
  },
  {
    path: '/spellbook',
    name: 'Spellbook',
    component: Spellbook
  },
  {
    path: '/spelllist',
    name: 'SpellList',
    component: SpellList
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const getCurrentUser = () => {
  return new Promise ((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("You do not have access");
      next("/");
    }
  } else {
    next();
  }
});


export default router
