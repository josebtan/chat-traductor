import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

// User model: { id, nickname, language, country }

class UserService {
  constructor() {
    this.currentUser = null;
    this.initAuth();
  }

  initAuth() {
    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
    });
  }

  async register(email, password, userData) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    this.currentUser = userCredential.user;
    await this.saveUser(userData);
    return this.getUser();
  }

  async login(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    this.currentUser = userCredential.user;
    return this.getUser();
  }

  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      this.currentUser = result.user;
      return this.getUser();
    } catch (error) {
      if (error.code === 'auth/popup-blocked') {
        throw new Error('Popup bloqueado. Habilita popups para este sitio.');
      }
      throw error;
    }
  }

  async logout() {
    await signOut(auth);
    this.currentUser = null;
  }

  async getUser() {
    if (!this.currentUser) return null;

    const userDoc = await getDoc(doc(db, 'users', this.currentUser.uid));
    if (userDoc.exists()) {
      return { id: this.currentUser.uid, ...userDoc.data() };
    }

    // If user is from Google and profile doesn't exist, create it
    if (this.currentUser.providerData[0]?.providerId === 'google.com') {
      await this.saveUser({
        nickname: this.currentUser.displayName || 'Usuario Google',
        language: 'es',
        country: 'CO'
      });
      // Retry getUser
      return this.getUser();
    }

    return null;
  }

  async saveUser(user) {
    if (!this.currentUser) throw new Error('Not authenticated');

    await setDoc(doc(db, 'users', this.currentUser.uid), {
      nickname: user.nickname,
      language: user.language,
      country: user.country
    });
  }
}

const userService = new UserService();
export default userService;