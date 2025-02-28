"use client";

import Image from "next/image";

type AvatarProps={
  src:string |null|undefined
}



const Avatar:React.FC<AvatarProps> = ({src}) => {
  return (
   <Image
   className="rounded-full"
   width="30"
   height="30"
   alt="Avatar"
   src= {src || "/images/avatar.png"}
   />
  )
}

export default Avatar
