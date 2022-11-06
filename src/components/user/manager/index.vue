<template>
    <div class="common-layout">
        <el-container>
            <el-header>

                <el-button type="primary" plain style="margin-right: 10px"
                           @click="addUserDrawer = true">新增用户
                </el-button>
                <el-drawer
                        v-model="addUserDrawer"
                        title="新增用户"
                        :direction="btt"
                        size="40%">

                    <el-form :model="addUserForm">
                        <el-form-item label="昵称" required>
                            <el-input v-model="addUserForm.nickName"/>
                        </el-form-item>
                        <el-form-item label="性别" required>
                            <el-input v-model="addUserForm.gender"/>
                        </el-form-item>
                        <el-form-item label="评分">
                            <el-input-number :min="0" :max="100"
                                             v-model="addUserForm.score"/>
                        </el-form-item>
                    </el-form>
                    <el-form :model="addUserDetailForm">
                        <el-form-item label="校园卡号" required>
                            <el-input v-model="addUserDetailForm.schoolCardId"/>
                        </el-form-item>
                        <el-form-item label="学校名称" required>
                            <!--                            <el-input v-model="addUserDetailForm.school.id"/>-->
                            <el-select v-model="addUserDetailForm.school"
                                       :filterable="true"
                                       :remote="true"
                                       placeholder="请输入学校名称"
                                       :remote-show-suffix="true"
                                       :remote-method="remoteFetchSchools"
                                       :loading="searchSchoolLoading">

                                <el-option
                                        v-for="school in schools"
                                        :key="school.id"
                                        :label="school.name"
                                        :value="school">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="真实姓名" required>
                            <el-input v-model="addUserDetailForm.realName"/>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-radio-group v-model="addUserDetailForm.status">
                                <el-radio :label="1">正常</el-radio>
                                <el-radio :label="0">已封禁</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="邮箱" required>
                            <el-input v-model="addUserDetailForm.email"/>
                        </el-form-item>
                        <el-form-item label="年级" required>
                            <el-input-number v-model="addUserDetailForm.grade"/>
                        </el-form-item>
                        <el-form-item label="专业名称" required>
                            <el-select v-model="addUserDetailForm.major"
                                       :filterable="true"
                                       :remote="true"
                                       placeholder="请输入专业名称"
                                       :remote-show-suffix="true"
                                       :remote-method="remoteFetchMajor"
                                       :loading="searchMajorLoading">

                                <el-option
                                        v-for="major in majors"
                                        :key="major.id"
                                        :label="major.name"
                                        :value="major">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="班级号" required>
                            <el-input v-model="addUserDetailForm.classNum"/>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" @click="submitAdd" :loading="addUserBtnLoading">
                        添加
                    </el-button>
                </el-drawer>


                <el-button type="danger" plain style="margin-right: 10px" @click="deleteSelectedUsers">删除勾选的用户
                </el-button>

                <el-input v-model="filter.schoolCardIdLike" placeholder="校园卡卡号"
                          style="width: 120px; margin-right: 10px; position: absolute; right: 292px;"/>

                <el-input v-model="filter.schoolName" placeholder="学校名称"
                          style="width: 150px; margin-right: 10px; position: absolute; right: 132px;"/>

                <el-button @click="submitSearch" :icon="Search" circle style="margin-right: 10px; position: absolute; right: 90px;"/>

                <el-button type="primary" @click="filterDrawer = true" style="position: absolute; right: 0">高级检索
                </el-button>
                <el-drawer

                        v-model="filterDrawer"
                        title="高级检索"
                        :direction="'btt'"
                        size="100%">

                    <el-form :model="filterForm" ref="advancedSearchFormRef">
                        <el-form-item label="昵称" prop="nickName">
                            <el-input v-model="filterForm.nickName"/>
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-input v-model="filterForm.gender"/>
                        </el-form-item>
                        <el-form-item label="最低评分" prop="minScore">
                            <el-col :span="11">
                                <el-input-number :min="0" :max="filterForm.maxScore" v-model="filterForm.minScore"/>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="最高评分" prop="maxScore">
                            <el-col :span="11">
                                <el-input-number :min="filterForm.minScore" :max="100" v-model="filterForm.maxScore"/>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="校园卡号" prop="schoolCardIdLike">
                            <el-input v-model="filterForm.schoolCardIdLike"/>
                        </el-form-item>
                        <el-form-item label="学校名称" prop="schoolName">
                            <el-input v-model="filterForm.schoolName"/>
                        </el-form-item>
                        <el-form-item label="真实姓名" prop="realName">
                            <el-input v-model="filterForm.realName"/>
                        </el-form-item>
                        <el-form-item label="状态" prop="status">
                            <el-radio-group v-model="filterForm.status">
                                <el-radio label="正常" :model-value="1"/>
                                <el-radio label="已封禁" :model-value="0"/>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="emailLike">
                            <el-input v-model="filterForm.emailLike"/>
                        </el-form-item>
                        <el-form-item label="年级" prop="grade">
                            <el-input-number v-model="filterForm.grade"/>
                        </el-form-item>
                        <el-form-item label="专业名称" prop="majorName">
                            <el-input v-model="filterForm.majorName"/>
                        </el-form-item>
                        <el-form-item label="班级号" prop="classNum">
                            <el-input v-model="filterForm.classNum"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitSearch">筛选</el-button>
                            <el-button @click="resetAdvancedSearch">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-drawer>
            </el-header>

            <el-main>
                <hr/>
                <el-table @expand-change="loadUserDetail"
                          ref="userTable"
                          :data="userTableData"
                          :expand-row-keys="nowExpandRows"
                          row-key="id"
                          :border="true" style="width: 100%">
                    <el-table-column type="selection" width="55"/>
                    <el-table-column type="expand">
                        <template #default="props">
                            <div m="10" v-loading="detailLoading">
                                <p m="t-0 b-2">校园卡号：{{ props.row.userDetail.schoolCardId }}</p>
                                <p m="t-0 b-2">姓名：{{ props.row.userDetail.realName }}</p>
                                <p m="t-0 b-2">状态：{{ props.row.userDetail.status }}</p>
                                <p m="t-0 b-2">邮箱：{{ props.row.userDetail.email }}</p>
                                <p m="t-0 b-2">学校名称：{{ props.row.userDetail.school.name }}</p>
                                <p m="t-0 b-2">年级：{{ props.row.userDetail.grade }}</p>
                                <p m="t-0 b-2">专业：{{ props.row.userDetail.major.name }}</p>
                                <p m="t-0 b-2">班级：{{ props.row.userDetail.classNum }}</p>
                                <p m="t-0 b-2">创建时间：{{ props.row.userDetail.createDateTime }}</p>
                                <p m="t-0 b-2">修改时间：{{ props.row.userDetail.updateDateTime }}</p>
                            </div>
                        </template>

                    </el-table-column>
                    <el-table-column label="性别" prop="gender"/>
                    <el-table-column label="昵称" prop="nickName"/>
                    <el-table-column label="评分" prop="score"/>
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                                编辑
                            </el-button>
                            <el-popconfirm title="确定删除吗？"
                                           @confirm="handleDelete(scope.$index, scope.row)">
                                <template #reference>
                                    <el-button type="danger" size="small">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>

                <el-drawer
                        v-model="editDrawer"
                        title="编辑"
                        :direction="'btt'"
                        size="100%">
                    <el-form :model="editUserForm">

                        <el-row>
                            <el-col :span="6">昵称：</el-col>
                            <el-col :span="6">{{ oldUser.nickName }}</el-col>
                            <el-col :span="6">-></el-col>
                            <el-col :span="6">
                                <el-form-item label="" required>
                                    <el-input v-model="editUserForm.nickName"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">性别：</el-col>
                            <el-col :span="6">{{ oldUser.gender }}</el-col>
                            <el-col :span="6">-></el-col>
                            <el-col :span="6">
                                <el-form-item label="" required>
                                    <el-input v-model="editUserForm.gender"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">评分：</el-col>
                            <el-col :span="6">{{ oldUser.score }}</el-col>
                            <el-col :span="6">-></el-col>
                            <el-col :span="6">
                                <el-form-item label="">
                                    <el-input-number :min="0" :max="100"
                                                     v-model="editUserForm.score"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-form :model="editUserDetailForm">
                        <el-row>
                            <el-col :span="6">校园卡号：</el-col>
                            <el-col :span="6">{{ oldUserDetail.schoolCardId }}</el-col>
                            <el-col :span="6">-></el-col>
                            <el-col :span="6">
                                <el-form-item label="">
                                    <el-input v-model="editUserDetailForm.schoolCardId"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">密码：</el-col>
                            <el-col :span="6">{{ oldUserDetail.password }}</el-col>
                            <el-col :span="6">-></el-col>
                            <el-col :span="6">
                                <el-form-item label="" required>
                                    <el-input v-model="editUserDetailForm.password"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">学校名称：</el-col>
                            <el-col :span="6">{{ oldUserDetail.school.name }}</el-col>
                            <el-col :span="6">-></el-col>
                            <el-col :span="6">
                                <el-form-item label="" required>
                                    <el-select v-model="editUserDetailForm.school"
                                               :filterable="true"
                                               :remote="true"
                                               placeholder="请输入学校名称"
                                               :remote-show-suffix="true"
                                               :remote-method="remoteFetchSchools"
                                               :loading="searchSchoolLoading">

                                        <el-option
                                                v-for="school in schools"
                                                :key="school.id"
                                                :label="school.name"
                                                :value="school">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">真实姓名：</el-col>
                            <el-col :span="6">{{ oldUserDetail.realName }}</el-col>
                            <el-col :span="6">-></el-col>
                            <el-col :span="6">
                                <el-form-item label="" required>
                                    <el-input v-model="editUserDetailForm.realName"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">状态：</el-col>
                            <el-col :span="6">{{ oldUserDetail.status === 1 ? '正常' : '已封禁' }}</el-col>
                            <el-col :span="6">-></el-col>
                            <el-col :span="6">
                                <el-form-item label="">
                                    <el-radio-group v-model="editUserDetailForm.status">
                                        <el-radio :label="1">正常</el-radio>
                                        <el-radio :label="0">已封禁</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">邮箱：</el-col>
                            <el-col :span="6">{{ oldUserDetail.email }}</el-col>
                            <el-col :span="6">-></el-col>
                            <el-col :span="6">
                                <el-form-item label="" required>
                                    <el-input v-model="editUserDetailForm.email"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">年级：</el-col>
                            <el-col :span="6">{{ oldUserDetail.grade }}</el-col>
                            <el-col :span="6">-></el-col>
                            <el-col :span="6">
                                <el-form-item>
                                    <el-input-number v-model="editUserDetailForm.grade"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">专业名称：</el-col>
                            <el-col :span="6">{{ oldUserDetail.major.name }}</el-col>
                            <el-col :span="6">-></el-col>
                            <el-col :span="6">
                                <el-form-item label="" required>
                                    <el-select v-model="editUserDetailForm.major"
                                               :filterable="true"
                                               :remote="true"
                                               placeholder="请输入专业名称"
                                               :remote-show-suffix="true"
                                               :remote-method="remoteFetchMajor"
                                               :loading="searchMajorLoading">

                                        <el-option
                                                v-for="major in majors"
                                                :key="major.id"
                                                :label="major.name"
                                                :value="major">
                                        </el-option>
                                        <template #empty></template>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">班级序号：</el-col>
                            <el-col :span="6">{{ oldUserDetail.classNum }}</el-col>
                            <el-col :span="6">-></el-col>
                            <el-col :span="6">
                                <el-form-item label="" required>
                                    <el-input v-model="editUserDetailForm.classNum"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>

                    <el-button type="primary" @click="submitEdit" :loading="submitEditBtnLoading">
                        编辑
                    </el-button>
                </el-drawer>
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import {onActivated, reactive} from 'vue'
import {UserFilter, User, UserDetail} from '@/pojo/user'
import {Search} from '@element-plus/icons-vue'
import {ref} from 'vue'
import {
    addOneUser,
    deleteUser,
    deleteUsers,
    editOneUser,
    fetchAllUser,
    fetchUserByUserFilter,
    fetchUserDetail
} from '@/api/user'
import {ElMessage, ElMessageBox} from 'element-plus'
import {AxiosResponse} from 'axios'
import {Response, SUCCESS_CODE} from '@/utils/request'
import {School} from '@/pojo/school'
import {Major} from '@/pojo/major'
import {fetchSchoolsByKeyWord} from '@/api/school'
import {fetchMajorsByKeyword} from '@/api/major'

const userTable = ref()
const defaultErrorHandler = (error: any) => {
    ElMessage({
        type: 'error',
        message: '服务器异常'
    })
    console.dir(error)
}
/*
    C && U
 */
let schools = reactive<School[]>([new School()])
let majors = reactive<Major[]>([new School()])
const searchSchoolLoading = ref(false)
const searchMajorLoading = ref(false)
const validate = (userFrom: User, userDetailForm: UserDetail): boolean => {
    if (userFrom.gender != '男' && addUserForm.gender != '女') {
        ElMessageBox.alert("性别字段异常")
        return false
    }
    if (!userDetailForm.email.match(/\w+@\w+\.\w+/)) {
        ElMessageBox.alert("邮箱字段异常")
        return false
    }
    return true
}
const remoteFetchSchools = (keyword: string) => {
    if (keyword == '') return
    searchSchoolLoading.value = true
    fetchSchoolsByKeyWord(keyword)
        .then((response: AxiosResponse<Response<School[]>>) => {
            if (response.data.code == SUCCESS_CODE) {
                schools.length = 0
                schools.push(...response.data.data)
            } else {
                schools.length = 0
            }
        }).catch(defaultErrorHandler).finally(() => {
        searchSchoolLoading.value = false
    })
}
const remoteFetchMajor = (keyword: string) => {
    if (keyword == '') return
    searchMajorLoading.value = true
    fetchMajorsByKeyword(keyword)
        .then((response: AxiosResponse<Response<Major[]>>) => {
            if (response.data.code == SUCCESS_CODE) {
                majors.length = 0
                majors.push(...response.data.data)
            } else {
                schools.length = 0
            }
        })
        .catch(defaultErrorHandler)
        .finally(() => {
            searchMajorLoading.value = false
        })
}
const fillUserArrFromResponse = (response: AxiosResponse<Response<User[]>>) => {
    let arr = response.data.data;
    arr.forEach((item) => {
        if (!item.userDetail) {
            item.userDetail = new UserDetail()
        }
    })
    userTableData.value = arr
    ElMessage({
        type: 'success',
        message: '刷新成功'
    })
}

/*
    C
 */
let addUserBtnLoading = ref<boolean>(false)
let addUserDrawer = ref<boolean>(false)
let addUserForm = reactive<User>(new User())
let addUserDetailForm = reactive<UserDetail>(new UserDetail())
const submitAdd = () => {
    if (validate(addUserForm, addUserDetailForm)) {
        // 提交
        addOneUser(addUserForm, addUserDetailForm)
            .then((response: AxiosResponse<Response<any>>) => {
                refreshUserTable()
                ElMessage({
                    type: 'success',
                    message: response.data.message
                })
            })
            .catch(defaultErrorHandler)
            .finally(() => {
                addUserDrawer.value = false
            })
    }
}


/*
    R
 */
let userTableData = ref<User[]>([])
let nowExpandRows = ref<number[]>([])
let detailLoading = ref<boolean>(false)
const loadUserDetail = (row: User, expandedRows: Array<User>) => {

    if (expandedRows.length) {
        detailLoading.value = true
        let userId = row.id
        fetchUserDetail(userId)
            .then((response: AxiosResponse<Response<UserDetail>>) => {
                row.userDetail = response.data.data

            }).catch(defaultErrorHandler).finally(() => {
            detailLoading.value = false
        })
    }
}



const refreshUserTable = () => {
    fetchAllUser()
        .then(((response: AxiosResponse<Response<User[]>>) => {
            fillUserArrFromResponse(response)
        }))
        .catch(defaultErrorHandler)
}
onActivated(() => {
    // 调用时机为首次挂载
    // 以及每次从缓存中被重新插入时
    refreshUserTable()
})

// filter
let filterDrawer = ref<boolean>(false)
const filter = reactive<UserFilter>(new UserFilter())
const filterForm = reactive<UserFilter>(new UserFilter())
const advancedSearchFormRef = ref()
const submitSearch = () => {
    fetchUserByUserFilter(filter)
        .then((response: AxiosResponse<Response<User[]>>) => {
            if (response.data.code == SUCCESS_CODE) {
                fillUserArrFromResponse(response)
            }
        })
        .catch()
        .finally()
}
const resetAdvancedSearch = () => {
    console.dir(advancedSearchFormRef.value)
    advancedSearchFormRef.value.resetFields()
}


/*
    U
 */
let editUserForm = reactive(new User())
let editUserDetailForm = reactive(new UserDetail())
let oldUser = reactive<User>(new User())
let oldUserDetail = reactive<UserDetail>(new UserDetail())
let editDrawer = ref<boolean>(false)
let submitEditBtnLoading = ref(false)
const handleEdit = (index: number, row: User) => {
    fetchUserDetail(row.id)
        .then((response: AxiosResponse<Response<UserDetail>>) => {
            row.userDetail = response.data.data
        })
        .catch(defaultErrorHandler)
        .finally(() => {
            oldUser.id = row.id
            oldUser.gender = row.gender
            oldUser.nickName = row.nickName
            oldUser.score = row.score
            oldUser.userDetail = row.userDetail
            oldUserDetail.id = row.userDetail.id
            oldUserDetail.schoolCardId = row.userDetail.schoolCardId
            oldUserDetail.password = '********'
            oldUserDetail.realName = row.userDetail.realName
            oldUserDetail.status = row.userDetail.status
            oldUserDetail.email = row.userDetail.email
            oldUserDetail.school = row.userDetail.school
            oldUserDetail.grade = row.userDetail.grade
            oldUserDetail.major = row.userDetail.major
            oldUserDetail.classNum = row.userDetail.classNum

            editDrawer.value = true
        })
}
const submitEdit = () => {

    editUserForm.id = oldUser.id
    editUserDetailForm.id = oldUserDetail.id

    submitEditBtnLoading.value = true
    editUserForm.userDetail = editUserDetailForm
    editOneUser(editUserForm)
        .then((response) => {
            if (response.data.code == SUCCESS_CODE) {
                oldUser = new User()
                oldUserDetail = new UserDetail()
                refreshUserTable()
                editDrawer.value = false
                ElMessage({
                    type: 'success',
                    message: '修改成功'
                })
            } else {
                defaultErrorHandler(response.data)
            }
        })
        .catch(defaultErrorHandler)
        .finally(() => {
            submitEditBtnLoading.value = false
        })
}


/*
    D
 */
const handleDelete = (index: number, row: User) => {
    deleteUser(row)
        .then((response) => {
            if (response.data.code == SUCCESS_CODE) {
                ElMessage({
                    type: 'success',
                    message: response.data.message
                })
                refreshUserTable()
            } else {
                ElMessageBox.alert(response.data.message)
            }
        })
        .catch(defaultErrorHandler)
}
const deleteSelectedUsers = () => {
    let rows: User[] = userTable.value.getSelectionRows()
    if (rows.length != 0) {
        ElMessageBox.confirm(`确认删除 ${rows.length} 个用户吗？`, 'Warning', {
            confirmButtonText: '确认删除',
            confirmButtonClass: 'background-color: red',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let ids: number[] = []
            rows.forEach((row: User) => {
                ids.push(row.id)
            })
            deleteUsers(ids)
                .then((response) => {
                    if (response.data.code == SUCCESS_CODE) {
                        ElMessage({
                            type: 'success',
                            message: '删除成功'
                        })
                        refreshUserTable()
                    } else {
                        ElMessageBox.alert(response.data.message)
                    }
                })
                .catch(defaultErrorHandler)
        }).catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除'
            })
        })

    }
}


</script>
<script lang="ts">
export default {
    name: 'UserManager'
}
</script>

<style scoped>
</style>
