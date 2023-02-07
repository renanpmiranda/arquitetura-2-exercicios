import { CourseDB } from './../types';
import { BaseDatabase } from "./BaseDatabase";

export class CourseDatabase extends BaseDatabase {
    public static TABLE_COURSES = "courses"

    public async findCourses() {
        const result: CourseDB[] = await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
        
        return result
    }

    public async findCourseById(id: string) {
        const [ courseDB ]: CourseDB[] | undefined[] = await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .where({ id })
        
        return courseDB
    }

    public async insertCourse(newCourse: CourseDB) {
        await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .insert(newCourse)
    }

    public async deleteCourse(id: string) {
        await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .del()
            .where({ id })
    }

    public async updateCourse(id: string, newCourseDB: CourseDB) {
        await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .update(newCourseDB)
            .where({ id })
    }
}