package project.side.profile
import project.side.dataClass.dataClassSet
interface ProfileService {

    fun SaveProfile(profileInfo : dataClassSet.ProfileInfo) : Boolean

    fun GetProfileInfo(profileGetData : dataClassSet.ProfileGetData) : dataClassSet.ProfileInfo?
}