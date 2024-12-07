import Link from "next/link"

function page() {
  return (
    <>
    <nav className="flex justify-end mt-5 mr-10 " >
        
        <h1 className="mr-10">Help</h1>
        <h1>Info</h1>
        
    </nav>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" >
        <h1 className="font-bold text-8xl">Concal</h1>
        
        <div className="flex justify-between mt-20" >
        <Link className="" href={'/prediction'}>
            Prediction
        </Link>
        <Link href={'/addDatabase'}>
            AddDatabase
        </Link>
        </div>
    </div>
    </>
  )
}
export default page