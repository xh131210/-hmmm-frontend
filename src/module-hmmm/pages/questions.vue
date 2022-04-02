<template>
  <div class="container">
    <el-card>
      <!-- 新增试题 -->
      <el-row>
        <el-col class="top_title">
          <span></span>
          <el-button  type="success" size="small" icon="el-icon-edit"
            >新增试题</el-button
          >
        </el-col>
      </el-row>
      <!-- 新增试题/ -->
      <!-- 表单搜索 -->
      <el-form :model="query" label-width="80px">
        <!-- 表单-1h -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="学科">
              <el-select
                style="width: 100%"
                v-model="query.subjectID"
                placeholder="请选择"
                @change="onSubjectChange"
              >
                <el-option
                  v-for="(item, index) in subjects"
                  :key="index"
                  :label="item.subjectName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="二级目录 ">
              <el-select
                style="width: 100%"
                v-model="query.catalogID"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in directory"
                  :key="index"
                  :label="item.directoryName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="标签 ">
              <el-select
                style="width: 100%"
                v-model="query.tags"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in tags"
                  :key="index"
                  :label="item.tagName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="关键字">
              <el-input
                v-model="query.keyword"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 表单-2h -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="试题类型">
              <el-select
                style="width: 100%"
                v-model="query.questionType"
                placeholder="请选择"
              >
                <el-option
                  v-for="(val, k, id) in questionType"
                  :key="id"
                  :label="val"
                  :value="k"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="难度">
              <el-select
                style="width: 100%"
                v-model="query.difficulty"
                placeholder="请选择"
              >
                <el-option
                  v-for="(val, k, id) in difficulty"
                  :key="id"
                  :label="val"
                  :value="k"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="方向">
              <el-select
                style="width: 100%"
                v-model="query.direction"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in direction"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="录入人">
              <el-select
                style="width: 100%"
                v-model="query.creatorID"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in userList"
                  :key="index"
                  :label="item.username"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 表单-3h -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="题目备注">
              <el-input
                v-model="query.remarks"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业简称">
              <el-input
                v-model="query.shortName"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="城市">
              <el-select
                @change="onProvinceChange"
                style="width: 50%"
                v-model="query.province"
                placeholder="请选择"
              >
                <el-option
                  v-for="(v, k, i) in province"
                  :key="i"
                  :label="v"
                  :value="v"
                ></el-option>
              </el-select>
              <el-select
                style="width: 50%"
                v-model="query.city"
                placeholder="请选择"
              >
                <el-option
                  v-for="(v, k, i) in citys"
                  :key="i"
                  :label="v"
                  :value="v"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="text-align: right">
            <el-button size="small" @click="clearFn">清除</el-button>
            <el-button size="small" type="primary" @click="loadQuestionList">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- 提示文字 -->
      <el-alert
        type="info"
        show-icon
        :title="'数据一共' + counts + '条'"
        :closable="false"
      >
      </el-alert>
      <!-- 表格区域 -->
      <template>
        <el-table :data="questionList" style="width: 100%">
          <el-table-column prop="number" label="试题编号"></el-table-column>
          <el-table-column prop="subject" label="学科"></el-table-column>
          <el-table-column prop="catalog" label="目录"></el-table-column>
          <el-table-column prop="date" label="题型">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.questionType === '1'">单选</span>
                <span v-else-if="scope.row.questionType === '2'">多选</span>
                <span v-else>简答</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="题干">
            <template slot-scope="scope">
              <div v-html="scope.row.question"></div>
            </template>
          </el-table-column>
          <el-table-column prop="addDate" label="录入时间">
            <template slot-scope="scope">
               {{ scope.row.addDate | relativeTime }}
            </template>
          </el-table-column>
          <el-table-column prop="date" label="难度">
             <template slot-scope="scope">
              <div>
                <span v-if="scope.row.difficulty === '1'">简单</span>
                <span v-else-if="scope.row.difficulty === '2'">一般</span>
                <span v-else>困难</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="creator" label="录入人"></el-table-column>
          <!-- 操作 -->
          <el-table-column prop="date" label="操作" width="180">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-view"
              plain
              circle
            ></el-button>
            <el-button
              type="success"
              size="small"
              icon="el-icon-edit"
              plain
              circle
            ></el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              plain
              circle
            ></el-button>
            <el-button
              type="warning"
              size="small"
              icon="el-icon-check"
              plain
              circle
            ></el-button>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页区域 -->
      <el-pagination
        style="text-align: right; margin: 25px; 0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.page"
        :page-sizes="[3,6,9]"
        :page-size="query.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="counts"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 请求 学科列表
import { subjectsList } from '@/api/hmmm/subjects'
// 目录简单列表
import { list } from '@/api/hmmm/directorys'
// 书签列表
import { tagsList } from '@/api/hmmm/tags'
// 录入人列表
import { usersList } from '@/api/base/users'
// 城市列表
import { provinces, citys } from '@/api/hmmm/citys'
// 简单题库列表
import { questionList } from '@/api/hmmm/questions'
export default {
  name: 'Questions',
  data () {
    return {
      input: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      // 查询信息
      query: {
        page: 1, // 当前页数
        pagesize: 3, // 每页显示多少
        subjectID: null, // 学科
        catalogID: null, // 目录
        tags: null, // 标签名称
        keyword: null, // 关键字
        questionType: null, // 试题类型
        difficulty: null, // 难度
        direction: null, // 方向
        creatorID: null, // 录入人
        remarks: null, // 题目备注
        province: null, // 企业所在地省份
        shortName: null, // 企业简称
        city: null // 企业所在城市
      },
      value: '',
      subjects: [], // 存放学科列表
      directory: [], // 存放二级目录列表
      tags: [], // 存放标签列表
      // 试题类型
      questionType: {
        1: '单选',
        2: '多选',
        3: '简答'
      },
      // 难度
      difficulty: {
        1: '简单',
        2: '一般',
        3: '困难'
      },
      // 方向
      direction: [
        'o2o',
        '外包服务',
        '企业服务',
        '互联网金融',
        '企业咨询',
        '互联网',
        '电子商务',
        '其他'
      ],
      // 录入人列表
      userList: [],
      // 城市列表
      province: provinces(),
      // 城市二级列表
      citys: [],
      // 基础题库列表
      questionList: [],
      // 数据总数
      counts: 0
    }
  },
  created () {
    this.loadSubjectsList() // 学科列表
    this.loadTags() // 标签列表
    this.loadUserList() // 录入人列表
    this.loadQuestionList() // 基础题库列表
  },
  methods: {
    // 学科列表
    async loadSubjectsList () {
      try {
        const { data } = await subjectsList({ page: 1, pagesize: 100 })
        // console.log(data)
        this.subjects = data.items
        // console.log(this.subjects)
      } catch (err) {
        console.log(err)
      }
    },
    // change事件
    async onSubjectChange (val) {
      // console.log(val)
      this.query.catalogID = null
      // 更新二级目录列表
      this.directory = null
      const { data } = await list({ subjectID: val })
      // console.log(data)
      this.directory = data.items
      // console.log(this.directory)
    },
    // 标签列表
    async loadTags () {
      const { data } = await tagsList({ subjectID: this.query.subjectID })
      // console.log(data)
      this.tags = data.items
      // console.log(this.tags)
    },
    // 录入人列表
    async loadUserList () {
      const { data } = await usersList({ page: 1, pagesize: 100, keyword: '' })
      // console.log(data)
      this.userList = data.list
      // console.log(this.userList)
    },
    // 城市二级列表
    onProvinceChange (val) {
      this.query.city = ''
      this.citys = citys(val)
      // console.log(this.citys)
    },
    // 清除功能
    clearFn () {
      for (var key in this.query) {
        if (key === 'page' || key === 'pagesize') {
          continue
        }
        this.query[key] = null
      }
      // 更新题库列表
      this.getQuestionList()
    },
    // 基础题库列表
    async loadQuestionList () {
      try {
        const { data } = await questionList(this.query)
        // console.log(data)
        // 基础题库总数
        this.counts = data.counts
        // console.log(this.counts)
        this.questionList = data.items
        // console.log(this.questionList)
      } catch (err) {
        console.log(err)
      }
    },
    // 分页
    handleSizeChange (val) {
      this.query.pagesize = val
      console.log(this.query.pagesize)
      // 更新题库列表
      this.loadQuestionList()
    },
    // 分页
    handleCurrentChange (val) {
      this.query.page = val
      console.log(this.query.page)
      // 更新题库列表
      this.loadQuestionList()
    }
  }
}
</script>

<style scoped lang='scss'>
.el-card {
  margin: 13px;
  .top_title {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    .el-button {
      font-size: 15px;
    }
  }
}
</style>
