"use client"
import { AuthContext } from "@/contexts/AuthContext"
import { auth } from "@/lib/firebase/config";
import { GoogleAuthProvider, User, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react"

type Props = {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, SetIsMounted] = useState(false);

  const googleSignIn = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider())
  }

  const logOut = async () => {
    await signOut(auth)
  }

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      SetIsMounted(true)
    })
    return () => unsubcribe()
  }, [user])

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, isMounted }}>
      {children}
    </AuthContext.Provider>
  )
}

