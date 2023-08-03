package project.side.login

import project.side.dataClass.dataClassSet
import project.side.entity.Account
import project.side.entity.UserData
import java.util.*

interface LoginService {

    //2023.07.07 최현우 리턴값을 dataset.Account > Optional<Account> 로 변경.
    fun GetAccountData(userId : String, userPw : String, userIP: String) : Optional<Account>

    //2023.07.20 최현우 토큰값 관련정보를 조회하지 못했을 때 널값을 리턴하기위해 ? 추가.
    fun GetToken (userInfo : dataClassSet.UserInfo) : dataClassSet.UserDataAndToken?

    fun Register (registerInfo : dataClassSet.RegisterInfo) : Boolean

    fun GetUserData(userSeq : Long) : Optional<UserData>
}