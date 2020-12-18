<template>
  <div class="app-container">

    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="单据号" prop="documentNo">
            <el-input
              v-model="queryParams.documentNo"
              placeholder="请输入单据号"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="lot_no" prop="lotNo">
            <el-input
              v-model="queryParams.lotNo"
              placeholder="请输入lot_no"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="shipment_no" prop="shipmentNo" label-width="100px">
            <el-input
              v-model="queryParams.shipmentNo"
              placeholder="请输入shipment_no"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="车队名称" prop="fleetName">
            <el-input
              v-model="queryParams.fleetName"
              placeholder="请输入车队名称"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <!--      <el-form-item label="业务部门" prop="businessDepartment">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.businessDepartment"-->
      <!--          placeholder="请输入业务部门"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="业务时间" prop="businessDate">-->
      <!--        <el-date-picker clearable size="small" style="width: 200px"-->
      <!--          v-model="queryParams.businessDate"-->
      <!--          type="date"-->
      <!--          value-format="yyyy-MM-dd"-->
      <!--          placeholder="选择业务时间">-->
      <!--        </el-date-picker>-->
      <!--      </el-form-item>-->


      <!--      <el-form-item label="通知单车数" prop="carNumber">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.carNumber"-->
      <!--          placeholder="请输入通知单车数"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="录入人" prop="entryPerson">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.entryPerson"-->
      <!--          placeholder="请输入录入人"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item label="录入时间" prop="entryTime">
        <el-date-picker clearable size="small" style="width: 200px"
                        v-model="queryParams.entryTime"
                        placeholder="请输入录入时间"
                        type="datetime"
                        value-format="yyyy-MM-dd">
                        placeholder="选择录入时间">
        </el-date-picker>
      </el-form-item>


      <!--      <el-form-item label="修改人" prop="updatePerson">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.updatePerson"-->
      <!--          placeholder="请输入修改人"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->

      <!--      <el-form-item label="审核人" prop="reviewer">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.reviewer"-->
      <!--          placeholder="请输入审核人"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item label="审核日期" prop="reviewDate">
        <el-date-picker clearable size="small" style="width: 200px"
                        v-model="queryParams.reviewDate"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择审核日期">
        </el-date-picker>
      </el-form-item>

      <!--      <el-form-item label="备注" prop="remarks">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.remarks"-->
      <!--          placeholder="请输入备注"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->

      <!--      <el-form-item label="执行" prop="status">-->
      <!--        <el-select v-model="queryParams.status" placeholder="请选择执行" clearable size="small">-->
      <!--          <el-option label="请选择字典生成" value="" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->

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
          v-hasPermi="['tax:management:add']"
        >新增
        </el-button>
      </el-col>
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['tax:management:edit']"-->
<!--        >修改-->
<!--        </el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tax:management:remove']"
        >删除
        </el-button>
      </el-col>
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['tax:management:export']"-->
<!--        >导出-->
<!--        </el-button>-->
<!--      </el-col>-->
    </el-row>

    <el-table v-loading="loading" :data="managementList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <!-- <el-table-column label="主键" align="center" prop="id"/>-->
      <el-table-column label="单据号" align="center" prop="documentNo"/>
      <el-table-column label="业务部门" align="center" prop="businessDepartment"/>
      <el-table-column label="业务时间" align="center" prop="businessDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.businessDate, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="lot_no" align="center" prop="lotNo"/>
      <el-table-column label="shipment no" align="center" prop="shipmentNo"/>
      <el-table-column label="车队名称" align="center" prop="fleetName"/>
      <el-table-column label="状态" align="center"  prop="status" :formatter="translation"/>
      <el-table-column label="录入人" align="center" prop="entryPerson"/>
      <el-table-column label="录入时间" align="center" prop="entryTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.entryTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改人" align="center" prop="updatePerson"/>
      <el-table-column label="最近修改时间" align="center" prop="updateTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="审核人" align="center" prop="reviewer"/>
      <el-table-column label="审核日期" align="center" prop="reviewDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.reviewDate, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>


      <!--      <el-table-column label="通知单车数" align="center" prop="carNumber"/>-->


      <!--      <el-table-column label="备注" align="center" prop="remarks"/>-->

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:management:edit']"
          >修改
          </el-button>
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['tax:management:remove']"-->
<!--          >删除-->
<!--          </el-button>-->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-detail"
            @click="handleDetail(scope.row)"
            v-hasPermi="['tax:management:remove']"
          >详情
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

    <!-- 添加或修改司机食宿管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="单据号" prop="documentNo">
              <el-input v-model="form.documentNo" placeholder="请输入单据号"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
          <el-form-item label="业务部门" prop="businessDepartment">
            <el-input v-model="form.businessDepartment" placeholder="请输入业务部门"/>
          </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
        <el-form-item label="业务时间" prop="businessDate">
          <el-date-picker clearable size="small" style="width: 200px"
                          v-model="form.businessDate"
                          type="datetime"
                          value-format="yyyy-MM-dd"
                          placeholder="选择业务时间">
          </el-date-picker>
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="shipment no" prop="shipmentNo">
          <el-input v-model="form.shipmentNo" placeholder="请输入shipment no"/>
        </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
        <el-form-item label="lot_no" prop="lotNo">
          <el-input v-model="form.lotNo" placeholder="请输入lot_no"/>
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="通知单车数" prop="carNumber">
          <el-input v-model="form.carNumber" placeholder="请输入通知单车数"/>
        </el-form-item>
          </el-col>

        </el-row>


        <el-row>
          <el-col :span="12">
        <el-form-item label="录入人" prop="entryPerson">
          <el-input v-model="form.entryPerson" placeholder="请输入录入人"/>
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="录入时间" prop="entryTime">
          <el-date-picker clearable size="small" style="width: 200px"
                          v-model="form.entryTime"
                          type="datetime"
                          value-format="yyyy-MM-dd"
                          placeholder="选择录入时间">
          </el-date-picker>
        </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
        <el-form-item label="车队名称" prop="fleetName">
          <el-input v-model="form.fleetName" placeholder="请输入车队名称"/>
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="修改人" prop="updatePerson">
          <el-input v-model="form.updatePerson" placeholder="请输入修改人"/>
        </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择执行" clearable size="small">
              <el-option
                v-for="item in statusList"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              />
            </el-select>
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="审核人" prop="reviewer">
          <el-input v-model="form.reviewer" placeholder="请输入审核人"/>
        </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
        <el-form-item label="审核日期" prop="reviewDate">
          <el-date-picker clearable size="small" style="width: 200px"
                          v-model="form.reviewDate"
                          type="datetime"
                          value-format="yyyy-MM-dd"
                          placeholder="选择审核日期">
          </el-date-picker>
        </el-form-item>
          </el-col>

          <el-col :span="12">
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" placeholder="请输入备注"/>
        </el-form-item>
          </el-col>
        </el-row>
        <el-row>

        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {listManagement, getManagement, delManagement, addManagement, updateManagement} from "@/api/tax/management";

  export default {
    name: "Management",
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
        // 司机食宿管理表格数据
        managementList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,

        statusList: [
          {dictValue: 0, dictLabel: '未执行'},
          {dictValue: 1, dictLabel: '执行'}
        ],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 20,
          documentNo: undefined,
          businessDepartment: undefined,
          businessDate: undefined,
          shipmentNo: undefined,
          lotNo: undefined,
          carNumber: undefined,
          entryPerson: undefined,
          entryTime: undefined,
          fleetName: undefined,
          updatePerson: undefined,
          reviewer: undefined,
          reviewDate: undefined,
          remarks: undefined,
          status: undefined
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {}
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询司机食宿管理列表 */
      getList() {
        this.loading = true;
        listManagement(this.queryParams).then(response => {
          this.managementList = response.rows;
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
          id: undefined,
          documentNo: undefined,
          businessDepartment: undefined,
          businessDate: undefined,
          shipmentNo: undefined,
          lotNo: undefined,
          carNumber: undefined,
          entryPerson: undefined,
          entryTime: undefined,
          fleetName: undefined,
          updatePerson: undefined,
          updateTime: undefined,
          reviewer: undefined,
          reviewDate: undefined,
          remarks: undefined,
          status: 0
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

      translation(row, column) {
        return this.selectDictLabel(this.statusList, row.status);
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
        this.title = "添加司机食宿管理";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids;
        this.$router.push({path: '/tax/managementDetail', query: {id: id}})
        this.title = "修改";
        // getManagement(id).then(response => {
        //   this.form = response.data;
        //   this.open = true;
        //   this.title = "修改司机食宿管理";
        // });

      },

      // 详情页跳转
      handleDetail(row) {
        const id = row.id || this.ids
        // const data = this.router.find(el => el.messageType === row.messageType)
        // 调用 某页面 的初始化方法
        this.$router.push({path: '/tax/managementDetail', query: {id: id,flag:true}})
      },
      /** 提交按钮 */
      submitForm: function () {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != undefined) {
              updateManagement(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                }
              });
            } else {
              addManagement(this.form).then(response => {
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
        this.$confirm('是否确认删除司机食宿管理编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return delManagement(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function () {
        });
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('tax/management/export', {
          ...this.queryParams
        }, `tax_management.xlsx`)
      }
    }
  };
</script>
