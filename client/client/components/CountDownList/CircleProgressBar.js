import React, {Component} from 'react'
import style from './style.css'

export default ({progress, text, color, title}) => {
  const max = -219.99078369140625
  return (
    <svg data-progress={progress} x="0px" y="0px" viewBox="0 0 80 80" width="100%">
      <path
        stroke="rgb(56, 71, 83)"
        d="M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0"
        fill="transparent"
        transform="rotate(90deg)translate(0px, -80px)"
        stroke-width="3"
      />
      <path
        stroke={color}
        strokeDasharray={219.99078369140625}
        strokeDashoffset={((100 - progress) / 100) * max}
        transition="stroke-dashoffset 1s"
        fill="transparent"
        transform="rotate(90deg)translate(0px, -80px)"
        stroke-width="3"
        d="M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0"
      />
      <text textAnchor="middle" x="50%" y="45%" fill="white" fontSize="0.6em">
        {title}
      </text>
      <text textAnchor="middle" x="50%" y="70%" fill="white" fontSize="0.5em">
        {text}
      </text>
    </svg>
  )
}
