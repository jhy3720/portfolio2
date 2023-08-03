package project.side.profile

import project.side.dataClass.dataClassSet


class ProfileServiceImpl : ProfileService {

    private val profileDao: ProfileDao = ProfileDao()

    override fun SaveProfile(profileInfo : dataClassSet.ProfileInfo) : Boolean{
        try {

            profileDao.SaveProfile(profileInfo)
            return true

        }catch (e:Exception){

            return false
        }

    }

    override fun GetProfileInfo(profileGetData : dataClassSet.ProfileGetData) : dataClassSet.ProfileInfo?{

        try {

            return profileDao.GetProfileInfo(profileGetData)

        }catch (e:Exception){

            return null
            e.printStackTrace()

        }

    }
}