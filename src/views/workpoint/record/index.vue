<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select
          @change="handleQuery"
          v-model="queryParams.placeId" placeholder="请选择场所" clearable size="small">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工作日期" prop="workDate">
        <el-date-picker clearable size="small" style="width: 200px"
                        v-model="queryParams.workDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择工作日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工人编号" prop="workerCode">
        <el-input
          v-model="queryParams.workerCode"
          placeholder="请输入工人编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="工分类型" prop="pointTypeCode">
        <el-input
          v-model="queryParams.pointTypeCode"
          placeholder="请输入工分类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="工分标准" prop="pointStandardCode">
        <el-input
          v-model="queryParams.pointStandardCode"
          placeholder="请输入工分标准"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="工分值" prop="score">
        <el-input
          v-model="queryParams.score"
          placeholder="请输入工分值"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="工单类型" prop="docType">
        <el-select v-model="queryParams.docType" placeholder="请选择工单类型" clearable size="small">
          <el-option label="请选择字典生成" value=""/>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="工单编号" prop="docNo">
        <el-input
          v-model="queryParams.docNo"
          placeholder="请输入工单编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="作业小组" prop="jobGroupCode">
        <el-input
          v-model="queryParams.jobGroupCode"
          placeholder="请输入作业小组"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="业务编号" prop="businessNo">
        <el-input
          v-model="queryParams.businessNo"
          placeholder="请输入业务编号(一个编号对应多个单号)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['workpoint:record:add']"
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
          v-hasPermi="['workpoint:record:edit']"
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
          v-hasPermi="['workpoint:record:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['workpoint:record:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="recordList" @selection-change="handleSelectionChange">
      <!--<el-table-column type="selection" width="55" align="center"/>-->
      <el-table-column label="ID" align="center" prop="id"/>
      <el-table-column label="作业人员" align="center" prop="worker.wname"/>
      <el-table-column label="作业日期" align="center" prop="workDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.workDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工分类型" align="center" prop="pointTypeCode"/>
      <el-table-column label="工分标准" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.pointStandard.name+ '('+scope.row.pointStandard.score+')'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="作业小组" align="center" prop="group.name">

      </el-table-column>
      <el-table-column label="所获工分值" align="center" prop="score"/>
      <el-table-column label="场所" align="center" prop="placeId"/>
      <!--<el-table-column label="工单类型(入库单，出库单)" align="center" prop="docType"/>
      <el-table-column label="工单编号" align="center" prop="docNo"/>-->
     <!-- <el-table-column label="业务编号(一个编号对应多个单号)" align="center" prop="businessNo"/>-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <!--<el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['workpoint:record:edit']"
          >修改
          </el-button>-->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['workpoint:record:remove']"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改 工分记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="场所" prop="placeId">
              <el-select
                v-model="form.placeId" placeholder="请选择场所" size="small" @change="getPointStandard">
                <el-option
                  v-for="dept in depts"
                  :key="dept.deptId"
                  :label="dept.deptName"
                  :value="dept.deptId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作日期" prop="workDate">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.workDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择工作日期"
                              :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="工分标准" prop="pointStandardCode">
              <el-select filterable
                         v-model="form.pointStandardCode" placeholder="请选择工分标准" size="small">
                <el-option
                  v-for="stand in pointStandardList"
                  :key="stand.code"
                  :label="stand.name"
                  :value="stand.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作业小组" prop="jobGroupCode">
              <el-select v-model="form.jobGroupCode" filterable placeholder="请选择工分标准" size="small"
                         @change="getWorkerList">
                <el-option
                  v-for="stand in groupList"
                  :key="stand.code"
                  :label="stand.name"
                  :value="stand.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row :gutter="10">
          <el-col :span="12"></el-col>
          <el-col :span="12"></el-col>
        </el-row>-->
        <el-form-item label="作业人员" prop="workerCode">
          <el-select multiple filterable v-model="form.workerCode" placeholder="作业小组成员" size="small" style="width:90%">
            <el-option
              v-for="worker in workerList"
              :key="worker.wcode"
              :label="worker.wname"
              :value="worker.wcode">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="工分类型" prop="pointTypeCode">
          <el-input v-model="form.pointTypeCode" placeholder="请输入工分类型"/>
        </el-form-item>-->
        <!-- <el-form-item label="工分标准" prop="pointStandardCode">
           <el-input v-model="form.pointStandardCode" placeholder="请输入工分标准"/>
         </el-form-item>-->
        <!--<el-form-item label="工分值" prop="score">
          <el-input v-model="form.score" placeholder="请输入工分值"/>
        </el-form-item>-->
        <!--<el-form-item label="场所" prop="placeId">
          <el-input v-model="form.placeId" placeholder="请输入场所"/>
        </el-form-item>-->
        <!--<el-form-item label="工单类型(入库单，出库单)">
          <el-select v-model="form.docType" placeholder="请选择工单类型(入库单，出库单)">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>-->
        <!--<el-form-item label="工单编号" prop="docNo">
          <el-input v-model="form.docNo" placeholder="请输入工单编号"/>
        </el-form-item>-->

        <!--<el-form-item label="业务编号(一个编号对应多个单号)" prop="businessNo">
          <el-input v-model="form.businessNo" placeholder="请输入业务编号(一个编号对应多个单号)"/>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listRecord, getRecord, delRecord, addRecord, updateRecord} from "@/api/workpoint/record";
import {getUserDepts} from "@/utils/charutils";
import {listStandard} from "@/api/workpoint/standard";
import {listGroup} from "@/api/workpoint/group";

export default {
  name: "Record",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      //  工分记录表格数据
      recordList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        workDate: undefined,
        workerCode: undefined,
        pointTypeCode: undefined,
        pointStandardCode: undefined,
        score: undefined,
        placeId: undefined,
        docType: undefined,
        docNo: undefined,
        jobGroupCode: undefined,
        businessNo: undefined,
        orderByColumn: 'id',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        placeId: [
          {required: true, message: "场所不能为空", trigger: 'change'}
        ],
        workDate: [
          {required: true, message: "作业日期不能为空", trigger: 'change'}
        ],
        pointStandardCode: [
          {required: true, message: "工分标准不能为空", trigger: 'change'}
        ],
        jobGroupCode: [
          {required: true, message: "作业小组不能为空", trigger: 'change'}
        ],
        /*workerCode:[
          { required: true, message: "作业人员不能为空", trigger: 'change'}
        ]*/

      },
      depts: [],
      pointStandardList: [],
      groupList: [],
      workerList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      }
    };
  },
  created() {
    this.depts = getUserDepts('')
    this.getList();
    this.getGroupList()
  },
  methods: {
    /** 查询 工分记录列表 */
    getList() {
      this.loading = true;
      listRecord(this.queryParams).then(response => {
        this.recordList = response.rows;
        this.total = response.total;
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
        revision: undefined,
        id: undefined,
        workDate: undefined,
        workerCode: undefined,
        pointTypeCode: undefined,
        pointStandardCode: undefined,
        score: undefined,
        placeId: undefined,
        docType: undefined,
        docNo: undefined,
        jobGroupCode: undefined,
        businessNo: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
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
      this.title = "添加 工分记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getRecord(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改 工分记录";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateRecord(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            this.form.workerCode = this.form.workerCode.join(',')
            addRecord(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除 工分记录编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delRecord(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('workpoint/record/export', {
        ...this.queryParams
      }, `workpoint_record.xlsx`)
    },
    getPointStandard(event) { //场所变化，查询对应的工分标准
      this.pointStandardList = []
      listStandard({'placeId': event, 'state': '1'}).then(response => {
        if (response.rows.length > 0) {
          this.pointStandardList = response.rows;
        } else {
          this.$message.error('此场所暂未设置工分标准')
        }
      });
    },
    getGroupList() {//获取作业小组
      listGroup({}).then(response => {
        this.groupList = response.rows;
      });
    },
    getWorkerList(event) {
      let works = this.groupList.find(item => item.code === event)
      if (works != null) {
        this.workerList = works.jobWorkerList
        this.form.workerCode = []
        console.log(this.workerList)
        for (let work of this.workerList) {
          console.log(work)
          this.form.workerCode.push(work.wcode)
        }
      }
    }
  }
};
</script>
