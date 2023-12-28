import { useContext } from "react"
import { User } from "../context/User"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
export default function Dashboard(){
    const {newUser}=useContext(User)
    const axiosPrivate=useAxiosPrivate();
    console.log(newUser)
   async function handleClick(){
        console.log("clciked")
 
        try{
const res=await axiosPrivate.put('user1/update',{"email":""})
console.log(res)
        }catch(error){
            console.log(error)
        }
    }
    return(<>
    <section className="text-gray-400 bg-gray-900 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
      <img
        className="object-cover object-center rounded"
        alt="hero"
        src="https://dummyimage.com/720x600"
      />
    </div>
    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
        Welcome
        <br className="hidden lg:inline-block" />
        to Your Dashboard
      </h1>
      <p className="mb-8 leading-relaxed">
        Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
        plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk
        tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard
        chambray.
      </p>
      <div className="flex justify-center">
        <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">
          View Profile
        </button>
        <button onClick={handleClick} className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
          Explore
        </button>
      </div>
    </div>
  </div>
</section>
</>)
}