package project.side.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

import project.side.entity.UserData

@Repository
interface  UserDataRepository : JpaRepository<UserData, Long> {


}