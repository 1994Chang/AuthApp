 "use client"; // This is a client component 👈🏽

import Link from 'next/link'
import { getSession, useSession,signOut } from "next-auth/react"

export default function Home() {
  // const [session, setSession] = useState(false);
  const { data: session } = useSession()  
  function handleSignOut(){
    signOut();
  }
  return (
    <>
      {session? AuthUser({session,handleSignOut}) : Guest()}
    </>
  )
}


//Guest
function Guest(){
  return(
    <main className='contaner mx-auto text-center py-20'>
        <h3 className='text-4xl font-bold'>
          Guest HomePage!
        </h3>
        <div className='flex justify-center'>
          <Link href={`/login`} className="mt-5 px-10 rounded-sm bg-indigo-500">Sign In</Link>
        </div>
    </main>
  )
}

//authorize Useer
function AuthUser({session, handleSignOut}){
  return(
  <main className='contaner mx-auto text-center py-20'>
        <h3 className='text-4xl font-bold'>
          Authorized Guest HomePage!
        </h3>
        <div className='details'>
          <h5>{session.user.name}</h5>
          <h5>{session.user.email}</h5>
        </div>
        <div className='flex justify-center'>
            <button className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50' onClick={handleSignOut}>Sign Out</button>
        </div>
        <div className='flex justify-center'>
          <Link href={`/profile`} className="mt-5 px-10 rounded-sm bg-indigo-500">Profile Page</Link>
        </div>
    </main>
  )
}

export const getServerSideProps = async({req})=>{
  alert("called")
  console.log(req, "req call");
  const session = await getSession({req})
  if(!session){
    return{
      redirect:{
        destination:'/login',
        permanent :false
      }
    }
  }
  return{
    props:{session}
  }
}