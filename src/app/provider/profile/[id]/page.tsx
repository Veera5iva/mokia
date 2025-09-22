/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function UserProfile({params}: any) {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen">
         <h1>Profile</h1>
         <hr />
         <p className="text-3xl">Profile page: {params.id}</p>

      </div>
   )
}