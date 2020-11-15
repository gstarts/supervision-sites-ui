<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select v-model="queryParams.stationId" placeholder="请选择场所" @change="placeChange">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="品名" prop="goodsName">
        <el-select v-model="queryParams.goodsName" placeholder="请选择货物名称" size="small" clearable @change="handleQuery">
          <el-option
            v-for="dict in coalTypeOptions"
            :key="dict.dictLabel"
            :label="dict.dictLabel"
            :value="dict.dictLabel"/>
        </el-select>
      </el-form-item>
      <el-form-item label="提煤单号" prop="remark">
        <el-input
          v-model="queryParams.remark"
          placeholder="请输入提煤单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="承运人" prop="carrier">
        <el-input
          v-model="queryParams.carrier"
          placeholder="请输入承运人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车辆类型" prop="viaType">
        <el-select v-model="queryParams.viaType" placeholder="请选择进出车辆类型" clearable size="small" @change="handleQuery">
          <el-option
            v-for="dept in viaTypeDic"
            :key="dept.key"
            :label="dept.value"
            :value="dept.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="车牌号" prop="plateNum">
        <el-input
          v-model="queryParams.plateNum"
          placeholder="请输入车牌号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <!-- <el-form-item label="规格" prop="specification">
         <el-input
           v-model="queryParams.specification"
           placeholder="请输入规格"
           clearable
           size="small"
           @keyup.enter.native="handleQuery"
         />
       </el-form-item>-->

      <!--<el-form-item label="毛重" prop="grossWeight">
        <el-input
          v-model="queryParams.grossWeight"
          placeholder="请输入毛重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="皮重" prop="tare">
        <el-input
          v-model="queryParams.tare"
          placeholder="请输入皮重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="箱皮重" prop="tareWeight">
        <el-input
          v-model="queryParams.tareWeight"
          placeholder="请输入箱皮重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="净重" prop="netWeight">
        <el-input
          v-model="queryParams.netWeight"
          placeholder="请输入净重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="供货单位" prop="deliveryUnit">
        <el-input
          v-model="queryParams.deliveryUnit"
          placeholder="请输入供货单位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="收货单位" prop="receivingUnit">
        <el-input
          v-model="queryParams.receivingUnit"
          placeholder="请输入收货单位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->

      <el-form-item label="状态 " prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small" @change="handleQuery">
          <el-option
            v-for="dept in poundStateDic"
            :key="dept.key"
            :label="dept.value"
            :value="dept.key"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="箱号" prop="containerNum">
        <el-input
          v-model="queryParams.containerNum"
          placeholder="请输入箱号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="保管员" prop="keeper">
        <el-input
          v-model="queryParams.keeper"
          placeholder="请输入保管员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!-- <el-form-item label="计量员" prop="measurer">
         <el-input
           v-model="queryParams.measurer"
           placeholder="请输入计量员"
           clearable
           size="small"
           @keyup.enter.native="handleQuery"
         />
       </el-form-item>-->
      <el-form-item label="库位号" prop="locationNumber">
        <el-input
          v-model="queryParams.locationNumber"
          placeholder="请输入库位号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="通道号" prop="channelNumber">
        <el-input
          v-model="queryParams.channelNumber"
          placeholder="请输入通道号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="场站ID" prop="stationId">
        <el-input
          v-model="queryParams.stationId"
          placeholder="请输入场站ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="出入库的通知单号" prop="noticeNo">
        <el-input
          v-model="queryParams.noticeNo"
          placeholder="请输入出入库的通知单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->

      <el-form-item label="包装类型" prop="packMode">
        <el-select v-model="queryParams.packMode" placeholder="请选择包装类型" clearable size="small" @change="handleQuery">
          <el-option
            v-for="dept in packModeDic"
            :key="dept.key"
            :label="dept.value"
            :value="dept.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="流向" prop="flowDirection">
        <el-select v-model="queryParams.flowDirection" placeholder="请选择流向" @change="handleQuery">
          <el-option
            v-for="dept in flowDic"
            :key="dept.key"
            :label="dept.value"
            :value="dept.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="时间" prop="startTime">
        <el-date-picker
          v-model="dateRange"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
      </el-form-item>
      <!--<el-form-item label="1 已印 0 未打印" prop="printState">
        <el-input
          v-model="queryParams.printState"
          placeholder="请输入1 已印 0 未打印"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:sheet:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="sheetList">
      <!-- <af-table-column type="selection" width="55" align="center"/>-->
      <af-table-column label="ID" align="center" prop="id"/>
      <!--<af-table-column label="末检时间" align="center" prop="finalInspectionTime"/>-->
      <!--<af-table-column label="计量号" align="center" prop="measurementNum"/>-->
      <af-table-column label="车牌号" align="center" prop="plateNum"/>
      <af-table-column label="品名" align="center" prop="goodsName"/>
      <af-table-column label="提煤单号" align="center" prop="coalBillNum"/>
      <!--<af-table-column label="规格" align="center" prop="specification"/>-->
      <!--<af-table-column label="承运人" align="center" prop="carrier"/>-->
      <af-table-column label="毛重" align="center" prop="grossWeight"/>
      <af-table-column label="皮重" align="center" prop="tare"/>
      <!--<af-table-column label="箱皮重" align="center" prop="tareWeight"/>-->
      <af-table-column label="净重" align="center" prop="netWeight"/>
      <af-table-column label="供货单位" align="center" prop="deliveryUnit"/>
      <af-table-column label="收货单位" align="center" prop="receivingUnit"/>
      <af-table-column label="流向" align="center" prop="flowDirection">
        <template slot-scope="scope">
          {{ scope.row.flowDirection === 'I' ? '进场' : '出场' }}
        </template>
      </af-table-column>
      <af-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          {{ scope.row.status === '0' ? '正常' : '修改' }}
        </template>
      </af-table-column>
      <!--<af-table-column label="提煤单号" align="center" prop="coalBillNum"/>-->

      <!--<af-table-column label="保管员" align="center" prop="keeper"/>-->
      <!--<af-table-column label="计量员" align="center" prop="measurer"/>-->
      <!--<af-table-column label="出入库单号" align="center" prop="remark"/>-->
      <af-table-column label="库位号" align="center" prop="locationNumber"/>
      <!--<af-table-column label="通道号" align="center" prop="channelNumber"/>-->
      <!--<af-table-column label="场所ID" align="center" prop="stationId"/>-->
      <af-table-column label="出入库单ID" align="center" prop="noticeNo"/>
      <af-table-column label="车辆类型" align="center" prop="viaType">
        <template slot-scope="scope">
          {{ scope.row.viaType === '01' ? '蒙煤车' : '外调车' }}
        </template>
      </af-table-column>
      <af-table-column label="包装类型" align="center" prop="packMode">
        <template slot-scope="scope">
          {{ scope.row.packMode === '1' ? '集装箱' : '散装' }}
        </template>
      </af-table-column>
      <af-table-column label="打印状态" align="center" prop="printState">
        <template slot-scope="scope">
          {{ scope.row.printState === '0' ? '未打' : '已打' }}
        </template>
      </af-table-column>
      <!--<af-table-column label="集装箱号1" align="center" prop="containerNum"/>
      <af-table-column label="集装箱号2" align="center" prop="containerNum2"/>
      <af-table-column label="集装箱号3" align="center" prop="containerNum3"/>
      <af-table-column label="集装箱号4" align="center" prop="containerNum4"/>-->
      <af-table-column label="入场时间" align="center" prop="inTime"/>
      <af-table-column label="入场司磅员" align="center" prop="inUser"/>
      <af-table-column label="出场时间" align="center" prop="outTime"/>
      <af-table-column label="出场司磅员" align="center" prop="outUser"/>
      <af-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button v-show="scope.row.status === '0'"
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleApply(scope.row)"
                     v-hasPermi="['place:modify:apply']"
          >申请修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            v-print="'#dayin'"
            @click="handlePrint(scope.row)"
            v-hasPermi="['place:sheet:print']"
          >{{ scope.row.printState === '0' ? '打印' : '补打' }}
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

    <!--磅单申请的弹出框-->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="formModify" :model="poundModify" :rules="rulesModify" label-width="120px">
        <el-row :gutter="10" style="margin-bottom: 14px;font-size: 14px;font-weight: bold">
          <el-col :span="8" :offset="2">
            车号：{{ poundModify.vehicleNo }}
          </el-col>
          <el-col :span="12">
            磅单状态：{{ selectPound.status === '0' ? '正常' : '申请修改' }}
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-bottom: 14px;font-size: 14px;font-weight: bold">
          <el-col :span="7" :offset="2">
            收货单位:{{ selectPound.deliveryUnit }}
          </el-col>
          <el-col :span="5" :offset="1">
            发货单位:{{ selectPound.receivingUnit }}
          </el-col>
          <el-col :span="6" :offset="3">
            流向:{{ selectPound.flowDirection == 'E' ? '出场' : '进场' }}
          </el-col>

        </el-row>
        <el-row :gutter="10" style="margin-bottom: 14px;font-size: 14px;font-weight: bold">

          <el-col :span="6" :offset="2">
            入场时间:{{ selectPound.createTime }}
          </el-col>
          <el-col :span="6" :offset="2">
            进场时间:{{ selectPound.updateTime }}
          </el-col>
          <el-col :span="6" :offset="2">
            库位号:{{ selectPound.locationNumber }}
          </el-col>

        </el-row>
        <el-row :gutter="10" style="margin-bottom: 14px;font-size: 14px;font-weight: bold">
          <el-col :span="6" :offset="2">
            货物名称:{{ selectPound.goodsName }}
          </el-col>
          <el-col :span="6" :offset="2">
            包装方式:{{ selectPound.packMode == '1' ? '集装箱' : '散装' }}
          </el-col>
          <el-col :span="6" :offset="2">
            车辆类型:{{ selectPound.viaType == '01' ? '蒙煤车' : '外调车' }}
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-bottom: 14px;font-size: 14px;font-weight: bold"
                v-show="selectPound.viaType === '02' && selectPound.flowDirection ==='I'">
          <el-col :span="24" :offset="2">
            提煤单号:{{ selectPound.remark }}
          </el-col>
        </el-row>
        <!--外调车时，显示 可以改提煤单号-->
        <el-row :gutter="10" v-show="selectPound.viaType === '02' && selectPound.flowDirection ==='E'">
          <el-col :span="11">
            <el-form-item label="提煤单号" prop="coalBillNo">
              <el-input v-model="poundModify.coalBillNo" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">修改为</el-col>
          <el-col :span="11">
            <!-- <el-input v-model="poundModify.modifyCoalBillNo" disabled></el-input>-->
            <el-form-item label="提煤单号" prop="modifyCoalBillNo">
              <el-select v-model="poundModify.modifyCoalBillNo" filterable placeholder="请选择提煤单号">
                <el-option
                  v-for="item in BigList"
                  :key="item.coalBillNo"
                  :label="item.coalBillNo"
                  :value="item.coalBillNo">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--        <el-row>-->
        <!--          <el-col>-->
        <!--            {{ selectPound }}-->
        <!--          </el-col>-->
        <!--        </el-row>-->
        <el-row :gutter="10">
          <el-col :span="11">
            <el-form-item label="皮重" prop="tareWeight">
              <el-input-number v-model="poundModify.tareWeight" placeholder="请输入修改前皮重" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="2">修改为</el-col>
          <el-col :span="11">
            <el-form-item label="皮重" prop="modifyTareWeight">
              <el-input :min="0" :step="1" v-model.number="poundModify.modifyTareWeight" placeholder="请输入修改后皮重"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="11">
            <el-form-item label="毛重" prop="roughWeight">
              <el-input-number v-model="poundModify.roughWeight" placeholder="请输入修改前毛重" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="2">修改为</el-col>
          <el-col :span="11">
            <el-form-item label="毛重" prop="modifyRoughWeight">
              <el-input :min="0" :step="1" v-model.number="poundModify.modifyRoughWeight" placeholder="请输入修改后毛重"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="11">
            <el-form-item label="净重" prop="netWeight">
              <el-input-number v-model="poundModify.netWeight" placeholder="请输入修改前净重" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="2">修改为</el-col>
          <el-col :span="11">
            <el-form-item label="净重" prop="modifyNetWeight">
              <el-input :min="0" :step="1" v-model.number="poundModify.modifyNetWeight" placeholder="请输入修改后净重"
                        disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <!--集装箱时，显示-->
        <el-row v-show="selectPound.packMode === '1'">
          <el-row :gutter="10">
            <el-col :span="11">
              <el-form-item label="集装箱号1" prop="containerNo1">
                <el-input v-model="poundModify.containerNo1" placeholder="请输入集装号1" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="padding-top:10px;">修改为</el-col>
            <el-col :span="11">
              <el-form-item label="集装箱号1" prop="modifyContainerNo1">
                <el-input v-model="poundModify.modifyContainerNo1" placeholder="请输入修改后集装箱号1"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="11">
              <el-form-item label="集装箱号2" prop="containerNo2">
                <el-input v-model="poundModify.containerNo2" placeholder="请输入集装号2" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="padding-top:10px;">修改为</el-col>
            <el-col :span="11">
              <el-form-item label="集装箱号2" prop="modifyContainerNo2">
                <el-input v-model="poundModify.modifyContainerNo2" placeholder="请输入修改后集装箱号2"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="11">
              <el-form-item label="集装箱号3" prop="containerNo3">
                <el-input v-model="poundModify.containerNo3" placeholder="请输入集装号3" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="padding-top:10px;">修改为</el-col>
            <el-col :span="11">
              <el-form-item label="集装箱号3" prop="modifyContainerNo3">
                <el-input v-model="poundModify.modifyContainerNo3" placeholder="请输入修改后集装箱号3"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="11">
              <el-form-item label="集装箱号4" prop="containerNo4">
                <el-input v-model="poundModify.containerNo4" placeholder="请输入集装号4" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="padding-top:10px;">修改为</el-col>
            <el-col :span="11">
              <el-form-item label="集装箱号4" prop="modifyContainerNo4">
                <el-input v-model="poundModify.modifyContainerNo4" placeholder="请输入修改后集装箱号4"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-form-item label="修改原因" prop="applyReason">
          <el-input v-model="poundModify.applyReason" type="textarea" placeholder="请输入修改原因"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
      <div id="dayin" v-show="printShow">
        <div style="align-content: center;">
          <span class="poundTotal11">{{ this.printDate.poundTotal}}</span>
        </div>
        <div id="area">
          <span class="area-in-style">{{this.printDate.nowDate}}</span>
        </div>
        <div id="areadate">
          <span>{{this.printDate.nowTime}}</span>
        </div>
<!--        <div id="serialNumber">-->
<!--          <span>{{this.pad(this.form.id)}}</span>-->
<!--        </div>-->

<!--        发货单位-->
        <div id="area-style">
          <span class="area-in-style">{{ this.printDate.deliveryUnit }}</span>
        </div>
        <div id="area-right-style">
          <span>{{this.printDate.plateNum }}</span>
        </div>
        <br/>
        <div id="area-style">
          <span class="area-in-style">{{this.printDate.receivingUnit }}</span>
        </div>
        <div id="area-right-style">
          <span>{{this.printDate.grossWeight }} kg</span>
        </div>
        <div id="area-style">
          <span class="area-in-style">{{this.printDate.goodsName }}</span>
        </div>
        <div id="area-right-style">
          <span>{{this.printDate.tare }} kg</span>
          <br/>
        </div>
        <div id="area-style">
          <span class="area-in-style">{{this.printDate.specification }}</span>
        </div>
        <div id="area-right-style">
          <span>{{ this.printDate.netWeight }} kg</span>
          <br/>
        </div>
        <div id="area-all-style">
          <span class="area-in-style">{{  this.printDate.remark+' '+ this.printDate.carrier+' '+ this.printDate.transportMode}}</span>
          <br/>
        </div>
        <div id="user-all-style">
          <span>{{InUserWeighmanNameOption}}</span>
          <span>{{this.printDate.outUser}}</span>
        </div>
      </div>

  </div>

</template>

<script>
import {listSheetLike, getSheet, delSheet, addSheet, updateSheet,undatePrintState} from "@/api/pound/poundlist";
import {getUserDepts} from "@/utils/charutils";
import {addModify, applyModify} from "@/api/place/modify";
import {selectCoalBillNo} from "@/api/place/big";
import {genTimeCode, parseTime} from "@/utils/common";

export default {
  name: "Sheet",
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
      // 计量单表格数据
      sheetList: [],
      BigList: [],//提煤单列表
      dateRange:[],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //打印区域显示隐藏
      printShow:false,
      printDate:{
        poundTotal:"",
        // 时间
        nowDate: '',
        nowTime: '',
        // 发货单位
        deliveryUnit:'',
        //车号
        plateNum:'',
        //收货单位
        receivingUnit:'',
        grossWeight:'',
        //货物名称
        goodsName:'',
        tare:'',
        specification:'',
        netWeight:'',
        // 备注
        remark:'',
        carrier:'',
        transportMode:'',
        // 进场司磅员
        inUser:'',
        //出场司磅员
        outUser:'',
      },

      UserOption:[{'Key':'admin','Value':'老板'},
        {'Key':'song','Value':'宋'}
      ],

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        finalInspectionTime: undefined,
        measurementNum: undefined,
        plateNum: undefined,
        goodsName: undefined,
        specification: undefined,
        carrier: undefined,
        grossWeight: undefined,
        tare: undefined,
        tareWeight: undefined,
        netWeight: undefined,
        deliveryUnit: undefined,
        receivingUnit: undefined,
        flowDirection: 'I',
        status: undefined,
        coalBillNum: undefined,
        containerNum: undefined,
        keeper: undefined,
        measurer: undefined,
        locationNumber: undefined,
        channelNumber: undefined,
        stationId: undefined,
        noticeNo: undefined,
        viaType: undefined,
        packMode: undefined,
        containerNum2: undefined,
        containerNum3: undefined,
        containerNum4: undefined,
        printState: undefined,
        orderByColumn: 'id',
        isAsc: 'desc'
      },
      // 表单校验
      rules: {},
      rulesModify: {
        tareWeight: [{type: 'number', required: true, message: '皮重不能为空', trigger: 'blur'}],
        roughWeight: [{type: 'number', required: true, message: '毛重不能为空', trigger: 'blur'}],
        netWeight: [{type: 'number', required: true, message: '净重不能为空', trigger: 'blur'}],
        modifyTareWeight: [{required: true, message: '皮重不能为空', trigger: 'blur'},
          {type: "number", message: "皮重需为数字", trigger: "blur"}],
        modifyRoughWeight: [{required: true, message: '毛重不能为空', trigger: 'blur'},
          {type: "number", message: "毛重需为数字", trigger: "blur"}],
        modifyNetWeight: [{required: true, message: '净重不能为空', trigger: 'blur'},
          {type: "number", message: "净重需为数字", trigger: "blur"}],
        applyReason: [{type: 'string', required: true, message: '修改原因不能为空', trigger: 'blur'}],
      },
      poundModify: {
        id: undefined,
        poundId: undefined,
        viaType: undefined,
        tareWeight: 0,
        roughWeight: 0,
        netWeight: 0,
        modifyTareWeight: 0,
        modifyRoughWeight: 0,
        modifyNetWeight: 0,
        modifyReason: undefined,
        applyReason: undefined,
        vehicleNo: undefined,
        packMode: undefined,
        containerNo1: undefined,
        containerNo2: undefined,
        containerNo3: undefined,
        containerNo4: undefined,
        noticeNo: undefined,
        docId: undefined,
        placeId: undefined,
        flow: undefined,
        modifyContainerNo1: undefined,
        modifyContainerNo2: undefined,
        modifyContainerNo3: undefined,
        modifyContainerNo4: undefined,
        coalBillNo: undefined,
        modifyCoalBillNo: undefined
      },
      //当前选中的磅单
      selectPound: {},
      poundStateDic: [
        {'key': '0', 'value': '正常'},
        {'key': '1', 'value': '修改'},
      ],
      flowDic: [
        {'key': 'I', 'value': '进场'},
        {'key': 'E', 'value': '出场'},
      ],
      viaTypeDic: [
        {'key': '01', 'value': '蒙煤车'},
        {'key': '02', 'value': '外调车'},
      ],
      packModeDic: [
        {'key': '1', 'value': '集装箱'},
        {'key': '2', 'value': '散杂货'},
      ],
      coalTypeOptions: [], //煤种
    };
  },
  computed: {
    //毛重监听
    modifyRoughWeightWatch() {
      return this.poundModify.modifyRoughWeight;
    },
    //皮重监听
    modifyTareWeightWatch01() {
      return this.poundModify.modifyTareWeight
    },

      //进场司磅员名称翻译
      InUserWeighmanNameOption(){
        this.UserOption.forEach(item =>{
          if(item.Key == this.printDate.inUser){
            this.printDate.inUser=item.Value
          }
        })
        return this.printDate.inUser
      },
      // //出场司磅员名称翻译
      // outUserWeighmanNameOption(){
      //   this.UserOption.forEach(item =>{
      //     if(item.Key == this.printDate.outUser){
      //       this.printDate.outUser=item.Value
      //     }
      //   })
      //   return this.printDate.outUser
      // }


  },
  created() {
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.stationId = this.depts[0].deptId
      this.getList();
    }
    //煤种类型
    this.getDicts("coal_type").then(response => {
      this.coalTypeOptions = response.data;
    });
  },
  watch: {
    //毛重监听
    modifyRoughWeightWatch(val) {
      this.poundModify.modifyNetWeight = this.poundModify.modifyRoughWeight - this.poundModify.modifyTareWeight;
    },
    //皮重监听
    modifyTareWeightWatch01(val) {
      this.poundModify.modifyNetWeight = this.poundModify.modifyRoughWeight - this.poundModify.modifyTareWeight;
    },
  },
  methods: {
    /** 查询计量单列表 */
    getList() {
      this.loading = true;
      listSheetLike(this.addDateRange(this.queryParams,this.dateRange)).then(response => {
        this.sheetList = response.rows;
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
      this.formModify = {
        id: undefined,
        poundId: undefined,
        viaType: undefined,
        tareWeight: 0,
        roughWeight: 0,
        netWeight: 0,
        modifyTareWeight: 0,
        modifyRoughWeight: 0,
        modifyNetWeight: 0,
        modifyReason: undefined,
        applyReason: undefined,
        vehicleNo: undefined,
        packMode: undefined,
        containerNo1: undefined,
        containerNo2: undefined,
        containerNo3: undefined,
        containerNo4: undefined,
        noticeNo: undefined,
        docId: undefined,
        placeId: undefined,
        flow: undefined,
        modifyContainerNo1: undefined,
        modifyContainerNo2: undefined,
        modifyContainerNo3: undefined,
        modifyContainerNo4: undefined,
        coalBillNo: undefined,
        modifyCoalBillNo: undefined
      };
      this.resetForm("formModify");
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
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleApply(row) {
      this.reset();
      this.open = true;
      this.title = "磅单修改申请";
      this.selectPound = row

      this.poundModify.netWeight = row.netWeight
      this.poundModify.poundId = row.id
      this.poundModify.poundState = row.status
      this.poundModify.tareWeight = row.tare
      this.poundModify.roughWeight = row.grossWeight
      this.poundModify.netWeight = row.netWeight
      this.poundModify.modifyTareWeight = row.tare
      this.poundModify.modifyRoughWeight = row.grossWeight
      this.poundModify.modifyNetWeight = row.netWeight
      this.poundModify.vehicleNo = row.plateNum
      this.poundModify.packMode = row.packMode
      this.poundModify.containerNo1 = row.containerNum
      this.poundModify.containerNo2 = row.containerNum2
      this.poundModify.containerNo3 = row.containerNum3
      this.poundModify.containerNo4 = row.containerNum4
      this.poundModify.modifyContainerNo1 = row.containerNum
      this.poundModify.modifyContainerNo2 = row.containerNum2
      this.poundModify.modifyContainerNo3 = row.containerNum3
      this.poundModify.modifyContainerNo4 = row.containerNum4
      this.poundModify.viaType = row.viaType
      this.poundModify.placeId = row.stationId
      this.poundModify.flow = row.flowDirection
      this.poundModify.docId = row.noticeNo
      this.poundModify.coalBillNo = row.coalBillNum
      this.poundModify.modifyCoalBillNo = row.coalBillNum
      /* console.log(this.poundModify)
       console.log("--------------")
       console.log(this.selectPound)*/

    },

    /** 提交按钮 */
    submitForm: function () {
      // if (this.poundModify.modifyNetWeight >= 0) {
      this.$refs["formModify"].validate(valid => {
        if (valid) {
          applyModify(this.poundModify).then(response => {
            if (response.code === 200) {
              this.msgSuccess("申请成功");
              this.open = false;
              //可以不刷，只把 状态改了
              this.getList();
            }
          });
        }
      });
      //} else {
      //  this.msgError("净重不能小于0,请检查！")
      //}
    },
    /** 打印按钮操作 */
    handlePrint(row) {
      this.printShow=true
      let date = parseTime(new Date())
      this.printDate.nowDate = date.substring(0, 10);
      this.printDate.nowTime = date.substring(10, 19);
      //发货单位
      this.printDate.deliveryUnit = row.deliveryUnit;
      this.printDate.plateNum = row.plateNum;
      this.printDate.receivingUnit = row.receivingUnit;
      this.printDate.grossWeight = row.grossWeight;
      this.printDate.goodsName = row.goodsName;
      this.printDate.tare = row.tare;
      this.printDate.specification = row.tare;
      this.printDate.netWeight = row.netWeight;
      this.printDate.remark = row.remark;
      this.printDate.carrier = row.carrier;
      this.printDate.transportMode = row.transportMode;
      this.printDate.inUser = row.inUser;
      this.printDate.outUser =  this.$store.state.user.nickName;

      clearTimeout(this.timer1);
      //清除延迟执行
      this.timer1 = setTimeout(() => {
        //设置延迟执行
        this.printShow=false
      }, 2000);

      undatePrintState(row.id).then(response =>{
          if (response.code === 200) {
            this.getList()
          };
        })

    },


    /** 导出按钮操作 */
    handleExport() {
      this.download('place/sheet/export', {
        ...this.queryParams
      }, `place_sheet.xlsx`)
    },
    //获取大提煤单列表
    getCoalBillList() {
      selectCoalBillNo({'placeId': this.queryParams.stationId}).then(response => {
        this.BigList = response.rows
      })
    },
    placeChange() {
      this.handleQuery()
      this.getCoalBillList()
    }
  }
};
</script>
<style scoped>

@page {
margin: 8mm;
}

/*.Pound {*/
/*font-size: 70px;*/
/*width: 100%;*/
/*color: red;*/
/*margin-bottom: 15px;*/
/*text-align: center;*/
/*padding: 11px;*/
/*background: #1e1e1e;*/
/*}*/

#dayin {
height: 500px;
width: 1200px;
/*border: 1px solid ;*/
}
/*标题*/
.poundTotal11 {
  font-size: 35px;
  padding-left: 240px;
  /*border: 1px solid ;*/
}

/*时间*/
.area-in-style {
  padding-left: 3cm;
  margin-top: 10px;
  /*border: 1px solid ;*/

}

#area {
width: 300px;
height: 10px;
margin-top: 60px;
float: left;
font-size: 25px;
/*border: 1px solid ;*/
}

#areadate {
  width: 300px;
  height: 10px;
  margin-top: 60px;
  padding-left: 40px;
  float: left;
  margin-left: 15px;
  font-size: 25px;
  /*border: 1px solid ;*/
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


/*第二页*/
#areadate1 {
width: 400px;
height: 10px;

padding-left: 340px;
/*float: left;*/
margin-left: 15px;
font-size: 25px;
}

#area-style {
width: 600px;
height: 30px;
font-size: 26px;
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
  font-size: 30px;
  float: left;
  padding-left: 130px;
  margin-top: 10px;
}
</style>
