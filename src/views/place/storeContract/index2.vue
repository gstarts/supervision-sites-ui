<template>
<!--
 2021-01-20 计费功能以前的页面，留个备份
-->
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select @change="handleQuery"
                   v-model="queryParams.placeId" placeholder="请选择场所" size="small">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"/>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="计费方式" prop="chargeMethod">
        <el-input
          v-model="queryParams.chargeMethod"
          placeholder="请输入计费方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="计费方式" prop="chargeMode">
        <el-input
          v-model="queryParams.chargeMode"
          placeholder="请输入计费方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="计费周期" prop="chargePeriod">
        <el-input
          v-model="queryParams.chargePeriod"
          placeholder="请输入计费周期"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="合同编号" prop="contractNo">
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入合同编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户名称" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入客户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="失效日期" prop="endDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.endDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择失效日期">
        </el-date-picker>
      </el-form-item>-->
      <!--<el-form-item label="场所ID" prop="placeId">
        <el-input
          v-model="queryParams.placeId"
          placeholder="请输入场所ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="结算周期" prop="settlementPeriod">
        <el-input
          v-model="queryParams.settlementPeriod"
          placeholder="请输入结算周期"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="签订日期" prop="signDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.signDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择签订日期">
        </el-date-picker>
      </el-form-item>-->
      <!--<el-form-item label="生效日期" prop="startDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.startDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择生效日期">
        </el-date-picker>
      </el-form-item>-->
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
          v-hasPermi="['place:storeContract:add']"
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
          v-hasPermi="['place:storeContract:edit']"
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
          v-hasPermi="['place:storeContract:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:storeContract:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="storeContractList">
      <af-table-column label="ID" align="center" prop="id"/>
      <!--<af-table-column label="场所ID" align="center" prop="placeId"/>-->
      <af-table-column label="合同编号" align="center" prop="contractNo"/>
      <af-table-column label="客户名称" align="center" prop="customerName"/>
      <af-table-column label="品名" align="center" prop="goodsName"/>
      <af-table-column label="散货库位" align="center" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.params.contract.map(item => item.storeCode) }}</span>
        </template>
      </af-table-column>
      <af-table-column label="计费方式" align="center" prop="chargeMethod"/>
      <af-table-column label="计费方式" align="center" prop="chargeMode"/>
      <af-table-column label="计费周期" align="center" prop="chargePeriod"/>
      <af-table-column label="失效日期" align="center" prop="endDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endDate, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="结算周期" align="center" prop="settlementPeriod"/>
      <af-table-column label="签订日期" align="center" prop="signDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.signDate, '{y}-{m}-{d}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="生效日期" align="center" prop="startDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startDate, '{y}-{m}-{d}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <span>{{ scope.row.status === '1' ? '有效' : '无效' }}</span>
        </template>
      </af-table-column>
      <af-table-column label="备注" align="center" prop="remark"/>
      <af-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['place:storeContract:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['place:storeContract:remove']"
          >删除
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

    <!-- 添加或修改仓储合同 对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="场所" prop="placeId">
              <el-select
                v-model="form.placeId" placeholder="请选择场所" size="small" @change="getStoreList">
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
            <el-form-item label="合同编号" prop="contractNo">
              <el-input v-model="form.contractNo" placeholder="请输入合同编号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="客户名称" prop="customerName">
              <el-select
                filterable
                clearable
                v-model="form.customerName" placeholder="请选择客户名称" size="small"
                @change="((val)=>{change(val, 'eName')})">
                <el-option
                  v-for="dict in clientNameList"
                  :key="dict.eName"
                  :label="dict.eName"
                  :value="dict.eName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品名" prop="goodsName">
              <!-- <el-input v-model="form.goodsName" placeholder="请输入品名"/>-->
              <el-select v-model="form.goodsName" placeholder="请选择品名">
                <el-option
                  v-for="dict in coalTypeOptions"
                  :key="dict.dictLabel"
                  :label="dict.dictLabel"
                  :value="dict.dictLabel"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <!--<el-form-item label="散货区域" prop="zoneCode">
              <el-select v-model="form.zoneCode" placeholder="请选择散货区域" >
                <el-option
                  v-for="str in zoneCodeList"
                  :key="str"
                  :label="str"
                  :value="str"
                />
              </el-select>
            </el-form-item>-->
          </el-col>
          <el-col :span="24">
            <el-form-item label="散货库位" prop="storeIds">
              <el-select v-model="form.storeIds" filterable multiple placeholder="请选择散货库位" style="width: 100%">
                <el-option
                  v-for="store in storeList"
                  :key="store.id"
                  :label="store.storeCode"
                  :value="store.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="计费方法" prop="chargeMethod">
              <el-input v-model="form.chargeMethod" placeholder="请输入计费方法"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计费方式" prop="chargeMode">
              <el-input v-model="form.chargeMode" placeholder="请输入计费方式"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计费周期" prop="chargePeriod">
              <el-input v-model="form.chargePeriod" placeholder="请输入计费周期"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计费方法" prop="chargeMethod">
              <el-input v-model="form.chargeMethod" placeholder="请输入计费方法"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="结算周期" prop="settlementPeriod">
              <el-input v-model="form.settlementPeriod" placeholder="请输入结算周期"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签订日期" prop="signDate">
              <el-date-picker clearable size="small" style="width: 100%"
                              v-model="form.signDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择签订日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="生效日期" prop="startDate">
              <el-date-picker clearable size="small" style="width: 100%"
                              v-model="form.startDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择生效日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="失效日期" prop="endDate">
              <el-date-picker clearable size="small" style="width: 100%"
                              v-model="form.endDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择失效日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select
                v-model="form.status" placeholder="请选择状态" size="small">
                <el-option
                  v-for="dept in statusList"
                  :key="dept.key"
                  :label="dept.value"
                  :value="dept.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12"></el-col>
          <el-col :span="12"></el-col>
        </el-row>


        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
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
import {
  listStoreContract,
  getStoreContract,
  delStoreContract,
  addStoreContract,
  updateStoreContract,
  listStoreContractLike
} from "@/api/place/storeContract";
import {getUserDepts} from "@/utils/charutils";
import {getZoneList} from "@/api/place/zone";
import {listStore} from "@/api/place/store";
import {listInfo} from "@/api/basis/enterpriseInfo";

export default {
  name: "StoreContract",
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
      // 仓储合同 表格数据
      storeContractList: [],
      // 客户名称列表
      clientNameList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        chargeMethod: undefined,
        chargeMode: undefined,
        chargePeriod: undefined,
        contractNo: undefined,
        customerName: undefined,
        endDate: undefined,
        placeId: undefined,
        settlementPeriod: undefined,
        signDate: undefined,
        startDate: undefined,
        orderByColumn: 'id',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        placeId: [
          {required: true, message: "场所ID不能为空", trigger: "blur"}
        ],
        contractNo: [
          {required: true, message: "合同编号不能为空", trigger: "blur"}
        ],

        customerName: [
          {required: true, message: "客户名称不能为空", trigger: "blur"}
        ],
        goodsName: [
          {required: true, message: "品名不能为空", trigger: "blur"}
        ],
        storeIds: [
          {required: true, message: "散杂库位不能为空", trigger: "blur"}
        ],
        status: [
          {required: true, message: "状态不能为空", trigger: "change"}
        ]

      },
      zoneCodeList: [],
      storeList: [],
      idList: [],
      coalTypeOptions: [], //煤种
      statusList: [{'key': '1', 'value': '有效'}, {'key': '0', 'value': '无效'}]
    };
  },
  created() {

    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.getList();
      this.getListInfo();
    }

    //煤种类型
    this.getDicts("coal_type").then(response => {
      this.coalTypeOptions = response.data;
    });
  },
  methods: {
    /** 查询仓储合同 列表 */
    getList() {
      // if (!this.queryParams.placeId) return false
      this.loading = true;
      listStoreContractLike(this.queryParams).then(response => {
        this.storeContractList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    getListInfo() {
      this.loading = true;
      let info = {"eType": '2','deptId': this.queryParams.placeId,companyType: '2'}
      listInfo(info).then(response => {
        this.clientNameList = response.rows;
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
        chargeMethod: undefined,
        chargeMode: undefined,
        chargePeriod: undefined,
        contractNo: undefined,
        customerName: undefined,
        endDate: undefined,
        placeId: this.queryParams.placeId,
        settlementPeriod: undefined,
        signDate: undefined,
        startDate: undefined,
        remark: undefined,
        zoneCode: undefined,
        storeIds: undefined,
        status: undefined
      };
      this.resetForm("form");
      this.storeList = []
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
      this.getListInfo();
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
      this.title = "添加仓储合同"
      this.form.status = '1'
      this.getStoreList()
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      this.form.placeId = row.placeId
      this.getStoreList()

      getStoreContract(id).then(response => {
        console.log(response)
        this.form = response.data;
        this.form.storeIds = response.data.params.contract.map(item => item.storeId)
        this.open = true;
        this.title = "修改仓储合同 ";
        let contractList = response.data.params.contract
        //把合同上的库位号给放到用户的库位号属性里
        for (let store of contractList) {
          if (!this.storeList.find(item => item.id === store.storeId)) {
            this.storeList.push({"id": store.storeId, 'storeCode': store.storeCode})
          }
        }
        //this.getStoreList()
      });
      //this.getZoneCode()
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.idList = this.form.storeIds
          let ids = ''
          for (let id of this.idList) {
            ids += id + ","
          }
          ids = ids.substring(0, ids.length - 1)
          this.form.storeIds = ids
          if (this.form.id != undefined) {
            updateStoreContract(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            }).catch(err => {
              this.form.storeIds = this.idList
            });
          } else {
            addStoreContract(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            }).catch(err => {
              this.form.storeIds = this.idList
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除仓储合同 编号为"' + row.contractNo + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delStoreContract(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/storeContract/export', {
        ...this.queryParams
      }, `仓储合同.xlsx`)
    },
    getZoneCode() {
      this.zoneCodeList = []
      getZoneList(this.form.placeId, '2').then(response => {
        if (response.code === 200) {
          this.zoneCodeList = response.data
        } else {
          this.form.zoneCode = undefined
          this.$message.error(response.msg)
        }
      });
      //区域类型变化时，获取对应场所的id，区域类型，返回对应区域内的区域编号
    },
    getStoreList() {
      this.storeList = []
      let params = {'placeId': this.form.placeId, 'zoneType': '2', 'storeState': '0'}//取空闲
      listStore(params).then(response => {
        if (response.code === 200) {
          if (this.storeList.length === 0) { //如果没有值，
            this.storeList = response.rows
          } else {
            this.storeList = this.storeList.concat(response.rows)
          }
        } else {
          this.$message.warning("此区域下无库位")
        }
      })
    },
    getStoreCodeName(contract) {
      console.log(contract)
      let storeList = []
      for (let store of contract.params.contract) {
        storeList.push(store.storeCode)
      }
      return storeList
    },
    // 下拉列表改变时激活
    change(val, name) {
      // 客户名称->寄仓客户id
      if (name === 'eName') {
        this.clientNameList.forEach(element => {
          if (element.eName === val) {
            this.form.customerId = element.id
          }
        })
      }
    }
  }
};
</script>
