package project.side.resume

import project.side.dataClass.dataClassSet

import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import org.springframework.core.io.Resource
import org.springframework.core.io.UrlResource

class ResumeServiceImpl : ResumeServie {

    private val resumeDao : ResumeDao = ResumeDao()

    /** 리펙토링 전 코드
    override fun GetResume(resumeGetInfo: dataClassSet.ResumeGetInfo): dataClassSet.ResumeInfo? {

        val returnResumeInfo : dataClassSet.ResumeInfo

        val selectType  = resumeGetInfo.selectType
        val selectData = resumeGetInfo.serchData

        val resumeThumbNaliImages: MutableList<Resource> = mutableListOf()

        when(selectType){

            "All" -> {

                //DB에서 순위 TOP 5의 이력서 번호(resumeNum)을 가져온다
                val retummeNumTopFive =  resumeDao.GetTopFiveResumeInfo()


                //위 retummeNumTopFive 배열의 문자열 이력서번호를 가지고 로컬에서 이미지를 가져오는 기능 추가필요

                val imagePath = "C:\\ResumeThumbnail"

                for(imageName in retummeNumTopFive){

                    val path: Path = Paths.get(imagePath, imageName)

                    if (!Files.exists(path)) {
                        println("존재하지 않는 경로입니다.")
                    }


                    val resource: Resource = UrlResource(path.toUri())

                    if (!resource.exists() || !resource.isReadable) {

                        println(imageName + "데이터를 불러오지 못했습니다.")
                    }else{

                        resumeThumbNaliImages.add(resource)
                    }

                }

                returnResumeInfo = dataClassSet.ResumeInfo(resumeThumbNaliImages,retummeNumTopFive)

                return returnResumeInfo

            }

            "Title" -> {

                if(selectData.isNotBlank()){

                    //DB에서 제목검색을 수행한다.
                    //resumeDao.SerchResumeInfoByTitle()

                }

            }

            "Creater" -> {

                if(selectData.isNotBlank()){

                    //DB에서 작성자 검색을 수행한다.
                    //resumeDao.SerchResumeInfoByCreater()

                }

            }

            else -> println("존재하지 않는 조회 조건입니다.")

        }

        return null



    }
    **/


    /**------------------------------------------------------------------------
     * 2023.06.12 최현우
     *
     * 프론트에서 보낸 검색조건에 따라 TOP5, 제목, 작성자를 검색하여 이력서 정보를
     * 리턴하는 메서드
     *------------------------------------------------------------------------
     */
    override fun GetResume(resumeGetInfo: dataClassSet.ResumeGetInfo): dataClassSet.ResumeInfo? {
        val selectType = resumeGetInfo.selectType
        val selectData = resumeGetInfo.serchData

        return when(selectType) {
            "All" -> getAllResumes()
            "Title" -> getTitleResumes(selectData)
            "Creater" -> getCreatorResumes(selectData)
            else -> {
                println("존재하지 않는 조회 조건입니다.")
                null
            }
        }
    }

    /**------------------------------------------------------------------------
     * 2023.06.12 최현우
     *
     * 메인화면에서 최초에 이력서 정보를 가져갈때 호출되는 메서드 (top5 이력서 조회)
     * top5 이력서에 해당되는 썸네일 이미지 및 top5 이력서의 번호를 리턴한다.
     *------------------------------------------------------------------------
     */
    private fun getAllResumes(): dataClassSet.ResumeInfo {
        val resumeNumTopFive = resumeDao.GetTopFiveResumeInfo()
        val resumeThumbNailImages = getLocalImages(resumeNumTopFive)
        return dataClassSet.ResumeInfo(resumeThumbNailImages, resumeNumTopFive)
    }

    /**------------------------------------------------------------------------
     * 2023.06.12 최현우
     *
     * 로컬에서 특정 이력서 번호에 맞는 썸네일정보를 가져온다.
     * 지금은 로컬에서 가져오지만 추후에는 다른 저장소에서 가져오도록 해야함.
     *------------------------------------------------------------------------
     */
    private fun getLocalImages(imageNames: Array<String>): MutableList<Resource> {
        val imagePath = "C:\\ResumeThumbnail"
        val resumeThumbNailImages = mutableListOf<Resource>()

        for (imageName in imageNames) {
            val path: Path = Paths.get(imagePath, imageName + ".png",)

            if (!Files.exists(path)) {
                println("존재하지 않는 경로입니다.")
                continue
            }

            val resource: Resource = UrlResource(path.toUri())

            if (!resource.exists() || !resource.isReadable) {
                println("$imageName 데이터를 불러오지 못했습니다.")
            } else {
                resumeThumbNailImages.add(resource)
            }
        }

        return resumeThumbNailImages
    }

    /**------------------------------------------------------------------------
     * 2023.06.12 최현우
     *
     * 이력서 제목검색 기능 추후 구현예정
     *------------------------------------------------------------------------
     */
    private fun getTitleResumes(selectData: String): dataClassSet.ResumeInfo? {
        return if (selectData.isNotBlank()) {

            // DB에서 제목검색을 수행한다.
            // resumeDao.SearchResumeInfoByTitle()

            null
        } else {
            null
        }
    }

    /**------------------------------------------------------------------------
     * 2023.06.12 최현우
     *
     * 이력서 작성자 검색 기능 추후 구현예정
     *------------------------------------------------------------------------
     */
    private fun getCreatorResumes(selectData: String): dataClassSet.ResumeInfo? {
        return if (selectData.isNotBlank()) {

            // DB에서 작성자 검색을 수행한다.
            // resumeDao.SearchResumeInfoByCreater()

            null
        } else {
            null
        }
    }

}