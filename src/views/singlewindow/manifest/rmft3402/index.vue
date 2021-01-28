<template>
  <div class="app-container">
    <!-- 按钮组 -->
    <div class="mb20">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="mini"
        :disabled="btnDisable"
        @click="handleAdd"
      >新增</el-button>
      <el-button
        type="success"
        icon="el-icon-edit"
        size="mini"
        :disabled="btnDisable"
        @click="AllSave"
      >暂存</el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        size="mini"
        :disabled="btnDisable"
        @click="handleDelete"
      >删除</el-button>
      <el-button type="danger" icon="el-icon-thumb" size="mini" @click="updateStatementCode" v-hasPermi="['waybill:declare:declare']" style="float:right" disabled>申报</el-button>

      <!--      <el-button-->
<!--        type="primary"-->
<!--        icon="el-icon-document-copy"-->
<!--        size="mini"-->
<!--        :disabled="btnDisable"-->
<!--        @click="handleCopy"-->
<!--      >复制</el-button>-->
<!--      <el-button-->
<!--        type="primary"-->
<!--        icon="el-icon-refresh"-->
<!--        size="mini"-->
<!--        :disabled="btnDisable"-->
<!--        @click="handleRefresh"-->
<!--      >刷新</el-button>-->
    </div>
    <!-- 基本信息 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form :model="queryParams" ref="queryForm" label-width="160px" size="mini">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="货物运输批次号" prop="declarationId">
              <el-input v-model="declaration.declarationId" placeholder="货物运输批次号" clearable  />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输方式代码" prop="typeCode">
<!--              <el-input-->
<!--                @focus="$store.dispatch('originalManifest/changeStatus')"-->
<!--                v-model="borderTransportMeans.typeCode"-->
<!--                placeholder="运输方式代码"-->
<!--                clearable-->
<!--              />-->
              <el-select
                v-model="borderTransportMeans.typeCode"
                disabled>
                <el-option
                  :disabled="true"
                  v-for="dict in businessTypeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="进出境口岸代码" prop="declarationOfficeID">
              <el-input
                @focus="dialogTableVisible = true"
                v-model="declaration.declarationOfficeID"
                placeholder="进出境口岸代码"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="卸货地代码" prop="unloadinglocationId">
              <el-input v-model="unloadingLocation.unloadinglocationId" placeholder="卸货地代码" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="到达卸货地日期" prop="arrivalDateTime">
              <el-date-picker
                class="datePicker"
                v-model="unloadingLocation.arrivalDateTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyyMMddHHmmss"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="传输企业备案关区	" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="传输企业备案关区"
                clearable
              />
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="企业代码" prop="postCode" >
              <el-select v-model="head.unitCode" filterable placeholder="企业代码" @change="onChange">
                <el-option
                  v-for="(item,index) in listInfo"
                  :key="index"
                  :label="item.eName"
                  :value="item.deptId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注" prop="content">
              <el-input
                v-model="additionalInformation.content"
                placeholder="备注"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 提运单信息 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>提运单信息</span>
      </div>
      <el-row type="flex" class="mb20">
        <el-col>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            :disabled="btnDisable"
            @click="billLading"
          >新增</el-button>
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            :disabled="btnDisable"
            @click="handleChange($event,'body')"
          >修改</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="btnDisable"
            @click="handleDelete($event,'body')"
          >删除</el-button>
<!--          <el-button-->
<!--            type="danger"-->
<!--            icon="el-icon-thumb"-->
<!--            size="mini"-->
<!--            :disabled="btnDisable"-->
<!--            @click="handleReport"-->
<!--          >申报</el-button>-->
<!--          <el-button-->
<!--            type="primary"-->
<!--            icon="el-icon-document-copy"-->
<!--            size="mini"-->
<!--            :disabled="btnDisable"-->
<!--            @click="handleCopy"-->
<!--          >复制</el-button>-->
<!--          <el-button-->
<!--            type="primary"-->
<!--            icon="el-icon-refresh"-->
<!--            size="mini"-->
<!--            :disabled="btnDisable"-->
<!--            @click="handleRefresh"-->
<!--          >刷新</el-button>-->
        </el-col>
      </el-row>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="List"
        tooltip-effect="dark"
        style="width: 100%"
        @row-click='bodyFormClick'
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" min-width="55" />
        <el-table-column type="index" prop="num" label="序号" min-width="120" align="center"/>
        <el-table-column prop="transportContractDocument.transportcontractdocumentId" label="提(运)单号" min-width="120" align="center"/>
        <el-table-column prop="grossVolumeMeasure" label="货物体积(M3)" min-width="150" align="center"/>
        <el-table-column prop="totalPackageQuantity" label="货物总件数" min-width="120" align="center"/>
        <el-table-column prop="wrapType" label="包装种类" min-width="120" align="center" :formatter="PackageTypeCodeFormat"/>
        <el-table-column prop="goodsMeasure.grossMassMeasure" label="货物总毛重(KG)" min-width="120" align="center"/>
      </el-table>
      <el-pagination
        class="right mb20"
        background
        v-show="page.total>0"
        layout="prev, pager, next"
        :current-page="page.num"
        :total="page.total"
        :page-size="page.size"
        @current-change="currentChange"
      />
      <el-form :model="queryParams" ref="queryForm" label-width="160px" size="mini">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="提(运)单号" prop="transportcontractdocumentId">
              <el-input
                v-model="consignment.transportContractDocument.transportcontractdocumentId"
                placeholder="提(运)单号"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货物体积(M3)" prop="grossVolumeMeasure">
              <el-input
                v-model="consignment.grossVolumeMeasure"
                placeholder="货物体积(M3)"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="包装种类" prop="wrapType">
              <el-select v-model="consignment.wrapType" placeholder="包装种类" clearable  >
                <el-option
                  v-for="dict in PaymentMethodCode"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货物总件数" prop="totalPackageQuantity">
              <el-input
                v-model="consignment.totalPackageQuantity"
                placeholder="货物总件数"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="货物总毛重(KG)" prop="grossMassMeasure">
              <el-input
                v-model="consignment.goodsMeasure.grossMassMeasure"
                placeholder="货物总毛重(KG)"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 集装箱信息 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>集装箱信息</span>
      </div>
      <el-row type="flex" class="mb20">
        <el-col>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            :disabled="btnDisable"
            @click="containerAdd"
          >新增</el-button>
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            :disabled="btnDisable"
            @click="containerChange($event,'body')"
          >修改</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="btnDisable"
            @click="containerDelete($event,'body')"
          >删除</el-button>
<!--          <el-button-->
<!--            type="danger"-->
<!--            icon="el-icon-thumb"-->
<!--            size="mini"-->
<!--            :disabled="btnDisable"-->
<!--            @click="handleReport"-->
<!--          >申报</el-button>-->
<!--          <el-button-->
<!--            type="primary"-->
<!--            icon="el-icon-document-copy"-->
<!--            size="mini"-->
<!--            :disabled="btnDisable"-->
<!--            @click="handleCopy"-->
<!--          >复制</el-button>-->
<!--          <el-button-->
<!--            type="primary"-->
<!--            icon="el-icon-refresh"-->
<!--            size="mini"-->
<!--            :disabled="btnDisable"-->
<!--            @click="handleRefresh"-->
<!--          >刷新</el-button>-->
        </el-col>
      </el-row>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="transportEquipment"
        tooltip-effect="dark"
        style="width: 100%"
        @row-click='containerFormClick'
        @selection-change="handleSelectionChange"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="selection" min-width="55" />
        <el-table-column type="index" prop="num" label="序号" min-width="120" align="center"/>
        <el-table-column prop="transportequipmentId" label="集装箱(器)编号" min-width="120" align="center" />
      </el-table>
      <el-pagination
        v-show="page.total>0"
        class="right mb20"
        background
        layout="prev, pager, next"
        :current-page="page.num"
        :total="page.total"
        :page-size="page.size"
        @current-change="currentChange"
      />
      <el-form :model="queryParams" ref="queryForm" label-width="160px" size="mini">
        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="集装箱(器)编号" prop="transportequipmentId">
              <el-input
                v-model="transportEquipmentForm.transportequipmentId"
                placeholder="集装箱(器)编号"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <depParaList :tableVisible="dialogTableVisible" @choose="choose" @close="close"></depParaList>
    <depParaList2 :tableVisible="dialogTableVisible2" @choose="choose2" @close="close2"></depParaList2>
  </div>
</template>

<script>
import depParaListJson from "@/mock/depParaList2.json";
import { add,queryById } from "@/api/manifest/rmft5402_3402_4401/head";
import depParaList from "./components/depParaList";
import depParaList2 from "./components/depParaList2";
import { listInfo } from '@/api/basis/enterpriseInfo'
export default {
  components: { depParaListJson, depParaList, depParaList2, add },
  data() {
    return {
      //当前操作标体下标
      bodyIndex:-1,
      //选择到的数据
      selectBodyForm:[],
      depParaVal: "",
      depParaListJson,
      gridData: [],
      page: {
        num: 1,
        size: 10,
        total: 0,
      },
      businessTypeOptions:[],
      dialogTableVisible: false,
      dialogTableVisible2: false,
      // 按钮禁用状态
      btnDisable:false,

      // 查询参数
      queryParams: {
        postCode: undefined,
      },
      form: {
        head: {},
        declaration: {
          borderTransportMeans: {
            // 集装箱(器)List
            transportEquipment: [],
          },
          unloadingLocation: {},
          additionalInformation: {},
          consignment: {
            // 提（运）单号List
            transportContractDocument: [],
            // 货物毛重List
            goodsMeasure: [],
          },
        },
      },

      // 报文功能代码/报文类型代码
      head: {},
      // 进出境口岸海关代码/货物运输批次号
      declaration: {
        declarationOfficeID: undefined,
        declarationId: undefined,
        mtHeadId:undefined,
      },
      // 运输方式表单
      borderTransportMeans: {
        typeCode: '4',
      },
      // 卸货地表单
      unloadingLocation: {
        unloadinglocationId: undefined,
        arrivalDateTime: undefined,
      },
      // 备注表单
      additionalInformation: {
        content: undefined,
      },
      // 提运单整体表单
      consignment: {
        // 货物体积/货物总件数表单
        grossVolumeMeasure: undefined,
        totalPackageQuantity: undefined,
        // 包装种类
        wrapType: undefined,
        // 提（运）单号表单
        transportContractDocument: {
          transportcontractdocumentId: undefined,
        },
        // 货物毛重表单
        goodsMeasure: {
          grossMassMeasure: undefined,
        },
      },
      // 集装箱(器)编号表单/集装箱（器）残损说明数据表单
      transportEquipmentForm: {},
      // 提运单整体List
      List: [],
      // 集装箱(器)List
      transportEquipment: [],
      dateTimeVal: "",
      data: [],
      // 企业代码
      listInfo: [],
      // 包装种类字典
      PaymentMethodCode: [],
      //跳转页面标识
      ids:undefined,
      flag:undefined,
    };
  },
  mounted() {
    // 初始化
    this.init();
    /** 包装种类代码字典 */
    this.getDicts('sw_packag_type').then((response) => {
      this.PaymentMethodCode = response.data
    })
    const id=this.$route.query.id;
    this.ids=id;
    const flag=this.$route.query.flag;
    this.flag=flag
    if(flag){
      this.btnDisable=true;
    }
    if(id){
      this.query(id);
    }
  },
  //反填
  watch:{
    'submitter.submitterId':{
      handler: function(newVal) {
        const data = this.listInfo.find(el => el.contractorCodeScc === newVal)
        this.head.unitCode = data.eName
      }
    }
  },
  methods: {
    //根据ID查询详情数据
    query(id){
      queryById(id).then( res=>{
        //declaration
        this.declaration=res.data.declaration;
        this.borderTransportMeans=res.data.declaration.borderTransportMeans;
        this.unloadingLocation=res.data.declaration.unloadingLocation;
        this.additionalInformation=res.data.declaration.additionalInformation;
        this.List=res.data.declaration.consignment;
        this.transportEquipment=res.data.declaration.borderTransportMeans.transportEquipment;
        // this.head.unitCode=this.listInfo[0].eName;
        console.log(this.listInfo)
      })
    },
    async init() {
      // await this.depParaList()
      //  企业代码
      listInfo().then(data => {
        this.listInfo = data.rows
        console.log(data)
      })
      // 运输方式
      this.getDicts('station_transport_fashion').then((response) => {
        this.businessTypeOptions = response.data
      })
    },
    //托架/拖挂车类型 翻译
    PackageTypeCodeFormat(row, column) {
      return this.selectDictLabel(this.PaymentMethodCode, row.wrapType);
    },
    // 提运单新增
    billLading() {
      this.List.push(this.consignment);
      this.consignment = {
        grossVolumeMeasure: undefined,
        totalPackageQuantity: undefined,
        wrapType: undefined,
        transportContractDocument: {
          transportcontractdocumentId: undefined,
        },
        goodsMeasure: {
          grossMassMeasure: undefined,
        },
      };
      console.log(this.List);
    },

    // 集装箱新增
    containerAdd() {
      this.transportEquipment.push(this.transportEquipmentForm);
      this.transportEquipmentForm = {
        transportequipmentId: undefined,
      };
      // console.log(this.transportEquipmentForm)
    },
    // 暂存 = 整体新增
    AllSave() {
      this.form.head = this.listInfo.find(el => el.deptId === this.head.unitCode)
      this.form.head.functionCode = "2";
      this.form.head.messageType = "MT3402";
      this.declaration.mtHeadId=this.ids;
      this.form.declaration = this.declaration;
      this.form.declaration.borderTransportMeans = this.borderTransportMeans;
      this.form.declaration.unloadingLocation = this.unloadingLocation;
      this.form.declaration.additionalInformation = this.additionalInformation;
      this.form.declaration.borderTransportMeans.transportEquipment = this.transportEquipment;
      this.form.declaration.consignment = this.List;
      add(this.form).then((response) => {
        if (response.code === 200) {
          if(this.ids == undefined){
            this.msgSuccess("新增成功");
            console.log(JSON.stringify(this.form));
          }
          if(this.flag ==undefined && this.ids !=undefined){
            this.msgSuccess('修改成功')
            this.$store.dispatch('tagsView/delView', this.$route)
            this.$router.go(-1)
          }
        } else {
          this.msgError(response.msg);
        }
      });
      this.reset();
    },
    // 表单清空
    reset() {
      this.declaration = {},
      this.borderTransportMeans = {},
      this.unloadingLocation = {},
      this.additionalInformation = {},
      this.consignment = {
        grossVolumeMeasure: undefined,
        totalPackageQuantity: undefined,
        wrapType: undefined,
        transportContractDocument: {
          transportcontractdocumentId: undefined,
        },
        goodsMeasure: {
          grossMassMeasure: undefined,
        },
      },
      this.transportEquipmentForm = {},
      this.List = [],
      this.transportEquipment = []
    },
    // 新增
    handleAdd() {},
    // 暂存
    handleSave() {
      console.log("保存");
      // this.$saveStore("a","123")
      // this.$getStore('a')
      // this.$delStore("a")
    },

    // 申报
    handleReport() {},
    // 复制
    handleCopy() {},
    // 刷新
    handleRefresh() {},
    // 翻页
    currentChange(page) {
      console.log(page);
    },
    // 组件选择
    choose(row) {
      this.queryParams.postCode = row.codeName;
      this.declaration.declarationOfficeID = row.codeName;
      this.dialogTableVisible = false;
    },
    // 关闭组件
    close() {
      this.dialogTableVisible = false;
    },
    choose2(row) {
      this.queryParams.postCode = row.codeName;
      this.dialogTableVisible2 = false;
    },
    close2() {
      this.dialogTableVisible2 = false;
    },
    handleSelectionChange(data) {
      this.selectBodyForm=data;
    },
    numFun() {
      console.log(123);
    },
    /** 申报按钮 */
    updateStatementCode(){},
    /** 回显防范*/
    onChange(id) {
      const data = this.listInfo.find(el => el.deptId === id)
      console.log(data)
      const code = data.customsMaster
      this.unloadingLocation.unloadinglocationId = code
    },
    // 请求接口
    depParaList() {
      return new Promise((resolve) => {
        this.$store
          .dispatch("originalManifest/depParaList", {
            tableName: "CUS_CUSTOMS",
            rowNum: 5000,
          })
          .then((data) => {
            resolve(data);
          });
      });
    },
    // 添加index
    tableRowClassName(data) {
      //把每一行的索引放进row
      data.row.rowIndex = data.rowIndex
    },
    //单击list反填form 提运单信息
    bodyFormClick(row){
      console.log(row)
      this.bodyIndex=JSON.parse(JSON.stringify(row)).rowIndex;
      this.consignment=JSON.parse(JSON.stringify(row));
    },
    //修改 提运单信息
    handleChange(e,name){
      if(name == 'body'){
        if (this.bodyIndex === -1) return
        this.List[this.bodyIndex]=JSON.parse(JSON.stringify(this.consignment))
        this.List = JSON.parse(JSON.stringify(this.List))
        console.log(this.List)
        this.bodyIndex = -1
        //修改后清空表单
        this.consignment = {
          grossVolumeMeasure: undefined,
          totalPackageQuantity: undefined,
          wrapType: undefined,
          transportContractDocument: {
            transportcontractdocumentId: undefined,
          },
          goodsMeasure: {
            grossMassMeasure: undefined,
          },
        }
      }
    },
    // 删除 提运单信息
    handleDelete(e, name) {
      if (name === 'body') {
        this.List = this.List.filter(el => !this.selectBodyForm.includes(el))
        //删除时 清空表单
        this.consignment = {
          grossVolumeMeasure: undefined,
          totalPackageQuantity: undefined,
          wrapType: undefined,
          transportContractDocument: {
            transportcontractdocumentId: undefined,
          },
          goodsMeasure: {
            grossMassMeasure: undefined,
          },
        }
      }
    },
    //单击list反填form 集装箱信息
    containerFormClick(row){
      this.bodyIndex=JSON.parse(JSON.stringify(row)).rowIndex;
      this.transportEquipmentForm=JSON.parse(JSON.stringify(row));
    },
    //修改 集装箱信息
    containerChange(e,name){
      if(name == 'body'){
        if (this.bodyIndex === -1) return
        this.transportEquipment[this.bodyIndex]=JSON.parse(JSON.stringify(this.transportEquipmentForm))
        this.transportEquipment = JSON.parse(JSON.stringify(this.transportEquipment))
        console.log(this.transportEquipment)
        this.bodyIndex = -1
        //修改后清空form表单
        this.transportEquipmentForm = {}
      }
    },
    // 删除 集装箱信息
    containerDelete(e, name) {
      if (name === 'body') {
        this.transportEquipment = this.List.filter(el => !this.selectBodyForm.includes(el))
        //删除后清空form表单
        // this.transportEquipmentForm = {}
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.right {
  text-align: right;
}
.datePicker {
  width: 100% !important;
}
.el-select{width: 100%}
</style>
