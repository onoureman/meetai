"use client";
import { Button } from "@/components/ui/button"
import { useState } from "react";

import { authClient } from "@/lib/auth-client"; //import the auth client

export default function Home() {

   const { data: session } = authClient.useSession()

  const[name,setName]= useState("");
  const[email,setEmail]= useState("");
  const[password,setPassword]= useState("");
 const onSubmit = async () => {
  try {
    const user = await authClient.signUp.email({
      name,
      email,
      password,
    });
    window.alert("User created successfully");
  } catch (error: any) {
    window.alert(error?.message || "An error occurred");
  }
};

 if (session) {
  return (
    <div className="flex flex-col p-4 gap-y-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.name || session.user.email}</h1>
      <Button variant="destructive" onClick={() => authClient.signOut()}>Sign Out</Button>
    </div>
  );
 }
  return (
    <div className="p-4 flex flex-col gap-y-4">
    <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
    <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
    <Button onClick={onSubmit}>Create User</Button>
  </div>

);
};