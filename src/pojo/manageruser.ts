import {School} from "@/pojo/school";

export class LoginInfo {
    username: string
    password: string
    captcha: string

    constructor() {
        this.username = ''
        this.password = ''
        this.captcha = ''
    }
}
export class ManagerUser {
    id: number
    username: string
    school: {
        id: number
        name: string
        createDateTime?: string
        updateDateTime?: string
    }
    sessionAge: number
    createDateTime?: string
    updateDateTime?: string

    constructor() {
        this.id = -1
        this.username = ''
        this.school = new School()
        this.sessionAge = -1
        this.createDateTime = ''
        this.updateDateTime = ''
    }
}

