<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryParams" :inline="true" label-width="68px">
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
      <el-form-item label="业务编号" prop="businessNumber">
        <el-input
          v-model="queryParams.businessNumber"
          placeholder="请输入业务编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery" v-hasPermi="['tax:lord:reset']">重置</el-button>
        </el-form-item>
      </el-row>


    </el-form>
<!--      <el-form-item label="单据号" prop="documentNo">-->
<!--        <el-input-->
<!--          v-model="queryParams.documentNo"-->
<!--          placeholder="请输入单据号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->

<!--      </el-form-item>-->




<!--      <el-form-item label="取样单位" prop="samplingUnit">-->
<!--        <el-input-->
<!--          v-model="queryParams.samplingUnit"-->
<!--          placeholder="请输入取样单位"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="取样人" prop="samplingPeople">-->
<!--        <el-input-->
<!--          v-model="queryParams.samplingPeople"-->
<!--          placeholder="请输入取样人"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="取样总重量" prop="samplingWeight">-->
<!--        <el-input-->
<!--          v-model="queryParams.samplingWeight"-->
<!--          placeholder="请输入取样总重量"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="返程日期" prop="returnTime">-->
<!--        <el-date-picker clearable size="small" style="width: 200px"-->
<!--          v-model="queryParams.returnTime"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="选择返程日期">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="单据状态" prop="documentsStatus">-->
<!--        <el-select v-model="queryParams.documentsStatus" placeholder="请选择单据状态" clearable size="small">-->
<!--          <el-option label="请选择字典生成" value="" />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="制单人" prop="makerPeople">-->
<!--        <el-input-->
<!--          v-model="queryParams.makerPeople"-->
<!--          placeholder="请输入制单人"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="制单日期" prop="makerTime">-->
<!--        <el-date-picker clearable size="small" style="width: 200px"-->
<!--          v-model="queryParams.makerTime"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="选择制单日期">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->

<!--    </el-form>-->

<!--    <el-row :gutter="10" class="mb8">-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['tax:lord:add']"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['tax:lord:edit']"-->
<!--        >修改</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['tax:lord:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['tax:lord:export']"-->
<!--        >导出</el-button>-->
<!--      </el-col>-->
<!--    </el-row>-->

    <el-table v-loading="loading" :data="lordList" @selection-change="handleSelectionChange" >
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column type="selection" width="55" align="center" />-->
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="单据号" align="center" prop="documentNo" />
      <el-table-column label="LotNo" align="center" prop="lotNo" />
      <el-table-column label="客户" align="center" prop="client" />
      <el-table-column label="入境日期" align="center" prop="entryTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.entryTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="业务编号" align="center" prop="businessNumber" />
      <el-table-column label="取样日期" align="center" prop="samplingTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.samplingTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="取样单位" align="center" prop="samplingUnit" />
      <el-table-column label="取样人" align="center" prop="samplingPeople" />
      <el-table-column label="取样总重量" align="center" prop="samplingWeight" />
      <el-table-column label="返程日期" align="center" prop="returnTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.returnTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="单据状态" align="center" prop="documentsStatus" />
      <el-table-column label="制单人" align="center" prop="makerPeople" />
      <el-table-column label="制单日期" align="center" prop="makerTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.makerTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:lord:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleSelect(scope.row)"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      :page-sizes="[100, 200, 300, 400,500]"
      @pagination="getList"
    />

    <!-- 添加或修改取样管理 主对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="单据号" prop="documentNo">
          <el-input v-model="form.documentNo" placeholder="请输入单据号" />
        </el-form-item>
        <el-form-item label="LotNo" prop="lotNo">
          <el-input v-model="form.lotNo" placeholder="请输入LotNo" />
        </el-form-item>
        <el-form-item label="客户" prop="client">
          <el-input v-model="form.client" placeholder="请输入客户" />
        </el-form-item>
        <el-form-item label="入境日期" prop="entryTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.entryTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择入境日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="业务编号" prop="businessNumber">
          <el-input v-model="form.businessNumber" placeholder="请输入业务编号" />
        </el-form-item>
        <el-form-item label="取样日期" prop="samplingTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.samplingTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择取样日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="取样单位" prop="samplingUnit">
          <el-input v-model="form.samplingUnit" placeholder="请输入取样单位" />
        </el-form-item>
        <el-form-item label="取样人" prop="samplingPeople">
          <el-input v-model="form.samplingPeople" placeholder="请输入取样人" />
        </el-form-item>
        <el-form-item label="取样总重量" prop="samplingWeight">
          <el-input v-model="form.samplingWeight" placeholder="请输入取样总重量" />
        </el-form-item>
        <el-form-item label="返程日期" prop="returnTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.returnTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择返程日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
<!--        <el-form-item label="单据状态">-->
<!--          <el-radio-group v-model="form.documentsStatus">-->
<!--            <el-radio label="1">请选择字典生成</el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
        <el-form-item label="制单人" prop="makerPeople">
          <el-input v-model="form.makerPeople" placeholder="请输入制单人" />
        </el-form-item>
        <el-form-item label="制单日期" prop="makerTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.makerTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择制单日期">
          </el-date-picker>
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
    </el-dialog>
  </div>
</template>

<script>
import { listLord, getLord, delLord, addLord, updateLord,selectAll} from "@/api/tax/sampling/lord";

export default {
  name: "Lord",
  data() {
    return {
      //入境日期 时间集合
      EntryTime:[],
      //取样日期 时间集合
      samplingTime:[],
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
        entryTimeBegin:undefined,
        entryTimeEnd:undefined,
        samplingTimeBegin:undefined,
        samplingTimeEnd:undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      TestList:[],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询取样管理 主列表 */
    getList() {
      this.loading = true;
      if(this.EntryTime !=null){
        this.queryParams.entryTimeBegin=this.EntryTime[0];
        this.queryParams.entryTimeEnd=this.EntryTime[1];
      }
      if(this.samplingTime !=null){
        this.queryParams.samplingTimeBegin=this.samplingTime[0];
        this.queryParams.samplingTimeEnd=this.samplingTime[1];
      }
      listLord(this.queryParams).then(response => {
        this.lordList = response.rows;
        this.total = response.total;
        this.loading = false;
        // this.EntryTime=[];
        // this.samplingTime=[];
        this.queryParams.entryTimeBegin=undefined;
        this.queryParams.entryTimeEnd=undefined;
        this.queryParams.samplingTimeBegin=undefined;
        this.queryParams.samplingTimeEnd=undefined;
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
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();

    },
    /** 重置按钮操作 */
    resetQuery() {
      this.reset();
      this.queryParams={};
      this.EntryTime=[];
      this.samplingTime=[];
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
      this.TestList.push(selection)
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加取样管理 主";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      const id = row.id || this.ids
      const LotNo=row.lotNo
      this.$router.push({path: '/tax/spamlingsmall', query: {id: id, flag: true,single:false,LotNo:LotNo}})
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
    /** 详情按钮操作 */
    handleSelect(row) {
      const id = row.id || this.ids;
      this.$router.push({path: '/tax/spamlingsmall', query: {id: id, flag: true,single:true}})
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('tax/lord/export', {
        ...this.queryParams
      }, `tax_lord.xlsx`)
    }
  }
};
</script>
