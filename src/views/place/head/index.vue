<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="clearall"
          v-hasPermi="['place:head:clear']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          @click="submitForm()"
          v-hasPermi="['place:head:add']"
        >暂存</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['place:head:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['place:head:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:head:export']"
        >导出</el-button>
      </el-col> -->
    </el-row>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" size="mini">
      <el-row>
        <el-col :span="6">
          <el-form-item label="提煤单号" prop="coalBillNo">
            <el-input v-model="form.coalBillNo" placeholder="请输入提煤单号" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业务类型" prop="rdCode">
            <el-select v-model="form.rdCode" placeholder="请选择业务类型">
                <el-option
                  v-for="dict in businessTypeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
          </el-form-item>
        </el-col>        
        <el-col :span="6">
          <el-form-item label="进出口标志" prop="ieflag">
            <el-select v-model="form.ieflag" placeholder="请选择进出口方式">
                <el-option
                  v-for="dict in importExitOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
          </el-form-item>
        </el-col>  
        <el-col :span="6">
          <el-form-item label="车牌号" prop="plateNo">
            <el-input v-model="form.plateNo" placeholder="请输入车牌号" />
          </el-form-item>
        </el-col>      
      </el-row> 
      <el-row>
        <el-col :span="6">
          <el-form-item label="唯一编号" prop="sureId" >
            <el-input v-model="form.sureId" placeholder="请输入系统自动生成唯一编号" disabled/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="回执状态" prop="feedback">
            <el-select v-model="form.feedback" placeholder="请选择回执状态">
                <el-option
                  v-for="dict in declearStatusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="回执说明" prop="feedbackMsg">
            <el-input v-model="form.feedbackMsg" placeholder="请输入回执说明" />
          </el-form-item>
        </el-col>
      </el-row>    
      </el-form>

    <!-- 小提煤单body列表 -->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="clearBody"
          v-hasPermi="['place:body:clear']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          @click="submitBodyForm"
          v-hasPermi="['place:body:add','place:body:edit']"
        >暂存</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['place:body:remove']"
        >删除</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="headList" @selection-change="handleSelectionChange" @cell-dblclick="doubleClick" height="500px">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="通关单号" align="center" prop="customsClearanceNo" />
      <el-table-column label="运输批次号" align="center" prop="batchNo" />
      <el-table-column label="提货重量" align="center" prop="weight" />
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['place:body:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['place:body:remove']"
          >删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <el-form ref="bodyForm" :model="bodyForm" :rules="rules" label-width="120px" size="mini">
      <el-row>
        <el-col :span="8">
          <el-form-item label="通关单号" prop="customsClearanceNo">
            <el-input v-model="bodyForm.customsClearanceNo" placeholder="请输入通关单号" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="运输批次号" prop="batchNo">
            <el-input v-model="bodyForm.batchNo" placeholder="请输入运输批次号" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="提货重量" prop="weight">
            <el-input v-model="bodyForm.weight" placeholder="请输入提货重量" />
          </el-form-item>   
        </el-col>             
      </el-row>
      </el-form>

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="大提煤单id" prop="bigId">
          <el-input v-model="form.bigId" placeholder="请输入大提煤单id" />
        </el-form-item>
        <el-form-item label="车牌号" prop="plateNo">
          <el-input v-model="form.plateNo" placeholder="请输入车牌号" />
        </el-form-item>
        <el-form-item label="进出口标志(I-进口,E-出口)" prop="ieflag">
          <el-input v-model="form.ieflag" placeholder="请输入进出口标志(I-进口,E-出口)" />
        </el-form-item>
        <el-form-item label="业务类型" prop="rdCode">
          <el-input v-model="form.rdCode" placeholder="请输入业务类型" />
        </el-form-item>
        <el-form-item label="系统自动生成唯一编号 年月6位+13位卡号+13位流水号" prop="sureId">
          <el-input v-model="form.sureId" placeholder="请输入系统自动生成唯一编号 年月6位+13位卡号+13位流水号" />
        </el-form-item>
        <el-form-item label="回执状态 (0:待申报 1:可申报 2:已上传3:已驳回 10:审批通过 20:审批退单 40:已办结 41:已锁定 42:解除锁定 43:人工办结 50:已口岸离场)" prop="feedback">
          <el-input v-model="form.feedback" placeholder="请输入回执状态 (0:待申报 1:可申报 2:已上传3:已驳回 10:审批通过 20:审批退单 40:已办结 41:已锁定 42:解除锁定 43:人工办结 50:已口岸离场)" />
        </el-form-item>
        <el-form-item label="回执说明" prop="feedbackMsg">
          <el-input v-model="form.feedbackMsg" placeholder="请输入回执说明" />
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
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="乐观锁" prop="revision">
          <el-input v-model="form.revision" placeholder="请输入乐观锁" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listHead, detailsHead, getHead, delHead, addHead, updateHead } from "@/api/place/head";
import { listBody, addBody, updateBody, delBody, getBody } from "@/api/place/body";

export default {
  name: "Head",
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
      //进出口标志
      importExitOptions: [],
      // 业务类型
      businessTypeOptions: [],
      // 回执状态
      declearStatusOptions: [],
      // 【请填写功能名称】表格数据
      headList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        coalBillNo: undefined,
        plateNo: undefined,
        ieflag: undefined,
        rdCode: undefined,
        sureId: undefined,
        feedback: undefined,
        feedbackMsg: undefined,
        revision: undefined
      },
      // 表单参数
      form: {},
      // 表体参数
      bodyForm: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {    
    const { tableId } = this.$route.query;
    if (tableId) {
      //将表头id 保存
      this.queryParams.id = tableId;
      // 获取表详细信息
      this.loading = true;
      detailsHead(this.queryParams).then((response) => {
        this.headList = response.data.body;
        this.form = response.data.head;
        console.log(this.form)
        this.loading = false;
      });      
    }else{
      this.getList();
    }
    this.getDicts('station_IE_flag').then(response => {
      this.importExitOptions = response.data
    }),
    this.getDicts('station_business_type').then(response => {
      this.businessTypeOptions = response.data
    }),
    this.getDicts('station_declear_status').then(response => {
      this.declearStatusOptions = response.data
    })
    
  },
  methods: {
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listBody(this.queryParams).then(response => {
        this.headList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 行点击按钮 */
    doubleClick(row, column, cell, event) {
      if (row.id != undefined) {
        getBody(row.id).then(res => {
          if (res.code === 200) {
            this.bodyForm = res.data;
          }
        });
      }
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    /**清空全部表单 */
    clearall: function() {
      this.reset();
      this.clearBody();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        plateNo: undefined,
        ieflag: undefined,
        rdCode: undefined,
        sureId: undefined,
        feedback: undefined,
        feedbackMsg: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        revision: undefined
      };
      this.resetForm("form");
    },
    
    // 重置表体信息
    clearBody() {
      this.bodyForm = {
        id: undefined,
        customsClearanceNo: undefined,
        batchNo: undefined,
        weight: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        revision: undefined
      };
      
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
      this.reset();
      this.open = true;
      this.title = "添加【请填写功能名称】";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getHead(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【请填写功能名称】";
      });
    },
    /** 表体提交按钮 */
    submitBodyForm: function() {
      this.$refs["bodyForm"].validate(valid => {
        if(this.bodyForm.headId != undefined){
        if (valid) {
          if (this.bodyForm.id != undefined) {
            updateBody(this.bodyForm).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.getList();
                this.bodyForm = {
                  customsClearanceNo:undefined,
                  batchNo:undefined,
                  weight:undefined
                }
              }
            });
          } else {
            addBody(this.bodyForm).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.getList();
                this.bodyForm = {
                  customsClearanceNo:undefined,
                  batchNo:undefined,
                  weight:undefined
                }
              }
            });
          }
        }
      }else{
        this.msgError("表头信息未暂存");
      }
      });
    },

    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateHead(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addHead(this.form).then(response => {
              if (response.code === 200) {
                this.bodyForm.headId = response.data;
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
      this.$confirm('是否确认删除【请填写功能名称】编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delBody(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/head/export', {
        ...this.queryParams
      }, `place_head.xlsx`)
    }
  }
};
</script>