<template>
  <div class="app-container">
    <!-- 按钮组 -->
    <div class="mb20">
      <el-button type="primary" icon="el-icon-plus" size="small" :loading="saveLoading" @click="AllADD">暂存</el-button>
      <el-button type="success" icon="el-icon-edit" size="small" @click="generateAdd">生成</el-button>
      <el-button type="warning" icon="el-icon-refresh-right" size="small" @click="cancel">清空</el-button>
      <el-button type="danger" plain icon="el-icon-search" size="small" @click="getVehicleList">刷新车号</el-button>
      <!-- <el-button
         type="primary"
         icon="el-icon-plus"
         size="mini"
         @click="headHandleAdd"
         v-if="this.form.netWeight == undefined || this.form.plateNum == undefined"
         style="display:none"
       >打印
       </el-button>
       <el-button
         type="info"
         class="fa fa-print"
         size="mini"
         v-print="'#dayin'"
         @click="print"
         v-else
       >打印
       </el-button>-->
      <el-button
        type="info"
        size="small"
        icon="el-icon-printer"
        v-print="'#dayin'"
        @click="print">
        <!-- v-show="this.form.netWeight !== undefined && this.form.netWeight !== '' &&  this.form.plateNum !== undefined && this.form.plateNum !==''
         && this.form.locationNumber !== undefined &&  this.form.locationNumber !=='' && this.PoundForm.stationViaType ==='01'"-->
        打印
      </el-button>
    </div>
    <el-row :gutter="10">
      <el-col :span="15">
        <el-card class="mb20">
          <el-form :model="form" ref="form" :rules="rulesAll" label-width="160px">
            <el-row type="flex">
              <el-col :span="12">
                <el-form-item label="发货单位" prop="deliveryUnit">
                  <el-input v-model="form.deliveryUnit" placeholder="请输入发货单位" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="车号" prop="plateNum" class="coalPageSelect">
                  <el-select class="coalPageSelect"
                             ref="plateNum"
                             v-model="form.plateNum"
                             placeholder="请选择车号"
                             prop="plateNum"
                             filterable
                             clearable
                             @change="CarNumberChange"
                  >
                    <el-option
                      v-for="dict in plateNumOptions"
                      :key="dict.value"
                      :label="dict.key"
                      :value="dict.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex">
              <el-col :span="12">
                <el-form-item label="收货单位" prop="receivingUnit">
                  <el-input v-model="form.receivingUnit" placeholder="请输入收货单位" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="毛重" prop="grossWeight" class="coalPageSelect">
                  <el-input class="coalPageSelect"
                            v-model.number="form.grossWeight"
                            placeholder="请输入毛重"
                            clearable
                            disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex">
              <el-col :span="12">
                <el-form-item label="货物名称" prop="goodsName">
                  <el-input v-model="form.goodsName" placeholder="请输入货物名称" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="皮重" prop="tare" class="coalPageSelect">
                  <el-input v-model.number="form.tare" placeholder="请输入皮重" clearable disabled
                            class="coalPageSelect"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex">
              <el-col :span="12">
                <el-form-item label="规格型号" prop="specification">
                  <el-input v-model="form.specification" placeholder="请输入规格型号" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="净重" prop="netWeight" class="coalPageSelect">
                  <el-input v-model.number="form.netWeight" placeholder="请输入净重" clearable disabled
                            class="coalPageSelect"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex">
              <el-col :span="12">
                <el-form-item label="备注" prop="remark">
                  <el-input v-model="form.remark" placeholder="请输入备注" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12"> <!--v-show="showStore"-->
                <el-form-item label="库位号" prop="locationNumber" class="coalPageSelect">
                  <el-select class="coalPageSelect"
                             v-model="form.locationNumber"
                             placeholder="请选择库位号"
                             prop="locationNumber"
                             filterable >
                    <el-option
                      v-for="dict in storeList"
                      :key="dict.value"
                      :label="dict.key"
                      :value="dict.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <span style="display: none"> 单号：{{ form.noticeNo }}</span>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card>
          <el-form
            :model="PoundForm"
            ref="PoundForm"
            :rules="ruless"
            label-width="80px"
            class="mb20"
          >
            <input
              class="Pound"
              :style="{'color':isStable===1?'green':'red'}"
              v-model="Poundweight"
              disabled
            />
            <!--<input class="Pound" v-else style="color:red" v-model="this.Poundweight" disabled/>-->
            <el-form-item label="流向">
              <el-select v-model="PoundForm.flowDirection" placeholder="请选择流向" prop="flowDirection" @change="flowCheck">
                <el-option
                  v-for="dict in flowDirectionOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="通道号" prop="channelNumber">
              <el-select
                filterable
                v-model="PoundForm.channelNumber"
                placeholder="请选择通道号"
                @change="ChannelNumberChange"
              >
                <el-option
                  v-for="dept in chnlConfigList"
                  :key="dept.cChnlNo"
                  :label="dept.cChnlName"
                  :value="dept.cChnlNo"
                />
              </el-select>
            </el-form-item>
            <!-- -->
            <el-form-item label="车辆类型" prop="stationViaType">
              <el-select filterable v-model="PoundForm.stationViaType" placeholder="请选择车辆类型" @change="vehicleChange">
                <el-option
                  v-for="dept in stationViaTypeOptions"
                  :key="dept.dictValue"
                  :label="dept.dictLabel"
                  :value="dept.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="进场记录" name="Approach">
          <el-table
            class="mb20"
            ref="ApproachList"
            :data="ApproachList"
            v-loading="loading"
            tooltip-effect="dark"
            style="width: 100%"
            @row-dblclick="dbRow"
          >
            <!--            <el-table-column type="selection" width="55" align="center"/>-->
            <el-table-column label="车号" align="center" prop="plateNum"/>
            <el-table-column label="毛重" align="center" prop="grossWeight"/>
            <el-table-column label="皮重" align="center" prop="tare"/>
            <el-table-column label="净重" align="center" prop="netWeight"/>
            <el-table-column label="库位号" align="center" prop="locationNumber"/>
            <el-table-column label="发货单位" align="center" prop="deliveryUnit"/>
            <el-table-column label="收货单位" align="center" prop="receivingUnit"/>
            <el-table-column label="货物名称" align="center" prop="goodsName"/>
            <el-table-column label="备注" align="center" prop="remark"/>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getListI"
          />
        </el-tab-pane>
        <el-tab-pane label="已完成" name="end">
          <el-table
            class="mb20"
            ref="sheetList"
            :data="sheetList"
            v-loading="loading"
            tooltip-effect="dark"
            style="width: 100%"
            @row-dblclick="dbRow"
          >
            <!--            <el-table-column type="selection" width="55" align="center"/>-->
            <el-table-column label="车号" align="center" prop="plateNum"/>
            <el-table-column label="毛重" align="center" prop="grossWeight"/>
            <el-table-column label="皮重" align="center" prop="tare"/>
            <el-table-column label="净重" align="center" prop="netWeight"/>
            <el-table-column label="库位号" align="center" prop="locationNumber"/>
            <el-table-column label="发货单位" align="center" prop="deliveryUnit"/>
            <el-table-column label="收货单位" align="center" prop="receivingUnit"/>
            <el-table-column label="货物名称" align="center" prop="goodsName"/>
            <el-table-column label="备注" align="center" prop="remark"/>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getListE"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <div id="dayin" v-show="Explicit ">
      <div id="poundtotalStyle">
        <span class="poundtoalFont">{{ poundTotal }}</span>
        <div id="batchNumber"><span>{{ batchNum }}</span></div>
      </div>
      <div id="nowDataStyle">
        <span class="area-in-style">{{ nowData }}</span>
      </div>
      <div id="nowTimeStyle">
        <span>{{ nowTime }}</span>
      </div>
      <div id="areaLeftstyle">
        <span>{{ form.deliveryUnit }}</span>
      </div>
      <div id="areaRightStyle">
        <span>{{ form.plateNum }}</span>
      </div>
      <br/>
      <div id="areaLeftstyle">
        <span>{{ form.receivingUnit }}</span>
      </div>
      <div id="areaRightStyle">
        <span>{{ form.grossWeight }}</span>
      </div>
      <div id="areaLeftstyle">
        <span>{{ form.goodsName }}</span>
      </div>
      <div id="areaRightStyle">
        <span>{{ form.tare }}</span>
        <br/>
      </div>
      <div id="areaLeftstyle">
        <span>{{ form.specification }}</span>
      </div>
      <div id="areaRightStyle">
        <span>{{ form.netWeight }}</span>
        <br/>
      </div>
      <div id="remarkStyle">
        <span class="area-in-style">{{ form.remark }}</span>
        <br/>
      </div>
      <div id="nameStyle">
        <span>{{ WeighmanName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {addSheet, getSheet, listIESheet, poundSelect, updateSheet,} from "@/api/tax/poundlist";
import {listVehicleNoList} from "@/api/system/vehicle_info";
import {genTimeCode} from "@/utils/common";
import {listChnlConfig} from "@/api/basis/chnlConfig";
import {getUserDepts, isChina} from "@/utils/charutils";
import {genStoreDoc, getNoticeByVehicle} from "@/api/tax/instore_notice";
import {getStoreUsable} from '@/api/tax/store'

export default {
  name: "Client",
  data() {
    return {
      //标签页
      activeName: 'Approach',
      //稳定标识
      isStable: undefined,
      //地磅返回重量
      Poundweight: 0,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 通道配置表格数据
      chnlConfigList: [],
      //出场完结List统计列表
      sheetList: [],
      //进场数据List
      ApproachList: [],
      //隐藏域
      Explicit: false,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      timer1: "",
      // 总条数
      total: 0,
      //司磅员姓名
      WeighmanName: "",
      nowData: "",
      nowTime: "",
      batchNum: "",
      // 终端表格数据
      clientList: [],
      poundTotal: "",
      // 流向
      flowDirectionOptions: [],
      //过卡车辆类型
      stationViaTypeOptions: [],
      //车牌号集合
      plateNumOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        clientId: undefined,
        stationId: undefined,
        flowDirection: undefined,
      },
      // 是否新增
      isAdd: false,
      // 地磅数据
      form: {
        //车号
        plateNum: undefined,
        //皮重
        tare: 0,
        //毛重
        grossWeight: 0,
        //净重
        netWeight: 0,
        //库位号
        locationNumber: undefined,
        //发货单位
        deliveryUnit: undefined,
        //收货单位
        receivingUnit: undefined,
        //货物名称
        goodsName: undefined,
        //批次号
        specification: undefined,
        //备注
        remark: undefined,
        //通道号 (新增时 通过通道配置赋值)
        channelNumber: undefined,
        //更新时间
        updateTime: undefined,
        //流向 (新增时 通过通道配置赋值)
        flowDirection: undefined,
        //单号 (新增时 赋值)
        noticeNo: undefined,
        //场站ID
        stationId: undefined,
        //出库/入库 标识  进 1  出0
        direction: undefined,
        measurementNum: undefined, //业务编号
        viaType: undefined,
        id: undefined,
        finalInspectionTime: undefined, //模板Id
      },
      //通道配置
      PoundForm: {
        //流向
        flowDirection: undefined,
        //通道号
        channelNumber: undefined,
        //过卡车辆类型
        stationViaType: undefined,
      },
      rulesAll: {},
      // 重量类型效验
      rules: {
        grossWeight: [{type: "number", message: "毛重需为数字", trigger: "blur"}],
        tare: [{type: "number", message: "请输入数字", trigger: "blur"}],
        netWeight: [{type: "number", message: "请输入数字", trigger: "blur"}],
        plateNum: [{type: "string", required: true, message: "不可为空", trigger: "change"}],
        locationNumber: [{type: "string", message: "库位号不可为空", trigger: "change"}]
      },
      rulesIn1: { //进场 重进空出
        grossWeight: [{required: true, type: "number", message: "毛重需为数字", trigger: "blur"}],
        //tare: [{type: "number", message: "请输入数字"}],
        //netWeight: [{type: "number", message: "请输入数字"}],
        plateNum: [{required: true, message: "车号不可为空", trigger: "change"}],
        //locationNumber:[{required: true,message: "不可为空" , trigger: "blur"}]
        deliveryUnit: [{required: true, message: "发货单位不可为空", trigger: "blur"}],
        receivingUnit: [{required: true, message: "收货单位不可为空", trigger: "blur"}],
        goodsName: [{required: true, message: "品名不可为空", trigger: "blur"}],
      },
      rulesIn2: { //进场 空进重出
        //grossWeight: [{type: "number", message: "毛重需为数字"}],
        tare: [{required: true, type: "number", message: "请输入数字", trigger: "blur"}],
        //netWeight: [{type: "number", message: "请输入数字"}],
        plateNum: [{type: "string", required: true, message: "车号不可为空", trigger: "change"}],
        //locationNumber:[{required: true,message: "不可为空" , trigger: "blur"}]
        deliveryUnit: [{required: true, message: "发货单位不可为空", trigger: "blur"}],
        receivingUnit: [{required: true, message: "收货单位不可为空", trigger: "blur"}],
        goodsName: [{required: true, message: "品名不可为空", trigger: "blur"}],
      },
      rulesOut1: { //出场 重进空出
        grossWeight: [{required: true, type: "number", message: "毛重需为数字", trigger: "blur"}],
        tare: [{required: true, type: "number", message: "请输入数字", trigger: "blur"}],
        netWeight: [{required: true, type: "number", message: "请输入数字", trigger: "blur"}],
        plateNum: [{type: "string", required: true, message: "车号不可为空", trigger: "change"}],
        locationNumber: [{type: "string", required: true, message: "不可为空", trigger: "change"}],
        deliveryUnit: [{required: true, message: "发货单位不可为空", trigger: "blur"}],
        receivingUnit: [{required: true, message: "收货单位不可为空", trigger: "blur"}],
        goodsName: [{required: true, message: "品名不可为空", trigger: "blur"}],
      },
      rulesOut2: { //出场 空进重出
        grossWeight: [{required: true, type: "number", message: "毛重需为数字", trigger: "blur"}],
        tare: [{required: true, type: "number", message: "请输入数字", trigger: "blur"}],
        netWeight: [{required: true, type: "number", message: "请输入数字", trigger: "blur"}],
        plateNum: [{type: "string", required: true, message: "车号不可为空", trigger: "change"}],
        //locationNumber:[{required: true,message: "不可为空" , trigger: "blur"}]
        deliveryUnit: [{required: true, message: "发货单位不可为空", trigger: "blur"}],
        receivingUnit: [{required: true, message: "收货单位不可为空", trigger: "blur"}],
        goodsName: [{required: true, message: "品名不可为空", trigger: "blur"}],
      },
      ruless: {
        flowDirection: [{type: "string", required: true, message: "请选择流向", trigger: "change"}],
        deliveryUnit: [{required: true, message: "发货单位不可为空", trigger: "blur"}],
        receivingUnit: [{required: true, message: "收货单位不可为空", trigger: "blur"}],
        goodsName: [{required: true, message: "品名不可为空", trigger: "blur"}],
      },
      storeList: [], //保存库位号.
      showStore: false,
      noticeNo: '',
      saveLoading: false,
    };
  },
  created() {
    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts("1");
    if (this.depts.length > 0) {
      this.queryParams.stationId = this.depts[0].deptId;
      this.created();
    }
    //车牌号
    listVehicleNoList(this.queryParams.stationId).then((response) => {
      this.plateNumOptions = response.data;
    });
    //过卡车辆类型
    this.getDicts("station_via_type").then((response) => {
      this.stationViaTypeOptions = response.data;
    });
    /**流向  */
    this.getDicts("station_IO_flag").then((response) => {
      this.flowDirectionOptions = response.data;
    });

    //进场记录
    this.getListI();

    //库位号
    this.getStoreCode(this.queryParams.stationId)

    this.rulesAll = this.rules
  },
  methods: {
    handleClick(tab, event) {
      if ("进场记录" === tab.label) {
        console.log("进场记录")
        this.getListI();
      }
      if ("已完成" === tab.label) {
        console.log("已完成")
        this.getListE();
      }
    },
    //车号Change
    CarNumberChange(event) {
      //判断车辆是中国车还是蒙古车
      if(isChina(event)){
        this.PoundForm.stationViaType = "02"
      }else{
        this.PoundForm.stationViaType = "01"
      }
      this.vehicleChange()
      this.form.plateNum = event
      //进场 调用接口 连带数据赋值给input
      this.form.grossWeight = 0
      this.form.tare = 0
      this.form.netWeight = 0

      //this.form.locationNumber = ''
      this.form.remark = ''
      //规格型号
      this.form.specification = ''
      //货物名称
      this.form.goodsName = ''
      //收货单位
      this.form.receivingUnit = ''
      //发货单位
      this.form.deliveryUnit = ''
      //单号 从保税库接口中返回的
      this.noticeNo = ''
      this.form.noticeNo = ''
      if (this.PoundForm.flowDirection === "I") {
        /**
         * 通过车号查出入库通知单
         * @param this.queryParams.stationId  场所ID
         * @param this.direction 方向 1 入库通知单 0 出库通知单
         * @param event  车牌号
         */
        //通过车辆类型判断 是入库还是出库
        if (this.PoundForm.stationViaType === "01") {
          this.direction = 1;
        } else if (this.PoundForm.stationViaType === "02") {
          this.direction = 0;
        } else {
          this.msgError("车辆类型不可为空或选择不正确");
          this.form.plateNum = undefined;
        }
        if (this.PoundForm.stationViaType === "01" || this.PoundForm.stationViaType === "02") {
          getNoticeByVehicle(this.queryParams.stationId, this.direction, event).then((response) => {
            if (response.code === 200) {
              //规格型号
              this.form.remark = response.data.businessNo
              //货物名称
              this.form.goodsName = response.data.goodsName
              //收货单位
              this.form.receivingUnit = response.data.receiveName
              //发货单位
              this.form.deliveryUnit = response.data.sendName
              //单号 从保税库接口中返回的
              this.noticeNo = response.data.noticeNo
              this.form.noticeNo = response.data.noticeNo
              //业务编号
              this.form.measurementNum = response.data.businessNo
              //批次号
              this.form.specification = response.data.batchNo
              //用此变量保存 模板Id
              this.form.finalInspectionTime = response.data.templateId
            } else {
              this.msgError(response.msg);
            }
          });
        }
        //出场 调用自己的接口 查询数据库里的数据赋值给input。
      } else if (this.PoundForm.flowDirection == "E") {
        //调用后台查询API 通过选择的车号反添数据
        getSheet(event, this.queryParams.stationId, 'I').then((response) => {
          if (response.code === 200) {
            console.log("车号：" + event)
            //console.log(response.data)
            this.form = response.data;
          } else {
            this.msgError(response.msg);
          }
        });
      } else {
        this.msgError("请先选择流向");
        this.form.plateNum = undefined;
      }
    },
    //初始化页面 查询出场记录
    getListE() {
      this.loading = true;
      this.queryParams.flowDirection = "E";
      listIESheet(this.queryParams).then((response) => {
        this.sheetList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    //初始化页面 查询进场纪录
    getListI() {
      this.loading = true;
      this.queryParams.flowDirection = "I";
      listIESheet(this.queryParams).then((response) => {
        this.ApproachList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    //双击列表赋值form表单
    dbRow(row, column) {
      this.form = row;
    },
    // 打印按钮
    headHandleAdd() {
      this.reset();
    },
    /** 查询通道配置列表 */
    created() {
      listChnlConfig(this.queryParams).then((response) => {
        this.chnlConfigList = response.rows;
        this.total = response.total;
      });
    },
    //选择通道号定时反添重量方法
    ChannelNumberChange(event) {
      clearInterval(this.ChannelNumberTimer);
      this.ChannelNumberTimer = setInterval(() => {
        poundSelect(event).then((response) => {
          //if (response.data !== null) {
          this.Poundweight = response.data.weight;
          this.isStable = response.data.isStable;
          //}
        });
      }, 1000);
      //离开当前页面定时器停止
      this.$once("hook:beforeDestroy", () => {
        clearInterval(this.ChannelNumberTimer);
      });
    },
    getVehicleList(){
      listVehicleNoList(this.queryParams.stationId).then((response) => {
        this.plateNumOptions = response.data;
        this.$refs['plateNum'].focus()
      });
    },
    /** 暂存按钮 */
    AllADD() {
      //通道号赋值
      if (!this.PoundForm.flowDirection) {
        this.$message.warning("请选择车辆流向")
        return false
      }
      if (!this.PoundForm.channelNumber) {
        this.$message.warning("请选择通道")
        return false
      }
      if (!this.PoundForm.stationViaType) {
        this.$message.warning("请选择车辆类型")
        return false
      }

      this.form.flowDirection = this.PoundForm.flowDirection
      this.form.channelNumber = this.PoundForm.channelNumber;
      this.form.viaType = this.PoundForm.stationViaType
      ///规格型号
      // this.form.specification = this.form.remark;
      //场站ID赋值
      this.form.stationId = this.queryParams.stationId;
      this.form.updateTime = genTimeCode(new Date(), "YYYY-MM-DD HH:mm:ss");
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.saveLoading = true
          if (this.PoundForm.flowDirection === "I") {
            //this.form.flowDirection = this.PoundForm.flowDirection;
            //this.form.noticeNo = this.noticeNo;
            //进场 新增
            console.log('新增磅单')
            console.log(this.form)
            addSheet(this.form).then((response) => {
              this.saveLoading = false
              if (response.code === 200) {
                this.msgSuccess("进场成功");
                this.reset();
                this.getListI();
              } else {
                this.msgError(response.msg);
              }
            }).catch(e=>{
              this.saveLoading = false
            });
          } else if (this.PoundForm.flowDirection === "E") {
            //this.form.flowDirection = this.PoundForm.flowDirection;
            //this.form.noticeNo = this.noticeNo;
            //return false
            //出场修改按钮
            //updateSheet(this.form).then((response) => {
            //if (response.code === 200) {
            //this.msgSuccess("出场成功");
            //this.getListE();
            let params = {
              'placeId': this.queryParams.stationId,
              'direction': 1,
              'noticeNo': this.form.noticeNo,
              'storeCode': this.form.locationNumber,
              'netWeight': this.form.netWeight,
              'tareWeight': this.form.tare,
              'roughWeight': this.form.grossWeight
            }
            if (this.PoundForm.stationViaType === '01') {//重进空出 生成入库单
              params.direction = 1
              if (!this.form.id) {//如果form没有ID，说明数据来源不正确，需要人出出场流向中选择
                this.$message.warning('请从出场流向中选择车牌来加载数据')
                this.saveLoading = false
                return false
              }
              genStoreDoc(params).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("入库成功");
                  updateSheet(this.form).then((response) => {
                    //更新一下库位

                    this.getStoreCode(this.queryParams.stationId)
                    this.saveLoading = false
                    if (response.code === 200) {
                      this.msgSuccess("出场成功");
                      this.getListE();
                    } else {
                      this.msgError(response.msg);
                    }
                  })
                } else {
                  this.saveLoading = false
                  this.msgError(response.msg);
                }
              }).catch(e=>{
                this.saveLoading = false
              })
              //}
            }
            if (this.PoundForm.stationViaType === '02') {//空进重出，生成出库单
              params.direction = 0
              if (!this.form.id) {//如果form没有ID，说明数据来源不正确，需要从出场流向中选择
                this.$message.warning('请从出场流向中选择车牌来加载数据')
                this.saveLoading = false
                return false
              }
              genStoreDoc(params).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("出库成功");
                  updateSheet(this.form).then((response) => {
                    this.saveLoading = false
                    if (response.code === 200) {
                      this.msgSuccess("出场成功");
                      this.getListE();
                    } else {
                      this.msgError(response.msg);
                    }
                  })
                } else {
                  this.saveLoading = false
                  this.msgError(response.msg);
                }
              }).catch(e=>{
                this.saveLoading = false
              })
            }
          }
        }
      });
    },
    // 生成按钮
    generateAdd() {
      //进场
      if (this.isStable === 1) {
        if (this.PoundForm.flowDirection === "I") {
          //重进空出 进场
          if (this.PoundForm.stationViaType === "01" || this.PoundForm.stationViaType === "02") {
            //通过车辆类型 赋值毛重或皮重
            this.PoundForm.stationViaType === "01" ? (this.form.grossWeight = this.Poundweight) : (this.form.tare = this.Poundweight);
          } else {
            this.msgError("车辆类型不可为空或选择错误,请检查");
          }
          //出场
        } else if (this.PoundForm.flowDirection === "E") {
          //重进空出 出场
          if (this.PoundForm.stationViaType === "01") {
            //皮重
            this.form.tare = this.Poundweight;
            //判断出场时毛重是否未填写
            if (this.form.grossWeight >= 0) {
              //计算净重
              this.form.netWeight = this.form.grossWeight - this.form.tare;
            } else {
              this.msgError("净重计算失败,毛重不可为空");
            }
            //空进重出 出场
          } else if (this.PoundForm.stationViaType === "02") {
            //毛重
            this.form.grossWeight = this.Poundweight;
            //判断出场时皮重是否未填写
            if (this.form.tare >= 0) {
              //计算净重
              this.form.netWeight = this.form.grossWeight - this.form.tare;
            } else {
              this.msgError("净重计算失败,皮重不可为空");
            }
          } else {
            this.msgError("车辆类型不可为空或选择错误,请检查");
          }
        } else {
          this.msgError("流向不可为空,请选择");
        }
      } else {
        this.msgError("地磅数值未稳定,请稍候....");
      }
    },
    // 清空按钮
    cancel() {
      this.reset();
    },
    //打印功能
    print() {
      this.print1();
      clearTimeout(this.timer1);
      //清除延迟执行
      this.timer1 = setTimeout(() => {
        //设置延迟执行
        //this.reset();
        this.Explicit = false;
        this.nowData = "";
        this.nowTime = "";
        this.poundTotal = "";
        this.reset()
      }, 2000);
    },
    endCallback() {
    },
    print1() {
      this.Explicit = true;
      let aData = new Date();
      this.nowData = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
      this.nowTime = aData.getHours() + ":" + aData.getMinutes() + ":" + aData.getSeconds();
      this.poundTotal = "金航报税库称重磅单";
      //this.getListE();
      console.log(this.sheetList.length + '长度')
      this.batchNum = this.sheetList.length.toString()
      this.getListE();
      this.batchNum = this.pad(this.batchNum)
      this.WeighmanName = this.$store.state.user.nickName
      this.batchNum = aData.getFullYear().toString() + (aData.getMonth() + 1).toString() + aData.getDate() + this.batchNum

    },
    pad(num) {
      let i = (num + "").length;
      while (i++ < 5) num = "0" + num;
      return num;
    },
    //销毁前清除定时器
    beforeDestroy() {
      clearInterval(this.timer1);
    },
    // 表单重置
    reset() {
      this.form = {
        //车号
        plateNum: undefined,
        //皮重
        tare: 0,
        //毛重
        grossWeight: 0,
        //净重
        netWeight: 0,
        //库位号
        locationNumber: undefined,
        //发货单位
        deliveryUnit: undefined,
        //收货单位
        receivingUnit: undefined,
        //货物名称
        goodsName: undefined,
        //规格型号
        specification: undefined,
        //备注
        remark: undefined,
        //通道号 (新增时 通过通道配置赋值)
        channelNumber: undefined,
        //更新时间
        updateTime: undefined,
        //流向 (新增时 通过通道配置赋值)
        flowDirection: undefined,
        //场站ID
        stationId: undefined,
        //出库/入库 标识  进 1  出0
        direction: undefined,
      };
    },
    //查询可用的库位
    getStoreCode(placeId) {
      this.form.locationNumber = undefined
      getStoreUsable(placeId).then(response => {
        console.log(response)
        if (response.code === 200) {
          this.storeList = response.data
        }
      })
    },
    vehicleChange() {
      this.flowCheck()
      if (this.PoundForm.stationViaType === '01' && this.PoundForm.flowDirection === 'E') { //重进空出
        this.showStore = true
        this.form.locationNumber = undefined;
      } else {
        this.showStore = false
        this.form.locationNumber = undefined;
      }
    },
    flowCheck() {
      this.form.plateNum = undefined
      if (this.PoundForm.flowDirection === 'I' || this.PoundForm.flowDirection === undefined) {//如果是进场
        if (this.PoundForm.stationViaType === '01' || this.PoundForm.stationViaType === undefined) {//重进空出
          this.rulesAll = this.rulesIn1
        } else if (this.PoundForm.stationViaType === '02' || this.PoundForm.stationViaType === undefined) {//空进重出
          this.rulesAll = this.rulesIn2
        } else {
          this.rulesAll = {}
        }
      } else if (this.PoundForm.flowDirection === 'E' || this.PoundForm.flowDirection === undefined) { //出场
        if (this.PoundForm.stationViaType === '01' || this.PoundForm.stationViaType === undefined) {//重进空出
          this.rulesAll = this.rulesOut1
        } else if (this.PoundForm.stationViaType === '02' || this.PoundForm.stationViaType === undefined) {//空进重出
          this.rulesAll = this.rulesOut2
        } else {
          this.rulesAll = {}
        }
      }
    }
  },
};
</script>
<style scoped>
.el-select {
  width: 100%;
}

@page {
  margin: 8mm;
}

.Pound {
  font-size: 60px;
  width: 100%;
  color: red;
  margin-bottom: 15px;
  text-align: center;
  padding: 15px;
}

#dayin {
  margin: 0;
  padding: 0;
  height: 500px;
  width: 1200px;
  /*border: 1px solid ;*/
}

#nowDataStyle {
  width: 300px;
  height: 40px;
  margin-top: 10px;
  float: left;
  margin-left: 7cm;
  padding-left: 1.5cm;
  font-size: 20px;
  /*border: 1px solid ;*/
}

#nowTimeStyle {
  width: 300px;
  height: 40px;
  margin-top: 10px;
  padding-left: 40px;
  float: left;
  font-size: 20px;
  /*border: 1px solid ;*/
}

#poundtotal {
  width: 300px;
  height: 10px;
}

#areaLeftstyle {
  width: 600px;
  height: 40px;
  font-size: 20px;
  margin-top: 10px;
  padding-left: 3.5cm;
  float: left;
  margin-left: 6cm;
  /*border: 1px solid ;*/

}

/*#area-style1{*/
/*  width: 600px;*/
/*  height: 40px;*/
/*  font-size: 20px;*/
/*  padding-right: 0px;*/
/*  margin-top: 10px;*/

/*}*/

#areaRightStyle {
  height: 40px;
  width: 300px;
  font-size: 20px;
  margin-top: 10px;
  float: left;
  padding-left: 0.8cm;
  /*border: 1px solid ;*/
}

#remarkStyle {
  width: 800px;
  height: 40px;
  font-size: 20px;
  float: left;
  margin-top: 10px;
  margin-left: 6cm;
  padding-left: 3.5cm;
  /*border: 1px solid ;*/
}

/*.area-in-style {*/
/*  padding-left: 3cm;*/
/*  margin-top: 10px;*/
/*  !*border: 1px solid ;*!*/
/*}*/

#poundtotalStyle {
  width: 800px;
  height: 40px;
  margin-top: 65px;
  margin-left: 7cm;
  padding-left: 6cm;
  /*border: 1px solid ;*/

}

.poundtoalFont {
  font-size: 30px;
}

#nameStyle {
  width: 600px;
  height: 40px;
  font-size: 20px;
  margin-top: 10px;
  padding-left: 4cm;
  float: left;
  margin-left: 6cm;
  /*border: 1px solid ;*/

}

#batchNumber {
  width: 400px;
  height: 20px;
  /*border: 1px solid ;*/
  margin-left: 70px;
  margin-top: -20px;
  text-align: right;
}


/*.poundTotal11 {*/
/*  font-size: 20px;*/
/*  padding-left: 280px;*/
/*  !*border: 1px solid ;*!*/
/*}*/

.coalPageSelect /deep/ .el-input.is-disabled .el-input__inner {
  color: #070c17;
}

/*改变车号字体大小的样式*/
.coalPageSelect /deep/ .el-form-item__label {
  font-size: 18px;
}


.coalPageSelect /deep/ .el-input__inner {
  font-size: 18px;
}

.coalPageSelect /deep/ .el-select-dropdown__item {
  font-size: 18px !important;
}

@page {
  margin: 8mm;
}
</style>
