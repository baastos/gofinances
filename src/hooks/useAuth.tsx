import React, { createContext, ReactNode, useContext, useState } from 'react'
import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContext {
  user: User;
  signInGoogle: () => Promise<void>;
  signInAple: () => Promise<void>;
  logout: () => void;
  userStorageLoading: boolean;
}

interface IAuthProvider {
  children: ReactNode;
}

const AuthContext = createContext({} as IAuthContext)
const googleConfig = {
  iosClientId: '598177646794-gslsh4hd13pnv4muprpcqtiko6fdkdhb.apps.googleusercontent.com',
  androidClientId: '598177646794-iude4i0tctqaanete2p58fmkk42m1ahb.apps.googleusercontent.com',
  scopes: ['email', 'profile']
}



function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState<User>({} as User)
  const [userStorageLoading, setUserStorageLoading] = useState(true)


  useEffect(() => {
    async function loadStoragedUser() {
      const hasUser = await AsyncStorage.getItem('@gofinances.user')

      if (hasUser) {
        const user = JSON.parse(hasUser)
        setUser(user)

      }
      setUserStorageLoading(false)
    }
    loadStoragedUser()
  }, [])

  async function signInGoogle() {

    try {

      const response = await Google.logInAsync(googleConfig)
      if (response.type === 'success') {
        const user = {
          name: response.user.name!,
          email: response.user.email!,
          id: String(response.user.id)!,
          photo: response.user.photoUrl!
        }

        setUser(user)
        await AsyncStorage.setItem('@gofinances.user', JSON.stringify(user))
      }
    } catch (err) {
      throw new Error(err)
    }
  }
  async function signInAple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credential) {
        const name = credential.fullName!.givenName!
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`
        const user = {
          id: String(credential.user)!,
          name,
          photo,
          email: credential.email!,
        }

        setUser(user)
        await AsyncStorage.setItem('@gofinances.user', JSON.stringify(user))
      }
    } catch (err) {
      throw new Error(err)

    }
  }
  function logout() {
    setUser({} as User)
    AsyncStorage.removeItem('@gofinances.user')
  }
  return (
    <AuthContext.Provider value={{ user, signInGoogle, signInAple, logout, userStorageLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { useAuth, AuthProvider }