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
      <el-button type="primary" @click="getVehicleList" size="small">刷车号(F9)</el-button>
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
          <el-form :model="form" ref="form" :rules="rules" label-width="100px">
            <el-row type="flex" :gutter="20">
              <el-col :span="12">
                <el-form-item label="发货单位" prop="deliveryUnit">
                  <el-input v-model="form.deliveryUnit" placeholder="请输入发货单位" clearable
                            :disabled="isProduct"></el-input>
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
                             @change="CarNumberChange"
                             :popper-append-to-body="false">
                    <el-option class="coalPageSelectOption"
                               v-for="dict in plateNumOptions"
                               :key="dict.value"
                               :label="dict.key"
                               :value="dict.value">
                      <span style=" font-size: 20px">{{ dict.value }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" :gutter="20">
              <el-col :span="12">
                <el-form-item label="收货单位" prop="receivingUnit">
                  <el-input v-model="form.receivingUnit" placeholder="请输入收货单位" clearable
                            :disabled="isProduct"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="毛重" prop="grossWeight" class="coalPageSelect">
                  <el-input class="coalPageSelect"
                            v-model.number="form.grossWeight"
                            placeholder="请输入毛重"
                            clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" :gutter="20">
              <el-col :span="12">
                <el-form-item label="货物名称" prop="goodsName">
                  <el-input v-model="form.goodsName" placeholder="请输入货物名称" clearable :disabled="isProduct"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="皮重" prop="tare" class="coalPageSelect">
                  <el-input v-model.number="form.tare" placeholder="请输入皮重" clearable class="coalPageSelect"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" :gutter="20">
              <el-col :span="12">
                <el-form-item label="规格型号" prop="specification">
                  <el-input v-model="form.specification" placeholder="请输入规格型号" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="净重" prop="netWeight" class="coalPageSelect">
                  <el-input v-model.number="form.netWeight" placeholder="请输入净重" clearable
                            class="coalPageSelect"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" :gutter="20">
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
              :style="this.isStable === 1?'color:greenyellow':'color:red'"
              v-model="this.Poundweight"
              disabled
            />
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
            <el-row :gutter="10">
              <el-col :span="12">
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
              </el-col>
              <el-col :span="12">
                <el-form-item label="刷新频率" prop="refreshRate">
                  <el-select ref="channelNo" @change="changeRefreshRate"
                             filterable
                             v-model="refreshRate"
                             placeholder="请选择刷新频率">
                    <el-option
                      v-for="dept in refreshRateDic"
                      :key="dept.dictValue"
                      :label="dept.dictLabel"
                      :value="dept.dictValue"
                    />
                  </el-select>
                </el-form-item>

              </el-col>
            </el-row>

            <!-- -->
            <el-form-item label="车辆类型" prop="stationViaType">
              <el-select filterable clearable v-model="PoundForm.stationViaType" placeholder="请选择车辆类型"
                         @change="vehicleChange">
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
          <span slot="label">{{ "全部未离场数据(" + this.total + ")" }}</span>
          <el-table
            class="mb20"
            ref="ApproachList"
            :data="ApproachList"
            v-loading="loading"
            tooltip-effect="dark"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            @row-dblclick="dbRow">
            <af-table-column label="车号" align="center" prop="plateNum" width='130px' fixed>
              <template slot-scope="scope">
                <div v-if="scope.row.errState==='1'">
                  <el-tooltip class="item" effect="light" :content="scope.row.errReason" placement="right">
                    <span style='color:red'>{{ scope.row.plateNum }} <i class="fa fa-exclamation-circle"
                                                                        aria-hidden="true"></i></span>
                  </el-tooltip>
                </div>
                <div v-else>
                  {{ scope.row.plateNum }}
                  <el-tooltip class="item" effect="dark" content="标记异常" placement="top-start">
                    <i class="fa fa-pencil-square-o errPoint" aria-hidden="true"
                       @click="markError(scope.row)"></i>
                  </el-tooltip>
                </div>
              </template>
            </af-table-column>
            <af-table-column label="毛重" align="center" prop="grossWeight" width='100px'/>
            <af-table-column label="皮重" align="center" prop="tare" width='100px'/>
            <af-table-column label="净重" align="center" prop="netWeight" width='100px'/>
            <af-table-column label="发货单位" align="center" prop="deliveryUnit" :show-overflow-tooltip="true"/>
            <af-table-column label="收货单位" align="center" prop="receivingUnit" :show-overflow-tooltip="true"/>
            <af-table-column label="货物名称" align="center" prop="goodsName" :show-overflow-tooltip="true"/>
            <af-table-column label="规格型号" align="center" prop="specification"/>
            <af-table-column label="进场时间" align="center" prop="inTime" width="180">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.createTime) }}</span>
              </template>
            </af-table-column>
            <!--<af-table-column label="出场时间" align="center" prop="outTime" width="180"></af-table-column>-->
            <af-table-column label="库位号" align="center" prop="locationNumber"/>
            <af-table-column label="通道号" align="center" prop="channelNumber">
              <template slot-scope="scope">
                {{ parseChannelName(scope.row.channelNumber) }}
              </template>
            </af-table-column>
            <el-table-column label="司磅员" align="center" prop="inUser">
              <template slot-scope="scope">
                {{ parseUserName(scope.row.createBy) }}
              </template>
            </el-table-column>
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
          <span slot="label">{{ "当日已完成数据(" + this.total1 + ")" }}</span>
          <el-table
            class="mb20"
            ref="sheetList"
            :data="sheetList"
            v-loading="loading"
            tooltip-effect="dark"
            style="width: 100%"

            :row-class-name="tableRowClassName"
            @row-dblclick="dbRow"
          >
            <af-table-column label="车号" align="center" prop="plateNum" width='100px' fixed>
              <template slot-scope="scope">
                <div v-if="scope.row.errState==='1'">
                  <el-tooltip class="item" effect="light" :content="scope.row.errReason" placement="top-start">
                    <span style='color:red'>{{ scope.row.plateNum }}</span>
                  </el-tooltip>
                </div>
                <div v-else>{{ scope.row.plateNum }}</div>
              </template>
            </af-table-column>
            <af-table-column label="毛重" align="center" prop="grossWeight" width='100px'/>
            <af-table-column label="皮重" align="center" prop="tare" width='100px'/>
            <af-table-column label="净重" align="center" prop="netWeight" width='100px'/>
            <af-table-column label="发货单位" align="center" prop="deliveryUnit" :show-overflow-tooltip="true"/>
            <af-table-column label="收货单位" align="center" prop="receivingUnit" :show-overflow-tooltip="true"/>
            <af-table-column label="货物名称" align="center" prop="goodsName" :show-overflow-tooltip="true"/>
            <af-table-column label="规格型号" align="center" prop="specification"/>
            <!--<af-table-column label="进场时间" align="center" prop="inTime" width="180">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.createTime) }}</span>
              </template>
            </af-table-column>-->
            <af-table-column label="出场时间" align="center" prop="outTime" width="180">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.updateTime) }}</span>
              </template>
            </af-table-column>
            <af-table-column label="库位号" align="center" prop="locationNumber"/>
            <af-table-column label="通道号" align="center" prop="outChannelNumber">
              <template slot-scope="scope">
                {{ parseChannelName(scope.row.channelNumber) }}
              </template>
            </af-table-column>
            <el-table-column label="司磅员" align="center" prop="outUser">
              <template slot-scope="scope">
                {{ parseUserName(scope.row.measurer) }}
              </template>
            </el-table-column>
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
      <div id="serialNumber">
        <span>{{ this.pad(this.form.id) }}</span>
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
        <span>{{ form.grossWeight }} kg</span>
      </div>
      <div id="area-style">
        <span class="area-in-style">{{ form.goodsName }}</span>
      </div>
      <div id="area-right-style">
        <span>{{ form.tare }} kg</span>
        <br/>
      </div>
      <div id="area-style">
        <span class="area-in-style">{{ form.specification }}</span>
      </div>
      <div id="area-right-style">
        <span>{{ form.netWeight }} kg</span>
        <br/>
      </div>
      <div id="area-all-style">
        <span class="area-in-style">{{
            form.viaType === '02' ? form.remark + '  ' + form.transportUnit + '  ' + transportModeFormat(form.transportMode) : ''
          }}</span>
        <br/>
      </div>
      <div id="user-all-style">
        <span>{{ parseUserName(form.inUser) }}</span>
        <span>{{ parseUserName(form.outUser == '' ? this.$store.state.user.nickName : form.outUser) }}</span>
      </div>
      <!--   v-if判断 车辆类型是否为重进空出  标识为01   -->
      <div id="dayin1" v-if="this.PoundForm.stationViaType ==='01'">
        <!-- 整体DIV -->
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
        <div id="serialNumber1">
          <span>{{ this.pad(this.form.id) }}</span>
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
          <span>{{ form.grossWeight }}kg</span>
        </div>
        <div id="area-style1">
          <span class="area-in-style">{{ form.goodsName }}</span>
        </div>
        <div id="area-right-style1">
          <span>{{ form.tare }}kg</span>
          <br/>
        </div>
        <div id="area-style1">
          <span class="area-in-style">{{ form.specification }}</span>
        </div>
        <div id="area-right-style1">
          <span>{{ form.netWeight }}kg</span>
          <br/>
        </div>
        <div id="area-all-style1">
          <span class="area-in-style">
          {{
              form.viaType === '02' ? form.remark + '  ' + form.transportUnit + '  ' + transportModeFormat(form.transportMode) + ' 补' : '补'
            }}
          </span>
          <br/>
        </div>
        <div id="user-all-style1">
          <span>{{ parseUserName(form.inUser) }}</span>
          <span>{{ parseUserName(form.outUser == '' ? this.$store.state.user.nickName : form.outUser) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//获取实时重量
import {
  addSheet,
  getSheet,
  listIESheet,
  poundSelect,
  updateSheet,
  getVehicleList,
  getNoticeByVehicle, updatePoundErr
} from "@/api/pound/poundlist";
import {genTimeCode, parseTime} from "@/utils/common";
import {listChnlConfig} from "@/api/basis/chnlConfig";
import {getUserDepts} from "@/utils/charutils";
import {listUser} from "@/api/system/user";
import store from '@/store/index'
import {setPoundConfig} from "@/utils/auth";

export default {
  name: "Client",
  data() {
    return {
      isProduct: true,//开发时可以设置为false
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
      //获取进场用户名
      InUserWeighmanName: '',
      //获取出场用户名
      OutUserWeighmanName: '',
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
        viaType: undefined,
        orderByColumn: 'in_time',
        isAsc: 'desc'
      },
      queryParams1: { //已完成的查询条件
        pageNum: 1,
        pageSize: 10,
        clientId: undefined,
        stationId: undefined,
        flowDirection: undefined,
        viaType: undefined,
        orderByColumn: 'out_time',
        isAsc: 'desc'
      },
      // 是否新增
      isAdd: false,
      // 地磅数据
      form: {
        id: 0,
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
        //进场司磅员
        inUser: '',
        //出场司磅员
        outUser: '',
        //承运人
        transportMode: '',
        //运输方式
        transportUnit: '',
        errState: '0'
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
        tareWeight: [{type: 'number', required: true, message: '皮重不能为空', trigger: 'blur'}],
        roughWeight: [{type: 'number', required: true, message: '毛重不能为空', trigger: 'blur'}],
        netWeight: [{type: 'number', required: true, message: '净重不能为空', trigger: 'blur'}],
        modifyTareWeight: [{type: 'number', required: true, message: '皮重不能为空', trigger: 'blur'}],
        modifyRoughWeight: [{type: 'number', required: true, message: '毛重不能为空', trigger: 'blur'}],
        modifyNetWeight: [{type: 'number', required: true, message: '净重不能为空', trigger: 'blur'}],
        applyReason: [{type: 'string', required: true, message: '修改原因不能为空', trigger: 'blur'}],
      },
      storeList: [], //保存库位号.
      showStore: false,
      noticeNo: '',
      userList: [],
      //磅单修改页面的变量
      modifyOpen: false,
      transportModeDic: [],
      printObject: {},
      refreshRate: 1000,
      refreshRateDic: [
        {'dictValue': 500, 'dictLabel': '0.5秒'},
        {'dictValue': 1000, 'dictLabel': '1秒'},
        {'dictValue': 1500, 'dictLabel': '1.5秒'},
        {'dictValue': 2000, 'dictLabel': '2秒'},
      ],
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
      /* selectPound: {},
       UserOption: [{'Key': 'admin', 'Value': '虎神'},
         {'Key': 'xiujin', 'Value': '休津'}
       ]*/

    }
  },
  /*computed: {
    //进场司磅员名称翻译
    InUserWeighmanNameOption() {
      this.UserOption.forEach(item => {
        if (item.Key == this.form.inUser) {
          this.InUserWeighmanName = item.Value
        }
      })
      return this.InUserWeighmanName
    },
    //出场司磅员名称翻译
    outUserWeighmanNameOption() {
      this.UserOption.forEach(item => {
        if (item.Key == this.form.outUser) {
          this.OutUserWeighmanName = item.Value
        }
      })
      return this.OutUserWeighmanName
    }
  },*/
  watch: {//监听值的变化
    //三个值的变化
    PoundForm: {
      handler(newName, oldName) {
        //保存 form中的三个值
        this.$store.dispatch('SetPoundConfig', this.PoundForm)
        //setPoundConfig(JSON.stringify(this.PoundForm))
        //console.log('保存this.PoundForm')
        //console.log(this.PoundForm)
      },
      deep: true,
      immediate: false
    }
  },
  created() {
    //console.log("------")
    console.log(this.$store.state.user.nickName)
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
    this.getListE();
    this.getDicts("place_transport_type").then((response) => {
      this.transportModeDic = response.data;
    });
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
      //console.log(this.PoundForm)
      //console.log('config')
      if (this.PoundForm.channelNumber && this.PoundForm.channelNumber !== '') {
        //this.$refs['channelNo'].change()
        this.ChannelNumberChange(this.PoundForm.channelNumber)
      }
      this.getUserList()
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
      this.preWeight = 0
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
              this.form.transportUnit = response.data.transportUnit
              this.form.transportMode = response.data.transportMode
              this.form.preWeight = response.data.preWeight
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
          let viaType = this.PoundForm.stationViaType
          if (response.code === 200) {
            this.form = response.data;
            if (viaType !== response.data.viaType) {
              this.PoundForm.stationViaType = response.data.viaType
              this.getListE()
              this.getListI()
            }
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
      this.queryParams1.viaType = this.PoundForm.stationViaType
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
      //this.queryParams.stationId = this.queryParams.stationId
      this.queryParams.viaType = this.PoundForm.stationViaType
      listIESheet(this.queryParams).then((response) => {
        this.ApproachList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    //双击列表赋值form表单
    dbRow(row, column) {
      this.form = {...row}
      //console.log(this.form)
      //this.form
    },
    // 打印按钮
    headHandleAdd() {
      this.reset();
    },
    /** 查询通道配置列表 */
    created() {
      listChnlConfig({
        'stationId': this.queryParams.stationId,
        'flowDirection': this.queryParams.flowDirection
      }).then((response) => {
        this.chnlConfigList = response.rows;
        //console.log(this.chnlConfigList)
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
          //定时重量赋值到相应毛重 皮重 净重上 11.10修改 虎神
          //流向 进场  车辆类型 蒙煤车 有车牌号 反添毛重
          if (this.PoundForm.flowDirection == 'I' && this.PoundForm.stationViaType == '01' && this.form.plateNum != undefined) {
            //赋值毛重
            this.form.grossWeight = this.Poundweight;

            //流向 出场  车辆类型 蒙煤车 有车牌号 反添皮重 计算净重
          } else if (this.PoundForm.flowDirection == 'E' && this.PoundForm.stationViaType == '01' && this.form.plateNum != undefined) {
            //赋值皮重
            this.form.tare = this.Poundweight;
            //计算净重
            this.form.netWeight = this.form.grossWeight - this.form.tare;

            //流向 进场  车辆类型 外调车 有车牌号 反添皮重
          } else if (this.PoundForm.flowDirection == 'I' && this.PoundForm.stationViaType == '02' && this.form.plateNum != undefined) {
            //赋值皮重
            this.form.tare = this.Poundweight;

            //流向 出场  车辆类型 外调车 有车牌号 反添毛重 计算净重
          } else if (this.PoundForm.flowDirection == 'E' && this.PoundForm.stationViaType == '02' && this.form.plateNum != undefined) {
            //赋值毛重
            this.form.grossWeight = this.Poundweight;
            //计算净重
            this.form.netWeight = this.form.grossWeight - this.form.tare;
          }

          this.isStable = response.data.isStable;
          //如果车辆列表为空，则刷车牌号
          if (this.plateNumOptions.length === 0) {
            this.getVehicleList()
          }
          //}
        });
      }, this.refreshRate);
      //离开当前页面定时器停止
      this.$once("hook:beforeDestroy", () => {
        clearInterval(this.ChannelNumberTimer);
      });
    },

    changeRefreshRate() {
      this.ChannelNumberChange(this.PoundForm.channelNumber)
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
          //this.form.tare > 0 &&
          if (this.form.grossWeight >= this.form.tare) {
            //计算净重
            this.form.netWeight = this.form.grossWeight - this.form.tare;
          } else {
            this.msgError("净重计算失败,请检查称重数据");
            return false
          }
          //空进重出 出场
        } else if (this.PoundForm.stationViaType === "02") {
          //毛重
          this.form.grossWeight = this.Poundweight;
          //判断出场时皮重是否未填写
          //this.form.tare > 0 &&
          if (this.form.grossWeight >= this.form.tare) {
            //计算净重
            this.form.netWeight = this.form.grossWeight - this.form.tare;
          } else {
            this.msgError("净重计算失败,请检查称重数据");
            return false
          }
        } else {
          this.msgError("车辆类型不可为空或选择错误,请检查");
          return false
        }
        /*if (this.form.errState === '0') {//无异常状态下
          if (this.form.tare - this.form.preWeight > 500) {
            //this.tareWeightErrTip()
            this.msgError("此车辆的称重皮重与通知皮重相差大于500KGS")
          }
        } else {
          //if (this.form.tare - this.form.preWeight > 1000) {
          this.msgError(this.form.errReason)
          //如果有异常
        }*/
      } else {
        this.msgError("流向不可为空,请选择");
        return false
      }

      //到这里，前面验证通过了，再判断皮重是否异常
      this.tareWeightErrTip()

      /*} else {
        this.msgError("地磅数值未稳定,请稍候....");
        return false;
      }*/
      //以下为新增 逻辑
      //通道号赋值

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
        //this.getVehicleList()
      }, 2000);
    },
    endCallback() {
      console.log('方法完了')
    },
    print1() {
      this.Explicit = true;
      this.printObject = {...this.form}

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
        viaType: undefined,
        errState: '0'
      };
      //清空后，重新激活车牌号列表
      this.$refs['vehicleNo'].focus()
    },
    //查询可用的库位
    /*getStoreCode(placeId) {
      getStoreUsable(placeId).then(response => {
        //console.log(response)
        if (response.code === 200) {
          this.storeList = response.data
        }
      })
    },*/
    vehicleChange() {
      this.flowCheck()
      //console.log(this.PoundForm.flowDirection)
      /*if (this.PoundForm.stationViaType === '01' && this.PoundForm.flowDirection === 'E') { //重进空出
        this.showStore = true
        this.form.locationNumber = undefined;
      } else {
        this.showStore = false
        this.form.locationNumber = undefined;
      }*/


      //console.log("调用")
      /*** 调用获取进出场列表 */
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        stationId: this.queryParams.stationId,
        flowDirection: this.PoundForm.flowDirection,
        viaType: this.PoundForm.stationViaType,
        orderByColumn: 'in_time',
        isAsc: 'desc'
      }
      this.queryParams1 = {
        pageNum: 1,
        pageSize: 10,
        stationId: this.queryParams.stationId,
        flowDirection: this.PoundForm.flowDirection,
        viaType: this.PoundForm.stationViaType,
        orderByColumn: 'out_time',
        isAsc: 'desc'
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
      if (this.queryParams.stationId && this.PoundForm.flowDirection) {
        //if(&& this.PoundForm.stationViaType)
        if (this.PoundForm.flowDirection !== 'I') {//如果是出场
          if (!this.PoundForm.stationViaType) {
            this.PoundForm.stationViaType = undefined
            //return false
          }
        }
        if (this.autoPrint !== true) {
          this.cancel()//清form
        }
        //this.cancel()//清form
        //this.form.plateNum = ''//清空车牌号
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
      if (key === 115) {//F4
        e.preventDefault()
        this.cancel()
      }
      if (key === 120) {//F9
        e.preventDefault()
        this.getVehicleList()
      }
      /*if (key === 121) { //C
        e.preventDefault()
        //切换车辆类型
        this.$refs['vehicleNo'].blur()
        if (this.PoundForm.stationViaType === '01') {
          this.PoundForm.stationViaType = '02'
        } else {
          this.PoundForm.stationViaType = '01'
        }
        this.getVehicleList()
        this.$refs['vehicleNo'].focus()
      }*/
    },
    changPrint() {
      if (this.autoPrint === true) {
        this.autoPrintText = '自动打印'
      } else {
        this.autoPrintText = '手动打印'
      }
    },
    tableRowClassName({row, rowIndex}) {
      if (row.status !== '0') {
        return 'warning-row';
      }
      return 'success-row';
    },
    showVehicleSelect(event) {

    },
    transportModeFormat(transportMode) {
      return this.selectDictLabel(this.transportModeDic, transportMode);
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
    pad(num) {
      let i = (num + "").length;
      while (i++ < 8) num = "0" + num;
      return num;
    },
    //库存更新操作
    outStoreUpdate() {
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
                  //更新单证入场时间
                  //this.updateDocTime(response.data.poundId)
                  this.dataLoading = false
                  //如果是进进场激活，刷新列表
                  /*if (this.activeName === 'Approach') {
                    this.getListI();
                  }
                  if (this.activeName === 'end') {
                    this.getListE();
                  }*/
                  this.getListI();
                  this.getListE();
                  this.getVehicleList() //重新加载车辆
                } else {
                  this.dataLoading = false
                  this.msgError(response.msg);
                }
              });
            } else if (this.PoundForm.flowDirection === "E") {//如果是出场
              this.form.flowDirection = this.PoundForm.flowDirection;
              this.form.channelNumber = this.PoundForm.channelNumber;
              if (this.PoundForm.stationViaType === '01' || this.PoundForm.stationViaType === '02') {//重进空出 生成入库单
                //保存之前判断打印状态
                if (this.autoPrint) {
                  this.form.printState = '1' //如果设置了自动打印，将打印状态设置为1
                }
                updateSheet(this.form).then(response => {
                  if (response.code === 200) {
                    this.msgSuccess("出场成功");
                    console.log("================")
                    console.log(this.form)
                    this.dataLoading = false
                    this.getListI();
                    this.getListE();
                    /*if (this.activeName === 'Approach') {
                      this.getListI();
                    }
                    if (this.activeName === 'end') {
                      this.getListE();
                    }*/
                    //自动打印
                    this.getVehicleList()
                    if (this.autoPrint) {
                      this.$refs['printBtn'].$el.click()
                      //阻塞操作
                    }
                  }
                }).catch(err => {
                  this.dataLoading = false
                })
              }
            } else {
              this.msgError("流向参数错误");
              this.dataLoading = false
              return false
            }
          }
        }
      )
    },
    //皮重异常提醒
    tareWeightErrTip() {
      let errMsg = ''
      let tipMsg = ''
      // debugger
      console.log('通知皮重：' + this.form.preWeight)
      if (this.PoundForm.flowDirection === 'E') { //蒙煤车出场
        if (this.PoundForm.stationViaType === '01') {//如果是蒙煤车出场
          if (this.form.errState === '0') {//无异常状态下
            if (this.form.tare - this.form.preWeight > 1000) {
              //this.tareWeightErrTip()
              errMsg = '车辆[' + this.form.plateNum + ']的称重皮重与通知皮重相差大于1000KGS,是否继续？'
              tipMsg = '出场皮重异常'
            }
          } else {
            //if (this.form.tare - this.form.preWeight > 1000) {
            errMsg = this.form.errReason
            //如果有异常
          }
        }
      } else {//外调车进场
        if (this.PoundForm.stationViaType === '02') {
          if (this.form.errState === '0') {//无异常状态下
            if (this.form.tare - this.form.preWeight > 500) {
              errMsg = '车辆[' + this.form.plateNum + ']的称重皮重与通知皮重相差大于500KGS,是否继续？'
              tipMsg = '进场皮重异常'
            }
          } else {
            errMsg = this.form.errReason
          }
        }
      }
      let that = this
      //验证皮重异常
      //errMsg = ''
      if (errMsg !== '') { //如果错误信息不为空
        this.$prompt(errMsg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          //inputValidator: this.inputValidator(),
          //inputType: 'string',
          inputValue: tipMsg,
          inputErrorMessage: '异常原因不能为空',
          inputPlaceholder: '请输入异常原因'
        }).then(({value}) => {
          //更新磅单异常信息，并放行
          this.form.errState = '1'
          this.form.errReason = value
          this.outStoreUpdate()
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '此车辆状态异常，不放行'
          });
        });
      } else {
        this.outStoreUpdate()
      }
    },
    inputValidator(value) {
      alert(value)
      return true
    },
    //将表格上行的记录标记为异常的方法
    markError(row) {
      //弹出一个对话框
      this.$prompt('是否将车辆 [' + row.plateNum + '] 标记为异常', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        //inputValidator: this.inputValidator(),
        //inputType: 'string',
        inputValue: '',
        inputErrorMessage: '异常原因不能为空',
        inputPlaceholder: '请输入异常原因'
      }).then(({value}) => {
        let err = {
          id: row.id,
          errReason: value
        }
        updatePoundErr(err).then(response => {
          if (response.code === 200) {
            this.msgSuccess('标记完成')
            row.errState = '1'
            row.errReason = value
          }
        }).catch(err => {
          this.msgSuccess('标记失败')
        })
      }).catch(() => {
      });
    }

  }
}

</script>
<style scoped>
.errPoint {
  font-size: 16px;
  color: #1e1e1e;
  cursor: pointer
}

.el-select {
  width: 100%;
}

@page {
  margin: 8mm;
}

.Pound {
  font-size: 70px;
  width: 100%;
  color: red;
  margin-bottom: 15px;
  text-align: center;
  padding: 11px;
  background: #1e1e1e;
}

#dayin {
  margin-top: 25px;
  padding-top: 15px;
  height: 500px;
  width: 1200px;
}

/*第二页*/
#dayin1 {
  padding-top: -25px;
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

#serialNumber {
  width: 300px;
  height: 10px;
  margin-top: 10px;
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

#serialNumber1 {
  width: 300px;
  height: 10px;
  margin-top: 10px;
  margin-left: 610px;
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
  font-size: 26px;
  margin-top: 30px;
  float: left;
}

/*第二页*/
#area-style1 {
  width: 600px;
  height: 30px;
  font-size: 26px;
  margin-top: 30px;
  float: left;
}

#area-right-style {
  height: 35px;
  width: 350px;
  font-size: 26px;
  margin-top: 28px;
  margin-left: 40px;
  float: left;
}

/*第二页*/
#area-right-style1 {
  height: 35px;
  width: 350px;
  font-size: 26px;
  margin-top: 28px;
  padding-top: -5px;
  margin-left: 40px;
  float: left;
}

#area-right-style2 {
  height: 35px;
  width: 350px;
  font-size: 26px;
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

#user-all-style {
  width: 800px;
  height: 40px;
  font-size: 20px;
  float: left;
  padding-left: 130px;
  margin-top: 10px;
}

#user-all-style1 {
  width: 800px;
  height: 40px;
  font-size: 20px;
  float: left;
  padding-left: 130px;
  margin-top: 10px;
}

/*第二页*/
#area-all-style1 {
  /*border: 1px solid;*/
  width: 800px;
  height: 40px;
  font-size: 20px;
  float: left;
  /*margin-top: 10px;*/
  padding-top: -10px;
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

/*打印整体DIV*/
.MakeAll {
  border: 1px solid;
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

.coalPageSelect /deep/ .el-select-dropdown__item.selected {
  font-size: 30px !important;
  background: #1e1e1e;
}


.coalPageSelectOption /deep/ .selected {
  font-size: 28px !important;
  background: #2b2f3a !important;
}

/*车号 鼠标 样式*/
.coalPageSelectOption:hover {
  font-size: 28px !important;
  background: #2b2f3a !important;
  color: whitesmoke;
}

/*车号 方向键 样式*/
.coalPageSelectOption.hover {
  font-size: 28px !important;
  background: #2b2f3a !important;
  color: whitesmoke;
}

.coalPageSelectOption.selected {
  font-size: 28px !important;
  color: #00BFFF;
  /* background: #1e1e1e !important;*/
  /* color: #00afff;*/
}

.coalPageSelectOption > span {
  font-size: 28px !important;
}

/*.el-select-dropdown__item:hover {
  font-size: 30px !important;
  background: rebeccapurple;
}*/
</style>
<style>
.el-table .warning-row {
  color: red;
  background-color: #fff;
}

.el-table .success-row {
  background-color: #fff;
  color: green;
}

/**-- :row-style="green"  **/
</style>
