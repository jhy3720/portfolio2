package project.side

import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
import org.springframework.boot.runApplication

@SpringBootApplication
@EnableAutoConfiguration(exclude = arrayOf(SecurityAutoConfiguration::class))
class SideApplication

fun main(args: Array<String>) {
	runApplication<SideApplication>(*args)
}
