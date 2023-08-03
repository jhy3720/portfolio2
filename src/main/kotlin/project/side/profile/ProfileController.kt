package project.side.profile

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.json.JSONObject
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import project.side.common.JwtInfo
import project.side.common.JwtUtil
import project.side.dataClass.dataClassSet


/**
 *------------------------------------------------------------------------
 * 2023.05.17 최현우
 *
 * 사용자 프로필 관련 컨트롤러
 *------------------------------------------------------------------------
 */
@RestController
@RequestMapping("/restapis/profile",produces = [MediaType.APPLICATION_JSON_VALUE])

class ProfileController {

    private val profileService : ProfileService = ProfileServiceImpl();
    /**
     *------------------------------------------------------------------------
     * 2023.05.17 최현우
     *
     * 사용자 프로필정보 저장 기능.
     *------------------------------------------------------------------------
     */
    @PostMapping("/saveProfile")
    fun SaveProfile(@RequestBody profileInfo: dataClassSet.ProfileInfo): ResponseEntity<String> {


        return if (profileService.SaveProfile(profileInfo)) {

            //리턴 제이슨 객체 생성.
            val resultObj = JSONObject().apply{
                put("code", 200)
                put("message", "success")
            }

            //바디와 해더에 넣어 리턴
            ResponseEntity.ok()
                .body(resultObj.toString())

        } else {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failed")

        }
    }


    /**
     *------------------------------------------------------------------------
     * 2023.05.17 최현우
     *
     * 사용자 프로필정보 조회 기능.
     *------------------------------------------------------------------------
     */
    @PostMapping("/getProfileInfo")
    fun GetProfileInfo(@RequestBody profileGetData: dataClassSet.ProfileGetData): ResponseEntity<String> {

        val profileData = profileService.GetProfileInfo(profileGetData)

        return if (profileData != null) {

            //리턴 제이슨 객체 생성.
            val resultObj = JSONObject().apply{
                put("code", 200)
                put("message", "success")
                put("profileData",profileData)
            }

            //바디와 해더에 넣어 리턴
            ResponseEntity.ok()
                .body(resultObj.toString())

        } else {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failed")

        }
    }

}
