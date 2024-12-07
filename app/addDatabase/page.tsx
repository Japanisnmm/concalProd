import Link from "next/link"
import Navbar from "../components/Navbar"

function AddDatabase() {
  return (
    <>
    <Navbar/>
    <div>
        <nav>
            <Link href={'/'}>
            Home
            </Link>
        </nav>
    </div>
    <div>AddDatabase</div>

    </>
  )
}
export default AddDatabase