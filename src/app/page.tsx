"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";



const page = () => {
   const { 
    data: session,
  } = authClient.useSession()

  if (!session) {  return <p>Please sign in</p> }

  return (
  <div className="flex flex-col p-4 gap-y-4">
    <p>logged in as: {session.user.name}</p>
    <Button onClick={() => authClient.signOut()}>Sign Out</Button>
  </div>
  )
}