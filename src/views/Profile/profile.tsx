import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderLogin from '../../components/headerLogin/headerLogin'
import ProfileHeader from '../../components/profileHeader/profileHeader'

const Profile = () => {
  return (
    <>
          <HeaderLogin />
          <ProfileHeader />
          <Outlet/>
    </>
  )
}

export default Profile
