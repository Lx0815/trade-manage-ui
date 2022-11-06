import {School} from "@/pojo/school";
import {Major} from "@/pojo/major";

export class User {
    id: number
    nickName: string
    gender: string
    score: number
    userDetail: UserDetail

    constructor() {
        this.id = -1
        this.nickName = ''
        this.gender = ''
        this.score = -1
        this.userDetail = new UserDetail()
    }

}

export class UserDetail {
    id: number
    schoolCardId: string
    password?: string
    realName: string
    status: number
    email: string
    school: {
        id: number
        name: string
        createDateTime: string
        updateDateTime: string
    }
    grade: number
    major: {
        id: number
        name: string
        createDateTime: string
        updateDateTime: string
    }
    classNum: string
    createDateTime: string
    updateDateTime: string

    constructor() {
        this.id = -1
        this.schoolCardId = ''
        this.realName = ''
        this.status = -1
        this.email = ''
        this.school = new School()
        this.grade = 0
        this.major = new Major()
        this.classNum = ''
        this.createDateTime = ''
        this.updateDateTime = ''
    }
}


export class UserFilter {
    nickName?: string
    gender?: string
    minScore?: number
    maxScore?: number

    schoolCardIdLike?: string
    schoolName?: string
    realName?: string
    status?: number
    emailLike?: string
    grade?: number
    majorName?: string
    classNum?: string

    constructor() {
        this.nickName = ''
        this.gender = ''
        this.minScore = 0
        this.maxScore = 100
        this.schoolCardIdLike = ''
        this.schoolName = ''
        this.realName = ''
        this.status = -1
        this.emailLike = ''
        this.grade = -1
        this.majorName = ''
        this.classNum = ''
    }
}
