package project.side.resume

import project.side.dataClass.dataClassSet
import java.util.Objects

interface ResumeServie {

    fun GetResume(resumeGetInfo: dataClassSet.ResumeGetInfo ) : dataClassSet.ResumeInfo?
}