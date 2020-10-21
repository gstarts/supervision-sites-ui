<template>
  <div class="app-container">
    <!-- 按钮组 -->
    <div class="mb20">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="AllADD">暂存</el-button>
      <el-button type="success" icon="el-icon-edit" size="small" @click="generateAdd">生成</el-button>
      <el-button type="warning" icon="el-icon-refresh-right" size="small" @click="cancel">清空</el-button>
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
        v-print="'#dayin'"
        @click="print">
        <!-- v-show="this.form.netWeight !== undefined && this.form.netWeight !== '' &&  this.form.plateNum !== undefined && this.form.plateNum !==''
         && this.form.locationNumber !== undefined &&  this.form.locationNumber !=='' && this.PoundForm.stationViaType ==='01'"-->
        <i class="fa fa-print" aria-hidden="true">&nbsp;&nbsp;打印</i>
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
                <el-form-item label="车号" prop="plateNum">
                  <el-select
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
                <el-form-item label="毛重" prop="grossWeight">
                  <el-input
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
                <el-form-item label="皮重" prop="tare">
                  <el-input v-model.number="form.tare" placeholder="请输入皮重" clearable disabled></el-input>
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
                <el-form-item label="净重" prop="netWeight">
                  <el-input v-model.number="form.netWeight" placeholder="请输入净重" clearable disabled></el-input>
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
                <el-form-item label="库位号" prop="locationNumber">
                  <el-select
                    v-model="form.locationNumber"
                    placeholder="请选择库位号"
                    prop="locationNumber"
                    filterable
                  >
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
            <span style="display: none"> 单号：{{form.noticeNo}}</span>
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
              v-if="this.isStable === 1"
              style="color:green"
              v-model="this.Poundweight"
              disabled
            />
            <input class="Pound" v-else style="color:red" v-model="this.Poundweight" disabled/>
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
            <el-table-column type="selection" width="55" align="center"/>
            <el-table-column label="车号" align="center" prop="plateNum"/>
            <el-table-column label="毛重" align="center" prop="grossWeight"/>
            <el-table-column label="皮重" align="center" prop="tare"/>
            <el-table-column label="净重" align="center" prop="netWeight"/>
            <el-table-column label="库位号" align="center" prop="locationNumber"/>
            <el-table-column label="发货单位" align="center" prop="deliveryUnit"/>
            <el-table-column label="收货单位" align="center" prop="receivingUnit"/>
            <el-table-column label="货物名称" align="center" prop="goodsName"/>
            <el-table-column label="规格型号" align="center" prop="specification"/>
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
            <el-table-column type="selection" width="55" align="center"/>
            <el-table-column label="车号" align="center" prop="plateNum"/>
            <el-table-column label="毛重" align="center" prop="grossWeight"/>
            <el-table-column label="皮重" align="center" prop="tare"/>
            <el-table-column label="净重" align="center" prop="netWeight"/>
            <el-table-column label="库位号" align="center" prop="locationNumber"/>
            <el-table-column label="发货单位" align="center" prop="deliveryUnit"/>
            <el-table-column label="收货单位" align="center" prop="receivingUnit"/>
            <el-table-column label="货物名称" align="center" prop="goodsName"/>
            <el-table-column label="规格型号" align="center" prop="specification"/>
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
      <div style="align-content: center;">
        <span class="poundTotal11">{{poundTotal}}</span>
      </div>
      <div id="area">
        <span class="area-in-style">{{nowData}}</span>
      </div>
      <div id="areadate">
        <span>{{nowTime}}</span>
      </div>
      <div id="area-style">
        <span class="area-in-style">{{form.deliveryUnit}}</span>
      </div>
      <div id="area-right-style">
        <span>{{form.plateNum}}</span>
      </div>
      <br/>
      <div id="area-style">
        <span class="area-in-style">{{form.receivingUnit}}</span>
      </div>
      <div id="area-right-style">
        <span>{{form.grossWeight}}</span>
      </div>
      <div id="area-style">
        <span class="area-in-style">{{form.goodsName}}</span>
      </div>
      <div id="area-right-style">
        <span>{{form.tare}}</span>
        <br/>
      </div>
      <div id="area-style">
        <span class="area-in-style">{{form.specification}}</span>
      </div>
      <div id="area-right-style">
        <span>{{form.netWeight}}</span>
        <br/>
      </div>
      <div id="area-all-style">
        <span class="area-in-style">{{form.remark}}</span>
        <br/>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    addSheet,
    updateSheet,
    getSheet,
    listIESheet,
  } from "@/api/pound/poundlist";
  import {listVehicleNoList} from "@/api/system/vehicle_info";
  import {genTimeCode} from "@/utils/common";
  //获取实时重量
  import {poundSelect} from "@/api/pound/poundlist";
  import {listChnlConfig} from "@/api/basis/chnlConfig";
  import {getUserDepts} from "@/utils/charutils";
  import {genStoreDoc, getNoticeByVehicle} from "@/api/place/info";
  import {getStoreUsable} from '@/api/place/store'

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
        nowData: "",
        nowTime: "",
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
          //单号 (新增时 赋值)
          noticeNo: undefined,
          //场站ID
          stationId: undefined,
          //出库/入库 标识  进 1  出0
          direction: undefined,
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
          grossWeight: [{type: "number", message: "毛重需为数字",trigger:"blur"}],
          tare: [{type: "number", message: "请输入数字",trigger:"blur"}],
          netWeight: [{type: "number", message: "请输入数字",trigger:"blur"}],
          plateNum: [{type:"string",required: true, message: "不可为空", trigger: "change"}],
          locationNumber:[{type:"string",message: "库位号不可为空" , trigger: "change"}]
        },
        rulesIn1: { //进场 重进空出
          grossWeight: [{required: true,type: "number", message: "毛重需为数字",trigger:"blur"}],
          //tare: [{type: "number", message: "请输入数字"}],
          //netWeight: [{type: "number", message: "请输入数字"}],
          plateNum: [{required: true, message: "车号不可为空", trigger: "change"}],
          //locationNumber:[{required: true,message: "不可为空" , trigger: "blur"}]
        },
        rulesIn2: { //进场 空进重出
          //grossWeight: [{type: "number", message: "毛重需为数字"}],
          tare: [{required: true,type: "number", message: "请输入数字",trigger:"blur"}],
          //netWeight: [{type: "number", message: "请输入数字"}],
          plateNum: [{type:"string",required: true, message: "车号不可为空", trigger: "change"}],
          //locationNumber:[{required: true,message: "不可为空" , trigger: "blur"}]
        },
        rulesOut1: { //出场 重进空出
          grossWeight: [{required: true,type: "number", message: "毛重需为数字",trigger:"blur"}],
          tare: [{required: true,type: "number", message: "请输入数字",trigger:"blur"}],
          netWeight: [{required: true,type: "number", message: "请输入数字",trigger:"blur"}],
          plateNum: [{type:"string",required: true, message: "车号不可为空", trigger: "change"}],
          locationNumber:[{type:"string",required: true,message: "不可为空" , trigger: "change"}]
        },
        rulesOut2: { //出场 空进重出
          grossWeight: [{required: true,type: "number", message: "毛重需为数字",trigger:"blur"}],
          tare: [{required: true,type: "number", message: "请输入数字",trigger:"blur"}],
          netWeight: [{required: true,type: "number", message: "请输入数字",trigger:"blur"}],
          plateNum: [{type:"string",required: true, message: "车号不可为空", trigger: "change"}],
          //locationNumber:[{required: true,message: "不可为空" , trigger: "blur"}]
        },
        ruless: {
          flowDirection: [{type:"string",required: true, message: "请选择流向", trigger: "change"}],
        },
        storeList: [], //保存库位号.
        showStore: false,
        noticeNo: ''
      };
    },
    created() {
      // 0 监管场所，1保税库，2堆场，3企业
      this.depts = getUserDepts("0");
      if (this.depts.length > 0) {
        this.queryParams.stationId = this.depts[2].deptId;
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
        this.getListE();
      },
      //车号Change
      CarNumberChange(event) {
      	console.log(event)
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
	      if(!event || event === '') return
        if (this.PoundForm.flowDirection == "I") {
          /**
           * 通过车号查出入库通知单
           * @param this.queryParams.stationId  场所ID
           * @param this.direction 方向 1 入库通知单 0 出库通知单
           * @param event  车牌号
           */
          //通过车辆类型判断 是入库还是出库
          if (this.PoundForm.stationViaType == "01") {
            this.direction = 1;
          } else if (this.PoundForm.stationViaType == "02") {
            this.direction = 0;
          } else {
            this.msgError("车辆类型不可为空或选择不正确");
            this.form.plateNum = undefined;
          }
          if (this.PoundForm.stationViaType == "01" || this.PoundForm.stationViaType == "02") {
            getNoticeByVehicle(this.queryParams.stationId, this.direction, event).then((response) => {
              if (response.code === 200) {
                //规格型号
                this.form.remark = response.data.businessNo;
                //货物名称
                this.form.goodsName = response.data.goodsName;
                //收货单位
                this.form.receivingUnit = response.data.receiveName;
                //发货单位
                this.form.deliveryUnit = response.data.sendName;
                //单号 从保税库接口中返回的
                this.noticeNo = response.data.noticeNo;
                this.form.noticeNo = response.data.noticeNo;
              } else {
                this.msgError(response.msg);
              }
            });
          }
          //出场 调用自己的接口 查询数据库里的数据赋值给input。
        } else if (this.PoundForm.flowDirection == "E") {
          //调用后台查询API 通过选择的车号反添数据
          getSheet(event,this.queryParams.stationId).then((response) => {
            if (response.code === 200) {
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
          console.log("---------")
          console.log(response)
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
        console.log(this.form)
        this.form
      },
      // 打印按钮
      headHandleAdd() {
        this.reset();
      },
      /** 查询通道配置列表 */
      created() {
        listChnlConfig(this.queryParams).then((response) => {
          this.chnlConfigList = response.rows;
          console.log(this.chnlConfigList)
          this.total = response.total;
        });
      },
      //选择通道号定时反添重量方法
      ChannelNumberChange(event) {
        clearInterval(this.ChannelNumberTimer);
        this.ChannelNumberTimer = setInterval(() => {
          poundSelect(event).then((response) => {
          	//if(response.data !== null){
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
      /** 暂存按钮 */
      AllADD() {
        //通道号赋值
        this.form.channelNumber = this.PoundForm.channelNumber;
        //场站ID赋值
        this.form.stationId = this.queryParams.stationId;
        this.form.updateTime = genTimeCode(new Date(), "YYYY-MM-DD HH:mm:ss");
        this.$refs["form"].validate((valid) => {
          if (valid) {
            if (this.PoundForm.flowDirection == "I") {
              this.form.flowDirection = this.PoundForm.flowDirection;
              //this.form.noticeNo = this.noticeNo;
              //进场 新增
              addSheet(this.form).then((response) => {
                if (response.code === 200) {
                  this.msgSuccess("进场成功");
                  this.reset();
                  this.getListI();
                } else {
                  this.msgError(response.msg);
                }
              });
            } else if (this.PoundForm.flowDirection == "E") {
              this.form.flowDirection = this.PoundForm.flowDirection;
              //this.form.noticeNo = this.noticeNo;
              //return false
              //出场修改按钮
              updateSheet(this.form).then((response) => {
                if (response.code === 200) {
                  this.msgSuccess("出场成功");
                  if (this.PoundForm.stationViaType === '01') {//重进空出 生成入库单
                    genStoreDoc(this.queryParams.stationId, 1, this.form.noticeNo, this.form.locationNumber, 0).then(response=>{
                      if(response.code === 200){
                        this.msgSuccess("入库成功");
                        //更新一下库位
                        this.getStoreCode(this.queryParams.stationId)
                      }else{
                        this.msgError(response.msg);
                      }
                    })
                  }
                  if(this.PoundForm.stationViaType === '02'){//空进重出，生成出库单
                    genStoreDoc(this.queryParams.stationId, 0, this.form.noticeNo, this.form.locationNumber, this.form.netWeight).then(response=>{
                      if(response.code === 200){
                        this.msgSuccess("出库成功");
                      }else{
                        this.msgError(response.msg);
                      }
                    })
                  }
                  this.getListI();
                } else {
                  this.msgError(response.msg);
                }
              })
            }
          }
        });
      },
      // 生成按钮
      generateAdd() {
        //进场
        if (this.isStable == "1") {
          if (this.PoundForm.flowDirection == "I") {
            //重进空出 进场
            if (this.PoundForm.stationViaType == "01" || this.PoundForm.stationViaType == "02") {
              //通过车辆类型 赋值毛重或皮重
              this.PoundForm.stationViaType == "01" ? (this.form.grossWeight = this.Poundweight) : (this.form.tare = this.Poundweight);
            } else {
              this.msgError("车辆类型不可为空或选择错误,请检查");
            }
            //出场
          } else if (this.PoundForm.flowDirection == "E") {
            //重进空出 出场
            if (this.PoundForm.stationViaType == "01") {
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
            } else if (this.PoundForm.stationViaType == "02") {
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
        var aData = new Date();
        this.nowData =
          aData.getFullYear() +
          "-" +
          (aData.getMonth() + 1) +
          "-" +
          aData.getDate();
        this.nowTime =
          aData.getHours() + ":" + aData.getMinutes() + ":" + aData.getSeconds();
        this.poundTotal = "铜精粉磅单";
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
        getStoreUsable(placeId).then(response => {
          console.log(response)
          if (response.code === 200) {
            this.storeList = response.data
          }
        })
      },
      vehicleChange() {
        this.flowCheck()
        console.log(this.PoundForm.flowDirection)
        if (this.PoundForm.stationViaType === '01' && this.PoundForm.flowDirection === 'E'){ //重进空出
          this.showStore = true
          this.form.locationNumber = undefined;
        } else {
          this.showStore = false
          this.form.locationNumber = undefined;
        }
      },
      flowCheck(){
        if(this.PoundForm.flowDirection === 'I' || this.PoundForm.flowDirection === undefined ){//如果是进场
          if(this.PoundForm.stationViaType === '01' || this.PoundForm.stationViaType == undefined){//重进空出
            this.rulesAll = this.rulesIn1
          }else if(this.PoundForm.stationViaType === '02' || this.PoundForm.stationViaType == undefined){//空进重出
            this.rulesAll = this.rulesIn2
          }else{
            this.rulesAll = {}
          }
        }else if(this.PoundForm.flowDirection === 'E' ||this.PoundForm.flowDirection === undefined){ //出场
          if(this.PoundForm.stationViaType === '01' || this.PoundForm.stationViaType == undefined){//重进空出
            this.rulesAll = this.rulesOut1
          }else if(this.PoundForm.stationViaType === '02' || this.PoundForm.stationViaType == undefined){//空进重出
            this.rulesAll = this.rulesOut2
          }else{
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
    height: 500px;
    width: 1200px;
  }

  #area {
    width: 300px;
    height: 40px;
    margin-top: 40px;
    float: left;
  }

  #areadate {
    width: 300px;
    height: 40px;
    margin-top: 40px;
    padding-left: 40px;
    float: left;
    margin-left: 20px;
  }

  #poundtotal {
    width: 300px;
    height: 10px;
  }

  #area-style {
    width: 600px;
    height: 40px;
    font-size: 20px;
    margin-top: 10px;

    float: left;
  }

  #area-right-style {
    height: 40px;
    width: 350px;
    font-size: 20px;
    margin-top: 10px;
    margin-left: 100px;
    float: right;
  }

  #area-all-style {
    width: 800px;
    height: 40px;
    font-size: 20px;
    float: left;
    margin-top: 10px;
  }

  .area-in-style {
    padding-left: 3cm;
    margin-top: 10px;
  }

  .poundTotal11 {
    font-size: 20px;
    padding-left: 280px;
  }
</style>
