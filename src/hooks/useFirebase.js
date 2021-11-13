import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import initializeAuthentication from '../Components/Firebase/firebase.init';

initializeAuthentication();

const useFirebase = () => {
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [admin, setAdmin] = useState(false);

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  // handle google sign in
  const signInWithGoogle = (location, history) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        saveUser(user.email, user.displayName, 'PUT');
        const destination = location?.state?.from || '/';
        history.push(destination);
        setError('');
        // ...
      })
      .catch(error => {
        setError(error.code.split('auth/'));
      })
      .finally(() => setIsLoading(false));
  };

  // Create a user by email and password
  const registerUserByEmail = (email, password, name, history, location) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setError('');

        const newUser = { email, displayName: name };
        setUsers(newUser);

        // save user to the database
        saveUser(email, name, 'POST');

        // send name to the firebase
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch(error => {});

        const destination = location?.state?.from || '/';
        history.push(destination);
      })
      .catch(error => {
        setError(error.code.split('auth/'));
        // ..
      })
      .finally(() => setIsLoading(false));
  };

  // Login user by email and password
  const loginUserByEmail = (email, password, history, location) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const destination = location?.state?.from || '/';
        history.push(destination);
        setError('');
      })
      .catch(error => {
        setError(error.code.split('auth/'));
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUsers(user);
      } else {
        setUsers({});
      }
      setIsLoading(false);
    });
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    fetch(`https://agile-brushlands-55686.herokuapp.com/users/${users.email}`)
      .then(res => res.json())
      .then(data => {
        setAdmin(data.admin);
      });
  }, [users.email]);

  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const saveUser = (email, displayName, method) => {
    const user = { email, displayName };
    fetch('https://agile-brushlands-55686.herokuapp.com/users', {
      method: method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then();
  };

  return {
    users,
    admin,
    isLoading,
    signInWithGoogle,
    registerUserByEmail,
    loginUserByEmail,
    error,
    setError,
    logOut,
    setUsers,
    setIsLoading,
  };
};

export default useFirebase;
