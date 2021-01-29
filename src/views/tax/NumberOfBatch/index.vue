<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
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
        <el-form-item label="批次号" prop="batchNo">
          <el-input
            v-model="queryParams.batchNo"
            placeholder="请输入批次号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="业务编号" prop="businessNo">
          <el-input v-model="queryParams.businessNo" placeholder="请输入业务编号" clearable size="small"
                    @keyup.enter.native="handleQuery"/>
        </el-form-item>

        <el-form-item label="货物流向" prop="templateId">
          <el-select
            v-model="queryParams.templateId" placeholder="请选择进出场类型" @change="directionDicChange">
            <el-option
              v-for="type in directionDic"
              :key="type.key"
              :label="type.value"
              :value="type.key"
            />
          </el-select>
        </el-form-item>

        <el-radio v-model="radio" label= "1" @change="radioChange">未入场车辆数量大于0</el-radio>
        <el-radio v-model="radio" label= "2" @change="radioChange">未出场车辆数量大于0</el-radio>

      </el-row>


      <el-form-item label="通知单产生时间" prop="genTime" label-width="110px">
        <el-date-picker clearable size="small" style="width: 200px"
                        v-model="queryParams.genTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择通知单产生时间">
        </el-date-picker>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          <el-button
            type="warning"
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
          >导出
          </el-button>
      </el-form-item>
    </el-form>

<!--    <el-row :gutter="10" class="mb8">-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['tax:instore_notice:add']"-->
<!--        >新增-->
<!--        </el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['tax:instore_notice:edit']"-->
<!--        >修改-->
<!--        </el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['tax:instore_notice:remove']"-->
<!--        >删除-->
<!--        </el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['tax:instore_notice:export']"-->
<!--        >导出-->
<!--        </el-button>-->
<!--      </el-col>-->
<!--    </el-row>-->

    <el-table v-loading="loading" :data="instore_noticeList" @selection-change="handleSelectionChange">
      <!--<af-table-column type="selection" align="center" />-->
      <!--<af-table-column label="ID" align="center" prop="id" />-->
      <af-table-column label="批次号" align="center" prop="batchNo" width="190px"/>
      <!--<af-table-column label="备注" align="center" prop="remark" />-->
      <!--<af-table-column label="预订库位号" align="center" prop="bookStoreCode" width="180" />-->
      <af-table-column label="业务编号" align="center" prop="businessNo"/>
      <af-table-column label="货物流向" align="center" prop="direction" width="180px"/>
      <af-table-column label="寄仓客户" align="center" prop="contractNo"/>

      <af-table-column label="时间" align="center" prop="genTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.genTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="本批次车辆总数" align="center" prop="totalNumber"/>

      <af-table-column label="已入场车辆数量" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.finishNumber+scope.row.changNeiNumber}}</span>
        </template>
      </af-table-column>

      <af-table-column label="未入场车辆数量" align="center" prop="weiRuNumber"/>

      <af-table-column label="已完成车辆数量" align="center" prop="finishNumber"/>

      <af-table-column label="场内车辆数量" align="center" prop="changNeiNumber"/>

      <af-table-column label="未出场车辆数量" align="center" prop="weichuNumber" />
<!--        <template slot-scope="scope">-->
<!--          <span>{{scope.row.totalNumber-scope.row.finishNumber}}</span>-->
<!--        </template>-->
<!--      </af-table-column>-->

      <af-table-column label="寄仓合同编号" align="center" prop="contractNo"/>
      <af-table-column label="销售合同编号" align="center" prop="saleContractNo"/>
      <af-table-column label="入场详情" align="center" >
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="text"
          icon="el-icon-edit"
          @click="admittanceDetail(scope.row)"
        >入场详情
        </el-button>
      </template>
      </af-table-column>

      <af-table-column label="出厂详情" align="center" prop="vehicleNo" width="90px">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="text"
          icon="el-icon-edit"
          @click="chuDetail(scope.row)"
        >出场详情
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

  </div>
</template>

<script>
  import {
    listInstore_notice,
    getInstore_notice,
    delInstore_notice,
    addInstore_notice,
    updateInstore_notice, genStoreDoc, updateDocNotice,
    selectNumberOfBatch
  } from "@/api/tax/instore_notice";
  import {getUserDepts} from '@/utils/charutils'

  export default {
    name: "Instore_notice",
    data() {
      return {
        // 遮罩层
        loading: false,
        // 选中数组
        ids: [],
        depts: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 总条数
        total: 0,

        radio: '2',
        // 入库通知单表格数据
        instore_noticeList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 20,
          batchNo: undefined,
          bookStoreCode: undefined,
          businessNo: undefined,
          checkConsumer: undefined,
          contractNo: undefined,
          convoyNo: undefined,
          customsDeclarationNo: undefined,
          deliveryNo: undefined,
          driverName: undefined,
          endTime: undefined,
          fleetName: undefined,
          genTime: undefined,
          goodsCount: undefined,
          inNoticeNo: undefined,
          mechanicalNo: undefined,
          mechanicalPerson: undefined,
          placeId: undefined,
          primeMoverNo: undefined,
          saleContractNo: undefined,
          soNo: undefined,
          startTime: undefined,
          state: undefined,
          tallyClerk: undefined,
          totalRoughWeight: undefined,
          trailerNo: undefined,
          unloadGroup: undefined,
          vehicleNo: undefined,
          workGroup: undefined,
          templateId: '0',
          radio: '2',
          orderByColumn: 'id',
          isAsc: 'desc'
        },

        directionDic: [
          {'key': '0' , 'value':'全部'},
          {'key': '1', 'value': '入库'},
          {'key': '2', 'value': '出库'},
        ],
        // 表单参数
        form: {},
        // 表单校验
        rules: {},
        // stateDic: [
        //   {'value': '1', 'label': '生成'},
        //   {'value': '2', 'label': '打印'},
        //   {'value': '3', 'label': '磅单'},
        //   {'value': '4', 'label': '完成'},
        //   {'value': '5', 'label': '归档'},
        // ]
      };
    },
    created() {

      // this.queryParams.templateId =this.directionDic[0].key
      this.depts = getUserDepts('1')
      if (this.depts.length > 0) {
        this.queryParams.placeId = this.depts[0].deptId
        this.getList();
      }
    },
    methods: {
      /** 查询入库通知单列表 */
      getList() {
        // this.loading = true;
        selectNumberOfBatch(this.queryParams).then(response => {
          this.instore_noticeList = response.rows;
          this.total = response.total;
          // this.loading = false;
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
          createBy: undefined,
          createTime: undefined,
          remark: undefined,
          updateBy: undefined,
          updateTime: undefined,
          batchNo: undefined,
          bookStoreCode: undefined,
          businessNo: undefined,
          checkConsumer: undefined,
          contractNo: undefined,
          convoyNo: undefined,
          customsDeclarationNo: undefined,
          deliveryNo: undefined,
          driverName: undefined,
          endTime: undefined,
          fleetName: undefined,
          genTime: undefined,
          goodsCount: undefined,
          inNoticeNo: undefined,
          mechanicalNo: undefined,
          mechanicalPerson: undefined,
          placeId: this.queryParams.placeId,
          primeMoverNo: undefined,
          saleContractNo: undefined,
          soNo: undefined,
          startTime: undefined,
          state: undefined,
          tallyClerk: undefined,
          totalRoughWeight: undefined,
          trailerNo: undefined,
          unloadGroup: undefined,
          vehicleNo: undefined,
          workGroup: undefined
        };
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },

      radioChange(){
       this.queryParams.radio = this.radio;
       this.getList()
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
        this.title = "添加入库通知单";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getInstore_notice(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改入库通知单";
        });
      },
      //
      // directionDicChange(){
      //   this.queryParams.templateId =this.directionDic[0].key;
      //   this.getList()
      //
      // },
      /** 提交按钮 */
      submitForm: function () {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != undefined) {
              updateInstore_notice(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                }
              });
            } else {
              addInstore_notice(this.form).then(response => {
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
        this.$confirm('是否确认删除入库通知单号为"' + row.inNoticeNo + '"的数据项及其子项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return delInstore_notice(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function () {
        });
      },
      handleNoticeDetail(row) {
        console.log(row.inNoticeNo)
        this.$router.push({
          path: '/tax/instore/notice/detail',
          query: {
            'noticeNo': row.inNoticeNo,
            'placeId': row.placeId
          }
        })
      },
      handleNoticePrint(row) {
        console.log(row.inNoticeNo)
        this.$router.push({
          path: '/tax/instore/notice/print',
          query: {
            'noticeNo': row.inNoticeNo,
            'placeId': row.placeId
          }
        })
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('tax/instore_notice/export/test', {
          ...this.queryParams
        }, `tax_instore_notice.xlsx`)
      },
      handleNoticeArchive(row) {
        console.log(row)
        updateDocNotice(row.placeId, row.inNoticeNo, 'innotice', 'archive').then(response => {
          if (response.code === 200) {
            this.$message.success("归档成功")
            this.getList()
          }
        })
      },

      //路由跳转

      admittanceDetail(){

      },

      chuDetail(){

      }
      /*genDoc(row) {
        genStoreDoc(row.placeId, 1, row.inNoticeNo, 'A10103').then(response => {
          console.log(response)
          if(response.code === 200){
            this.getList()
          }
        })
      }*/
    }
  };
</script>
