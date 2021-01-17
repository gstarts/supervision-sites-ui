<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select
          @change="placeChange"
          v-model="queryParams.placeId" placeholder="请选择场所" clearable size="small">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="业务日期" prop="date">
        <el-date-picker
          v-model="dateRange"
          @change="dateChange"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!--    <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
              v-hasPermi="['workpoint:group:add']"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="success"
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
              v-hasPermi="['workpoint:group:edit']"
            >修改
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
              v-hasPermi="['workpoint:group:remove']"
            >删除
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="warning"
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
              v-hasPermi="['workpoint:group:export']"
            >导出
            </el-button>
          </el-col>
        </el-row>-->

    <el-tabs active-name="detail" @tab-click="handleClick">
      <el-tab-pane label="工分明细统计" name="detail">
        <el-table v-loading="loadingDetail" :data="detailList">
          <el-table-column label="作业人员" align="center" prop="workerCode" :formatter="formatterWorker"/>
          <el-table-column label="工分类型" align="center" prop="pointType" :formatter="pointTypeFormatter"/>
          <el-table-column label="车数" align="center" prop="vehicleCount"/>
          <el-table-column label="核定总数" align="center" prop="vouchScore"/>
          <el-table-column label="扣除总数" align="center" prop="deductScore"/>
          <el-table-column label="结余总数" align="center" prop="surplusScore"/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="工分分组汇总统计" name="type">
        <el-table v-loading="loadingType" :data="typeList">
          <el-table-column label="工分类型" align="center" prop="pointType" :formatter="pointTypeFormatter"/>
          <el-table-column label="车数" align="center" prop="vehicleCount"/>
          <el-table-column label="工分总数" align="center" prop="scoreTotal"/>
          <el-table-column label="扣除总数" align="center" prop="deductScore"/>
          <el-table-column label="结余总数" align="center" prop="surplusScore"/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="工分汇总统计" name="all">
        <el-table v-loading="loadingAll" :data="allList">
          <el-table-column label="车数" align="center" prop="vehicleCount"/>
          <el-table-column label="工分总数" align="center" prop="scoreTotal"/>
          <el-table-column label="扣除总数" align="center" prop="deductScore"/>
          <el-table-column label="结余总数" align="center" prop="surplusScore"/>
          <el-table-column label="作业人数" align="center" prop="workerCount"/>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {listGroup, getGroup, delGroup, addGroup, updateGroup} from "@/api/workpoint/group";
import {listWorker} from "@/api/workpoint/worker";
import {getUserDepts} from "@/utils/charutils";
import {statisticsAll, statisticsDetail, statisticsType} from "@/api/workpoint/head";
import {formatDate} from "@/utils";
import {listType} from "@/api/workpoint/type";

export default {
  name: "Group",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 作业小组表格数据
      groupList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      dateRange: undefined,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        beginTime: undefined,
        endTime: undefined,
        placeId: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        code: [
          {required: true, message: "编号不能为空", trigger: 'blur'}
        ],
        name: [
          {required: true, message: "名称不能为空", trigger: "blur"}
        ]
      },
      workerList: [],
      depts: [],

      allList: [],
      typeList: [],
      detailList: [],
      loadingAll: false,
      loadingType: false,
      loadingDetail: false,
      workpointTypeList: [],
    };
  },
  created() {
    this.depts = getUserDepts('')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.getUserList()
    }
    this.dateRange = [new Date(), new Date()]
    this.getWorkpointTypeList()

    // 查询参数
    //this.queryParams.beginTime = this.dateRange[0] + ' 00:00:00'
    //this.queryParams.endTime = this.dateRange[1] + ' 23:59:59'
    //this.getWorkerList()
    //this.getList();
    //console.log('depts')
    //console.log(this.depts)
    /*if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.getList();
    }*/
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    placeChange() {
      this.getUserList()
    },
    /** 查询作业小组列表 */
    getList() {
      this.loading = true;
      listGroup(this.queryParams).then(response => {
        this.groupList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    getWorkerList() {
      listWorker({}).then(response => {
        this.workerList = response.rows;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        id: undefined,
        code: undefined,
        name: undefined,
        works: undefined,
        placeId: undefined,
        workerIds: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.queryParams.beginTime = formatDate(this.dateRange[0], 'yyyy-MM-dd').substring(0, 10) + ' 00:00:00'
      this.queryParams.endTime = formatDate(this.dateRange[1], 'yyyy-MM-dd').substring(0, 10) + ' 23:59:59'
      this.getStatisticsAll()
      this.getStatisticsType()
      this.getStatisticsDetail()

    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加作业小组";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      let works = []
      if (row.works != "") {
        works = row.works.split(',')
      }
      const id = row.id || this.ids
      getGroup(id).then(response => {
        this.form = response.data;
        this.form.works = works
        this.open = true;
        this.title = "修改作业小组";
      });

    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let works = this.form.works
          if (this.form.works.length > 0) {
            this.form.works = this.form.works.join(",")
          }
          if (this.form.id != undefined) {
            updateGroup(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            }).catch(err => {
              this.form.works = works
            });
          } else {
            addGroup(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            }).catch(err => {
              this.form.works = works
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除作业小组编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delGroup(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('workpoint/group/export', {
        ...this.queryParams
      }, `workpoint_group.xlsx`)
    },
    formatPlace(row) {
      let place = this.depts.find(item => item.deptId === row.placeId)
      if (place) {
        return place.deptName
      }
      return row.placeId
    },
    //日期范围变化
    dateChange() {
      // this.queryParams.beginTime = this.dateRange[0] + ' 00:00:00'
      // this.queryParams.endTime = this.dateRange[1] + ' 23:59:59'
    },
    getStatisticsAll() {
      this.allList = []
      this.loadingAll = true
      statisticsAll(this.queryParams).then(response => {
        this.loadingAll = false
        if (response.code === 200) {
          this.allList.push(response.data)
        }
      }).catch(e => {
        this.loadingAll = false
      })
    },
    getStatisticsType() {
      this.typeList = null
      this.loadingType = true
      statisticsType(this.queryParams).then(response => {
        this.loadingType = false
        if (response.code === 200) {
          this.typeList = response.data
        }
      }).catch(e => {
        this.loadingType = false
      })
    },
    getStatisticsDetail() {
      this.detailList = []
      this.loadingDetail = true
      statisticsDetail(this.queryParams).then(response => {
        this.loadingDetail = false
        if (response.code === 200) {
          this.detailList = response.data
        }
      }).catch(e => {
        this.loadingDetail = false
      })
    },
    getWorkpointTypeList() {
      this.loading = true;
      listType({}).then(response => {
        this.workpointTypeList = response.rows;
        this.loading = false;
        //this.workpointStandardList = []
      });
    },
    pointTypeFormatter(row, column) {
      let type = this.workpointTypeList.find(item => item.code === row.pointType)
      if (type) {
        return type.name
      }
      return row.pointType
    },
    getUserList() {//获取作业小组中的人员，即是本场所的人员
      this.workerList = []
      this.groupList = []
      listGroup({'placeId': this.queryParams.placeId}).then(response => {
        this.groupList = response.rows;
        if (this.groupList.length > 0) {
          //debugger
          for (let group of this.groupList) {
            for (let worker of group.jobWorkerList) {
              let work = this.workerList.find(item => item.workerCode === worker.workerCode)
              if (!work) {
                this.workerList.push(worker)
              }
            }
          }
        }
        //console.log(response)
      });
    },
    formatterWorker(row, column) {
      let work = this.workerList.find(item => item.workerCode === row.workerCode)
      if (work) {
        return work.workerName
      }
      return row.workerCode
    }
  }
}
</script>

<style lang="scss" scoped>

/*.el-select-dropdown__item {
  float: left;
  display: inline;
  padding:5px;
}*/

</style>
