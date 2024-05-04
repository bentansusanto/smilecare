import Navbar from "@/components/NavFoot/Navbar"
import { PageProps } from "@/utils/PageTypes"

const Layouts:React.FC<PageProps> = ({children}) => {
    return(
        <>
            <Navbar/>
            <main>{children}</main>
        </>
    )
}

export default Layouts