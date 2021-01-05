<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['tax:lord:add']"
          :disabled="flag"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tax:lord:edit']"
        >修改</el-button>
      </el-col>
    </el-row>
    <el-card class="mb5">
      <el-form :model="queryParams" ref="queryParams" :inline="true" label-width="95px" :rules="rules">
        <el-form-item label="单据号" prop="documentNo">
          <el-input
            v-model="queryParams.documentNo"
            placeholder="请输入单据号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="LotNo" prop="lotNo">
          <el-input
            v-model="queryParams.lotNo"
            placeholder="请输入LotNo"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="客户" prop="client">
          <el-input
            v-model="queryParams.client"
            placeholder="请输入客户"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="入境日期" prop="entryTime">
          <el-date-picker clearable size="small" style="width: 200px"
                          v-model="queryParams.entryTime"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择入境日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="业务编号" prop="businessNumber">
          <el-input
            v-model="queryParams.businessNumber"
            placeholder="请输入业务编号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="取样日期" prop="samplingTime">
          <el-date-picker clearable size="small" style="width: 200px"
                          v-model="queryParams.samplingTime"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择取样日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="取样单位" prop="samplingUnit">
          <el-input
            v-model="queryParams.samplingUnit"
            placeholder="请输入取样单位"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="取样人" prop="samplingPeople">
          <el-input
            v-model="queryParams.samplingPeople"
            placeholder="请输入取样人"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="取样总重量" prop="samplingWeight">
          <el-input
            v-model.number="queryParams.samplingWeight"
            placeholder="请输入取样总重量"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="返程日期" prop="returnTime">
          <el-date-picker clearable size="small" style="width: 200px"
                          v-model="queryParams.returnTime"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择返程日期">
          </el-date-picker>
        </el-form-item>
<!--        <el-form-item label="单据状态" prop="documentsStatus">-->
<!--          <el-select v-model="queryParams.documentsStatus" placeholder="请选择单据状态" clearable size="small">-->
<!--            <el-option label="请选择字典生成" value="" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="制单人" prop="makerPeople">
          <el-input
            v-model="queryParams.makerPeople"
            placeholder="请输入制单人"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="制单日期" prop="makerTime">
          <el-date-picker clearable size="small" style="width: 200px"
                          v-model="queryParams.makerTime"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择制单日期">
          </el-date-picker>
        </el-form-item>
        <!--      <el-form-item>-->
        <!--        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>-->
        <!--        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
        <!--      </el-form-item>-->
      </el-form>
    </el-card>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="BodyLotNo"
          :disabled="LotNoDisabled"
          v-hasPermi="['tax:lord:lotNo']"
        >请选择需要新增的数据</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          @click="updateBodyData"
          :disabled="bodyUpdate"
          v-hasPermi="['tax:body:edit']"
        >修改</el-button>
      </el-col>
    </el-row>
    <el-card class="mb5">
      <el-form :model="bodyForm" ref="bodyForm"  label-width="68px">
        <el-form-item label="袋封号" prop="bagSealNo">
          <el-input
            v-model="bodyForm.bagSealNo"
            placeholder="请输入袋封号"
            size="small"
          />
        </el-form-item>
        <el-form-item label="库位号" prop="bookStoreCode">
          <el-input
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
        v-show="total>0"
        :total="total"
        :page.sync="bodyQueryParams.pageNum"
        :limit.sync="bodyQueryParams.pageSize"
        @pagination="indexList"
      />
    </el-card>

    <el-dialog :title="title" :visible.sync="open"  append-to-body >
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="mini"
        @click="bodyGetLotNo"
        v-hasPermi="['tax:body:add']"
      >确定</el-button>
      <el-table  :data="bodyList" @selection-change="handleSelectionChange" v-loading="bodyListLoading">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="袋封号" align="center" prop="bagSealNo" />
        <el-table-column label="库位号" align="center" prop="bookStoreCode" />
        <el-table-column label="备注" align="center" prop="remark" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {listLord, getLord, delLord, addLord, updateLord, LotNoList, InsertListLotNo,listBody,updateBody} from "@/api/tax/sampling/lord";
import Vue from 'vue'
export default {
  name: "Lord",
  data() {
    return {
      //按钮状态
      flag:false,
      //关联查询
      getLotNo:'',
      // 遮罩层
      loading: false,
      bodyListLoading:true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      //子表新增按钮是否禁用
      LotNoDisabled:true,
      bodyUpdate:true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 取样管理 主表格数据
      lordList: [],
      //取样管理 子表格数据
      bodyList:[],
      //取样管理 子表保存后的数据
      indexBodyList:[],
      //向后台交互的数据
      InsertLotNoList:[],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        documentNo: undefined,
        lotNo: '',
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
      },
      bodyQueryParams: {
        pageNum: 1,
        pageSize: 20,
        bagSealNo: undefined,
        bookStoreCode: undefined,
        taxSamplingLordId: undefined
      },
      bodyForm:{
        bagSealNo:undefined,
        bookStoreCode:undefined,
        remark:undefined,

      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        documentNo:[
          { required: true, message: '单据号不可为空', trigger: 'blur' },
        ],
        client:[
          { required: true, message: '客户不可为空', trigger: 'blur' },
        ],
        entryTime:[
          { required: true, message: '入境日期不可为空', trigger: 'blur' },
        ],
        samplingTime:[
          { required: true, message: '取样日期不可为空', trigger: 'blur' },
        ],
        samplingUnit:[
          { required: true, message: '取样单位不可为空', trigger: 'blur' },
        ],
        samplingPeople:[
          { required: true, message: '取样人不可为空', trigger: 'blur' },
        ],
        samplingWeight:[
          { required: true, message: '取样总重量不可为空', trigger: 'blur' },
          {type: "number", message: "取样总重量需为数字", trigger: "blur"}

        ],
      },
      //定义的关联ID
      taxSamplingLordId:'',
    };
  },
  created() {
    // this.getList();
    const  id =this.$route.query.id
    this.taxSamplingLordId=id;
    const flag = this.$route.query.flag
    const single=this.$route.query.single
    const LotNo=this.$route.query.LotNo
    const LotNoDisabled=this.$route.query.LotNoDisabled
    if(id){
      getLord(id).then(response =>{
        this.queryParams=response.data
        this.flag=flag;
        this.single=single;
        this.LotNoDisabled=LotNoDisabled;
      })
      this.indexList()
    }
  },
  methods: {
    /** 查询取样管理 主列表 */
    getList() {
      this.loading = true;
      listLord(this.queryParams).then(response => {
        this.lordList = response.rows;
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
        lotNo: undefined,
        client: undefined,
        entryTime: undefined,
        businessNumber: undefined,
        samplingTime: undefined,
        samplingUnit: undefined,
        samplingPeople: undefined,
        samplingWeight: undefined,
        returnTime: undefined,
        remark: undefined,
        documentsStatus: "0",
        makerPeople: undefined,
        makerTime: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined
      };
      this.queryParams= {
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
      },
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
      // this.single = selection.length!=1
      this.multiple = !selection.length
      this.InsertLotNoList=selection
    },
    /** 新增按钮操作 */
    handleAdd() {
      // this.open = true;
      // this.title = "添加取样管理 主";
      addLord(this.queryParams).then(response => {
        if (response.code === 200) {
          this.LotNoDisabled=false;
          // this.single=false;
          this.msgSuccess("新增成功");
          this.getLotNo=this.queryParams.lotNo
          this.taxSamplingLordId=response.data.id
          this.open = false;
          this.getList();

        }
      });
      // this.reset();
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      updateLord(this.queryParams).then(response => {
        if(response.code === 200){
          this.queryParams = response.data;
          this.msgSuccess("修改成功");
          this.$store.dispatch('tagsView/delView', this.$route)
          this.$router.go(-1)
        }
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateLord(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addLord(this.form).then(response => {
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
      this.$confirm('是否确认删除取样管理 主编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delLord(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('tax/lord/export', {
        ...this.queryParams
      }, `tax_lord.xlsx`)
    },

    BodyLotNo(){
      this.open=true;
      this.bodyListLoading=true;
      LotNoList(this.queryParams.lotNo).then(response =>{
        if(response.code === 200){
          this.msgSuccess("查询成功,请选择数据")
          this.bodyList=response.rows
          this.bodyListLoading=false;
        }
      })
    },
    bodyGetLotNo(){
      if(this.taxSamplingLordId == undefined){
        this.taxSamplingLordId=this.queryParams.id
      }
      const data={
       // list: this.InsertLotNoList,
       //  taxSamplingLordId:this.taxSamplingLordId
      }
      this.InsertLotNoList.forEach((column, index) =>{
        this.$set(column, 'taxSamplingLordId', this.taxSamplingLordId)

      });

      InsertListLotNo(this.InsertLotNoList).then(response =>{
        if(response.code === 200){
          this.msgSuccess("新增成功")
          this.indexList();
          this.open=false;
        }
      })

    },
    indexList(){
      this.loading=true;
      this.bodyQueryParams.taxSamplingLordId=this.taxSamplingLordId;
      listBody(this.bodyQueryParams).then(response =>{
        if(response.code === 200){
          this.msgSuccess("查询成功")
          this.loading=false;
          this.indexBodyList=response.rows;
          this.total = response.total;
        }
      })
    },
    rowBody(row){
      this.bodyForm=row;
      this.bodyUpdate=false;
    },
    updateBodyData(){
      updateBody(this.bodyForm).then(response =>{
        if(response.code === 200){
          this.msgSuccess("查询成功")
          this.indexList();
          this.bodyUpdate=true;
        }
      })
    }
  }
};
</script>
