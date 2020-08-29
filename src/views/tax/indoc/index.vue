<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="保税库" prop="deptId">
        <el-select
          v-model="queryParams.deptId"
          placeholder="请输入保税库ID"
          clearable
          size="small"
          @change="handleQuery">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="入库单号" prop="inDocNo">
        <el-input
          v-model="queryParams.inDocNo"
          placeholder="请输入入库单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
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
          v-hasPermi="['tax:indoc:add']"
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
          v-hasPermi="['tax:indoc:edit']"
        >修改
        </el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tax:indoc:remove']"
        >删除</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:indoc:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="indocList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="入库单号" align="center" prop="inDocNo"/>
      <el-table-column label="入库通知单号" align="center" prop="inNoticeDocNo"/>
      <el-table-column label="寄舱客户名称" align="center" prop="sendCustomerName"/>
      <el-table-column label="结算客户名称" align="center" prop="settlementCustomerName"/>
      <el-table-column label="录入人姓名" align="center" prop="inputUserName"/>
      <el-table-column label="细目笔数" align="center" prop="detailedCount"/>
      <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat"/>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-document"
            @click="handleInfo(scope.row)"
          >查看
          </el-button>
          <el-button size="mini" type="text" icon="el-icon-document" @click="handleDtl(scope.row)">明细管理</el-button>
          <el-button
            v-if="scope.row.status == 0"
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleStatusChangeTj(scope.row)"
          >提交
          </el-button>
          <el-button
            v-if="scope.row.status == 1"
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleStatusChangeShtg(scope.row)"
          >确认通过
          </el-button>
          <el-button
            v-if="scope.row.status == 1"
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleStatusChangeShbtg(scope.row)"
          >确认不通过
          </el-button>
          <el-button
            v-if="scope.row.status == 0"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:indoc:edit']"
          >修改
          </el-button>
          <el-button
            v-if="scope.row.status == 0"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tax:indoc:remove']"
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

    <!-- 查看入库单对话框 -->
    <el-dialog :title="infotitle" :visible.sync="infoopen" append-to-body>
      <el-form ref="infoform" :model="infoform"  label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="保税库" prop="deptId">
              <el-input v-model="info.deptNo" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="进仓单号" prop="inDocNo">
              <el-input v-model="info.inDocNo" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入库通知单号" prop="inNoticeDocNo">
              <el-input v-model="info.inNoticeDocNo" readonly/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="寄舱客户名称" prop="sendCustomerName">
              <el-input v-model="info.sendCustomerName" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算客户名称" prop="settlementCustomerName">
              <el-input v-model="info.settlementCustomerName" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="装货方式" prop="loadingMethod">
              <el-input v-model="info.loadingMethod" readonly/>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="操作员" prop="operationUser">
              <el-input v-model="info.operationUser" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="仓管员" prop="storekeeper">
              <el-input v-model="info.storekeeper" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="进仓日期" prop="warehousingDate">
              <el-input v-model="info.warehousingDate" readonly/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="进境时间" prop="entryTime">
              <el-input v-model="info.entryTime" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计费日期" prop="billingDate">
              <el-input v-model="info.billingDate" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作方式" prop="operationMode">
              <el-input v-model="info.operationMode" readonly/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="业务编号" prop="businessNo">
              <el-input v-model="info.businessNo" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="总计费吨" prop="totalChargeTons">
              <el-input v-model="info.totalChargeTons" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="OT序号" prop="otSerialNo">
              <el-input v-model="info.otSerialNo" readonly/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="车牌号" prop="carNo">
              <el-input v-model="info.carNo" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务归属" prop="businessOwnership">
              <el-input v-model="info.businessOwnership" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-input v-model="info.inDocNo" readonly/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="录入人">
              <el-input v-model="info.inputUserName" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="info.remarks" readonly/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 添加或修改入库单对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="保税库" prop="deptId">
              <el-select v-model="form.deptId" placeholder="请选择保税库">
                <el-option
                  v-for="dept in depts"
                  :key="dept.deptId"
                  :label="dept.deptName"
                  :value="dept.deptId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="进仓单号" prop="inDocNo">
              <el-input v-model="form.inDocNo" placeholder="请输入进仓单号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入库通知单号" prop="inNoticeDocId">
          <el-select v-model="form.inNoticeDocId" placeholder="请选择入库通知单"  @change="chooseNoticeDocId($event)">
            <el-option
              v-for="doc in inNoticeList"
              :key="doc.inNoticeDocId"
              :label="doc.inNoticeDocNo"
              :value="doc.inNoticeDocId"
            />
          </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="寄舱客户名称" prop="sendCustomerName">
              <el-input v-model="form.sendCustomerName" placeholder="请输入寄舱客户名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算客户名称" prop="settlementCustomerName">
              <el-input v-model="form.settlementCustomerName" placeholder="请输入结算客户名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="装货方式" prop="loadingMethod">
              <el-select v-model="form.loadingMethod">
                <el-option
                  v-for="dict in packOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="操作员" prop="operationUser">
              <el-input v-model="form.operationUser" placeholder="请输入操作员"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="仓管员" prop="storekeeper">
              <el-input v-model="form.storekeeper" placeholder="请输入仓管员"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="进仓日期" prop="warehousingDate">
              <el-date-picker
                clearable
                size="small"
                style="width: 300px"
                v-model="form.warehousingDate"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择进仓日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="进境时间" prop="entryTime">
              <el-date-picker
                clearable
                size="small"
                style="width: 200px"
                v-model="form.entryTime"
                type="datetime"
                value-format="yyyy-mm-dd  HH:mm"
                placeholder="选择进境时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计费日期" prop="billingDate">
              <el-date-picker
                clearable
                size="small"
                style="width: 200px"
                v-model="form.billingDate"
                type="datetime"
                value-format="yyyy-MM-dd  HH:mm"
                placeholder="选择计费日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作方式" prop="operationMode">
              <el-select v-model="form.operationMode">
                <el-option
                  v-for="dict in handleOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="业务编号" prop="businessNo">
              <el-input v-model="form.businessNo" placeholder="请输入业务编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="总计费吨" prop="totalChargeTons">
              <el-input v-model="form.totalChargeTons" placeholder="请输入总计费吨"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="OT序号" prop="otSerialNo">
              <el-input v-model="form.otSerialNo" placeholder="请输入OT序号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="车牌号" prop="carNo">
              <el-autocomplete
                popper-class="my-autocomplete"
                v-model="form.carNo"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
              >
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                <template slot-scope="{ item }">
                  <div class="name">{{ item.value }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务归属" prop="businessOwnership">
              <el-input v-model="form.businessOwnership" placeholder="请输入业务归属"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select v-model="form.status">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="录入人">
              <el-input v-model="form.inputUserName" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="form.remarks" placeholder="请输入备注"/>
            </el-form-item>
          </el-col>
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
import {
  listIndoc,
  getIndoc,
  delIndoc,
  addIndoc,
  updateIndoc,
  changeDocStatus,
  getCarList,
  getInNoticeList,
  changeDocStatusOnly,
} from "@/api/tax/indoc";
import {getUserDepts} from "@/utils/charutils";
import {getInnotice} from "@/api/tax/innotice";

export default {
  name: "Indoc",
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
      // 入库单表格数据
      indocList: [],
      //保税库列表
      depts: [],
      //第一个
      deptId: 0,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 弹出层标题
      infotitle: "",
      // 是否显示弹出层
      infoopen: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        inDocNo: undefined,
      },
      // 日期范围
      dateRange: [],
      // 车牌号
      carList: [],
      // 状态字典
      statusOptions: [{value: "0", label: "录入"}],
      // 装货方式字典
      packOptions: [],
      // 操作方式字典
      handleOptions: [],
      //入库通知单列表
      inNoticeList: [],
      // 表单参数
      form: {},
      // 表单参数
      infoform: {},
      info: {},
      // 表单校验
      rules: {
        deptId: [
          {required: true, message: "请选择保税库", trigger: "blur"},
        ],
        inDocNo: [
          {required: true, message: "进仓单号不能为空", trigger: "blur"},
        ],
        inNoticeDocNo: [
          {required: true, message: "进仓通知单号不能为空", trigger: "blur"},
        ],
        sendCustomerName: [
          {required: true, message: "寄舱客户名不能为空", trigger: "blur"},
        ],
        carNo: [
          {required: true, message: "车牌号不能为空", trigger: "blur"},
        ],
        settlementCustomerName:[
          {required: true, message: "结算客户不能为空", trigger: "blur"},
        ],

      },
    };
  },
  created() {
    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts('1')
    if (this.depts.length > 0) {
      //默认选中第一个
      this.queryParams.deptId = this.depts[0].deptId;
      this.deptId = this.depts[0].deptId;
      this.getList()
    }
    //加载装货方式字典
    this.getDicts("tax_pack_type").then((response) => {
      this.packOptions = response.data;
    });
    //加载操作方式字典
    this.getDicts("tax_handle_type").then((response) => {
      this.handleOptions = response.data;
    });
    this.loadCar();
    this.getNoticeList();
  },
  methods: {
    /** 查询入库单列表 */
    getList() {
      this.loading = true;
      listIndoc(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.indocList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        status: "0",
        loadingMethod: "1",
        operationMode: "1",
        inputUserName: this.$store.getters.name,
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
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.inDocId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.form.deptId = this.deptId;
      this.open = true;
      this.title = "添加入库单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const inDocId = row.inDocId || this.ids;
      getIndoc(inDocId).then((response) => {
        this.form = response.data;
        this.form.status = String(response.data.status);
        this.form.loadingMethod = String(response.data.loadingMethod);
        this.form.operationMode = String(response.data.operationMode);
        this.form.deptId = response.data.deptId;
        this.open = true;
        this.title = "修改入库单";
      });
    },
    /** 查看按钮操作 */
    handleInfo(row) {
      const inDocId = row.inDocId;
      getIndoc(inDocId).then((response) => {
        this.info = response.data;
        this.info.deptNo=this.getDeptName(row.deptId);
        this.info.status=this.statusFormat(response.data.status);
        this.info.loadingMethod=this.selectDictLabel(this.packOptions, String(response.data.loadingMethod));
        this.info.operationMode=this.selectDictLabel(this.handleOptions, String(response.data.operationMode));
        this.infoopen = true;
        this.infotitle = "查看入库单";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.inDocId != undefined) {
            updateIndoc(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addIndoc(this.form).then((response) => {
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
      const inDocIds = row.inDocId || this.ids;
      this.$confirm(
        '是否确认删除入库单编号为"' + inDocIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delIndoc(inDocIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function () {
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "tax/indoc/export",
        {
          ...this.queryParams,
        },
        `tax_indoc.xlsx`
      );
    },
    /** 查看明细操作 */
    handleDtl(row) {
      this.reset();
      const inDocId = row.inDocId;
      const docNo = row.inDocNo;
      const inDocStauts = row.status;
      console.info("docNo=" + docNo);
      this.$router.push({
        path: "indtl/",
        query: {docId: inDocId, docNo: docNo, docStatus: inDocStauts,docDeptId:this.deptId},
      });
    },


    querySearch(queryString, cb) {
      var carList = this.carList;
      var results = queryString
        ? carList.filter(this.createFilter(queryString))
        : carList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        ); //字符串头查询
        //return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1);模糊查询
      };
    },
    loadCar() {
      getCarList().then((response) => {
        for (var i = 0; i < response.rows.length; i++) {
          console.info("test=" + response.rows[i].carNo);
          this.carList.push({value: response.rows[i].carNo});
        }
      });
    },
    //查询未入库的通知单
    getNoticeList(){
      getInNoticeList().then((response) => {
        this.inNoticeList=response.rows;
      });
    },

    //查询未入库的通知单
    chooseNoticeDocId(noticeDocId){
      this.inNoticeList.some((item,i)=>{
          if(item.inNoticeDocId==noticeDocId){
            this.form.sendCustomerName= item.sendCustomerName;
            this.form.settlementCustomerName= item.sendCustomerName;
            this.form.loadingMethod=String(item.loadingMethod);
            this.form.operationMode=String(item.operationMode);
            this.form.businessNo= item.businessNumber;
            this.form.totalChargeTons= item.totalChargeTons;
            this.form.otSerialNo= item.otSerialNo;
            this.form.carNo= item.carNo;
            this.form.remarks= item.remarks;
            return true
          }
      });
    },

    //状态修改
    handleStatusChangeTj(row) {
      this.$confirm("确认要提交入库单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return changeDocStatusOnly(row.inDocId,1);
        })
        .then(() => {
          this.msgSuccess("提交成功");
          this.getList();
        });
    },
    //确认修改
    handleStatusChangeShtg(row) {
      this.$confirm("确认要确认通过入库单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return changeDocStatus(row.inDocId);
        })
        .then(() => {
          this.msgSuccess("确认成功");
          this.getList();
        });
    },
    //确认不通过修改
    handleStatusChangeShbtg(row) {
      this.$confirm("确认要确认不通过入库单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return changeDocStatusOnly(row.inDocId,0);
        })
        .then(() => {
          this.msgSuccess("确认成功");
          this.getList();
        });
    },
    //状态处理
    statusFormat(row, column) {
      if (row.status == "0") {
        return "录入";
      }
      else if(row.status == "1")
      {
        return "已提交";
      }
      else if(row.status == "2"){
        return "已确认";
      }
    },
    //查询未入库的通知单
    getDeptName(deptId){
      var deptName="";
      this.depts.some((item,i)=>{
        if(item.deptId==deptId){
          deptName= item.deptName;
          return true
        }
      });
      return deptName;
    },
  },
};
</script>
+
