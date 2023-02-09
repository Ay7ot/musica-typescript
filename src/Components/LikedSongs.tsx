import React from 'react'
import { useContext } from "react"
import { AppContext } from "../Contexts/AppContext"

export default function LikedSongs() {
     
  const { dispatch } = useContext(AppContext)

  return (
    <div>
      Liked Songs
    </div>
  )
}
