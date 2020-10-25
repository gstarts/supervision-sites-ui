<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
<!--      <el-form-item label="序号" prop="no">-->
<!--        <el-input-->
<!--          v-model="queryParams.no"-->
<!--          placeholder="请输入序号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="日期" prop="date">-->
<!--        <el-input-->
<!--          v-model="queryParams.date"-->
<!--          placeholder="请输入日期"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="客户单位" prop="customer">-->
<!--        <el-input-->
<!--          v-model="queryParams.customer"-->
<!--          placeholder="请输入客户单位"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="合同号" prop="contractNo">-->
<!--        <el-input-->
<!--          v-model="queryParams.contractNo"-->
<!--          placeholder="请输入合同号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="煤种" prop="coalType">-->
<!--        <el-select v-model="queryParams.coalType" placeholder="请选择煤种" clearable size="small">-->
<!--          <el-option label="请选择字典生成" value="" />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="车号" prop="plateNo">-->
<!--        <el-input-->
<!--          v-model="queryParams.plateNo"-->
<!--          placeholder="请输入车号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="提煤单号" prop="coalBillNo">-->
<!--        <el-input-->
<!--          v-model="queryParams.coalBillNo"-->
<!--          placeholder="请输入提煤单号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="承运单位" prop="carriage">-->
<!--        <el-input-->
<!--          v-model="queryParams.carriage"-->
<!--          placeholder="请输入承运单位"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="装货地点" prop="loading">-->
<!--        <el-input-->
<!--          v-model="queryParams.loading"-->
<!--          placeholder="请输入装货地点"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="收货单位" prop="receipt">-->
<!--        <el-input-->
<!--          v-model="queryParams.receipt"-->
<!--          placeholder="请输入收货单位"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="开单员 打印时候获取" prop="operator">-->
<!--        <el-input-->
<!--          v-model="queryParams.operator"-->
<!--          placeholder="请输入开单员 打印时候获取"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="乐观锁" prop="revision">-->
<!--        <el-input-->
<!--          v-model="queryParams.revision"-->
<!--          placeholder="请输入乐观锁"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="状态 状态备用" prop="status">-->
<!--        <el-select v-model="queryParams.status" placeholder="请选择状态 状态备用" clearable size="small">-->
<!--          <el-option label="请选择字典生成" value="" />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>-->
<!--        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
<!--      </el-form-item>-->
    </el-form>

    <el-row :gutter="10" class="mb8">
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['place:card:add']"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['place:card:edit']"-->
<!--        >修改</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['place:card:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="info"
          class="fa fa-print"
          size="mini"
          v-print="'#dayin'"
          @click="print"
          v-hasPermi="['place:card:export']"
        >打印</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="cardList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="序号" align="center" prop="no" />
      <el-table-column label="日期" align="center" prop="date" />
      <el-table-column label="客户单位" align="center" prop="customer" />
      <el-table-column label="合同号" align="center" prop="contractNo" />
      <el-table-column label="煤种" align="center" prop="coalType" />
      <el-table-column label="车号" align="center" prop="plateNo" />
      <el-table-column label="提煤单号" align="center" prop="coalBillNo" />
      <el-table-column label="承运单位" align="center" prop="carriage" />
      <el-table-column label="装货地点" align="center" prop="loading" />
      <el-table-column label="收货单位" align="center" prop="receipt" />
<!--      <el-table-column label="开单员 打印时候获取" align="center" prop="operator" />-->
<!--      <el-table-column label="备注" align="center" prop="remark" />-->
<!--      <el-table-column label="乐观锁" align="center" prop="revision" />-->
<!--      <el-table-column label="状态 状态备用" align="center" prop="status" />-->
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-edit"-->
<!--            @click="handleUpdate(scope.row)"-->
<!--            v-hasPermi="['place:card:edit']"-->
<!--          >修改</el-button>-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['place:card:remove']"-->
<!--          >删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!--打印区域-->
    <div id="dayin"  v-show="show">
      <div v-for="(item,index) in printList" id="all">
        <div :id="gennerateId(index)"></div>
        <div id="headRow">{{item.no}}</div>
        <div id="firstRow">
          <span>{{item.date}}</span>
        <span id="contractNoStyle">{{item.contractNo}}</span>
        <span id="coalBillNoStyle">{{item.coalBillNo}}</span></div>

        <div id="secondRow">
          <span id="customerStyle">{{item.customer}}</span>
        <span id="carriageStyle">{{item.carriage}}</span></div>

        <div id="thirdRow">
          <span>{{item.coalType}}</span>
        <span id="loadingStyle">{{item.loading}}</span></div>

        <div id="fourRow">
          <span>{{item.plateNo}}</span>
        <span id="receiptStyle">{{item.receipt}}</span></div>
        <div id="fiveRow">
          <span>{{biller}}</span>
        </div>
        <div id="nouse"></div>
      </div>

    </div>

    <!-- 添加或修改入门证 对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="序号" prop="no">
          <el-input v-model="form.no" placeholder="请输入序号" />
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-input v-model="form.date" placeholder="请输入日期" />
        </el-form-item>
        <el-form-item label="客户单位" prop="customer">
          <el-input v-model="form.customer" placeholder="请输入客户单位" />
        </el-form-item>
        <el-form-item label="合同号" prop="contractNo">
          <el-input v-model="form.contractNo" placeholder="请输入合同号" />
        </el-form-item>
        <el-form-item label="煤种">
          <el-select v-model="form.coalType" placeholder="请选择煤种">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="车号" prop="plateNo">
          <el-input v-model="form.plateNo" placeholder="请输入车号" />
        </el-form-item>
        <el-form-item label="提煤单号" prop="coalBillNo">
          <el-input v-model="form.coalBillNo" placeholder="请输入提煤单号" />
        </el-form-item>
        <el-form-item label="承运单位" prop="carriage">
          <el-input v-model="form.carriage" placeholder="请输入承运单位" />
        </el-form-item>
        <el-form-item label="装货地点" prop="loading">
          <el-input v-model="form.loading" placeholder="请输入装货地点" />
        </el-form-item>
        <el-form-item label="收货单位" prop="receipt">
          <el-input v-model="form.receipt" placeholder="请输入收货单位" />
        </el-form-item>
        <el-form-item label="开单员 打印时候获取" prop="operator">
          <el-input v-model="form.operator" placeholder="请输入开单员 打印时候获取" />
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
        <el-form-item label="状态 状态备用">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
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
import { listCard, getCard, delCard, addCard, updateCard } from "@/api/place/card";

export default {
  name: "Card",
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
      // 入门证 表格数据
      cardList: [],
      show : false,
      // 打印数据list
      printList:[],
      // 弹出层标题
      title: "",
      //开单员
      biller: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        no: undefined,
        date: undefined,
        customer: undefined,
        contractNo: undefined,
        coalType: undefined,
        plateNo: undefined,
        coalBillNo: undefined,
        carriage: undefined,
        loading: undefined,
        receipt: undefined,
        operator: undefined,
        revision: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询入门证 列表 */
    getList() {
      this.loading = true;
      listCard(this.queryParams).then(response => {
        this.cardList = response.rows;
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
        no: undefined,
        date: undefined,
        customer: undefined,
        contractNo: undefined,
        coalType: undefined,
        plateNo: undefined,
        coalBillNo: undefined,
        carriage: undefined,
        loading: undefined,
        receipt: undefined,
        operator: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        revision: undefined,
        status: "0"
      };
      this.resetForm("form");
    },
    // 打印操作，生成divID
    gennerateId:function (index) {
      return "printDiv"+index
    },
    print(){
      this.biller  = this.$store.state.user.nickName
      this.show = true;
      clearTimeout(this.timer);
      //清除延迟执行
      this.timer = setTimeout(() => {
        //设置延迟执行
        //this.reset();
        this.show = false;
      }, 2000);
    },



      //销毁前清除定时器
    beforeDestroy() {
      clearInterval(this.timer1);
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
      this.printList = selection
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加入门证 ";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCard(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改入门证 ";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateCard(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addCard(this.form).then(response => {
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
      this.$confirm('是否确认删除入门证 编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCard(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/card/export', {
        ...this.queryParams
      }, `place_card.xlsx`)
    }
  }
};
</script>

<style>

  @page {
    size: auto;
    margin: 3mm;
  }

  /*html {*/
  /*  background-color: #ffffff;*/
  /*  margin: 0px;*/
  /*}*/

  /*body {*/
  /*  margin: 10mm 15mm 10mm 15mm;*/
  /*}*/
  #all {
    height:1638px;
    width: 1150px;
    /*border: 1px solid ;*/
    /*margin-top: 1cm;*/
  }
  #headRow{
    height: 40px;
    width: 1000px;
    padding-left: 3.5cm;
    /*border: 1px solid ;*/
    padding-top: 10px;
    margin-top: 2.5cm;
  }
  #firstRow{
    height: 40px;
    width: 1000px;
    padding-left: 4cm;
    /*border: 1px solid ;*/
    padding-top: 10px;
    margin-top: 1cm;


  }
  #contractNoStyle{
    margin-left: 4cm;
  }

  #coalBillNoStyle{
    margin-left: 4cm;
  }

  #secondRow{
    height: 40px;
    width: 1000px;
    padding-left: 4cm;
    /*border: 1px solid ;*/
    padding-top: 10px;

  }

  #thirdRow{
    height: 40px;
    width: 1000px;
    padding-left: 4cm;
    /*border: 1px solid ;*/
    padding-top: 10px;
  }

  #fourRow{
    height: 40px;
    width: 1000px;
    padding-left: 4cm;
    /*border: 1px solid ;*/
    padding-top: 10px;
  }

  /*#customerStyle{*/
  /*  margin-left: 4cm;*/
  /*}*/

  #carriageStyle{
    margin-left: 4cm;
  }

  #loadingStyle{
    margin-left: 4cm;
  }
  #receiptStyle{
    margin-left: 4cm;
  }

  #fiveRow{
    height: 40px;
    width: 1000px;
    padding-left: 4cm;
    /*border: 1px solid ;*/
    padding-top: 10px;
    margin-top: 1cm;
  }

  #nouse{
    height: 100px;
    width: 1000px;
    /*border: 1px solid*/

  }





</style>
