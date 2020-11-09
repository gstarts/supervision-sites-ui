<template>
  <div class="app-container">
    <!-- 按钮组 -->
    <div class="mb20">
      <el-button type="primary" icon="el-icon-plus" size="small" :loading="dataLoading" @click="AllADD">保存 (F2)
      </el-button>
      <!--      <el-button type="success" icon="el-icon-edit" size="small" @click="generateAdd">生成</el-button>-->
      <el-button type="warning" icon="el-icon-refresh-right" size="small" :loading="dataLoading" @click="cancel">清空
        (F4)
      </el-button>
      <el-button
        ref="printBtn"
        type="info"
        size="small"
        v-print="printObj"
        @click="print">
        <i class="fa fa-print" aria-hidden="true">&nbsp;&nbsp;打印</i>
      </el-button>
      <!--自动打印按钮-->
      <el-switch
        @change="changPrint"
        :active-text="autoPrintText"
        inactive-text=""
        v-model="autoPrint"
        active-color="#13ce66"
        inactive-color="#aaa">
      </el-switch>
    </div>
    <el-row :gutter="10">
      <el-col :span="15">
        <el-card class="mb20">
          <el-form :model="form" ref="form" :rules="rules" label-width="160px">
            <el-row type="flex">
              <el-col :span="12">
                <el-form-item label="发货单位" prop="deliveryUnit">
                  <el-input v-model="form.deliveryUnit" placeholder="请输入发货单位" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="车号" prop="plateNum" class="coalPageSelect">
                  <el-select ref="vehicleNo" class="coalPageSelect"
                             v-model="form.plateNum"
                             placeholder="请选择车号"
                             prop="plateNum"
                             filterable
                             clearable
                             @change="CarNumberChange">
                    <el-option class="coalPageSelect"
                               v-for="dict in plateNumOptions"
                               :key="dict.value"
                               :label="dict.key"
                               :value="dict.value"
                    >
                      <span style=" font-size: 20px">{{ dict.value }}</span>
                    </el-option>
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
                  <el-input v-model.number="form.tare" placeholder="请输入皮重" clearable></el-input>
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
                  <el-input v-model.number="form.netWeight" placeholder="请输入净重" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex">
              <el-col :span="24">
                <el-form-item label="备注" prop="remark">
                  <el-input v-model="form.remark" placeholder="请输入备注" clearable></el-input>
                </el-form-item>
              </el-col>
              <!--              <el-col :span="12"> &lt;!&ndash;v-show="showStore"&ndash;&gt;-->
              <!--                <el-form-item label="库位号" prop="locationNumber">-->
              <!--                  <el-select-->
              <!--                    v-model="form.locationNumber"-->
              <!--                    placeholder="请选择库位号"-->
              <!--                    prop="locationNumber"-->
              <!--                    filterable-->
              <!--                  >-->
              <!--                    <el-option-->
              <!--                      v-for="dict in storeList"-->
              <!--                      :key="dict.value"-->
              <!--                      :label="dict.key"-->
              <!--                      :value="dict.value"-->
              <!--                    ></el-option>-->
              <!--                  </el-select>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
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
              v-if="this.isStable === 1"
              style="color:green"
              v-model="this.Poundweight"
              disabled
            />
            <input class="Pound" v-else style="color:red" v-model="this.Poundweight" disabled/>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="场所" prop="stationId">
                  <el-select v-model="queryParams.stationId" placeholder="请选择场所" @change="changePlace">
                    <el-option
                      v-for="dept in depts"
                      :key="dept.deptId"
                      :label="dept.deptName"
                      :value="dept.deptId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="流向">
                  <el-select v-model="PoundForm.flowDirection" placeholder="请选择流向" prop="flowDirection"
                             @change="flowCheck">
                    <el-option
                      v-for="dict in flowDirectionOptions"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="通道号" prop="channelNumber">
              <el-select ref="channelNo"
                         filterable
                         v-model="PoundForm.channelNumber"
                         placeholder="请选择通道号"
                         @change="ChannelNumberChange">
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
        <el-tab-pane name="Approach">
          <span slot="label">{{ "进场记录(" + this.total + ")" }}</span>
          <el-table
            class="mb20"
            ref="ApproachList"
            :data="ApproachList"
            v-loading="loading"
            tooltip-effect="dark"
            style="width: 100%"
            :row-style="green"
            @row-dblclick="dbRow">
            <af-table-column label="车号" align="center" prop="plateNum" width='100px' fixed/>
            <af-table-column label="毛重" align="center" prop="grossWeight" width='100px'/>
            <af-table-column label="皮重" align="center" prop="tare" width='100px'/>
            <af-table-column label="净重" align="center" prop="netWeight" width='100px'/>
            <af-table-column label="发货单位" align="center" prop="deliveryUnit" :show-overflow-tooltip="true"/>
            <af-table-column label="收货单位" align="center" prop="receivingUnit" :show-overflow-tooltip="true"/>
            <af-table-column label="货物名称" align="center" prop="goodsName" :show-overflow-tooltip="true"/>
            <af-table-column label="规格型号" align="center" prop="specification"/>
            <af-table-column label="进场时间" align="center" prop="createTime" width="180">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.createTime) }}</span>
              </template>
            </af-table-column>
            <af-table-column label="出场时间" align="center" prop="updateTime1" width="180"></af-table-column>
            <af-table-column label="库位号" align="center" prop="locationNumber"/>
            <af-table-column label="通道号" align="center" prop="channelNumber">
              <template slot-scope="scope">
                {{ parseChannelName(scope.row.channelNumber) }}
              </template>
            </af-table-column>
            <af-table-column label="司磅员" align="center" prop="createBy">
              <template slot-scope="scope">
                {{ parseUserName(scope.row.createBy) }}
              </template>
            </af-table-column>
            <!--不在磅单页面做磅单修改的申请了-->
            <!--<af-table-column label="操作" align="center" prop="createBy" class-name="small-padding fixed-width"
                             fixed="right">
              <template slot-scope="scope">
                <el-button
                  v-show="scope.row.status === '0'"
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handlerModify(scope.row)"
                  v-hasPermi="['place:pound:modify']">申请修改
                </el-button>
              </template>
            </af-table-column>-->
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getListI"
          />
        </el-tab-pane>
        <el-tab-pane name="end">
          <span slot="label">{{ "已完成(" + this.total1 + ")" }}</span>
          <el-table
            class="mb20"
            ref="sheetList"
            :data="sheetList"
            v-loading="loading"
            tooltip-effect="dark"
            style="width: 100%"
            :row-style="green"
            @row-dblclick="dbRow"
          >
            <af-table-column label="车号" align="center" prop="plateNum" width='100px' fixed/>
            <af-table-column label="毛重" align="center" prop="grossWeight" width='100px'/>
            <af-table-column label="皮重" align="center" prop="tare" width='100px'/>
            <af-table-column label="净重" align="center" prop="netWeight" width='100px'/>
            <af-table-column label="发货单位" align="center" prop="deliveryUnit" :show-overflow-tooltip="true"/>
            <af-table-column label="收货单位" align="center" prop="receivingUnit" :show-overflow-tooltip="true"/>
            <af-table-column label="货物名称" align="center" prop="goodsName" :show-overflow-tooltip="true"/>
            <af-table-column label="规格型号" align="center" prop="specification"/>
            <af-table-column label="进场时间" align="center" prop="createTime" width="180">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.createTime) }}</span>
              </template>
            </af-table-column>
            <af-table-column label="出场时间" align="center" prop="createTime" width="180">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.updateTime) }}</span>
              </template>
            </af-table-column>
            <af-table-column label="库位号" align="center" prop="locationNumber"/>
            <af-table-column label="通道号" align="center" prop="channelNumber">
              <template slot-scope="scope">
                {{ parseChannelName(scope.row.channelNumber) }}
              </template>
            </af-table-column>
            <af-table-column label="司磅员" align="center" prop="measurer">
              <template slot-scope="scope">
                {{ parseUserName(scope.row.measurer) }}
              </template>
            </af-table-column>
          </el-table>
          <pagination
            v-show="total1>0"
            :total="total1"
            :page.sync="queryParams1.pageNum"
            :limit.sync="queryParams1.pageSize"
            @pagination="getListE"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <div id="dayin" v-show="Explicit">
      <div style="align-content: center;">
        <span class="poundTotal11">{{ poundTotal }}</span>
      </div>
      <div id="area">
        <span class="area-in-style">{{ nowDate }}</span>
      </div>
      <div id="areadate">
        <span>{{ nowTime }}</span>
      </div>
      <div id="area-style">
        <span class="area-in-style">{{ form.deliveryUnit }}</span>
      </div>
      <div id="area-right-style">
        <span>{{ form.plateNum }}</span>
      </div>
      <br/>
      <div id="area-style">
        <span class="area-in-style">{{ form.receivingUnit }}</span>
      </div>
      <div id="area-right-style">
        <span>{{ form.grossWeight }}</span>
      </div>
      <div id="area-style">
        <span class="area-in-style">{{ form.goodsName }}</span>
      </div>
      <div id="area-right-style">
        <span>{{ form.tare }}</span>
        <br/>
      </div>
      <div id="area-style">
        <span class="area-in-style">{{ form.specification }}</span>
      </div>
      <div id="area-right-style">
        <span>{{ form.netWeight }}</span>
        <br/>
      </div>
      <div id="area-all-style">
        <span class="area-in-style">{{ form.remark }}</span>
        <br/>
      </div>
      <!--   v-if判断 车辆类型是否为重进空出  标识为01   -->
      <div id="dayin1" v-if="this.PoundForm.stationViaType ==='01'">
        <div style="align-content: center;">
          <span class="poundTotal111">{{ poundTotal }}</span>
        </div>
        <div id="area1">
          <span class="area-in-style">{{ nowDate }}</span>
        </div>
        <div style="margin-bottom: 4px;">
          <div class="areadate1">
            <span>{{ nowTime }}</span>
          </div>
        </div>

        <div id="area-style1">
          <span class="area-in-style">{{ form.deliveryUnit }}</span>
        </div>
        <div id="area-right-style1">
          <span>{{ form.plateNum }}</span>
        </div>
        <br/>
        <div id="area-style1">
          <span class="area-in-style">{{ form.receivingUnit }}</span>
        </div>
        <div id="area-right-style1">
          <span>{{ form.grossWeight }}</span>
        </div>
        <div id="area-style1">
          <span class="area-in-style">{{ form.goodsName }}</span>
        </div>
        <div id="area-right-style1">
          <span>{{ form.tare }}</span>
          <br/>
        </div>
        <div id="area-style1">
          <span class="area-in-style">{{ form.specification }}</span>
        </div>
        <div id="area-right-style1">
          <span>{{ form.netWeight }}</span>
          <br/>
        </div>
        <div id="area-all-style1">
          <span class="area-in-style">{{ form.remark + " 补" }}</span>
          <br/>
        </div>
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
import {genTimeCode, parseTime} from "@/utils/common";
//获取实时重量
import {poundSelect} from "@/api/pound/poundlist";
import {listChnlConfig} from "@/api/basis/chnlConfig";
import {getUserDepts} from "@/utils/charutils";
import {genStoreDoc, getNoticeByVehicle, getVehicleList, updateDocTime} from "@/api/place/info";
import {getStoreUsable} from '@/api/place/store'
import {listUser} from "@/api/system/user";
import store from '@/store/index'
import {getPoundConfig, setPoundConfig} from "@/utils/auth";
import {addModify} from "@/api/place/modify";

export default {
  name: "Client",
  data() {
    return {
      printObj: {
        id: '#dayin',
        endCallback: (err => {
          console.log('印完成')
        })
      },
      poundState: [
        {'key': 0, 'label': '正常'},
        {'key': 1, 'label': '申请修改'},
      ],
      dataLoading: false,
      //自动打印按钮，和文字显示设置
      autoPrint: true,
      autoPrintText: '自动打印',
      //标签页
      activeName: 'Approach',
      //稳定标识
      isStable: undefined,
      //地磅返回重量
      Poundweight: 0,
      // 遮罩层
      loading: false,
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
      total1: 0,
      green: {'color': 'green'},
      nowDate: "",
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
      queryParams: { //进场记录的查询条件
        pageNum: 1,
        pageSize: 10,
        clientId: undefined,
        stationId: undefined,
        flowDirection: undefined,
        viaType: undefined
      },
      queryParams1: { //已完成的查询条件
        pageNum: 1,
        pageSize: 10,
        clientId: undefined,
        stationId: undefined,
        flowDirection: undefined,
        viaType: undefined
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
        viaType: undefined,
        //包装方式 ，1集装箱，2散货
        packMode: undefined,
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
      //rulesAll: {},
      // 重量类型效验
      rules: {
        grossWeight: [{required: true, message: "毛重不可为空", trigger: "change"}, {
          type: "number",
          message: "毛重需为数字",
          trigger: "blur"
        }],
        tare: [{required: true, message: "皮重不可为空", trigger: "change"}, {
          type: "number",
          message: "皮重需为数字",
          trigger: "blur"
        }],
        netWeight: [{required: true, message: "净重不可为空", trigger: "change"}, {
          type: "number",
          message: "净重需为数字",
          trigger: "blur"
        }],
        plateNum: [{type: "string", required: true, message: "不可为空", trigger: "change"}],
        //locationNumber: [{type: "string", message: "库位号不可为空", trigger: "change"}],
        deliveryUnit: [{type: "string", required: true, message: "发货单位不可为空", trigger: "blur"}],
        receivingUnit: [{type: "string", required: true, message: "收货单位不可为空", trigger: "blur"}],
        goodsName: [{type: "string", required: true, message: "货物名称不可为空", trigger: "blur"}]
      },
      rulesIn1: { //进场 重进空出
        grossWeight: [{required: true, type: "number", message: "毛重需为数字", trigger: "blur"}],
        //tare: [{type: "number", message: "请输入数字"}],
        //netWeight: [{type: "number", message: "请输入数字"}],
        plateNum: [{required: true, message: "车号不可为空", trigger: "change"}],
        //locationNumber:[{required: true,message: "不可为空" , trigger: "blur"}]
      },
      rulesIn2: { //进场 空进重出
        //grossWeight: [{type: "number", message: "毛重需为数字"}],
        tare: [{required: true, type: "number", message: "请输入数字", trigger: "blur"}],
        //netWeight: [{type: "number", message: "请输入数字"}],
        plateNum: [{type: "string", required: true, message: "车号不可为空", trigger: "change"}],
        //locationNumber:[{required: true,message: "不可为空" , trigger: "blur"}]
      },
      rulesOut1: { //出场 重进空出
        grossWeight: [{required: true, type: "number", message: "毛重需为数字", trigger: "blur"}],
        tare: [{required: true, type: "number", message: "请输入数字", trigger: "blur"}],
        netWeight: [{required: true, type: "number", message: "请输入数字", trigger: "blur"}],
        plateNum: [{type: "string", required: true, message: "车号不可为空", trigger: "change"}],
        locationNumber: [{type: "string", required: true, message: "不可为空", trigger: "change"}]
      },
      rulesOut2: { //出场 空进重出
        grossWeight: [{required: true, type: "number", message: "毛重需为数字", trigger: "blur"}],
        tare: [{required: true, type: "number", message: "请输入数字", trigger: "blur"}],
        netWeight: [{required: true, type: "number", message: "请输入数字", trigger: "blur"}],
        plateNum: [{type: "string", required: true, message: "车号不可为空", trigger: "change"}],
        //locationNumber:[{required: true,message: "不可为空" , trigger: "blur"}]
      },
      ruless: {
        flowDirection: [{type: "string", required: true, message: "请选择流向", trigger: "change"}],
      },
      rulesModify: {
        tareWeight: [{type: 'number',required: true,message:'皮重不能为空',trigger:'blur'}],
        roughWeight: [{type: 'number',required: true,message:'毛重不能为空',trigger:'blur'}],
        netWeight: [{type: 'number',required: true,message:'净重不能为空',trigger:'blur'}],
        modifyTareWeight: [{type: 'number',required: true,message:'皮重不能为空',trigger:'blur'}],
        modifyRoughWeight: [{type: 'number',required: true,message:'毛重不能为空',trigger:'blur'}],
        modifyNetWeight: [{type: 'number',required: true,message:'净重不能为空',trigger:'blur'}],
        applyReason: [{type: 'string',required: true,message:'修改原因不能为空',trigger:'blur'}],
      },
      storeList: [], //保存库位号.
      showStore: false,
      noticeNo: '',
      userList: [],
      //磅单修改页面的变量
      modifyOpen: false,
      /*poundModify: {
        poundId: undefined,
        poundState: undefined,
        tareWeight: 0,
        roughWeight: 0,
        netWeight: 0,
        modifyTareWeight: 0,
        modifyRoughWeight: 0,
        modifyNetWeight: 0,
        modifyReason: '',
        applyReason: '',
        vehicleNo: '',
        packMode: '',
        containerNo1: '',
        containerNo2: '',
        containerNo3: '',
        containerNo4: '',
        noticeNo: '',
        doc_id:'',
        modifyContainerNo1: '',
        modifyContainerNo2: '',
        modifyContainerNo3: '',
        modifyContainerNo4: '',
      },*/
      //当前选中的磅单
      selectPound: {}
    }
  },
  watch: {//监听值的变化
    //三个值的变化
    PoundForm: {
      handler(newName, oldName) {
        //保存 form中的三个值
        this.$store.dispatch('SetPoundConfig', this.PoundForm)
        setPoundConfig(JSON.stringify(this.PoundForm))
        console.log('保存this.PoundForm')
        console.log(this.PoundForm)
      },
      deep: true,
      immediate: false
    }
  },
  created() {
    //监听键盘事件
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts("0");
    if (this.depts.length > 0) {
      this.queryParams.stationId = this.depts[0].deptId;
      this.queryParams1.stationId = this.depts[0].deptId;
      this.created();
    }
    /*//车牌号
    listVehicleNoList(this.queryParams.stationId).then((response) => {
      this.plateNumOptions = response.data;
    });*/
    //过卡车辆类型
    this.getDicts("station_via_type").then((response) => {
      this.stationViaTypeOptions = response.data;
      //车辆类型初始化
      //this.PoundForm.stationViaType = this.stationViaTypeOptions[0].dictValue
      this.queryParams.viaType = this.stationViaTypeOptions[0].dictValue
      this.queryParams1.viaType = this.stationViaTypeOptions[0].dictValue

      /**流向  */
      this.getDicts("station_IO_flag").then((response) => {
        this.flowDirectionOptions = response.data;
        //流向默认值
        //this.PoundForm.flowDirection = this.flowDirectionOptions[0].dictValue
        this.queryParams1.flowDirection = this.flowDirectionOptions[0].dictValue
        this.queryParams.flowDirection = this.flowDirectionOptions[0].dictValue
        this.getVehicleList(); // stationId  和 viaType 有了，刷新车辆列表
      });
    });
    //进场记录
    this.getListI();
    //库位号
    //this.getStoreCode(this.queryParams.stationId)
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs['vehicleNo'].focus()
      //this.poundConfig = this.PoundForm
      let storePoundConfig = store.getters.poundConfig
      //let storePoundConfigUser = store.getters.user.pound_config
      if (storePoundConfig && storePoundConfig !== '') {
        this.PoundForm = {...storePoundConfig}
      }
      console.log(this.PoundForm)
      console.log('config')
      if (this.PoundForm.channelNumber && this.PoundForm.channelNumber !== '') {
        //this.$refs['channelNo'].change()
        this.ChannelNumberChange(this.PoundForm.channelNumber)
      }
    })
  },
  destroyed() {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    //2020.10.22 修改 虎神
    handleClick(tab, event) {
      //console.log(this.activeName)
      if (this.activeName === 'Approach') {
        this.getListI();
      }
      if (this.activeName === 'end') {
        this.getListE();
      }
    },
    //车号Change
    CarNumberChange(event) {
      //进场 调用接口 连带数据赋值给input
      this.form.grossWeight = 0
      this.form.tare = 0
      this.form.netWeight = 0
      this.form.locationNumber = ''
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
      this.form.packMode = '2' //默认散货
      if (!event || event === '') return
      //如果是进场
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

          this.dataLoading = true
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
              this.form.locationNumber = response.data.storeCode;
              this.dataLoading = false
            } else {
              this.msgError(response.msg);
              this.dataLoading = false
            }
          }).catch(err => {
            this.dataLoading = false
          });
        }
        //出场 调用自己的接口 查询数据库里的数据赋值给input。
      } else if (this.PoundForm.flowDirection === "E") {
        //调用后台查询API 通过选择的车号反添数据
        getSheet(event, this.queryParams.stationId).then((response) => {
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
      this.queryParams1.flowDirection = "E";
      this.queryParams1.stationId = this.queryParams.stationId
      listIESheet(this.queryParams1).then((response) => {
        this.sheetList = response.rows;
        //console.log("---------")
        //console.log(response)
        this.total1 = response.total;
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
      //this.form
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
        //初始值不给通道号了 页面刷新有问题
        //this.PoundForm.channelNumber = this.chnlConfigList[0].cChnlNo
        //this.total = response.total;
      });
    },
    //选择通道号定时反添重量方法
    ChannelNumberChange(event) {
      this.$refs['vehicleNo'].focus()
      clearInterval(this.ChannelNumberTimer);
      this.ChannelNumberTimer = setInterval(() => {
        poundSelect(event).then((response) => {
          //if(response.data !== null){
          this.Poundweight = response.data.weight;
          this.isStable = response.data.isStable;
          if (this.plateNumOptions.length === 0) {
            this.getVehicleList()
          }
          //}
        });
      }, 3000);
      //离开当前页面定时器停止
      this.$once("hook:beforeDestroy", () => {
        clearInterval(this.ChannelNumberTimer);
      });
    },
    /** 暂存按钮 */
    AllADD() {
      //this.$refs['printBtn'].click()
      //以下为重量赋值逻辑
      if (!this.PoundForm.channelNumber) {
        this.msgError("请选择通道号");
        return false
      }
      //进场
      //if (this.isStable == "1") {
      if (this.PoundForm.flowDirection === "I") {
        //重进空出的进场  算毛重
        if (this.PoundForm.stationViaType === "01") {
          this.form.grossWeight = this.Poundweight
          if (this.form.grossWeight <= 0) {
            this.msgError("进场毛重不能为空或为0");
            return false
          }
          //空进重出的进场 算 皮重
        } else if (this.PoundForm.stationViaType === "02") {
          this.form.tare = this.Poundweight
          if (this.form.tare <= 0) {
            this.msgError("进场皮重不能为空或为0");
            return false
          }
        } else {
          this.msgError("车辆类型不可为空或选择错误,请检查");
          return false
        }
        /*if (this.PoundForm.stationViaType == "01" || this.PoundForm.stationViaType == "02") {
          //通过车辆类型 赋值毛重或皮重
          this.PoundForm.stationViaType == "01" ? (this.form.grossWeight = this.Poundweight) : (this.form.tare = this.Poundweight);
        } else {
          this.msgError("车辆类型不可为空或选择错误,请检查");
          return false
        }*/
        //出场
      } else if (this.PoundForm.flowDirection === "E") {
        //重进空出 出场
        if (this.PoundForm.stationViaType === "01") {
          //皮重
          this.form.tare = this.Poundweight;
          //判断出场时毛重是否未填写
          if (this.form.tare > 0 && this.form.grossWeight > this.form.tare) {
            //计算净重
            this.form.netWeight = this.form.grossWeight - this.form.tare;
          } else {
            this.msgError("净重计算失败,毛重不可为0或空");
            return false
          }
          //空进重出 出场
        } else if (this.PoundForm.stationViaType === "02") {
          //毛重
          this.form.grossWeight = this.Poundweight;
          //判断出场时皮重是否未填写
          if (this.form.tare > 0 && this.form.grossWeight > this.form.tare) {
            //计算净重
            this.form.netWeight = this.form.grossWeight - this.form.tare;
          } else {
            this.msgError("净重计算失败,皮重不可为0或空");
            return false
          }
        } else {
          this.msgError("车辆类型不可为空或选择错误,请检查");
          return false
        }
      } else {
        this.msgError("流向不可为空,请选择");
        return false
      }
      /*} else {
        this.msgError("地磅数值未稳定,请稍候....");
        return false;
      }*/
      //以下为新增 逻辑
      //通道号赋值
      this.dataLoading = true //按钮禁用
      this.form.channelNumber = this.PoundForm.channelNumber;
      //场站ID赋值
      this.form.stationId = this.queryParams.stationId;
      //update时间
      this.form.updateTime = genTimeCode(new Date(), "YYYY-MM-DD HH:mm:ss");
      // 将空进重出 或重进空出 保存
      this.form.viaType = this.PoundForm.stationViaType

      this.$refs["form"].validate((valid) => {
          if (valid) {
            if (this.PoundForm.flowDirection === "I") {
              this.form.flowDirection = this.PoundForm.flowDirection;
              this.form.viaType = this.PoundForm.stationViaType
              //this.form.noticeNo = this.noticeNo;
              //判断 提交的参数
              if (this.form.locationNumber == null || this.form.locationNumber === '' || this.form.noticeNo == null || this.form.noticeNo === '') {
                this.msgError("此单未关联库位号 或 提煤单号");
                this.dataLoading = false
                return false
              }
              //进场 新增
              addSheet(this.form).then((response) => {
                if (response.code === 200) {
                  this.msgSuccess("进场成功");
                  this.dataLoading = false
                  //更新
                  //console.log(response.data)
                  //进场列表中添加新值
                  //this.ApproachList.unshift(response.data)
                  //this.total += 1
                  //如果是进进场激活，刷新列表
                  if (this.activeName === 'Approach') {
                    this.getListI();
                  }
                  /*if (this.activeName === 'end') {
                    this.getListE();
                  }*/
                  //this.getListI(); //进场记录更新
                  //this.getListE(); //完成记录更新
                  this.getVehicleList() //重新加载车辆
                  //this.reset();
                } else {
                  this.dataLoading = false
                  this.msgError(response.msg);
                }
              });
              //this.queryParams.stationId, this.PoundForm.stationViaType,this.form.noticeNo
              //更新单证入场时间
              this.updateDocTime()
            } else if (this.PoundForm.flowDirection === "E") {
              this.form.flowDirection = this.PoundForm.flowDirection;
              this.form.channelNumber = this.PoundForm.channelNumber;
              //this.form.noticeNo = this.noticeNo;
              //return false
              //出场修改按钮
              //updateSheet(this.form).then((response) => {
              //
              let params = {
                'placeId': this.queryParams.stationId,
                'direction': 1,
                'vehicleNo': this.form.plateNum,
                'noticeNo': this.form.noticeNo,
                'storeCode': this.form.locationNumber,
                'netWeight': this.form.netWeight,
                'tareWeight': this.form.tare,
                'roughWeight': this.form.grossWeight,
                'channelNo': this.form.channelNumber
              }
              if (this.PoundForm.stationViaType === '01') {//重进空出 生成入库单
                params.direction = 1
                genStoreDoc(params).then(response => {
                  if (response.code === 200) {
                    this.msgSuccess(response.msg);
                    //更新出厂记录
                    updateSheet(this.form).then(response => {
                      if (response.code === 200) {
                        this.msgSuccess("出场成功");
                        this.dataLoading = false
                        if (this.activeName === 'Approach') {
                          this.getListI();
                        }
                        if (this.activeName === 'end') {
                          this.getListE();
                        }
                        //this.getListI()
                        //this.getListE()

                        if (this.autoPrint) {
                          this.$refs['printBtn'].$el.click()
                          //阻塞操作
                        } else {
                          this.getVehicleList()
                        }

                        //this.reset()
                      }
                    }).catch(err => {
                      this.dataLoading = false
                    })
                  } else {
                    this.msgError(response.msg);
                    this.dataLoading = false
                    return false
                  }
                })
              }

              //}
              if (this.PoundForm.stationViaType === '02') {//空进重出，生成出库单
                params.direction = 0
                genStoreDoc(params).then(response => {
                  if (response.code === 200) {
                    this.msgSuccess("出库成功");

                    updateSheet(this.form).then(response => {
                      if (response.code === 200) {
                        this.msgSuccess("出场成功");
                        this.dataLoading = false
                        if (this.activeName === 'Approach') {
                          this.getListI();
                        }
                        if (this.activeName === 'end') {
                          this.getListE();
                        }
                        //如果自动打印，就等打印完再加载车辆
                        if (this.autoPrint) {
                          this.$refs['printBtn'].$el.click()
                          //阻塞操作
                        } else {
                          //todo 外调车出场是否要更新列表
                          this.getVehicleList()
                        }
                      }
                    }).catch(err => {
                      this.dataLoading = false
                    })
                  } else {

                    this.msgError(response.msg);
                    this.dataLoading = false
                    return false
                  }
                })
              }
            } else {
              this.msgError("流向参数错误");
              this.dataLoading = false
              return false
            }
            //})
          }
        }
      );
    },
// 生成按钮
    generateAdd() {
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
        this.nowDate = ""
        this.nowTime = ""
        this.poundTotal = ""
        //this.reset()
        this.getVehicleList()
      }, 2000);
    },
    endCallback() {
      console.log('方法完了')
    },
    print1() {
      this.Explicit = true;

      //let date = new Date();
      /*let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }*/
      let date = parseTime(new Date())
      this.nowDate = date.substring(0, 10)
      this.nowTime = date.substring(10, 19)


      // this.poundTotal = "洗精煤磅单";
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
        viaType: undefined
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
      /*if (this.PoundForm.stationViaType === '01' && this.PoundForm.flowDirection === 'E') { //重进空出
        this.showStore = true
        this.form.locationNumber = undefined;
      } else {
        this.showStore = false
        this.form.locationNumber = undefined;
      }*/


      console.log("调用")
      /*** 调用获取进出场列表 */
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        stationId: this.queryParams.stationId,
        flowDirection: this.PoundForm.flowDirection,
        viaType: this.PoundForm.stationViaType
      }
      this.queryParams1 = {
        pageNum: 1,
        pageSize: 10,
        stationId: this.queryParams.stationId,
        flowDirection: this.PoundForm.flowDirection,
        viaType: this.PoundForm.stationViaType
      }
      //console.log(queryParams)
      /*listIESheet(queryParams).then((response) => {
        this.ApproachList = response.rows;
        this.total = response.total;
        this.loading = false;
      });*/
      //进场 和 已完成，都查询
      this.getListI()
      this.getListE()
      this.getVehicleList() //加载车辆
      /*** 调用获取进出场列表 */
    },
    flowCheck() {
      /*if (this.PoundForm.flowDirection === 'I' || this.PoundForm.flowDirection === undefined) {//如果是进场
        if (this.PoundForm.stationViaType === '01' || this.PoundForm.stationViaType == undefined) {//重进空出
          this.rulesAll = this.rulesIn1
        } else if (this.PoundForm.stationViaType === '02' || this.PoundForm.stationViaType == undefined) {//空进重出
          this.rulesAll = this.rulesIn2
        } else {
          this.rulesAll = {}
        }
      } else if (this.PoundForm.flowDirection === 'E' || this.PoundForm.flowDirection === undefined) { //出场
        if (this.PoundForm.stationViaType === '01' || this.PoundForm.stationViaType == undefined) {//重进空出
          this.rulesAll = this.rulesOut1
        } else if (this.PoundForm.stationViaType === '02' || this.PoundForm.stationViaType == undefined) {//空进重出
          this.rulesAll = this.rulesOut2
        } else {
          this.rulesAll = {}
        }
      }*/
      this.getVehicleList()//加载车辆列表

    },
    changePlace() {
      this.queryParams1.stationId = this.queryParams.stationId
      this.created() //更新通道号
      this.PoundForm.channelNumber = '' // 通道号当前值设为空
      //进场记录
      this.getListI();
      this.getListE();

      //判断场所和车辆类型的是否全了
      this.getVehicleList()

      this.getUserList()//更新用户列表

    },
    //获取车号列表
    getVehicleList() {
      //场所ID 和车辆类型，
      if (this.queryParams.stationId && this.PoundForm.stationViaType && this.PoundForm.flowDirection) {
        this.cancel()//清form
        /* if (this.PoundForm.flowDirection !== "E") {
           this.form.plateNum = '' //如果流向不是出场，就清空当前车号
         }*/
        //条件具备，加载对应单子的车辆列表
        // console.log({'placeId': this.queryParams.stationId, 'type': this.PoundForm.stationViaType})
        getVehicleList(this.queryParams.stationId, this.PoundForm.stationViaType, this.PoundForm.flowDirection).then((response) => {
          this.plateNumOptions = response.data;
          this.$refs['vehicleNo'].focus()
        });
      } else {
        return false
      }
    },

    //更新单证入场时间
    updateDocTime() {
      let data = {
        'placeId': this.queryParams.stationId,
        'type': this.PoundForm.stationViaType,
        'noticeNo': this.form.noticeNo,
        'channelNo': this.form.channelNumber,
        'vehicleNo': this.form.plateNum
      }
      console.log(data)
      updateDocTime(data)
    },
    //翻译通道号
    parseChannelName(channel) {
      let no = this.chnlConfigList.find(item => item.cChnlNo === channel)
      if (no) {
        return no.cChnlName
      } else {
        return ''
      }
    },
    //翻译用户名
    parseUserName(user) {
      let u = this.userList.find(item => item.userName === user)
      if (u) {
        return u.nickName
      } else {
        return user
      }
    },
    getUserList() {
      listUser({'deptId': this.queryParams.stationId}).then(response => {
        if (response.code === 200) {
          this.userList = response.rows
        }
      });
    },
    handleKeyDown(e) {
      let key = window.event.keyCode ? window.event.keyCode : window.event.which
      if (key === 13) {

        e.preventDefault() //取消浏览器原有的ctrl+s操作
      }
    },
    handleKeyUp(e) {
      // enter
      let key = window.event.keyCode ? window.event.keyCode : window.event.which
      console.log(key)
      if (key === 113) {//F2
        e.preventDefault()
        this.AllADD()
      }
      if (key === 115) {
        e.preventDefault()
        this.cancel()
      }
      /* if(key === 80){
         e.preventDefault()
         this.print()
       }*/
    },
    changPrint() {
      if (this.autoPrint === true) {
        this.autoPrintText = '自动打印'
      } else {
        this.autoPrintText = '手动打印'
      }
    },
    /*handlerModify(row) {
      //弹出对话框，修改磅单
      this.selectPound = row
      console.log(row)
      this.modifyOpen = true
      this.poundModify.poundId = row.id
      this.poundModify.tareWeight = row.tare
      this.poundModify.roughWeight = row.grossWeight
      this.poundModify.netWeight = row.netWeight
      this.poundModify.vehicleNo = row.plateNum
      this.poundModify.poundState = row.status
    },*/
    /*submitModify() {
      console.log('提交')
      //加验证，提交
      this.$refs["formModify"].validate((valid) => {
        if (valid) {
          addModify(this.poundModify).then(response => {
            if (response.code === 200) {
              this.$message.success(response.msg)
              //把磅单状态变成1
            }
          })
        }
      })
    },*/
  }
}

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

/*第二页*/
#dayin1 {
  margin-top: 520px;
  height: 500px;
  width: 1200px;
}

#area {
  width: 300px;
  height: 10px;
  margin-top: 60px;
  float: left;
  font-size: 25px;
}

/*第二页*/
#area1 {
  width: 300px;
  height: 10px;
  margin-left: 20px;
  /*float: left;*/
  font-size: 25px;
}

#areadate {
  width: 300px;
  height: 10px;
  margin-top: 60px;
  padding-left: 40px;
  float: left;
  margin-left: 15px;
  font-size: 25px;
}

/*第二页*/
#areadate1 {
  width: 400px;
  height: 10px;

  padding-left: 340px;
  /*float: left;*/
  margin-left: 15px;
  font-size: 25px;
}

.areadate1 {
  width: 400px;
  height: 10px;

  padding-left: 340px;
  /*float: left;*/
  margin-left: 15px;
  font-size: 25px;
  margin-top: -10px;
}

/*#poundtotal {*/
/*  width: 300px;*/
/*  height: 10px;*/
/*}*/

#area-style {
  width: 600px;
  height: 30px;
  font-size: 20px;
  margin-top: 30px;
  float: left;
}

/*第二页*/
#area-style1 {
  width: 600px;
  height: 30px;
  font-size: 20px;
  margin-top: 30px;
  float: left;
}

#area-right-style {
  height: 35px;
  width: 350px;
  font-size: 20px;
  margin-top: 28px;
  margin-left: 40px;
  float: left;
}

/*第二页*/
#area-right-style1 {
  height: 35px;
  width: 350px;
  font-size: 20px;
  margin-top: 28px;
  margin-left: 40px;
  float: left;
}

#area-all-style {
  width: 800px;
  height: 40px;
  font-size: 20px;
  float: left;
  margin-top: 10px;
}

/*第二页*/
#area-all-style1 {
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
  font-size: 35px;
  padding-left: 240px;
}

/*第二页*/
.poundTotal111 {
  padding-top: 1500px;
  font-size: 35px;
  padding-left: 240px;
}

.el-tooltip_popper {
  font-size: 15px;
  max-width: 20%;
}

/*改变车号字体大小的样式*/
.coalPageSelect /deep/ .el-form-item__label {
  font-size: 30px;
}

.coalPageSelect /deep/ .el-input__inner {
  font-size: 30px;
}

.coalPageSelect /deep/ .el-select-dropdown__item {
  font-size: 30px !important;
}

</style>
