import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Aboutus from './Aboutus'
import Contactus from './Contactus'
import Error from './Error'
import Login from './Login'
import Register from './Form/register'
import Admin from '../Adminpanel/Admin'
import Registration from './Registration'

import Header from './component/Header'
import { Admincontact } from '../Adminpanel/Admincontact'
import { AdminDashboard } from '../Adminpanel/AdminDasboard'
import ContactusSuccess from './ContactusSuccess'
import AdminBlog from '../Adminpanel/Adminblog'
import AdminInv from '../Adminpanel/AdminInv'
import CheckInOut from '../Adminpanel/inventoryitems/CheckInOut'
import ItemForm from '../Adminpanel/inventoryitems/ItemForm'
import ItemList from '../Adminpanel/inventoryitems/Itemlist'
import Report from '../Adminpanel/inventoryitems/Report'
import { AuthProvider } from './Authenticator'
import Admintext from '../Adminpanel/inventoryitems/Admintext'
import RegisterDone from './Form/RegisterDone'

import Admincreatephotohome from '../Adminpanel/Admincreatephotohome'
import Admingallery from '../Adminpanel/Admingallery'
import Gallery from './Gallery'
import { AdminRegister } from '../Adminpanel/AdminRegister'
import AdminOrgtext from '../Adminpanel/AdminOrgtext'
import { Orgname } from './component/Orgname'
import Admincreatephotoaboutus from '../Adminpanel/AdminAboutusPhoto'



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<Aboutus />} />
          <Route path="contact" element={<Contactus />} />
        
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="registration" element={<Registration />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/Admincontact" element={<Admincontact />} />
          <Route path="*" element={<Error />} />
          <Route path="/Admindash" element={<AdminDashboard />} />
          <Route path="/Contsuccess" element={<ContactusSuccess />} />
          <Route path="/Adminblog" element={<AdminBlog />} />
          <Route path="/AdminInv" element={<AdminInv />} />
          <Route path="/Checkinout" element={<CheckInOut />} />
          <Route path="/ItemForm" element={<ItemForm />} />
          <Route path="/ItemList" element={<ItemList />} />
          <Route path="/Report" element={<Report />} />
          <Route path="/RegisterDone" element={<RegisterDone />} />
          <Route path ="/header" element={<Header/>}/>
          <Route path="/Admintext" element={<Admintext />} />
       
          <Route path="/AdminHome1" element={<Admincreatephotohome />} />
          <Route path="/Admingallery" element={<Admingallery />} />
          <Route path="/gallery" element={<Gallery/>} />
          <Route path="/Adminreg" element={<AdminRegister/>} />
          <Route path="/OrgText" element={<AdminOrgtext/>} />
          <Route path="/Orgname" element={<Orgname/>} />
          <Route path="/Admintopphoto1" element={<Admincreatephotoaboutus />} />
     
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
