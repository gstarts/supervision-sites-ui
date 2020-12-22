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
        <el-form-item label="单据状态" prop="documentsStatus">
          <el-select v-model="queryParams.documentsStatus" placeholder="请选择单据状态" clearable size="small">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
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




<!--    <el-table v-loading="loading" :data="lordList" @selection-change="handleSelectionChange">-->
<!--      <el-table-column type="selection" width="55" align="center" />-->
<!--      <el-table-column label="id" align="center" prop="id" />-->
<!--      <el-table-column label="单据号" align="center" prop="documentNo" />-->
<!--      <el-table-column label="LotNo" align="center" prop="lotNo" />-->
<!--      <el-table-column label="客户" align="center" prop="client" />-->
<!--      <el-table-column label="入境日期" align="center" prop="entryTime" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.entryTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="业务编号" align="center" prop="businessNumber" />-->
<!--      <el-table-column label="取样日期" align="center" prop="samplingTime" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.samplingTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="取样单位" align="center" prop="samplingUnit" />-->
<!--      <el-table-column label="取样人" align="center" prop="samplingPeople" />-->
<!--      <el-table-column label="取样总重量" align="center" prop="samplingWeight" />-->
<!--      <el-table-column label="返程日期" align="center" prop="returnTime" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.returnTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="备注" align="center" prop="remark" />-->
<!--      <el-table-column label="单据状态" align="center" prop="documentsStatus" />-->
<!--      <el-table-column label="制单人" align="center" prop="makerPeople" />-->
<!--      <el-table-column label="制单日期" align="center" prop="makerTime" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.makerTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-edit"-->
<!--            @click="handleUpdate(scope.row)"-->
<!--            v-hasPermi="['tax:lord:edit']"-->
<!--          >修改</el-button>-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['tax:lord:remove']"-->
<!--          >删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->


    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="BodyLotNo"
          :disabled="LotNoDisabled"
        >新增</el-button>
      </el-col>
    </el-row>
    <el-card class="mb4">
      <el-table v-loading="loading" :data="indexBodyList">
<!--        <el-table-column type="selection" width="55" align="center" />-->
        <el-table-column label="袋封号" align="center" prop="bagSealNo" />
        <el-table-column label="库位号" align="center" prop="bookStoreCode" />
        <el-table-column label="备注" align="center" prop="remark" />
<!--        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button-->
<!--              size="mini"-->
<!--              type="text"-->
<!--              icon="el-icon-edit"-->
<!--              @click="handleUpdate(scope.row)"-->
<!--              v-hasPermi="['tax:body:edit']"-->
<!--            >修改</el-button>-->
<!--            <el-button-->
<!--              size="mini"-->
<!--              type="text"-->
<!--              icon="el-icon-delete"-->
<!--              @click="handleDelete(scope.row)"-->
<!--              v-hasPermi="['tax:body:remove']"-->
<!--            >删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
<!--      <pagination-->
<!--        v-show="total>0"-->
<!--        :total="total"-->
<!--        :page.sync="bodyQueryParams.pageNum"-->
<!--        :limit.sync="bodyQueryParams.pageSize"-->
<!--        @pagination="indexBodyList"-->
<!--      />-->
    </el-card>

    <el-dialog :title="title" :visible.sync="open"  append-to-body >
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="mini"
        @click="bodyGetLotNo"
      >确定</el-button>
      <el-table  :data="bodyList" @selection-change="handleSelectionChange" v-loading="bodyListLoading">
        <el-table-column type="selection" width="55" align="center" />
<!--        <el-table-column label="主键ID" align="center" prop="id" />-->
        <el-table-column label="袋封号" align="center" prop="bagSealNo" />
        <el-table-column label="库位号" align="center" prop="bookStoreCode" />
        <el-table-column label="备注" align="center" prop="remark" />
<!--        <el-table-column label="主表关联ID" align="center" prop="taxSamplingLordId" />-->
<!--        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button-->
<!--              size="mini"-->
<!--              type="text"-->
<!--              icon="el-icon-edit"-->
<!--              @click="handleUpdate(scope.row)"-->
<!--              v-hasPermi="['tax:body:edit']"-->
<!--            >修改</el-button>-->
<!--            <el-button-->
<!--              size="mini"-->
<!--              type="text"-->
<!--              icon="el-icon-delete"-->
<!--              @click="handleDelete(scope.row)"-->
<!--              v-hasPermi="['tax:body:remove']"-->
<!--            >删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>

    </el-dialog>
  </div>
</template>

<script>
import {listLord, getLord, delLord, addLord, updateLord, LotNoList, InsertListLotNo,listBody} from "@/api/tax/sampling/lord";
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
      loading: true,
      bodyListLoading:true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      //子表新增按钮是否禁用
      LotNoDisabled:true,
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
    this.getList();
    const  id =this.$route.query.id
    console.log("我是传输过来的id="+id)
    this.taxSamplingLordId=id;
    const flag = this.$route.query.flag
    console.log("我是传输过来的flag="+flag)
    const single=this.$route.query.single
    const LotNo=this.$route.query.LotNo
    if(id){
      getLord(id).then(response =>{
        this.queryParams=response.data
        this.flag=flag;
        this.single=single;
        this.LotNoDisabled=false;
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
      this.single = selection.length!=1
      this.multiple = !selection.length
      this.InsertLotNoList=selection
      console.log("我是InsertLotNoList")
      console.log(this.InsertLotNoList)
    },
    /** 新增按钮操作 */
    handleAdd() {
      // this.open = true;
      // this.title = "添加取样管理 主";
      console.log("==========")
      console.log(this.queryParams)
      addLord(this.queryParams).then(response => {
        if (response.code === 200) {
          this.LotNoDisabled=false;
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
        console.log("------------");
        this.$set(column, 'taxSamplingLordId', this.taxSamplingLordId)

      });
      console.log("data数据")
      console.log(data)
      console.log("主键")
      console.log(this.InsertLotNoList)
      InsertListLotNo(this.InsertLotNoList).then(response =>{
        if(response.code === 200){
          this.msgSuccess("新增成功")
          this.indexList();
          this.open=false;
        }
      })

    },
    indexList(){
      this.bodyQueryParams.taxSamplingLordId=this.taxSamplingLordId;
      listBody(this.bodyQueryParams).then(response =>{
        if(response.code === 200){
          this.indexBodyList=response.rows
          this.total = response.total;
        }
      })
    }
  }
};
</script>
