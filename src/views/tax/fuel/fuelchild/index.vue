<template>
  <div class="app-container">
    <div class="mb20">
      <el-row :gutter="10" class="mb8">
<!--        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
            :disabled="multiple"
            v-hasPermi="['tax:fuel:add']"
          >新增
          </el-button>
        </el-col>-->

        <el-col :span="1.5">
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            :disabled="multiple"
            @click="handleHeadUpdate"
            v-hasPermi="['tax:fuel:edit']"
          >修改
          </el-button>
        </el-col>
      </el-row>
    </div>

    <el-card class="mb20">
      <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
        <el-row>
        <el-col :span="4.8">
          <el-form-item label="申请单编号" prop="applicationNumber" label-width=“50px”>
            <el-input
              v-model="queryParams.applicationNumber"
              placeholder="请输入序号"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4.8">
          <el-form-item label="加油站加油员" prop="gasStation" label-width=“50px”>
            <el-input
              v-model="queryParams.gasStation"
              placeholder="请输入加油站加油员"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4.8">
          <el-form-item label="公司加油人" prop="companyCheer" label-width=“50px”>
            <el-input
              v-model="queryParams.companyCheer"
              placeholder="请输入公司加油人"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4.8">
          <el-form-item label="证明人" prop="witness" label-width=“50px”>
            <el-input
              v-model="queryParams.witness"
              placeholder="请输入证明人"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="6">
          <el-form-item label="负责人" prop="principal" label-width=“80px”>
            <el-input
              v-model="queryParams.principal"
              placeholder="请输入负责人"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4.8">
          <el-form-item label="加油日期" prop="refuelingDate" label-width=“80px”>
            <el-date-picker clearable size="small" style="width: 200px"
                            v-model="queryParams.refuelingDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择加油日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4.8">
          <el-form-item label="加油量合计(公升)" prop="totalRefuelingAmount" label-width=“50px”>
            <el-input
              v-model="queryParams.totalRefuelingAmount"
              placeholder="请输入加油量合计(公升)"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4.8">
          <el-form-item label="单价" prop="unitPrice">
            <el-input
              v-model="queryParams.unitPrice"
              placeholder="请输入单价"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="4.8">
          <el-form-item label="总价" prop="totalPrice">
            <el-input
              v-model="queryParams.totalPrice"
              placeholder="请输入总价"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="备注" prop="remark" >
            <el-input type="textarea" :rows="2" style="width: 140px"
              v-model="queryParams.remark"
              placeholder="请输入备注"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        </el-row>
<!--      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>-->
    </el-form>
    </el-card>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          :disabled="multiple"
          v-hasPermi="['tax:fuelchild:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="multiple"
          @click="handleUpdate"
          v-hasPermi="['tax:fuelchild:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tax:fuelchild:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-refresh"
          size="mini"
          :disabled="multiple"
          @click="handleExport"
        >清空</el-button>
      </el-col>
    </el-row>

    <el-card>
    <el-table v-loading="loading" :data="fuelchildList" @selection-change="handleSelectionChange" @row-click='fuelchildClick'  :border="true">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="关联主表ID" align="center" prop="managementId" />-->
      <el-table-column label="序号" align="center" prop="serialNumber" />
      <el-table-column label="设备" align="center" prop="equipment" />
      <el-table-column label="加油规格" align="center" prop="fuelSpecification" />
      <el-table-column label="申请加油量（公升）" align="center" prop="applicationForRefueling" />
      <el-table-column label="单价" align="center" prop="unitPrice" />
      <el-table-column label="总价" align="center" prop="totalPrice" />
      <el-table-column label="备注" align="center" prop="remark" />
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:fuelchild:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tax:fuelchild:remove']"
          >删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>

      <el-form :model="form" ref="form" :inline="true"   label-width="68px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="序号" prop="serialNumber" label-width="95px">
              <el-input
                v-model="form.serialNumber"
                placeholder="请输入序号"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="设备" prop="equipment">
              <el-input
                v-model="form.equipment"
                placeholder="请输入设备"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="加油规格" prop="fuelSpecification">
              <el-input
                v-model="form.fuelSpecification"
                placeholder="请输入加油规格"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="申请加油量（公升）" prop="applicationForRefueling" label-width="95px">
              <el-input
                v-model="form.applicationForRefueling"
                placeholder="请输入申请加油量（公升）"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单价" prop="unitPrice">
              <el-input
                v-model="form.unitPrice"
                placeholder="请输入单价"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="总价" prop="totalPrice">
              <el-input
                v-model="form.totalPrice"
                placeholder="请输入总价"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" label-width="120px"
                v-model="form.remark"
                placeholder="请输入备注"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

    </el-card>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParamsFuelchild.pageNum"
      :limit.sync="queryParamsFuelchild.pageSize"
      @pagination="getFuelchildList"
    />

    <!-- 添加或修改加油费管理子对话框 -->
<!--    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="关联主表ID" prop="managementId">
          <el-input v-model="form.managementId" placeholder="请输入关联主表ID" />
        </el-form-item>
        <el-form-item label="序号" prop="serialNumber">
          <el-input v-model="form.serialNumber" placeholder="请输入序号" />
        </el-form-item>
        <el-form-item label="设备" prop="equipment">
          <el-input v-model="form.equipment" placeholder="请输入设备" />
        </el-form-item>
        <el-form-item label="加油规格" prop="fuelSpecification">
          <el-input v-model="form.fuelSpecification" placeholder="请输入加油规格" />
        </el-form-item>
        <el-form-item label="申请加油量" prop="applicationForRefueling">
          <el-input v-model="form.applicationForRefueling" placeholder="请输入申请加油量" />
        </el-form-item>
        <el-form-item label="单价" prop="unitPrice">
          <el-input v-model="form.unitPrice" placeholder="请输入单价" />
        </el-form-item>
        <el-form-item label="总价" prop="totalPrice">
          <el-input v-model="form.totalPrice" placeholder="请输入总价" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="创建人" prop="createBy">
          <el-input v-model="form.createBy" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.createTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="更新人" prop="updateBy">
          <el-input v-model="form.updateBy" placeholder="请输入更新人" />
        </el-form-item>
        <el-form-item label="更新时间" prop="updateTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.updateTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择更新时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>

<script>
import { listFuel, getFuel, delFuel, addFuel, updateFuel } from "@/api/tax/fuel";
import { listFuelchild, getFuelchild, delFuelchild, addFuelchild, updateFuelchild } from "@/api/tax/fuelchild";

export default {
  name: "Fuelchild",
  data() {
    return {
      managementId: undefined,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: false,
      // 总条数
      total: 0,
      // 加油费管理主表格数据
      fuelList: [],
      // 加油费管理子表格数据
      fuelchildList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        id: undefined,
        applicationNumber: undefined,
        gasStation: undefined,
        companyCheer: undefined,
        witness: undefined,
        principal: undefined,
        refuelingDate: undefined,
        totalRefuelingAmount: undefined,
        unitPrice: undefined,
        totalPrice: undefined,
        remark: undefined,
      },
      queryParamsFuelchild:{
        pageNum: 1,
        pageSize: 20,
        id: undefined,
        managementId: undefined,
        serialNumber: undefined,
        equipment: undefined,
        fuelSpecification: undefined,
        applicationForRefueling: undefined,
        unitPrice: undefined,
        totalPrice: undefined,
        remark: undefined
      },
      // 表单参数
      form: {
        id: undefined,
        managementId: undefined,
        serialNumber: undefined,
        equipment: undefined,
        fuelSpecification: undefined,
        applicationForRefueling: undefined,
        unitPrice: undefined,
        totalPrice: undefined,
        remark: undefined,
      },
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.queryParams.id = this.$route.query.id;
    this.queryParamsFuelchild.managementId = this.$route.query.id
    this.managementId  = this.$route.query.id
    this.multiple = this.$route.query.flag

    this.getList();
    this.getFuelchildList();
  },
  methods: {
    /** 查询加油费管理子列表 */
    getList() {
      this.loading = true;
      /*listFuelchild(this.queryParams).then(response => {
        this.fuelchildList = response.rows;
        this.total = response.total;
        this.loading = false;
      });*/
      getFuel(this.queryParams.id).then(response => {
        this.queryParams = response.data;
        console.log(this.form)
        this.loading = false;
      });
    },
    getFuelchildList(){
      listFuelchild(this.queryParamsFuelchild).then(response => {
        this.fuelchildList = response.rows;
        this.total = response.total;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },

    fuelchildClick(row, column, event){
      this.form.id = row.id
      this.form = JSON.parse(JSON.stringify(row))

    },

    // 表单重置
    reset() {
      this.queryParams = {
        id: undefined,
        applicationNumber: undefined,
        gasStation: undefined,
        companyCheer: undefined,
        witness: undefined,
        principal: undefined,
        refuelingDate: undefined,
        totalRefuelingAmount: undefined,
        remark: undefined,
        unitPrice: undefined,
        totalPrice: undefined
      };

      this.form={
        id: undefined,
        managementId: undefined,
        serialNumber: undefined,
        equipment: undefined,
        fuelSpecification: undefined,
        applicationForRefueling: undefined,
        unitPrice: undefined,
        totalPrice: undefined
      };
      this.resetForm("queryParams");
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
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.form.managementId = this.managementId;
      addFuelchild(this.form).then(response => {
        if (response.code === 200) {
          this.msgSuccess("新增成功");
          this.getFuelchildList()
          this.handleExport()
        }
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      /*this.reset();
      const id = row.id || this.ids
      getFuelchild(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改加油费管理子";
      });*/
      updateFuelchild(this.form).then(response => {
          if (response.code === 200) {
            this.msgSuccess("修改成功");
            this.getFuelchildList();
            this.handleExport()
          }
      });
    },

    //表头修改
    handleHeadUpdate(){
      updateFuel(this.queryParams).then(response => {
        if (response.code === 200) {
          this.msgSuccess("修改成功");
          this.getList()
        }

      })
    },

    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateFuel(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addFuel(this.form).then(response => {
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
      this.$confirm('是否确认删除加油费管理子编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delFuelchild(ids);
        }).then(() => {
          this.getFuelchildList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.resetForm("form");
    }
  }
};
</script>
