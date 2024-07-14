"use client"
import React from 'react'
import { createContext } from 'react';


export const DataContext = createContext({Vibrant: "",
  DarkVibrant: "",
  LightVibrant: "",
  Muted: "",
  DarkMuted: "",
  LightMuted: ""})

export default function DataProvider({children, store} : {children: React.ReactNode, store: any}) {
  const sharedData = store;

  return (
    <DataContext.Provider value={sharedData}>
        {children}
    </DataContext.Provider>
  )
}
