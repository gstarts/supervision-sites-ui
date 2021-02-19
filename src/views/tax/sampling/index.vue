<template>
  <div class="app-container">

    <el-form :model="queryParams" ref="queryParams" :inline="true" label-width="68px">
      <!--      <el-form-item label="场所" prop="placeId">-->
      <!--        <el-select-->
      <!--          v-model="queryParams.placeId" placeholder="请选择场所" size="small">-->
      <!--          <el-option-->
      <!--            v-for="dept in depts"-->
      <!--            :key="dept.deptId"-->
      <!--            :label="dept.deptName"-->
      <!--            :value="dept.deptId"-->
      <!--          />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <el-row>

        <el-col :span="5">
          <el-form-item label="LotNo" prop="lotNo" >
            <el-input
              v-model="queryParams.lotNo"
              placeholder="请输入LotNo"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="客户" prop="client">
            <el-input
              v-model="queryParams.client"
              placeholder="请输入客户"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="业务编号" prop="businessNumber">
            <el-input
              v-model="queryParams.businessNumber"
              placeholder="请输入业务编号"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-form-item label="入境日期" prop="entryTime">
          <el-date-picker clearable size="small"
                          v-model="EntryTime"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="取样日期" prop="samplingTime">
          <el-date-picker clearable size="small"
                          v-model="samplingTime"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery" v-hasPermi="['tax:lord:reset']">重置
          </el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['tax:lord:add']"
        >新增
        </el-button>

      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="lordList" @selection-change="handleSelectionChange" >
      <el-table-column type="selection" width="55" align="center"/>
      <!--      <el-table-column type="selection" width="55" align="center" />-->
      <!--      <el-table-column label="ID" align="center" prop="id" />-->
      <el-table-column label="单据号" align="center" prop="documentNo" width="140"/>
      <el-table-column label="LotNo" align="center" prop="lotNo" width="110"/>
      <af-table-column label="客户" align="center" prop="client"/>
      <el-table-column label="入境日期" align="center" prop="entryTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.entryTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="业务编号" align="center" prop="businessNumber"/>
      <el-table-column label="取样日期" align="center" prop="samplingTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.samplingTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="取样单位" align="center" prop="samplingUnit" :show-overflow-tooltip='true'/>
      <el-table-column label="取样人" align="center" prop="samplingPeople"  :formatter="samplingPeopleFormat" :show-overflow-tooltip='true'/>
      <el-table-column label="取样总重量" align="center" prop="samplingWeight" width="90"/>
      <el-table-column label="返程日期" align="center" prop="returnTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.returnTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单据状态" align="center" prop="documentsStatus"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="140">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:lord:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleSelect(scope.row)"
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

    <!-- 添加或修改取样管理 主对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body width="90%">
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleBodyAdd"
            :disabled="dialogAddFlag"
          >新增</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            :disabled="dialogUpdateFlag"
            @click="handleBodyUpdate"
          >修改</el-button>
        </el-col>
      </el-row>
      <span style="color: red;font-size: 10px">注:请输入正确的业务编号后按回车键联想相应数据!!!!</span>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="业务编号" prop="businessNumber" >
          <el-input
            v-model="form.businessNumber"
            placeholder="请输入业务编号"
            clearable
            size="small"
            @keyup.enter.native="SelectbusinessNumber"
          />
        </el-form-item>

        <el-form-item label="LotNo" prop="lotNo">
          <el-input
            v-model="form.lotNo"
            placeholder="请输入LotNo"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="客户" prop="client">
          <el-input
            v-model="form.client"
            placeholder="请输入客户"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="入境日期" prop="entryTime">
          <el-date-picker clearable size="small" style="width: 100%"
                          v-model="form.entryTime"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择入境日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="取样日期" prop="samplingTime">
          <el-date-picker clearable size="small" style="width: 100%"
                          v-model="form.samplingTime"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择取样日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="取样单位" prop="samplingUnit">
          <el-input
            v-model="form.samplingUnit"
            placeholder="请输入取样单位"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="取样人" prop="samplingPeople">
          <el-select v-model="form.samplingPeople" multiple   placeholder="请选择取样人" style="width: 100%">
            <el-option
              v-for="user in userList"
              :key="user.userId"
              :label="user.nickName"
              :value="user.nickName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="取样总重量" prop="samplingWeight">
          <el-input
            v-model.number="form.samplingWeight"
            placeholder="请输入取样总重量"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="返程日期" prop="returnTime">
          <el-date-picker clearable size="small" style="width: 100%"
                          v-model="form.returnTime"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择返程日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="制单人" prop="makerPeople">
          <el-input
            v-model="form.makerPeople"
            placeholder="请输入制单人"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="制单日期" prop="makerTime">
          <el-date-picker clearable size="small" style="width: 100%"
                          v-model="form.makerTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择制单日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="makerPeople">
          <el-input
            v-model="form.remark"
            placeholder="请输入备注"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
      </div>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="BodyLotNo"
            :disabled="dialogAddAllFlag"
            v-hasPermi="['tax:lord:lotNo']"
          >请选择需要新增的数据</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            @click="updateBodyData"
            :disabled="dialogUpdateBodyFlag"
            v-hasPermi="['tax:body:edit']"
          >修改</el-button>
        </el-col>
      </el-row>
      <el-form :model="bodyForm" ref="bodyForm"  label-width="68px">
        <el-form-item label="袋封号" prop="bagSealNo">
          <el-input
            disabled
            v-model="bodyForm.bagSealNo"
            placeholder="请输入袋封号"
            size="small"
          />
        </el-form-item>
        <el-form-item label="库位号" prop="bookStoreCode">
          <el-input
            disabled
            v-model="bodyForm.bookStoreCode"
            placeholder="请输入库位号"
            size="small"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="bodyForm.remark"
            placeholder="请输入备注"
            size="small"
          />
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="indexBodyList" @row-click="rowBody">
        <!--        <el-table-column type="selection" width="55" align="center" />-->
        <el-table-column label="袋封号" align="center" prop="bagSealNo" />
        <el-table-column label="库位号" align="center" prop="bookStoreCode" />
        <el-table-column label="备注" align="center" prop="remark" />
      </el-table>
      <pagination
        v-show="totalBody>0"
        :total="totalBody"
        :page.sync="bodyQueryParams.pageNum"
        :limit.sync="bodyQueryParams.pageSize"
        @pagination="indexList"
      />
    </el-dialog>
    <!--袋号-->
    <el-dialog :title="title" :visible.sync="openBody"  append-to-body >
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="mini"
        @click="bodyGetLotNo"
        v-hasPermi="['tax:body:add']"
      >确定</el-button>
      <el-table  :data="bodyList" @selection-change="handleSelectionChangeBody" height="500" v-loading="bodyListLoading" >
        <el-table-column type="index" width="55" align="center" />
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="袋封号" align="center" prop="bagSealNo" />
        <el-table-column label="库位号" align="center" prop="bookStoreCode" />
        <el-table-column label="备注" align="center" prop="remark" />

      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  listLord,
  getLord,
  delLord,
  addLord,
  updateLord,
  selectAll,
  LotNoList,
  InsertListLotNo, listBody, updateBody
} from "@/api/tax/sampling/lord";
  import {getUserDepts} from "@/utils/charutils";
  import {listUser} from "@/api/system/user";
  import {formatDate} from "@/utils";
  import {getDocByBusinessNo} from "@/api/tax/instore_doc";


  export default {
    name: "Lord",
    data() {
      return {
        //子列表
        indexBodyList:[],
        //袋号遮罩层
        bodyListLoading:true,
        //袋号List
        bodyList:[],
        //子遮罩层
        openBody:false,
        //向后台交互的数据
        InsertLotNoList:[],
        //定义的关联ID
        taxSamplingLordId:'',
        //dialog弹出框按钮是否禁用标识
        dialogAddFlag:true,
        dialogUpdateFlag:true,
        dialogAddAllFlag:true,
        dialogUpdateBodyFlag:true,
        //用户名 全部
        userList:[],
        //入境日期 时间集合
        EntryTime: [],
        //取样日期 时间集合
        samplingTime: [],
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
        totalBody:0,
        // 取样管理 主表格数据
        lordList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 20,
          documentNo: undefined,
          lotNo: undefined,
          client: undefined,
          entryTime: undefined,
          businessNumber: undefined,
          samplingTime: undefined,
          samplingUnit: undefined,
          samplingPeople: undefined,
          samplingWeight: undefined,
          returnTime: undefined,
          documentsStatus: undefined,
          makerPeople: undefined,
          makerTime: undefined,
          entryTimeBegin: undefined,
          entryTimeEnd: undefined,
          samplingTimeBegin: undefined,
          samplingTimeEnd: undefined,
          orderByColumn: 'id',
          isAsc: 'desc',
        },
        bodyForm:{
          bagSealNo:undefined,
          bookStoreCode:undefined,
          remark:undefined,
        },
        bodyQueryParams: {
          pageNum: 1,
          pageSize: 20,
          bagSealNo: undefined,
          bookStoreCode: undefined,
          taxSamplingLordId: undefined
        },
        // 表单参数
        form: {
          pageNum: 1,
          pageSize: 20,
          documentNo: undefined,
          lotNo: '',
          client: undefined,
          entryTime: undefined,
          businessNumber: undefined,
          samplingTime: formatDate(new Date(),"yyyy-MM-dd hh:mm"),
          samplingUnit: '乌拉特出入境检验检疫局',
          samplingPeople: undefined,
          samplingWeight: undefined,
          returnTime: undefined,
          documentsStatus: undefined,
          makerPeople: undefined,
          makerTime: undefined,
          placeId:undefined,
        },
        // 表单校验
        rules: {},
        TestList: [],
      };
    },
    created() {
      this.depts = getUserDepts('1')
      if (this.depts.length > 0) {
        this.form.placeId = this.depts[0].deptId
        this.getUserList();
        this.getList();
      }
    },
    methods: {
      /** 查询取样管理 主列表 */
      getList() {
        this.loading = true;
        if (this.EntryTime != null) {
          this.queryParams.entryTimeBegin = this.EntryTime[0];
          this.queryParams.entryTimeEnd = this.EntryTime[1];
        }
        if (this.samplingTime != null) {
          this.queryParams.samplingTimeBegin = this.samplingTime[0];
          this.queryParams.samplingTimeEnd = this.samplingTime[1];
        }
        listLord(this.queryParams).then(response => {
          this.lordList = response.rows;
          this.total = response.total;
          this.loading = false;
          // this.EntryTime=[];
          // this.samplingTime=[];
          this.queryParams.entryTimeBegin = undefined;
          this.queryParams.entryTimeEnd = undefined;
          this.queryParams.samplingTimeBegin = undefined;
          this.queryParams.samplingTimeEnd = undefined;
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
          pageNum: 1,
          pageSize: 20,
          documentNo: undefined,
          lotNo: '',
          client: undefined,
          entryTime: undefined,
          businessNumber: undefined,
          samplingTime: formatDate(new Date(),"yyyy-MM-dd hh:mm"),
          samplingUnit: '乌拉特出入境检验检疫局',
          samplingPeople: undefined,
          samplingWeight: undefined,
          returnTime: undefined,
          documentsStatus: undefined,
          makerPeople: undefined,
          makerTime: undefined,
          placeId: this.form.placeId,
        };
        // this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();

      },
      /** 重置按钮操作 */
      resetQuery() {
        this.reset();
        this.queryParams = {};
        this.EntryTime = [];
        this.samplingTime = [];
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        this.single = selection.length != 1
        this.multiple = !selection.length
        this.TestList.push(selection)
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.dialogAddFlag=false;
        this.dialogUpdateFlag=true;
        this.dialogAddAllFlag=true;
        this.dialogUpdateBodyFlag=true;
        this.indexBodyList=[];
        this.open = true;
        this.title = "新增";

      },

      /** 修改按钮操作 */
      handleUpdate(row) {
        this.dialogAddFlag=true;
        this.form={}
        const id = row.id
        const LotNo = row.lotNo
        getLord(id).then(response =>{
          this.form=response.data
          var array = response.data.samplingPeople.split(",")
          this.form.samplingPeople = array;
          this.dialogUpdateFlag=false
          this.dialogUpdateBodyFlag=false;
          this.dialogAddAllFlag=false;
          this.open = true;
          this.title = "修改";
        })
        this.taxSamplingLordId=row.id
        this.indexList()
        this.dialogUpdateBodyFlag=false;
      },
      /** 详情按钮操作 */
      handleSelect(row) {
        this.dialogAddFlag=true,
        this.dialogUpdateFlag=true,
        this.dialogAddAllFlag=true,
        this.dialogUpdateBodyFlag=true,
        this.form={}
        const id = row.id
        // const LotNo = row.lotNo
        getLord(id).then(response =>{
          this.form=response.data
          var array = response.data.samplingPeople.split(",")
          this.form.samplingPeople = array;
          this.open = true;
          this.title = "修改";
        })
        // this.$router.push({path: 'spamlingsmall', query: {id: id, flag: true, single: true, LotNoDisabled: true}})
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('tax/lord/export', {
          ...this.queryParams
        }, `tax_lord.xlsx`)
      },
      getUserList() {
        listUser({'deptId': this.form.placeId, 'delFlag': '0'}).then(response => {
          if (response.code === 200) {
            this.userList = response.rows
          }
        });
      },
      samplingPeopleFormat(row,cloumn){
        let u = this.userList.find(item => item.userId == row.samplingPeople)
        if (u) {
          return u.nickName
        } else {
          return row.samplingPeople
        }
      },
      handleBodyAdd(){
        this.form.samplingPeople= this.form.samplingPeople.toString();
        this.form.makerPeople  = this.$store.state.user.nickName
        // this.$refs["queryParams"].validate(valid => {
        //   if (valid) {
            addLord(this.form).then(response => {
              if (response.code === 200) {
                this.LotNoDisabled=false;
                this.msgSuccess("新增成功");
                this.getLotNo=this.queryParams.lotNo
                this.taxSamplingLordId=response.data.id
                var array = response.data.samplingPeople.split(",")
                this.form.samplingPeople=array
                this.dialogAddAllFlag=false;
                this.dialogUpdateBodyFlag=false;
                this.getList();
              }
          //   });
          // }
        });
      },
      SelectbusinessNumber(){
        getDocByBusinessNo(this.form.placeId, this.form.businessNumber).then(response => {
          this.form.client=response.data.checkConsumer;
          this.form.entryTime=response.data.createTime;
          this.form.lotNo=response.data.batchNo;
        })

      },
      BodyLotNo(){
        this.openBody=true;
        this.bodyListLoading=true;
        LotNoList(this.form.lotNo).then(response =>{
          if(response.code === 200){
            // this.msgSuccess("查询成功,请选择数据")
            this.bodyList=response.rows
            this.bodyListLoading=false;
          }
        })
      },
      bodyGetLotNo(){
        if(this.taxSamplingLordId == undefined){
          this.taxSamplingLordId=this.form.id
        }
        this.InsertLotNoList.forEach((column, index) =>{
          this.$set(column, 'taxSamplingLordId', this.taxSamplingLordId)
        });
        InsertListLotNo(this.InsertLotNoList).then(response =>{
          if(response.code === 200){
            this.msgSuccess("新增成功")
            this.openBody=false;
          }
        })
        this.indexList();
      },
      handleSelectionChangeBody(selection){
        this.ids = selection.map(item => item.id)
        this.InsertLotNoList=selection
      },
      indexList(){
        // debugger
        this.loading=true;
        this.bodyQueryParams.taxSamplingLordId = this.taxSamplingLordId;
        listBody(this.bodyQueryParams).then(response =>{
          if(response.code === 200){
            // this.msgSuccess("查询成功")
            this.loading=false;
            this.indexBodyList=response.rows;
            this.totalBody = response.total;
          }
        })
      },

      rowBody(row){
        this.bodyForm=row
      },
      /** 修改按钮操作 */
      handleBodyUpdate(row) {
        this.form.samplingPeople= this.form.samplingPeople.toString();
        // this.$refs["queryParams"].validate(valid => {
        //   if(valid){
            updateLord(this.form).then(response => {
              if(response.code === 200){
                // this.form = response.data;
                this.msgSuccess("修改成功");
                this.open = false;
              }
              this.getList();
          //   });
          // }
        })
      },
      updateBodyData(){
        updateBody(this.bodyForm).then(response =>{
          if(response.code === 200){
            // this.msgSuccess("查询成功")
            this.indexList();
            this.bodyUpdate=true;
          }
        })
      },
    }
  };
</script>

