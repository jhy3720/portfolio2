package project.side.profile

import project.side.dataClass.dataClassSet

class ProfileDao {
    fun SaveProfile(profileInfo : dataClassSet.ProfileInfo) : Boolean{

        //프로필 DB에 저장하는 로직 추가 필요.

        return true;
    }

    fun GetProfileInfo(profileGetData : dataClassSet.ProfileGetData) : dataClassSet.ProfileInfo{

        //프로필 이메일로 조회하여 리턴하는 로직필요

        return dataClassSet.ProfileInfo("chw@naver.com", "010-7777-8888", "네이버","개발자","하나의묵")
    }
}