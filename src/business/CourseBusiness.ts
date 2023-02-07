import { NotFoundError } from './../errors/NotFoundError';
import { CourseDB } from './../types';
import { BadRequestError } from './../errors/BadRequestError';
import { Course } from './../models/Course';
import { CourseDatabase } from './../database/CourseDatabase';

export class CourseBusiness {

    public getCourses = async () => {
        const courseDatabase = new CourseDatabase()
        const coursesDB = await courseDatabase.findCourses()

        const courses: Course[] = coursesDB.map((courseDB) => new Course (
            courseDB.id,
            courseDB.name,
            courseDB.lessons
        ))

        return courses
    }

    public createCourse = async (input: any) => {
        const { id, name, lessons } = input

        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        if (typeof lessons !== "number") {
            throw new BadRequestError("'lessons' deve ser string")
        }

        const courseDatabase = new CourseDatabase()
        const courseDBExists = await courseDatabase.findCourseById(id)

        if(courseDBExists) {
            throw new BadRequestError("'id' já existe")
        }

        const newCourse = new Course(
            id,
            name,
            lessons
        )

        const newCourseDB: CourseDB = {
            id: newCourse.getId(),
            name: newCourse.getName(),
            lessons: newCourse.getLessons()
        }

        await courseDatabase.insertCourse(newCourseDB)

        const output = {
            message: "Cadastro realizado com sucesso",
            course: newCourse
        }

        return output
    }

    public deleteCourse = async (id: string) => {
        const courseDatabase = new CourseDatabase()
        await courseDatabase.deleteCourse(id)

        const output = {
            message: "Curso deletado com sucesso"
        }

        return output
    }

    public editCourse = async (input: any) => {
        const { id, name, lessons } = input

        if(name !== undefined){
            if (typeof name !== "string") {
                throw new BadRequestError("'name' deve ser string")
            }
        }        

        if(lessons !== undefined) {
            if (typeof lessons !== "number") {
                throw new BadRequestError("'lessons' deve ser number")
            }
        }        

        const courseDatabase = new CourseDatabase()
        const courseDBExists = await courseDatabase.findCourseById(id)

        if(!courseDBExists) {
            throw new NotFoundError("'id' não encontrado")
        }

        const editedCourse = new Course(
            courseDBExists.id,
            courseDBExists.name,
            courseDBExists.lessons
        )

        name && editedCourse.setName(name)
        lessons && editedCourse.setLessons(lessons)

        const newCourseDB = {
            id: editedCourse.getId(),
            name: editedCourse.getName(),
            lessons: editedCourse.getLessons()
        }

        await courseDatabase.updateCourse(id, newCourseDB)

        return({
            message: "Curso editado com sucesso",
            course: editedCourse
        })
    }
}