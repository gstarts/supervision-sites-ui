<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select v-model="queryParams.placeId" placeholder="请选择场所" @change="handleQuery">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="车辆类型" prop="viaType">
        <el-select v-model="queryParams.viaType" placeholder="请选择车辆类型" @change="handleQuery" clearable>
          <el-option
            v-for="dept in viaTypeOptions"
            :key="dept.dictValue"
            :label="dept.dictLabel"
            :value="dept.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="车号" prop="vehicleNo">
        <el-input
          v-model="queryParams.vehicleNo"
          placeholder="请输入车号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提煤单号" prop="coalBillNo">
        <el-input
          v-model="queryParams.coalBillNo"
          placeholder="请输入提煤单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同号" prop="contractNo">
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入合同号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请用户" prop="applyUser">
        <el-input
          v-model="queryParams.applyUser"
          placeholder="请输入申请用户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审批状态" prop="auditState">
        <el-select v-model="queryParams.auditState" clearable
                   size="small"
                   @change="handleQuery">
          <el-option v-for="item in auditStateOptions"
                     :key="item.dictValue"
                     :label="item.dictLabel"
                     :value="item.dictValue"
          />
        </el-select>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="modifyList" height="600">
      <!--<af-table-column type="selection" width="55" align="center"/>-->
      <!-- <af-table-column label="ID" align="center" prop="id" /> -->
      <!--      <af-table-column label="修改项" align="center" prop="modifyType" format="">
              <template slot-scope="scope">
                {{ formatModifyType(scope.row.modifyType) }}
              </template>
            </af-table-column>-->
      <af-table-column label="车号" align="center" prop="vehicleNo" fixed="left" width="100"/>
      <af-table-column label="修改后车号" align="center" prop="modifyVehicleNo" fixed="left" width="100"/>
      <af-table-column label="车辆类型" align="center" prop="viaType">
        <template slot-scope="scope">
          {{ scope.row.viaType === '01' ? '蒙煤车' : '外调车' }}
        </template>
      </af-table-column>
      <af-table-column label="磅单ID" align="center" prop="poundId"/>
      <af-table-column label="提煤单号" align="center" prop="coalBillNo"/>
      <af-table-column label="修改后提煤单号" align="center" prop="modifyCoalBillNo"/>
      <af-table-column label="合同号" align="center" prop="contractNo"/>
      <af-table-column label="修改后合同号" align="center" prop="modifyContractNo"/>
      <af-table-column label="库位号" align="center" prop="storeCode"/>
      <af-table-column label="修改后库位号" align="center" prop="modifyStoreCode"/>
      <af-table-column label="修改前皮重" align="center" prop="tareWeight"/>
      <af-table-column label="修改前毛重" align="center" prop="roughWeight"/>
      <af-table-column label="修改前净重" align="center" prop="netWeight"/>
      <af-table-column label="修改后皮重" align="center" prop="modifyTareWeight"/>
      <af-table-column label="修改后毛重" align="center" prop="modifyRoughWeight"/>
      <af-table-column label="修改后净重" align="center" prop="modifyNetWeight"/>
      <af-table-column label="申请时间" align="center" prop="applyTime" width="180"/>
      <af-table-column label="申请用户" align="center" prop="applyUser"/>
      <af-table-column label="申请说明" align="center" prop="applyReason"/>
      <af-table-column label="审批人" align="center" prop="auditUser"/>
      <af-table-column label="审批时间" align="center" prop="auditTime" width="180"/>
      <af-table-column label="审批状态" align="center" prop="auditState" :formatter="auditStateFormatter"/>
      <af-table-column label="审批说明" align="center" prop="auditReason"/>
      <!-- <af-table-column label="审批人2" align="center" prop="auditUser2" />
      <af-table-column label="审批时间2" align="center" prop="auditTime2" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.auditTime2, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="审批结果2 1同意0不同意" align="center" prop="auditResult2" />
      <af-table-column label="审批说明2" align="center" prop="auditReason2" />
      <af-table-column label="备注" align="center" prop="remark" />
      <af-table-column label="乐观锁" align="center" prop="revision" /> -->
      <af-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button v-show="scope.row.auditState === '0'"
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleUpdate(scope.row)"
                     v-hasPermi="['place:modify:audit']"
          >审批
          </el-button>
        </template>
      </af-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改磅单修改记录 对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="10" style="margin-bottom: 14px;font-size: 14px;font-weight: bold">
          <el-col :span="8" :offset="2">
            车号：{{ selectPound.plateNum }}
          </el-col>
          <el-col :span="12">
            磅单状态：{{ selectPound.status === '0' ? '正常' : '申请修改' }}
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-bottom: 14px;font-size: 14px;font-weight: bold">
          <el-col :span="7" :offset="2">
            收货单位:{{ selectPound.deliveryUnit }}
          </el-col>
          <el-col :span="6" :offset="1">
            发货单位:{{ selectPound.receivingUnit }}
          </el-col>
          <el-col :span="5" :offset="3">
            流向:{{ selectPound.flowDirection == 'E' ? '出场' : '进场' }}
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-bottom: 14px;font-size: 14px;font-weight: bold">
          <el-col :span="6" :offset="2">
            入场时间:{{ selectPound.createTime }}
          </el-col>
          <el-col :span="6" :offset="2">
            进场时间:{{ selectPound.updateTime }}
          </el-col>
          <el-col :span="5" :offset="3">
            库位号:{{ selectPound.locationNumber }}
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-bottom: 14px;font-size: 14px;font-weight: bold">
          <el-col :span="6" :offset="2">
            货物名称:{{ selectPound.goodsName }}
          </el-col>
          <el-col :span="6" :offset="2">
            包装方式:{{ selectPound.packMode == '1' ? '集装箱' : '散装' }}
          </el-col>
          <el-col :span="5" :offset="3">
            车辆类型:{{ selectPound.viaType == '01' ? '蒙煤车' : '外调车' }}
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-bottom: 14px;font-size: 14px;font-weight: bold">
          <el-col :span="6" :offset="2">
            提煤单号:{{ selectPound.coalBillNum }}
          </el-col>
          <el-col :span="6" :offset="2">
            合同号:{{ selectPound.remark }}
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="20" :offset="1" class="modify">
            修改项
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" :offset="2" class="modify">
            车牌号:{{ selectModify.vehicleNo }}
          </el-col>
          <el-col :span="6" :offset="1" class="modify">修改为</el-col>
          <el-col :span="7" :offset="0" class="modify"
                  :style="{color:selectModify.modifyVehicleNo!==selectModify.vehicleNo?'red':'#606266'}">
            车牌号:{{ selectModify.modifyVehicleNo }}
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" :offset="2" class="modify">
            合同号:{{ selectModify.contractNo }}
          </el-col>
          <el-col :span="6" :offset="1" class="modify">修改为</el-col>
          <el-col :span="7" :offset="0" class="modify"
                  :style="{color:selectModify.contractNo!==selectModify.modifyContractNo?'red':'#606266'}">
            合同号:{{ selectModify.modifyContractNo }}
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" :offset="2" class="modify">
            提煤单号:{{ selectModify.coalBillNo }}
          </el-col>
          <el-col :span="6" :offset="1" class="modify">修改为</el-col>
          <el-col :span="7" :offset="0" class="modify"
                  :style="{color:selectModify.coalBillNo!==selectModify.modifyCoalBillNo?'red':'#606266'}">
            提煤单号:{{ selectModify.modifyCoalBillNo }}
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="5" :offset="2" class="modify">
            皮重:{{ selectModify.tareWeight }}
          </el-col>
          <el-col :span="5" :offset="2" class="modify">修改为</el-col>
          <el-col :span="5" :offset="2" class="modify"
                  :style="{color:selectModify.tareWeight!==selectModify.modifyTareWeight?'red':'#606266'}">
            皮重:{{ selectModify.modifyTareWeight }}
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="5" :offset="2" class="modify">
            毛重:{{ selectModify.roughWeight }}
          </el-col>
          <el-col :span="5" :offset="2" class="modify">修改为</el-col>
          <el-col :span="5" :offset="2" class="modify"
                  :style="{color:selectModify.roughWeight!==selectModify.modifyRoughWeight?'red':'#606266'}">
            毛重:{{ selectModify.modifyRoughWeight }}
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="5" :offset="2" class="modify">
            净重:{{ selectModify.netWeight }}
          </el-col>
          <el-col :span="5" :offset="2" class="modify">修改为</el-col>
          <el-col :span="5" :offset="2" class="modify"
                  :style="{color:selectModify.netWeight!==selectModify.modifyNetWeight?'red':'#606266'}">
            净重:{{ selectModify.modifyNetWeight }}
          </el-col>
        </el-row>
        <el-row v-show="selectPound.packMode === '1'">
          <el-row :gutter="10">
            <el-col :span="5" :offset="2" class="modify">
              集装箱号1:{{ selectModify.containerNo1 }}
            </el-col>
            <el-col :span="5" :offset="2" class="modify">修改为</el-col>
            <el-col :span="5" :offset="2" class="modify">
              集装箱号1:{{ selectModify.modifyContainerNo1 }}
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="5" :offset="2" style="margin-bottom: 14px;font-size: 18px;font-weight: bold">
              集装箱号2:{{ selectModify.containerNo2 }}
            </el-col>
            <el-col :span="5" :offset="2" style="margin-bottom: 14px;font-size: 18px;font-weight: bold">修改为</el-col>
            <el-col :span="5" :offset="2" style="margin-bottom: 14px;font-size: 18px;font-weight: bold">
              集装箱号2:{{ selectModify.modifyContainerNo2 }}
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="5" :offset="2" style="margin-bottom: 14px;font-size: 18px;font-weight: bold">
              集装箱号3:{{ selectModify.containerNo3 }}
            </el-col>
            <el-col :span="5" :offset="2" style="margin-bottom: 14px;font-size: 18px;font-weight: bold">修改为</el-col>
            <el-col :span="5" :offset="2" style="margin-bottom: 14px;font-size: 18px;font-weight: bold">
              集装箱号3:{{ selectModify.modifyContainerNo3 }}
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="5" :offset="2" style="margin-bottom: 14px;font-size: 18px;font-weight: bold">
              集装箱号4:{{ selectModify.containerNo4 }}
            </el-col>
            <el-col :span="5" :offset="2" style="margin-bottom: 14px;font-size: 18px;font-weight: bold">修改为</el-col>
            <el-col :span="5" :offset="2" style="margin-bottom: 14px;font-size: 18px;font-weight: bold">
              集装箱号4:{{ selectModify.modifyContainerNo4 }}
            </el-col>
          </el-row>
        </el-row>

        <!--显示磅单相关信息-->
        <!-- <el-form-item label="磅单ID" prop="poundId">
           <el-input v-model="form.poundId" placeholder="请输入磅单ID" />
         </el-form-item>
         <el-form-item label="磅单状态 I进场，E出场" prop="poundState">
           <el-input v-model="form.poundState" placeholder="请输入磅单状态 I进场，E出场" />
         </el-form-item>
         <el-form-item label="修改前皮重" prop="tareWeight">
           <el-input v-model="form.tareWeight" placeholder="请输入修改前皮重" />
         </el-form-item>
         <el-form-item label="修改前毛重" prop="roughWeight">
           <el-input v-model="form.roughWeight" placeholder="请输入修改前毛重" />
         </el-form-item>
         <el-form-item label="修改前净重" prop="netWeight">
           <el-input v-model="form.netWeight" placeholder="请输入修改前净重" />
         </el-form-item>
         <el-form-item label="修改后皮重" prop="modifyTareWeight">
           <el-input v-model="form.modifyTareWeight" placeholder="请输入修改后皮重" />
         </el-form-item>
         <el-form-item label="修改后毛重" prop="modifyRoughWeight">
           <el-input v-model="form.modifyRoughWeight" placeholder="请输入修改后毛重" />
         </el-form-item>
         <el-form-item label="修改后净重" prop="modifyNetWeight">
           <el-input v-model="form.modifyNetWeight" placeholder="请输入修改后净重" />
         </el-form-item>
         <el-form-item label="申请时间" prop="applyTime">
           <el-date-picker clearable size="small" style="width: 200px"
             v-model="form.applyTime"
             type="date"
             value-format="yyyy-MM-dd"
             placeholder="选择申请时间">
           </el-date-picker>
         </el-form-item>
         <el-form-item label="申请用户" prop="applyUser">
           <el-input v-model="form.applyUser" placeholder="请输入申请用户" />
         </el-form-item>
         <el-form-item label="申请说明" prop="applyReason">
           <el-input v-model="form.applyReason" type="textarea" placeholder="请输入内容" />
         </el-form-item>-->
        <!-- <el-form-item label="审批人" prop="auditUser">
           <el-input v-model="form.auditUser" placeholder="请输入审批人" />
         </el-form-item>
         <el-form-item label="审批时间" prop="auditTime">
           <el-date-picker clearable size="small" style="width: 200px"
             v-model="form.auditTime"
             type="date"
             value-format="yyyy-MM-dd"
             placeholder="选择审批时间">
           </el-date-picker>
         </el-form-item>-->
        <el-form-item label="审批" prop="auditState">
          <el-select v-model="form.auditState" placeholder="请选择审批结果">
            <el-option
              v-for="dept in auditStateFormDic"
              :key="dept.key"
              :label="dept.value"
              :value="dept.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="审批说明" prop="auditReason">
          <el-input v-model="form.auditReason" type="textarea" placeholder="请输入审批说明"/>
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
import {listModify, getModify, delModify, addModify, updateModify, auditModify} from "@/api/place/modify";
import {getUserDepts} from "@/utils/charutils";
import {getSheetById} from "@/api/pound/poundlist";

export default {
  name: "Modify",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      depts: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 磅单修改记录 表格数据
      modifyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        auditState: undefined,
        vehicleNo: undefined,
        coalBillNo: undefined,
        contractNo: undefined,
        orderByColumn: 'id',
        isAsc: 'desc'
      },
      selectModify: {
        modifyTareWeight: undefined,
        modifyRoughWeight: undefined,
        modifyNetWeight: undefined,
        auditState: undefined,
        auditReason: undefined,
      },
      selectPound: {},
      // 表单参数
      form: {
        auditState: undefined,
        auditReason: undefined,
      },
      // 表单校验
      rules: {
        modifyTareWeight: [{required: true, message: '皮重不能为空', trigger: 'blur'},
          {type: "number", message: "皮重需为数字", trigger: "blur"}],
        modifyRoughWeight: [{required: true, message: '毛重不能为空', trigger: 'blur'},
          {type: "number", message: "毛重需为数字", trigger: "blur"}],
        modifyNetWeight: [{required: true, message: '净重不能为空', trigger: 'blur'},
          {type: "number", message: "净重需为数字", trigger: "blur"}],

        /* poundId: [
           { required: true, message: "磅单ID不能为空", trigger: "blur" }
         ],
         modifyTareWeight: [
           { required: true, message: "修改后皮重不能为空", trigger: "blur" }
         ],
         modifyRoughWeight: [
           { required: true, message: "修改后毛重不能为空", trigger: "blur" }
         ],
         applyTime: [
           { required: true, message: "申请时间不能为空", trigger: "blur" }
         ],
         applyUser: [
           { required: true, message: "申请用户不能为空", trigger: "blur" }
         ],*/
        auditState: [{required: true, message: "审批结果不能为空", trigger: "change"}],
        auditReason: [{required: true, message: "审批说明不能为空", trigger: "blur"}]
      },
      auditStateOptions: [
        {'dictValue': '0', 'dictLabel': '申请中'},
        {'dictValue': '1', 'dictLabel': '审批通过'},
        {'dictValue': '2', 'dictLabel': '审批不通过'},
      ],
      auditStateFormDic: [
        {'key': '1', 'value': '通过'},
        {'key': '2', 'value': '不通过'},
      ],
      viaTypeOptions: [
        {'dictValue': '01', 'dictLabel': '蒙煤车'},
        {'dictValue': '02', 'dictLabel': '外调车'},
      ],
      modifyTypeDic: [
        {'dictValue': '1', 'dictLabel': '合同号'},
        {'dictValue': '2', 'dictLabel': '提煤单号'},
        {'dictValue': '3', 'dictLabel': '车牌号'},
        {'dictValue': '4', 'dictLabel': '重量'},
      ]
    }
  },
  created() {
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.getList();
    }
    //this.getList();
  },
  methods: {
    /** 查询磅单修改记录 列表 */
    getList() {
      this.loading = true;
      listModify(this.queryParams).then(response => {
        this.modifyList = response.rows;
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
        poundId: undefined,
        poundState: undefined,
        tareWeight: undefined,
        roughWeight: undefined,
        netWeight: undefined,
        modifyTareWeight: undefined,
        modifyRoughWeight: undefined,
        modifyNetWeight: undefined,
        applyTime: undefined,
        applyUser: undefined,
        applyReason: undefined,
        auditUser: undefined,
        auditTime: undefined,
        auditState: undefined,
        auditReason: undefined,
        auditUser2: undefined,
        auditTime2: undefined,
        auditResult2: undefined,
        auditReason2: undefined,
        createTime: undefined,
        createBy: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
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
      this.title = "添加磅单修改记录 ";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      getSheetById(row.poundId).then(response => {
        if (response.code === 200) {
          if (response.data != null) {
            this.selectPound = response.data
            const id = row.id || this.ids
            this.selectModify = row
            getModify(id).then(response => {
              this.form = response.data;
              this.open = true;
              this.title = "审批磅单修改申请";
              this.form.auditState = '1' //默认给通过状态
            });
          } else {
            this.$message.error("申请修改的磅单不存在")
            return false
          }
        }
      })

    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            auditModify(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("审批完成");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addModify(this.form).then(response => {
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
      this.$confirm('是否确认删除磅单修改记录 编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delModify(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/modify/export', {
        ...this.queryParams
      }, `place_modify.xlsx`)
    },
    formatModifyType(val) {
      let value = this.modifyTypeDic.find(item => item.dictValue === val)
      if (value) {
        return value.dictLabel
      } else {
        return val
      }
    },
    auditStateFormatter(row, column) {
      return this.selectDictLabel(this.auditStateOptions, row.auditState);
    },
  }
};
</script>
<style scoped>
.modify {
  margin-bottom: 14px;
  font-size: 16px;
  font-weight: bold
}

</style>
