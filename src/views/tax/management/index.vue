<template>
  <div class="app-container">

    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-row>
        <el-col :span="4.8">
        </el-col>
        <el-col :span="4.8">
          <el-form-item label="单据号" prop="documentNo">
            <el-input
              v-model="queryParams.documentNo"
              placeholder="请输入单据号"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4.8">
          <el-form-item label="业务编号" prop="businessDepartment">
            <el-input
              v-model="queryParams.businessDepartment"
              placeholder="请输入业务编号"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>

        <el-col :span="4.8">
          <el-form-item label="lot_no" prop="lotNo">
            <el-input
              v-model="queryParams.lotNo"
              placeholder="请输入lot_no"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-form-item label="车队名称" prop="fleetName">
          <el-input
            v-model="queryParams.fleetName"
            placeholder="请输入车队名称"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>

        <el-form-item label="录入时间" prop="inputTime">
          <el-date-picker
            v-model="dateRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审批状态" prop="selectLogo" >
          <el-select
            v-model="queryParams.selectLogo" placeholder="请选择审批状态" clearable>
            <el-option
              v-for="Logo in approveLogoOption"
              :key="Logo.deptId"
              :label="Logo.dictLabel"
              :value="Logo.dictSort"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['tax:management:add']"
        >新增
        </el-button>
        <el-button
          type="info"
          icon="el-icon-s-check"
          size="mini"
          @click="ApproveClick"
          v-has-permi="['tax:management:Approve']"
        >审批</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tax:management:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:management:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="managementList" @selection-change="handleSelectionChange" @row-dblclick="selectDetails">
      <el-table-column type="selection" width="55" align="center"/>
      <!--      <el-table-column label="主键" align="center" prop="id"/>-->
        <el-table-column label="单据号" align="center" prop="documentNo" width="180" :show-overflow-tooltip='true'/>
      <el-table-column label="业务编号" align="center" prop="businessDepartment"/>
      <el-table-column label="lot_no" align="center" prop="lotNo" width="100"/>
      <el-table-column label="车队名称" align="center" prop="fleetName"/>
      <el-table-column label="通知单车数" align="center" prop="carNumber" width="100"/>
      <el-table-column label="实际车数" align="center" prop="vehicleCount" width="100"/>
      <el-table-column label="入境时间" align="center" prop="entryTime" width="180" >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.entryTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出境时间" align="center" prop="departureTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.departureTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="早餐次数" align="center" prop="breakfastCount"/>
      <el-table-column label="午餐次数" align="center" prop="lunchCount"/>
      <el-table-column label="晚餐次数" align="center" prop="dinnerCount"/>
      <el-table-column label="住宿天数" align="center" prop="dayNum"/>
      <el-table-column label="录入人" align="center" prop="entryPerson"/>
      <el-table-column label="录入时间" align="center" prop="inputTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.inputTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核人" align="center" prop="reviewer"/>
      <el-table-column label="审核日期" align="center" prop="reviewDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.reviewDate, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="业务时间" align="center" prop="businessDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.businessDate, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="shipment no" align="center" prop="shipmentNo" width="100"/>
      <el-table-column label="修改人" align="center" prop="updatePerson"/>
      <el-table-column label="备注" align="center" prop="remarks"/>
      <el-table-column label="审核状态" align="center" prop="approveState" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.approveState ==0">编辑中</span>
          <span v-else-if="scope.row.approveState == 1">提交待审</span>
          <span v-else-if="scope.row.approveState == 2">审核通过</span>
          <span v-else-if="scope.row.approveState == 3" style="color:red">审核不通过</span>
        </template>
      </el-table-column>
      <el-table-column label="审批意见" align="center" prop="approveMsg"/>
      <el-table-column label="状态" align="center" prop="status" :formatter="translation"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="230">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:management:edit']"
            v-show="(scope.row.approveState== 0 ||scope.row.approveState== 3)"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="selectDetails(scope.row)"
          >详情
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tax:management:remove']"
          >删除
          </el-button>

          <el-button
            size="mini"
            @click="print(scope.row)"
            v-print="'#dayin'"
            type="text"
            icon="el-icon-printer">
            打印
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改司机食宿管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <!--        <el-form-item label="单据号" prop="documentNo">-->
        <!--          <el-input v-model="form.documentNo" placeholder="请输入单据号"/>-->
        <!--        </el-form-item>-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="单据号" >
              <el-input v-model="form.documentNo"  placeholder="系统自动生成" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务编号" prop="businessDepartment">
              <el-input v-model="form.businessDepartment" placeholder="请输入业务编号"
                        @keyup.enter.native="getByBusinessNo"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="lot_no" prop="lotNo">
              <el-input v-model="form.lotNo" placeholder="请输入lot_no" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通知单车数" prop="carNumber">
              <el-input v-model="form.carNumber" placeholder="请输入通知单车数" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车队名称" prop="fleetName">
              <el-input v-model="form.fleetName" placeholder="请输入车队名称" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实际车数" prop="vehicleCount">
              <el-input v-model="form.vehicleCount" placeholder="请输入实际车数" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入境时间" prop="entryTime">
              <el-date-picker clearable size="small" style="width: 100%"
                              v-model="form.entryTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择入境时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出境时间" prop="departureTime">
              <el-date-picker clearable size="small" style="width: 100%"
                              v-model="form.departureTime"
                              type="date"
                              @change="dateChange"
                              value-format="yyyy-MM-dd"
                              placeholder="选择出境时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="早餐次数" prop="breakfastCount">
              <el-input v-model="form.breakfastCount" placeholder="请输入早餐次数"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="午餐次数" prop="lunchCount">
              <el-input v-model="form.lunchCount" placeholder="请输入午餐次数"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="晚餐次数" prop="dinnerCount">
              <el-input v-model="form.dinnerCount" placeholder="请输入晚餐次数"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="住宿天数" prop="dayNum">
              <el-input v-model="form.dayNum" placeholder="请输入住宿天数"/>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="shipment_no" prop="shipmentNo" v-show="addShow">
              <el-input v-model="form.shipmentNo" placeholder="请输入shipment no"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="录入时间" prop="inputTime" v-show="addShow">
              <el-date-picker clearable size="small" style="width: 100%"
                              v-model="form.inputTime"
                              type="datetime"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="选择录入时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="审核人" prop="reviewer" v-show="addShow">
              <el-input v-model="form.reviewer" placeholder="请输入审核人"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="录入人" prop="entryPerson" v-show="addShow">
              <el-input v-model="form.entryPerson" placeholder="请输入录入人"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status" v-show="addShow">
              <el-select v-model="form.status" placeholder="请选择执行" clearable size="small">
                <el-option
                  v-for="item in statusList"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="form.remarks" placeholder="请输入备注"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="zanCun"  type="info" icon="el-icon-plus" v-show="addType">暂存</el-button>
        <el-button @click="tiJiao"  type="primary" icon="el-icon-edit" >提交</el-button>
<!--        <el-button type="primary" @click="submitForm" v-show="addShow">确 定</el-button>-->
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

        <!--详情页-->
    <el-dialog :title="title" :visible.sync="openDetails" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="单据号" >
              <el-input v-model="form.documentNo"  placeholder="系统自动生成" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务编号" prop="businessDepartment">
              <el-input v-model="form.businessDepartment" placeholder="请输入业务编号"
                        disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="lot_no" prop="lotNo">
              <el-input v-model="form.lotNo" placeholder="请输入lot_no" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通知单车数" prop="carNumber">
              <el-input v-model="form.carNumber" placeholder="请输入通知单车数" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车队名称" prop="fleetName">
              <el-input v-model="form.fleetName" placeholder="请输入车队名称" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实际车数" prop="vehicleCount">
              <el-input v-model="form.vehicleCount" placeholder="请输入实际车数" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入境时间" prop="entryTime">
              <el-date-picker clearable size="small" style="width: 100%"
                              v-model="form.entryTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择入境时间" disabled>
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出境时间" prop="departureTime">
              <el-date-picker clearable size="small" style="width: 100%"
                              v-model="form.departureTime"
                              type="date"
                              @change="dateChange"
                              value-format="yyyy-MM-dd"
                              placeholder="选择出境时间" disabled>
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="早餐次数" prop="breakfastCount">
              <el-input v-model="form.breakfastCount" placeholder="请输入早餐次数" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="午餐次数" prop="lunchCount">
              <el-input v-model="form.lunchCount" placeholder="请输入午餐次数" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="晚餐次数" prop="dinnerCount">
              <el-input v-model="form.dinnerCount" placeholder="请输入晚餐次数" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="住宿天数" prop="dayNum">
              <el-input v-model="form.dayNum" placeholder="请输入住宿天数" disabled/>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="shipment_no" prop="shipmentNo">
              <el-input v-model="form.shipmentNo" placeholder="请输入shipment no" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="录入时间" prop="inputTime">
              <el-date-picker clearable size="small" style="width: 100%"
                              v-model="form.inputTime"
                              type="datetime"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="选择录入时间" disabled>
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="审核人" prop="reviewer">
              <el-input v-model="form.reviewer" placeholder="请输入审核人" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="录入人" prop="entryPerson">
              <el-input v-model="form.entryPerson" placeholder="请输入录入人" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择执行" clearable size="small" disabled>
                <el-option
                  v-for="item in statusList"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="form.remarks" placeholder="请输入备注" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteDetails" style="float: left" type="danger" icon="el-icon-delete">删除</el-button>
        <el-button  @click="printDetails" v-print="'#dayin'" type="warning" icon="el-icon-printer">打印</el-button>
        <el-button @click="updateDetails" type="success" icon="el-icon-edit">修 改</el-button>
        <el-button @click="cancelDetails" type="info" icon="el-icon-refresh-right">取 消</el-button>
      </div>
    </el-dialog>

    <div>
      <div id="dayin" v-show="printShow">
        <div align="center">
          <span style="font-size: 30px">{{parseTime(this.printParams.inputTime,'{y}年{m}月')}}金航保税库客户费用统计表<br>Accommodation&Meal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{parseTime(this.printParams.inputTime,'{m}. {y}')}}</span>
        </div>
        <table border="1px" cellspacing="0" class="tableClass">
          <tr>
            <th width="150px">项目</th>
            <th>lot 号</th>
            <th>使用人</th>
            <th>所属公司</th>
            <th>开始日期</th>
            <th>结束日期</th>
            <th>天数</th>
            <th>早餐</th>
            <th>午餐</th>
            <th>晚餐</th>
            <th>备注</th>
          </tr>
          <tr>
            <td>Item</td>
            <td>lot No</td>
            <td>Users</td>
            <td>Company</td>
            <td>String date</td>
            <td>end Date</td>
            <td>Days in total</td>
            <td>breakfastCount</td>
            <td>lunchCount</td>
            <td>dinnerCount</td>
            <td>Remarks</td>
          </tr>
          <tr>
            <td>住宿 & 就餐 Accommodation & meal</td>
            <td>{{this.printParams.lotNo}}<br>({{this.printParams.businessDepartment}})</td>
            <td>司机({{this.printParams.carNumber}})人<br>{{this.printParams.carNumber}}Drivers</td>
            <td>{{this.printParams.fileName}}</td>
            <td>{{parseTime(this.printParams.entryTime,'{y}-{m}-{d}')}}</td>
            <td>{{parseTime(this.printParams.departureTime,'{y}-{m}-{d}')}}</td>
            <td>{{this.printParams.dayNum}}</td>
            <td>{{this.printParams.breakfastCount}}</td>
            <td>{{this.printParams.lunchCount}}</td>
            <td>{{this.printParams.dinnerCount}}</td>
            <td>{{this.printParams.remarks}}</td>
          </tr>
          <tr>
            <td>Signature</td>
            <td rowspan="2">金航/JH</td>
            <td rowspan="2" colspan="2"></td>
            <td></td>
            <td></td>
            <td rowspan="2">OT</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
<!--            <td></td>-->
          </tr>
          <tr>
            <td>Date:</td>
            <td></td>
<!--            <td colspan="7"></td>-->
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
<!--            <td></td>-->
          </tr>
        </table>
      </div>
    </div>
    <el-dialog :title="ApproveTitle" :visible.sync="ApproveDialog" append-to-body width="40%" :append-to-body="true">
      <span style="font-size: 17px;font-weight: bold">需要审批的单据编号为:</span>
      <span style="font-size: 17px;font-weight: bold;color: red">{{this.documentNos.join(",")}}</span>
      <el-form :model="queryParams" ref="queryForm" :rules="ApproveRules">
        <el-form-item label="请填写审批意见" prop="approveMsg">
          <el-input
            v-model="queryParams.approveMsg"
            placeholder="请输入审批意见"
            clearable
            size="small"
          />
        </el-form-item>
          <el-button type="success" icon="el-icon-check" size="small" @click="pass">通过</el-button>
          <el-button type="danger" icon="el-icon-close" size="small" @click="stopPass">驳回</el-button>
          <el-button  icon="el-icon-refresh-right" size="small" @click="ApproveCancel">取消</el-button>

      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  listManagement,
  getManagement,
  delManagement,
  addManagement,
  updateManagement,
  DocumentNo,
  updateApproveStates
} from "@/api/tax/management";
  import {getUserDepts} from "@/utils/charutils";
  import {getDocByBusinessNo} from "@/api/tax/instore_doc";
  import {formatDate} from "@/utils";

  export default {
    name: "Management",
    data() {
      return {
        //审批弹框
        ApproveDialog:false,
        ApproveTitle:"",
        //审批查询状态
        approveLogoOption:[],
        //时间组件
        dateRange:[],
        //详情弹窗ID(为了详情页跳转修改页取数据)
        DetailsID:undefined,
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        documentNos:[],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        //字段显隐
        show: false,
        addShow:false,
        addType:false,
        // 打印显隐
        printShow: false,
        // 总条数
        total: 0,
        // 司机食宿管理表格数据
        managementList: [],
        // 弹出层标题
        title: "",
        depts: "",
        // 是否显示弹出层
        open: false,
        //详情页弹出框
        openDetails:false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 20,
          placeId: undefined,
          documentNo: undefined,
          businessDepartment: undefined,
          businessDate: undefined,
          shipmentNo: undefined,
          lotNo: undefined,
          carNumber: undefined,
          entryPerson: undefined,
          inputTime: undefined,
          fleetName: undefined,
          updatePerson: undefined,
          reviewer: undefined,
          reviewDate: undefined,
          entryTime: undefined,
          departureTime: undefined,
          dayNum: undefined,
          breakfastCount: undefined,
          lunchCount: undefined,
          dinnerCount: undefined,
          remarks: undefined,
          status: undefined,
          selectLogo:undefined,
          approveMsg:'审核通过',
        },

         printParams: {
          inputTime: undefined,
          lotNo: undefined,
          carNumber: undefined,
          fleetName: undefined,
          entryTime: undefined,
          departureTime: undefined,
          dayNum: undefined,
          breakfastCount: undefined,
          lunchCount: undefined,
          dinnerCount: undefined,
          remarks: undefined,

        },
        // 表单参数
        form: {},

        statusList: [
          {dictValue: 0, dictLabel: '未执行'},
          {dictValue: 1, dictLabel: '执行'}
        ],
        // 表单校验
        rules: {
          businessDepartment: [{required: true, message: "业务编号不能为空", trigger: "blur"},],
          entryTime: [{type: "string", required: true, message: "入境时间不能为空", trigger: "change",},],
          departureTime: [{type: "string", required: true, message: "入境时间不能为空", trigger: "change",},],
        },
        //审批表单效验
        ApproveRules:{
          approveMsg:[{required: true, message: "审批意见不能为空", trigger: "blur"},]
        },
      };
    },
    created() {
      // 获取部门信息
      this.depts = getUserDepts('1')
      if (this.depts.length > 0) {
        this.queryParams.placeId = this.depts[0].deptId
      }
      this.getDicts("tax_driver_management_selectLogo").then(res =>{
        this.approveLogoOption=res.data;
        console.log("-=-=-=-=")
        console.log(this.approveLogoOption)
      });
      this.getList();

    },
    methods: {
      getDocumentNo(){
        DocumentNo().then(response =>{
          this.form.documentNo=response
        })
      },
      /** 查询司机食宿管理列表 */
      getList() {
        this.loading = true;
        listManagement(this.addDateRange(this.queryParams,this.dateRange)).then(response => {
          this.managementList = response.rows;
          console.log(this.managementList)
          console.log("-=-=-=-=-=-=")
          this.total = response.total;
          this.loading = false;
        });
      },
    //根据入境时间 出境时间计算住宿天数跟饭数
      dateChange(){
        var day1 = new Date(this.form.departureTime);
        var day2 = new Date(this.form.entryTime);
        console.log(day2)
        var iDays = parseFloat((Math.abs(day1 - day2) / 1000 / 60 / 60 /24)) ;
        var count = parseInt(Math.ceil(iDays))
         this.form.breakfastCount = count;
         this.form.lunchCount = count;
         this.form.dinnerCount = count;
         this.form.dayNum = count;
         this.form.placeId = this.queryParams.placeId;
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      cancelDetails() {
        this.openDetails = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          id: undefined,
          documentNo: undefined,
          businessDepartment: undefined,
          businessDate: undefined,
          shipmentNo: undefined,
          lotNo: undefined,
          carNumber: undefined,
          entryPerson: undefined,
          inputTime: undefined,
          fleetName: undefined,
          updatePerson: undefined,
          updateTime: undefined,
          reviewer: undefined,
          reviewDate: undefined,
          entryTime: undefined,
          departureTime: undefined,
          dayNum: undefined,
          breakfastCount: undefined,
          lunchCount: undefined,
          dinnerCount: undefined,
          remarks: undefined,
          status: 0
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
        this.dateRange=[];
        this.resetForm("queryForm");
        this.handleQuery();
      },


      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        this.documentNos=selection.map(item =>item.documentNo)
        this.single = selection.length != 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.addType = true;
        this.addShow = false;
        // console.log(this.addShow)
        this.reset();
        this.getDocumentNo();
        this.open = true;
        this.title = "添加司机食宿管理";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.addType = false;
        this.addShow = true;
        // console.log(this.addShow)
        this.reset();
        const id = row.id || this.ids
        getManagement(id).then(response => {
          this.form = response.data;
          console.log("---------------")
          console.log(this.form)
          this.open = true;
          this.title = "修改司机食宿管理";
        });

      },
      /** 详情弹出框*/
      selectDetails(row) {
        this.printParams={};
        this.reset();
        const id = row.id || this.ids
        this.DetailsID=id;
        getManagement(id).then(response => {
          this.form = response.data;
          console.log("---------------")
          console.log(this.form)
          this.openDetails = true;
          this.title = "详情司机食宿管理";
          this.printParams=this.form;
        });
      },
      /**
       详情页跳转修改页*/
      updateDetails(){
        this.openDetails=false
        getManagement(this.DetailsID).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改司机食宿管理";
        });
      },
      deleteDetails(){
        delManagement(this.DetailsID).then(response =>{
          if(response.code === 200){
            this.msgSuccess("删除成功");
            this.openDetails=false
            this.getList();
          }
        })
      },
      /** 提交按钮 */
      submitForm: function () {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != undefined) {
              updateManagement(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                }
              });
            } else {
              addManagement(this.form).then(response => {
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

      getByBusinessNo() {
        getDocByBusinessNo(this.queryParams.placeId, this.form.businessDepartment).then(response => {
          // this.form = response.data;
          this.form.businessDate = response.data.createTime;
          this.form.entryTime = response.data.createTime;
          this.form.lotNo = response.data.batchNo;
          this.form.fleetName = response.data.fleetName;
          this.form.vehicleCount=response.data.vehicleCount;
          this.form.carNumber = response.data.vehicleCount;
        })

      },
      // 字典翻译
      translation(row, column) {
        return this.selectDictLabel(this.statusList, row.status);
      },


      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids;
        this.$confirm('是否确认删除司机食宿管理编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return delManagement(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function () {
        });
      },
      // 打印
      print(row) {
        this.printParams={};
        this.printShow = true;
        this.printParams = row;
        this.timer1 = setTimeout(() => {
          //设置延迟执行
          this.printShow = false;
        }, 3000);
      },
      printDetails(){
        this.printShow = true;
        this.timer1 = setTimeout(() => {
          //设置延迟执行
          this.printShow = false;
        }, 3000);
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('tax/management/export', {
          ...this.queryParams
        }, `tax_management.xlsx`)
      },
      tiJiao(){
        this.form.approveState= 1;
        this.$refs["form"].validate(valid => {
          if (valid) {
        addManagement(this.form).then(response => {
          if (response.code === 200) {
            this.msgSuccess("新增成功");
            this.open = false;
            this.getList();
          }
        });
          }
        });
      },
      zanCun(){
        this.form.approveState= 0;
        this.$refs["form"].validate(valid => {
          if (valid) {
        addManagement(this.form).then(response => {
          if (response.code === 200) {
            this.msgSuccess("新增成功");
            this.open = false;
            this.getList();
          }
        });
      }
    });
      },
      ApproveClick(){
        this.ApproveTitle="审批";
        this.ApproveDialog=true;
      },
      ApproveCancel(){
        this.ApproveDialog=false;
      },
      pass(){
        this.queryParams.approveState= 2;
        const id=this.ids
        updateApproveStates(this.queryParams.approveState,this.queryParams.approveMsg,id).then(res =>{
          if(res.code === 200){
            this.msgSuccess("审批成功")
            this.ApproveDialog=false;
            this.getList();
          }

        })

      },
      stopPass(){
        this.queryParams.approveState=3;
        const id=this.ids
        updateApproveStates(this.queryParams.approveState,this.queryParams.approveMsg,id).then(res =>{
          if(res.code === 200){
            this.msgSuccess("审批成功")
            this.ApproveDialog=false;
            this.getList();
          }
        })

      },
    }
  };
</script>
<style scoped>
  .tableClass {
    width: 1300px;
    height: 600px;
    border: 1px solid black; /*设置边框粗细，实线，颜色*/
    text-align: center; /*文本居中*/
    border-collapse: collapse
  }

  @page {
    size: auto;
    margin: 6mm;
  }
  .el-select {
    width: 100%;
  }

</style>
