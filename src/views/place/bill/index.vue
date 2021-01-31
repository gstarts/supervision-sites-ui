<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">

      <el-form-item label="所属场所" prop="placeId">
        <el-select v-model="queryParams.placeId" placeholder="请选择所属场所" @change="placeChange">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"/>
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="计费单 有编码规则" prop="billNo">
            <el-input
              v-model="queryParams.billNo"
              placeholder="请输入计费单 有编码规则"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>-->
      <!--      <el-form-item label="寄仓客户ID" prop="customerId">
              <el-input
                v-model="queryParams.customerId"
                placeholder="请输入寄仓客户ID"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>-->
      <el-form-item label="寄仓客户" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入寄仓客户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="合同ID" prop="contractId">
              <el-input
                v-model="queryParams.contractId"
                placeholder="请输入合同ID"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>-->
      <el-form-item label="合同编号" prop="contractNo">
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入合同编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计费月份" prop="billMonth">
        <el-date-picker
          v-model="queryParams.billMonth"
          type="month"
          placeholder="选择计费月份"
          value-format="yyyy-MM"
          format="yyyy-MM" @change="handleQuery">
        </el-date-picker>
      </el-form-item>
      <!--      <el-form-item label="账单金额" prop="billAmount">
              <el-input
                v-model="queryParams.billAmount"
                placeholder="请输入账单金额"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>-->
      <!--      <el-form-item label="计费周期开始时间" prop="timeStart">
              <el-date-picker clearable size="small" style="width: 200px"
                v-model="queryParams.timeStart"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择计费周期开始时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="计费周期结束时间" prop="timeEnd">
              <el-date-picker clearable size="small" style="width: 200px"
                v-model="queryParams.timeEnd"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择计费周期结束时间">
              </el-date-picker>
            </el-form-item>-->
      <!--      <el-form-item label="状态" prop="state">
              <el-input
                v-model="queryParams.state"
                placeholder="请输入状态"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>-->
      <el-form-item label="审批状态" prop="approveState">
        <el-select v-model="queryParams.approveState" placeholder="请选择审批状态" clearable
                   size="small">
          <el-option v-for="item in approveStateOptions"
                     :key="item.dictValue"
                     :value="item.dictValue"
                     :label="item.dictLabel"
          />
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="上报人" prop="upUser">
              <el-input
                v-model="queryParams.upUser"
                placeholder="请输入上报人"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="上报时间" prop="upTime">
              <el-date-picker clearable size="small" style="width: 200px"
                v-model="queryParams.upTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择上报时间">
              </el-date-picker>
            </el-form-item>-->
      <el-form-item label="上报状态" prop="upState">
        <el-select v-model="queryParams.upState" placeholder="请选择上报状态" clearable
                   size="small">
          <el-option v-for="item in upStateOptions"
                     :key="item.dictValue"
                     :value="item.dictValue"
                     :label="item.dictLabel"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!--    <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
              v-hasPermi="['place:bill:add']"
            >新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="success"
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
              v-hasPermi="['place:bill:edit']"
            >修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
              v-hasPermi="['place:bill:remove']"
            >删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="warning"
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
              v-hasPermi="['place:bill:export']"
            >导出</el-button>
          </el-col>
        </el-row>-->

    <el-table v-loading="loading" :data="billList">
      <!--      <el-table-column label="ID" align="center" prop="id"/>-->
      <af-table-column label="计费单" align="center" prop="billNo"/>
      <!--      <el-table-column label="场所ID" align="center" prop="placeId" />-->
      <!--      <el-table-column label="寄仓客户ID" align="center" prop="customerId" />-->
      <af-table-column label="寄仓客户" align="center" prop="customerName"/>
      <!--      <el-table-column label="合同ID" align="center" prop="contractId" />-->
      <af-table-column label="合同编号" align="center" prop="contractNo"/>
      <af-table-column label="煤种" align="center" prop="goodsName"/>
      <el-table-column label="计费月份" align="center" prop="billMonth"/>
      <el-table-column label="账单金额" align="center" prop="billAmount"/>
      <el-table-column label="增补金额" align="center" prop="addAmount"/>
      <el-table-column label="总金额" align="center" prop="totalAmount"/>
      <el-table-column label="计费周期开始时间" align="center" prop="timeStart" width="180"/>
      <el-table-column label="计费周期结束时间" align="center" prop="timeEnd" width="180"/>
      <!-- <el-table-column label="状态" align="center" prop="state"/>-->
      <el-table-column label="审批状态" align="center" prop="approveState" :formatter="approveStateFormat"/>
      <el-table-column label="上报状态" align="center" prop="upState" width="180" :formatter="upStateFormat"/>
      <el-table-column label="上报人" align="center" prop="upUser"/>
      <el-table-column label="上报时间" align="center" prop="upTime" width="180"/>
      <!--      <el-table-column label="备注" align="center" prop="remark"/>-->
      <el-table-column label="生成时间" align="center" prop="createTime" width="180"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="280" fixed="right">
        <template slot-scope="scope">
          <el-button v-show="scope.row.approveState === '0'"
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="openDetail(scope.row)"
                     v-hasPermi="['place:billDetail:list']"
          >明细
          </el-button>
          <el-button v-show="scope.row.approveState === '0'"
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="reCalcBillCost(scope.row)"
                     v-hasPermi="['place:bill:recalc']"
          >重新计算
          </el-button>
          <el-button v-show="scope.row.approveState === '0'"
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleUpdate(scope.row)"
                     v-hasPermi="['place:bill:apply']"
          >提交审批
          </el-button>
          <el-button v-show="scope.row.upState === '0'"
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleUpdate(scope.row)"
                     v-hasPermi="['place:bill:up']"
          >上报
          </el-button>
          <el-button v-show="scope.row.approveState === '0' || scope.row.upState === '0'"
                     size="mini"
                     type="text"
                     icon="el-icon-delete"
                     @click="handleDelete(scope.row)"
                     v-hasPermi="['place:bill:remove']"
          >删除
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

    <!-- 添加或修改计费单对话框 -->
    <!--    <el-dialog :title="title" :visible.sync="open" append-to-body>
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="计费单 有编码规则" prop="billNo">
              <el-input v-model="form.billNo" placeholder="请输入计费单 有编码规则"/>
            </el-form-item>
            <el-form-item label="场所ID" prop="placeId">
              <el-input v-model="form.placeId" placeholder="请输入场所ID"/>
            </el-form-item>
            <el-form-item label="寄仓客户ID" prop="customerId">
              <el-input v-model="form.customerId" placeholder="请输入寄仓客户ID"/>
            </el-form-item>
            <el-form-item label="寄仓客户名称" prop="customerName">
              <el-input v-model="form.customerName" placeholder="请输入寄仓客户名称"/>
            </el-form-item>
            <el-form-item label="合同ID" prop="contractId">
              <el-input v-model="form.contractId" placeholder="请输入合同ID"/>
            </el-form-item>
            <el-form-item label="合同编号" prop="contractNo">
              <el-input v-model="form.contractNo" placeholder="请输入合同编号"/>
            </el-form-item>
            <el-form-item label="计费月份" prop="billMonth">
              <el-input v-model="form.billMonth" placeholder="请输入计费月份"/>
            </el-form-item>
            <el-form-item label="账单金额" prop="billAmount">
              <el-input v-model="form.billAmount" placeholder="请输入账单金额"/>
            </el-form-item>
            <el-form-item label="计费周期开始时间" prop="timeStart">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.timeStart"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择计费周期开始时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="计费周期结束时间" prop="timeEnd">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.timeEnd"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择计费周期结束时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="状态" prop="state">
              <el-input v-model="form.state" placeholder="请输入状态"/>
            </el-form-item>
            <el-form-item label="审批状态" prop="approveState">
              <el-input v-model="form.approveState" placeholder="请输入审批状态"/>
            </el-form-item>
            <el-form-item label="上报人" prop="upUser">
              <el-input v-model="form.upUser" placeholder="请输入上报人"/>
            </el-form-item>
            <el-form-item label="上报时间" prop="upTime">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.upTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择上报时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="上报状态" prop="upState">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.upState"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择上报状态">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.createTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择创建时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="创建人" prop="createBy">
              <el-input v-model="form.createBy" placeholder="请输入创建人"/>
            </el-form-item>
            <el-form-item label="更新人" prop="updateBy">
              <el-input v-model="form.updateBy" placeholder="请输入更新人"/>
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
              <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
            </el-form-item>
            <el-form-item label="乐观锁" prop="revision">
              <el-input v-model="form.revision" placeholder="请输入乐观锁"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>-->
    <el-drawer
      title="计费明细"
      :visible.sync="billDetailView"
      :append-to-body="true"
      :close-on-press-escape="true"
      direction="btt"
      size="100%"
      :wrapperClosable="true"
      :style="{marginLeft:'200px'}"
      style="padding:10px"
      :with-header="true">
      <el-row style="padding: 0 20px 10px 20px;font-size: 14px">
        <el-col :span="12">
          客户名称：{{ currentContract.customerName }}
          合同编号：{{ currentContract.contractNo }}
          品名：{{ currentContract.goodsName }}
        </el-col>
      </el-row>
      <el-table v-loading="loading" :data="detailList" height="90%">
        <!--        <el-table-column type="selection" width="55" align="center"/>
                <el-table-column label="ID" align="center" prop="id"/>
                <el-table-column label="账单ID" align="center" prop="billId"/>
                <el-table-column label="寄仓客户ID" align="center" prop="customerId"/>-->
        <af-table-column label="寄仓客户" align="center" prop="customerName"/>
        <!--        <el-table-column label="合同ID" align="center" prop="contactId"/>-->
        <af-table-column label="合同编号" align="center" prop="contactNo"/>
        <el-table-column label="计费项目" align="center" prop="billOption" :formatter="billOptionFormat"/>
        <el-table-column label="计费类型" align="center" prop="costRule.billType" :formatter="billTypeFormat"/>
        <el-table-column label="单价(元)" align="center" prop="price"/>
        <el-table-column label="数量(吨)" align="center" prop="quantity"/>
        <el-table-column label="总金额(元)" align="center" prop="amount"/>
        <el-table-column label="来源" align="center" prop="dataSource" :formatter="dataSourceFormat"/>
        <!--        <el-table-column label="计费规则" align="center" prop="ruleId"/>-->
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
          <template slot-scope="scope">
            <el-button v-show="scope.row.dataSource === '2'"
                       size="mini"
                       type="text"
                       icon="el-icon-edit"
                       @click="handleUpdate(scope.row)"
                       v-hasPermi="['place:detail:edit']"
            >修改
            </el-button>
            <el-button v-show="scope.row.dataSource === '2'"
                       size="mini"
                       type="text"
                       icon="el-icon-delete"
                       @click="handleDelete(scope.row)"
                       v-hasPermi="['place:detail:remove']"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-right:5px;margin-top:20px;overflow: auto;height: 260px">
        <!--        <el-form ref="ruleForm" :model="ruleForm" :rules="baseRules" label-width="120px">el-row-->
        <!--          <el-row :gutter="10">
                    <el-col :span="6">
                      <el-form-item label="计费项目" prop="billOption">
                        <el-select v-model="ruleForm.billOption" placeholder="请选择计费项目" style="width: 100%" size="small"
                                   filterable @change="billOptionChange">
                          <el-option v-for="item in billOptions" :key="item.dictValue" :value="item.dictValue"
                                     :label="item.dictLabel"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="计费周期" prop="billCycle">
                        <el-select v-model="ruleForm.billCycle" placeholder="请选择计费周期" size="small" style="width: 100%"
                                   filterable>
                          <el-option v-for="item in billCycles" :key="item.dictValue" :value="item.dictValue"
                                     :label="item.dictLabel"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-show="ruleForm.billOption === '5' || ruleForm.billType === '1'">
                      <el-form-item label="计费名称" prop="billName">
                        <el-input v-model="ruleForm.billName" placeholder="请输入计费名称"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" style="text-align: center">
                      <el-button type="primary" @click="addRule" size="mini">{{ operationBtnName }}</el-button>
                      <el-button @click="resetRule" size="mini">重 置</el-button>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="6">
                      <el-form-item label="计费类型" prop="billType">
                        <el-select v-model="ruleForm.billType" placeholder="请选择计费类型" size="small" style="width: 100%"
                                   filterable @change="billTypeChange">
                          <el-option v-for="item in billTypes" :key="item.dictValue" :value="item.dictValue"
                                     :label="item.dictLabel"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-show="ruleForm.billType !== '1'">
                      <el-form-item label="计费单位" prop="billUnit">
                        <el-select v-model="ruleForm.billUnit" placeholder="请输入计费单位" size="small" style="width: 100%" clearable
                                   filterable>
                          <el-option v-for="item in billUnits" :key="item.dictValue" :value="item.dictValue"
                                     :label="item.dictLabel"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="费率(元)" prop="billPrice">
                        <el-input v-model="ruleForm.billPrice" placeholder="请输入费率(元)" size="small"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6"></el-col>
                  </el-row>
                  <el-row :gutter="10" v-show="ruleForm.billType==='3'">
                    <el-col :span="6">
                      <el-form-item label="计量单位" prop="quantityUnit">
                        <el-select v-model="ruleForm.quantityUnit" placeholder="请输入数量单位" size="small" filterable
                                   style="width:100%">
                          <el-option v-for="item in quantityUnits" :key="item.dictValue" :value="item.dictValue"
                                     :label="item.dictLabel"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="计量起始" prop="quantityBegin">
                        <el-input v-model="ruleForm.quantityBegin" placeholder="请输入计量起始" size="small"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="计量结束" prop="quantityEnd">
                        <el-input v-model="ruleForm.quantityEnd" placeholder="请输入计量结束" size="small"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6"></el-col>
                  </el-row>
                  <el-row :gutter="10" v-show="ruleForm.billType==='4'">
                    <el-col :span="6">
                      <el-form-item label="计时单位" prop="timeUnit">
                        <el-select v-model="ruleForm.timeUnit" placeholder="请输入计时单位" size="small" style="width: 100%">
                          <el-option v-for="item in timeUnits" :key="item.dictValue" :value="item.dictValue"
                                     :label="item.dictLabel"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="计时起始" prop="timeBegin">
                        <el-input v-model="ruleForm.timeBegin" placeholder="请输入计时起始"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="计时结束" prop="timeEnd">
                        <el-input v-model="ruleForm.timeEnd" placeholder="请输入计时结束"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6"></el-col>
                  </el-row>
                  <el-row :gutter="10" v-show="ruleForm.billType === '5'">
                    <el-col :span="6">
                      <el-form-item label="计时单位" prop="timeUnit">
                        <el-select v-model="ruleForm.timeUnit" placeholder="请输入计时单位" size="small" style="width: 100%">
                          <el-option v-for="item in timeUnits" :key="item.dictValue" :value="item.dictValue"
                                     :label="item.dictLabel"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="计时结束" prop="timeEnd">
                        <el-input v-model="ruleForm.timeEnd" placeholder="请输入计时结束"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="计量结束" prop="quantityEnd">
                        <el-input v-model="ruleForm.quantityEnd" placeholder="请输入计量结束" size="small"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="议价费率(元)" prop="conferPrice">
                        <el-input v-model="ruleForm.conferPrice" placeholder="请输入议价费率" size="small"/>
                      </el-form-item>
                    </el-col>
                  </el-row>-->

        <!--        </el-form>-->
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {addBill, delBill, getBill, listBillLike, reCalcBillCost, updateBill} from "@/api/place/bill/bill";
import {getUserDepts} from "@/utils/charutils";
import {listBillDetail} from "@/api/place/bill/detail";

export default {
  name: "Bill",
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
      // 计费单表格数据
      billList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        orderByColumn: 'id',
        isAsc: 'desc',
        billNo: undefined,
        placeId: undefined,
        customerId: undefined,
        customerName: undefined,
        contractId: undefined,
        contractNo: undefined,
        billMonth: undefined,
        billAmount: undefined,
        timeStart: undefined,
        timeEnd: undefined,
        state: undefined,
        approveState: undefined,
        upUser: undefined,
        upTime: undefined,
        upState: undefined,
        revision: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      depts: [],
      billDetailView: false,
      detailList: [],
      currentContract: {
        customerName: undefined,
        contractNo: undefined,
        goodsName: undefined,
      },
      upStateOptions: [
        {'dictValue': '0', 'dictLabel': '未上报'},
        {'dictValue': '1', 'dictLabel': '已上报'},
      ],
      approveStateOptions: [
        {'dictValue': '0', 'dictLabel': '未提交'},
        {'dictValue': '1', 'dictLabel': '审批通过'},
        {'dictValue': '2', 'dictLabel': '审批不通过'},
        {'dictValue': '3', 'dictLabel': '待审批'},
      ],
      billOptions: [ //计费项目
        {dictValue: '1', dictLabel: '仓储费'},
        {dictValue: '2', dictLabel: '装货费'},
        {dictValue: '3', dictLabel: '卸货费'},
        {dictValue: '4', dictLabel: '超期仓储费'},
        {dictValue: '5', dictLabel: '其他费用'},
      ],
      dataSourceOptions: [
        {dictValue: '1', dictLabel: '系统计算'},
        {dictValue: '2', dictLabel: '人工录入'},
      ],
      billTypes: [//计费类型
        {dictValue: '1', dictLabel: '固定费'},
        {dictValue: '2', dictLabel: '计量费'},
        {dictValue: '3', dictLabel: '计量阶梯费'},
        {dictValue: '4', dictLabel: '计时阶梯费'},
        {dictValue: '5', dictLabel: '议价费'},
      ],
    }
  },
  created() {
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId;
      this.getList();
    }
  },
  methods: {
    /** 查询计费单列表 */
    getList() {
      this.loading = true;
      listBillLike(this.queryParams).then(response => {
        this.billList = response.rows;
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
        billNo: undefined,
        placeId: undefined,
        customerId: undefined,
        customerName: undefined,
        contractId: undefined,
        contractNo: undefined,
        billMonth: undefined,
        billAmount: undefined,
        timeStart: undefined,
        timeEnd: undefined,
        state: undefined,
        approveState: undefined,
        upUser: undefined,
        upTime: undefined,
        upState: undefined,
        createTime: undefined,
        createBy: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        revision: undefined
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
      this.title = "添加计费单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getBill(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改计费单";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateBill(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addBill(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除计费单编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delBill(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/bill/export', {
        ...this.queryParams
      }, `place_bill.xlsx`)
    },
    placeChange(event) {
      this.getList()
    },
    //明细面板打开
    openDetail(row) {
      this.currentContract = {...row}
      this.billDetailView = true
      listBillDetail({billId: row.id, placeId: this.queryParams.placeId}).then(response => {
        if (response.code === 200) {
          this.detailList = response.rows
        }
      })
    },
    approveStateFormat(row, column) {
      return this.selectDictLabel(this.approveStateOptions, row.approveState);
    },
    upStateFormat(row, column) {
      return this.selectDictLabel(this.upStateOptions, row.upState);
    },
    billOptionFormat(row, column) {
      return this.selectDictLabel(this.billOptions, row.billOption);
    },
    dataSourceFormat(row, column) {
      return this.selectDictLabel(this.dataSourceOptions, row.dataSource);
    },
    billTypeFormat(row, column) {
      return this.selectDictLabel(this.billTypes, row.costRule.billType);
    },
    //重新计算
    reCalcBillCost(row) {
      this.$confirm('是否确认要重新计算"' + row.contractNo + '"的计费单?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {

      }).then(() => {
        this.loading = true
        reCalcBillCost(row.contractId, row.billMonth).then(response => {
          this.loading = false
          if (response.code === 200) {
            this.msgSuccess(response.msg)
            this.getList();
          }
        }).catch(e => {
          this.loading = false
        })
      }).catch(function () {
        this.loading = false
      })
    }
  }
};
</script>

<style scoped>
.expanded /deep/ .el-table__expanded-cell {
  padding: 2px;
  margin: 1px;
}
</style>
