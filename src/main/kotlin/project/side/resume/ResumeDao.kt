package project.side.resume

import java.lang.reflect.Array

class ResumeDao {


    fun GetTopFiveResumeInfo()  : kotlin.Array<String> {

        //실제로는 디비에서 top5를 조회하여 아래 배열형태로 리턴해야함.
        return arrayOf("1001", "1002","1003","1004","1005")
    }
}