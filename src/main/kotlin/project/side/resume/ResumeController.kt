package project.side.resume

import org.json.JSONObject
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import project.side.dataClass.dataClassSet
import project.side.profile.ProfileService
import project.side.profile.ProfileServiceImpl


/**
 *------------------------------------------------------------------------
 * 2023.06.12 최현우
 *
 * 이력서와 관련된 요청을 받는 컨트롤러
 *------------------------------------------------------------------------
 */
@RestController
@RequestMapping("/restapis/resume",produces = [MediaType.APPLICATION_JSON_VALUE])
class ResumeController {


    private val resumeService : ResumeServie = ResumeServiceImpl();
    /**
     *------------------------------------------------------------------------
     * 2023.06.12 최현우
     *
     * 회원가입 정보 저장 메서드
     *------------------------------------------------------------------------
     */
    @PostMapping("/getResume")
    fun GetResume(@RequestBody data : dataClassSet.ResumeGetInfo): ResponseEntity<String> {

        try{

            val resumeData = resumeService.GetResume(data)

            //리턴 제이슨 객체 생성.
            val resultObj = JSONObject().apply{

                //resumeData이 null이 아닌경우 put 실행, null이라면 실행하지 않음.
                resumeData?.let {
                    put("THUMB_NAIL", it.thumbNail)
                    put("RESUMENUM", it.resumeNum)
                }

            }

            //바디와 해더에 넣어 리턴
            return ResponseEntity.ok()
                .body(resultObj.toString())


        }catch ( e : Exception){

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failed")

        }


    }

}