<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select @change="((val)=>{change(val, 'placeId')})"
                   v-model="queryParams.placeId" placeholder="请选择场所" size="small">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"/>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="计费方式" prop="chargeMethod">
        <el-input
          v-model="queryParams.chargeMethod"
          placeholder="请输入计费方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="计费方式" prop="chargeMode">
        <el-input
          v-model="queryParams.chargeMode"
          placeholder="请输入计费方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="计费周期" prop="chargePeriod">
        <el-input
          v-model="queryParams.chargePeriod"
          placeholder="请输入计费周期"
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
      <el-form-item label="客户名称" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入客户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="失效日期" prop="endDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.endDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择失效日期">
        </el-date-picker>
      </el-form-item>-->
      <!--<el-form-item label="场所ID" prop="placeId">
        <el-input
          v-model="queryParams.placeId"
          placeholder="请输入场所ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="结算周期" prop="settlementPeriod">
        <el-input
          v-model="queryParams.settlementPeriod"
          placeholder="请输入结算周期"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="签订日期" prop="signDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.signDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择签订日期">
        </el-date-picker>
      </el-form-item>-->
      <!--<el-form-item label="生效日期" prop="startDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.startDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择生效日期">
        </el-date-picker>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['place:storeContract:add']"
        >新增
        </el-button>
      </el-col>
      <!--      <el-col :span="1.5">
              <el-button
                type="success"
                icon="el-icon-edit"
                size="mini"
                :disabled="single"
                @click="handleUpdate"
                v-hasPermi="['place:storeContract:edit']"
              >修改
              </el-button>
            </el-col>-->
      <!--      <el-col :span="1.5">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                :disabled="multiple"
                @click="handleDelete"
                v-hasPermi="['place:storeContract:remove']"
              >删除
              </el-button>
            </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:storeContract:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="storeContractList">
      <af-table-column label="ID" align="center" prop="id"/>
      <!--<af-table-column label="场所ID" align="center" prop="placeId"/>-->
      <af-table-column label="客户名称" align="center" prop="customerName"/>
      <af-table-column label="合同编号" align="center" prop="contractNo"/>
      <af-table-column label="品名" align="center" prop="goodsName"/>
      <af-table-column label="散货库位" align="center" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.params.contract.map(item => item.storeCode) }}</span>
        </template>
      </af-table-column>
      <af-table-column label="仓储方式" align="center" prop="packMode" :formatter="packModeFormatter"/>
      <af-table-column label="煤棚仓储" align="center" prop="coalShed">
        <template slot-scope="scope">
          <span>{{ scope.row.coalShed === '1' ? '是' : '否' }}</span>
        </template>
      </af-table-column>
      <af-table-column label="押金金额" align="center" prop="cashPledge"/>
      <!--      <af-table-column label="计费方式" align="center" prop="chargeMethod"/>
            <af-table-column label="计费方式" align="center" prop="chargeMode"/>
            <af-table-column label="计费周期" align="center" prop="chargePeriod"/>

            <af-table-column label="结算周期" align="center" prop="settlementPeriod"/>-->
      <af-table-column label="签订日期" align="center" prop="signDate"/>
      <af-table-column label="有效期起" align="center" prop="startDate"/>
      <af-table-column label="有效期止" align="center" prop="endDate"/>
      <af-table-column label="延期至" align="center" prop="delayToDate"/>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <span>{{ scope.row.status === '1' ? '有效' : '无效' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="140">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['place:storeContract:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-notebook-1"
            @click="handleRules(scope.row)"
            v-hasPermi="['place:costRule:edit']"
          >计费规则
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['place:storeContract:remove']"
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

    <!-- 添加或修改仓储合同 对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="客户名称" prop="customerName">
              <el-select style="width: 100%"
                         filterable clearable
                         v-model="form.customerName" placeholder="请选择客户名称" size="small"
                         @change="((val)=>{change(val, 'eName')})">
                <el-option
                  v-for="dict in clientNameList"
                  :key="dict.eName"
                  :label="dict.eName"
                  :value="dict.eName"
                />
              </el-select>
            </el-form-item>
            <!--            <el-form-item label="场所" prop="placeId">
                          <el-select
                            v-model="form.placeId" placeholder="请选择场所" size="small" @change="getStoreList">
                            <el-option
                              v-for="dept in depts"
                              :key="dept.deptId"
                              :label="dept.deptName"
                              :value="dept.deptId"
                            />
                          </el-select>
                        </el-form-item>-->
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同编号" prop="contractNo">
              <el-input v-model="form.contractNo" placeholder="请输入合同编号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="品名" prop="goodsName">
              <!-- <el-input v-model="form.goodsName" placeholder="请输入品名"/>-->
              <el-select v-model="form.goodsName" placeholder="请选择品名" style="width:100%">
                <el-option
                  v-for="dict in coalTypeOptions"
                  :key="dict.dictLabel"
                  :label="dict.dictLabel"
                  :value="dict.dictLabel"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="押金金额" prop="cashPledge">
              <el-input v-model="form.cashPledge" placeholder="请输入押金金额"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="散货库位" prop="storeIds">
              <el-select v-model="form.storeIds" filterable multiple placeholder="请选择散货库位" style="width: 100%">
                <el-option
                  v-for="store in storeList"
                  :key="store.id"
                  :label="store.storeCode"
                  :value="store.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="仓储方式" prop="packMode">
              <el-select v-model="form.packMode" placeholder="请选择仓储方式" clearable
                         @change="(val)=>change(val,'packMode')">
                <el-option v-for="item in packModeOptions" :value="item.dictValue"
                           :label="item.dictLabel" :key="item.dictValue"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="煤棚仓储" prop="coalShed">
              <el-select v-model="form.coalShed" placeholder="请选择是否使用煤棚仓储" clearable>
                <el-option v-for="item in coalShedOptions" :value="item.dictValue"
                           :label="item.dictLabel" :key="item.dictValue"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="有效期起" prop="startDate">
              <el-date-picker clearable size="small" style="width: 100%"
                              v-model="form.startDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择有效期起始日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效期止" prop="endDate">
              <el-date-picker clearable size="small" style="width: 100%"
                              v-model="form.endDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择有效日期终止日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="签订日期" prop="signDate">
              <el-date-picker clearable size="small" style="width: 100%"
                              v-model="form.signDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择签订日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="延期至" prop="delayToDate">
              <el-date-picker clearable size="small" style="width: 100%"
                              v-model="form.delayToDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择延期至日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select
                v-model="form.status" placeholder="请选择状态" size="small">
                <el-option
                  v-for="dept in statusList"
                  :key="dept.key"
                  :label="dept.value"
                  :value="dept.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-drawer
      title="计费规则"
      :visible.sync="billRulesView"
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
        <el-col :span="12" style="text-align: right;padding-right: 30px">
          <el-button
            size="mini"
            type=""
            @click="checkRules"
          >规则校验
          </el-button>
          <el-button
            :loading="saveLoading"
            size="mini"
            type="primary"
            @click="saveRules"
            v-hasPermi="['place:costRule:add']"
          >保存规则
          </el-button>
        </el-col>
      </el-row>
      <el-table v-loading="loading" :data="rulesList" height="350" max-height="350">
        <el-table-column label="序号" type="index" align="center"/>
        <!--        <el-table-column label="合同编号" align="center" prop="contactId"/>-->
        <!--        <el-table-column label="客户名称" align="center" prop="customerName"/>
                <el-table-column label="合同编号" align="center" prop="contactNo"/>-->
        <el-table-column label="计费项目" align="center" prop="billOption" :formatter="billOptionFormat"/>
        <el-table-column label="计费周期" align="center" prop="billCycle" :formatter="billCycleFormat"/>
        <el-table-column label="计费类型" align="center" prop="billType" :formatter="billTypeFormat"/>
        <el-table-column label="计费名称" align="center" prop="billName"/>
        <el-table-column label="计费单位" align="center" prop="billUnit" :formatter="billUnitFormat"/>
        <el-table-column label="费率(元)" align="center" prop="billPrice"/>
        <el-table-column label="议价费率(元)" align="center" prop="conferPrice"/>
        <el-table-column label="计量单位" align="center" prop="quantityUnit" :formatter="quantityUnitFormat"/>
        <!--        <el-table-column label="阶梯单位" align="center" prop="stageUnit"/>-->
        <el-table-column label="计量起始" align="center" prop="quantityBegin"/>
        <el-table-column label="计量结束" align="center" prop="quantityEnd"/>
        <el-table-column label="计时单位" align="center" prop="timeUnit" :formatter="timeUnitFormat"/>
        <el-table-column label="计时起始" align="center" prop="timeBegin"/>
        <el-table-column label="计时结束" align="center" prop="timeEnd"/>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" style="width:140px" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-copy-document"
              @click="handleRuleCopy(scope.row)"
            >复制
            </el-button>
            <!--            <el-button
                          size="mini"
                          type="text"
                          icon="el-icon-edit"
                          @click="handleRuleUpdate(scope.$index, scope.row)"
                          v-hasPermi="['place:rules:edit']"
                        >修改
                        </el-button>-->
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleRuleDelete(scope.$index, scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-right:5px;margin-top:20px;overflow: auto;height: 260px">
        <el-form ref="ruleForm" :model="ruleForm" :rules="baseRules" label-width="120px">
          <el-row :gutter="10">
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
          </el-row>
          <!--          <el-form-item label="合同编号" prop="contactId">
                      <el-input v-model="form.contactId" placeholder="请输入合同编号" />
                    </el-form-item>
                    <el-form-item label="客户名称" prop="customerName">
                      <el-input v-model="form.customerName" placeholder="请输入客户名称" />
                    </el-form-item>-->
          <!--          <el-form-item label="阶梯单位" prop="stageUnit">
                      <el-input v-model="form.stageUnit" placeholder="请输入阶梯单位"/>
                    </el-form-item>-->
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  getStoreContract,
  delStoreContract,
  addStoreContract,
  updateStoreContract,
  listStoreContractLike
} from "@/api/place/storeContract";
import {compareDate, getUserDepts} from "@/utils/charutils";
import {getZoneList} from "@/api/place/zone";
import {listStore} from "@/api/place/store";
import {listInfo} from "@/api/basis/enterpriseInfo";
import {addCostRuleList, listCostRule} from "@/api/place/bill/rule";

export default {
  name: "StoreContract",
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
      // 仓储合同 表格数据
      storeContractList: [],
      // 客户名称列表
      clientNameList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        chargeMethod: undefined,
        chargeMode: undefined,
        chargePeriod: undefined,
        contractNo: undefined,
        customerName: undefined,
        endDate: undefined,
        placeId: undefined,
        settlementPeriod: undefined,
        signDate: undefined,
        startDate: undefined,
        orderByColumn: 'id',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      rules: {},
      // 表单校验
      rulesCoal: {
        placeId: [
          {required: true, message: "场所ID不能为空", trigger: "blur"}
        ],
        contractNo: [
          {required: true, message: "合同编号不能为空", trigger: "blur"}
        ],
        customerName: [
          {required: true, message: "客户名称不能为空", trigger: "blur"}
        ],
        goodsName: [
          {required: true, message: "品名不能为空", trigger: "blur"}
        ],
        storeIds: [
          {required: true, message: "散杂库位不能为空", trigger: "blur"}
        ],
        /*status: [
          {required: true, message: "状态不能为空", trigger: "change"}
        ],*/
        coalShed: [
          {required: true, message: "是否使用煤棚仓储不能为空", trigger: "change"}
        ],
        packMode: [
          {required: true, message: "仓储方式不能为空", trigger: "change"}
        ],
        startDate: [
          {required: true, message: "有效期起不能为空", trigger: "change"}
        ],
        endDate: [
          {required: true, message: "有效期止不能为空", trigger: "change"}
        ]
      },
      rulesContainer: {
        placeId: [
          {required: true, message: "场所ID不能为空", trigger: "blur"}
        ],
        contractNo: [
          {required: true, message: "合同编号不能为空", trigger: "blur"}
        ],
        customerName: [
          {required: true, message: "客户名称不能为空", trigger: "blur"}
        ],
        goodsName: [
          {required: true, message: "品名不能为空", trigger: "blur"}
        ],
        /*status: [
          {required: true, message: "状态不能为空", trigger: "change"}
        ],*/
        packMode: [
          {required: true, message: "仓储方式不能为空", trigger: "change"}
        ],
        startDate: [
          {required: true, message: "有效期起不能为空", trigger: "change"}
        ],
        endDate: [
          {required: true, message: "有效期止不能为空", trigger: "change"}
        ]
      },

      zoneCodeList: [],
      storeList: [],
      idList: [],
      coalTypeOptions: [], //煤种
      statusList: [{'key': '1', 'value': '有效'}, {'key': '0', 'value': '无效'}],
      packModeOptions: [
        {dictValue: '2', dictLabel: '散装'},
        {dictValue: '1', dictLabel: '集装箱'},
      ],
      coalShedOptions: [
        {dictValue: '1', dictLabel: '是'},
        {dictValue: '0', dictLabel: '否'},
      ],
      rulesList: [],
      billRulesView: false,
      currentContract: {},
      ruleForm: {
        id: undefined,
        customerId: undefined,
        customerName: undefined,
        contractId: undefined,
        contractNo: undefined,
        placeId: undefined,
        billOption: undefined,
        billCycle: undefined,
        billName: undefined,
        billType: undefined,
        billUnit: undefined,
        billPrice: undefined,
        quantityUnit: undefined,
        quantityBegin: undefined,
        quantityEnd: undefined,
        timeUnit: undefined,
        timeBegin: undefined,
        timeEnd: undefined,
        conferPrice: undefined,
      },
      //form验证规则
      baseRules: {},
      rulesFormRules: {
        billOption: [
          {'required': true, message: '计费项目不能为空', trigger: 'change'},
        ],
        billCycle: [
          {'required': true, message: '计费周期不能为空', trigger: 'change'},
        ],
        billType: [
          {'required': true, message: '计费类型不能为空', trigger: 'change'},
        ],
        billUnit: [
          {'required': true, message: '计费单位不能为空', trigger: 'change'},
        ],
        billPrice: [ //费率，应该为正浮点数，保留两位小数
          {
            'required': true,
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: '费率须为整数或两位小数',
            trigger: 'change'
          },
        ],
        conferPrice: [
          {
            'required': true,
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: '费率须为整数或两位小数',
            trigger: 'change'
          },
        ],
        billName: [
          {'required': true, message: '计费名称不能为空', trigger: 'blur'},
        ],
        timeUnit: [
          {'required': true, message: '计时单位不能为空', trigger: 'change'},
        ],
        timeBegin: [
          {required: true, pattern: /^[1-9]\d*|0$/, message: '请填写正确的数值', trigger: 'blur'}
        ],
        timeEnd: [
          {required: true, pattern: /^[1-9]\d*|-1$/, message: '请填写正确的整数值，-1表示无穷大', trigger: 'blur'}
        ],
        quantityUnit: [
          {'required': true, message: '计量单位不能为空', trigger: 'change'},
        ],
        quantityBegin: [
          {required: true, pattern: /^[1-9]\d*|0$/, message: '请填写正确的数值', trigger: 'blur'}
        ],
        quantityEnd: [
          {required: true, pattern: /^[1-9]\d*|-1$/, message: '请填写正确的整数值，-1表示无穷大', trigger: 'blur'}
        ],
      },
      rules1: {},

      billOptions: [ //计费项目
        {dictValue: '1', dictLabel: '仓储费'},
        {dictValue: '2', dictLabel: '装货费'},
        {dictValue: '3', dictLabel: '卸货费'},
        {dictValue: '4', dictLabel: '超期仓储费'},
        {dictValue: '5', dictLabel: '其他费用'},
      ],
      billCycles: [//计费周期
        {dictValue: '1', dictLabel: '自然月'},
        {dictValue: '2', dictLabel: '合同周期'},
      ],
      billTypes: [//计费类型
        {dictValue: '1', dictLabel: '固定费'},
        {dictValue: '2', dictLabel: '计量费'},
        {dictValue: '3', dictLabel: '计量阶梯费'},
        {dictValue: '4', dictLabel: '计时阶梯费'},
        {dictValue: '5', dictLabel: '议价费'},
      ],
      billUnits: [//计费单位
        {dictValue: '1', dictLabel: '入库量(吨)'},
        {dictValue: '2', dictLabel: '出库量(吨)'},
        {dictValue: '3', dictLabel: '入库车(辆)'},
        {dictValue: '4', dictLabel: '出库车(辆)'},
        {dictValue: '5', dictLabel: '入库箱(箱)'},
        {dictValue: '6', dictLabel: '出库箱(箱)'},
      ],
      quantityUnits: [//计量单位
        {dictValue: '1', dictLabel: '吨'},
        {dictValue: '2', dictLabel: '辆'},
      ],
      timeUnits: [
        {dictValue: '1', dictLabel: '天'},
      ],
      //当前选中的规则数据索引
      currentIndex: undefined,
      operationBtnName: '添 加',
      saveLoading: false
    }
  },
  created() {
    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts('0')
    this.rules = this.rulesCoal
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.getList()
      this.getListInfo()
      this.getStoreList()
    }
    //煤种类型
    this.getDicts("coal_type").then(response => {
      this.coalTypeOptions = response.data;
    });
  },
  methods: {
    /** 查询仓储合同 列表 */
    getList() {
      // if (!this.queryParams.placeId) return false
      this.loading = true;
      listStoreContractLike(this.queryParams).then(response => {
        this.storeContractList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    getListInfo() {
      this.loading = true;
      let info = {"eType": '2', 'deptId': this.queryParams.placeId, companyType: '2'}
      listInfo(info).then(response => {
        this.clientNameList = response.rows;
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
        chargeMethod: undefined,
        chargeMode: undefined,
        chargePeriod: undefined,
        contractNo: undefined,
        customerName: undefined,
        endDate: undefined,
        placeId: this.queryParams.placeId,
        settlementPeriod: undefined,
        signDate: undefined,
        startDate: undefined,
        remark: undefined,
        zoneCode: undefined,
        storeIds: undefined,
        status: undefined,
        delayToDate: undefined,
        coalShed: undefined,
        cashPledge: undefined,
        packMode: undefined,
      }
      this.resetForm("form");
      this.storeList = []
    },
    resetRuleForm() {
      this.ruleForm = {
        billOption: undefined,
        billCycle: undefined,
        billName: undefined,
        billType: undefined,
        billUnit: undefined,
        billPrice: undefined,
        quantityUnit: undefined,
        quantityBegin: undefined,
        quantityEnd: undefined,
        timeUnit: undefined,
        timeBegin: undefined,
        timeEnd: undefined,
        conferPrice: undefined,
      }
      this.resetForm("ruleForm");
      this.initRuleForm()
    },
    initRuleForm() {
      //基本值
      this.ruleForm.customerName = this.currentContract.customerName
      this.ruleForm.customerId = this.currentContract.customerId
      this.ruleForm.contractId = this.currentContract.id
      this.ruleForm.contractNo = this.currentContract.contractNo
      this.ruleForm.placeId = this.currentContract.placeId
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
      this.getListInfo();
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
      this.title = "添加仓储合同"
      this.form.status = '1'
      this.getStoreList()
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      this.form.placeId = row.placeId
      this.getStoreList()

      getStoreContract(id).then(response => {
        console.log(response)
        this.form = response.data;
        this.form.storeIds = response.data.params.contract.map(item => item.storeId)
        this.open = true;
        this.title = "修改仓储合同 ";
        let contractList = response.data.params.contract
        //把合同上的库位号给放到用户的库位号属性里
        for (let store of contractList) {
          if (!this.storeList.find(item => item.id === store.storeId)) {
            this.storeList.push({"id": store.storeId, 'storeCode': store.storeCode})
          }
        }
        //this.getStoreList()
      });
      //this.getZoneCode()
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (compareDate(this.form.startDate, this.form.endDate) >= 0) {
            this.$message.error('有效期起日期应小于有效期止日期')
            return false
          }
          //如果集装箱，就不设置煤棚变量
          if (this.form.packMode === '1') {
            this.form.coalShed = undefined
          }
          this.idList = this.form.storeIds
          let ids = ''
          for (let id of this.idList) {
            ids += id + ","
          }
          ids = ids.substring(0, ids.length - 1)
          this.form.storeIds = ids
          if (this.form.id != undefined) {
            updateStoreContract(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            }).catch(err => {
              this.form.storeIds = this.idList
            });
          } else {
            addStoreContract(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            }).catch(err => {
              this.form.storeIds = this.idList
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除仓储合同 编号为"' + row.contractNo + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delStoreContract(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/storeContract/export', {
        ...this.queryParams
      }, `仓储合同.xlsx`)
    },
    getZoneCode() {
      this.zoneCodeList = []
      getZoneList(this.form.placeId, '2').then(response => {
        if (response.code === 200) {
          this.zoneCodeList = response.data
        } else {
          this.form.zoneCode = undefined
          this.$message.error(response.msg)
        }
      });
      //区域类型变化时，获取对应场所的id，区域类型，返回对应区域内的区域编号
    },
    getStoreList() {
      this.storeList = []
      let params = {'placeId': this.queryParams.placeId, 'zoneType': '2', 'storeState': '0'}//取空闲
      listStore(params).then(response => {
        if (response.code === 200) {
          if (this.storeList.length === 0) { //如果没有值，
            this.storeList = response.rows
          } else {
            this.storeList = this.storeList.concat(response.rows)
          }
        } else {
          this.$message.warning("此区域下无库位")
        }
      })
    },
    getStoreCodeName(contract) {
      console.log(contract)
      let storeList = []
      for (let store of contract.params.contract) {
        storeList.push(store.storeCode)
      }
      return storeList
    },
    // 下拉列表改变时激活
    change(val, name) {
      // 客户名称->寄仓客户id
      if (name === 'eName') {
        this.clientNameList.forEach(element => {
          if (element.eName === val) {
            this.form.customerId = element.id
          }
        })
      }
      if (name === 'placeId') {
        this.handleQuery()
        this.getStoreList()
        this.form.placeId = this.queryParams.placeId
      }
      if (name === 'packMode') {
        if (val === '1') {
          this.rules = this.rulesContainer
          this.form.coalShed = undefined
        } else {
          this.rules = this.rulesCoal
        }
      }
    },
    packModeFormatter(row, column) {
      let mode = this.packModeOptions.find(item => item.dictValue === row.packMode)
      if (mode) {
        return mode.dictLabel
      }
      return row.packMode
    },
    handleRules(row) {
      this.currentContract = {...row}
      this.billRulesView = true
      this.initRuleForm()
      this.baseRules = this.rulesFormRules
      //获s取合同的规则
      listCostRule({'placeId': this.queryParams.placeId, 'contractId': row.id}).then(response => {
        if (response.code === 200) {
          this.rulesList = response.rows
        }
      })
    },
    billOptionFormat(row, column) {
      return this.selectDictLabel(this.billOptions, row.billOption);
    },
    billCycleFormat(row, column) {
      return this.selectDictLabel(this.billCycles, row.billCycle);
    },
    billTypeFormat(row, column) {
      return this.selectDictLabel(this.billTypes, row.billType);
    },
    billUnitFormat(row, column) {
      return this.selectDictLabel(this.billUnits, row.billUnit);
    },
    quantityUnitFormat(row, column) {
      return this.selectDictLabel(this.quantityUnits, row.quantityUnit);
    },
    timeUnitFormat(row, column) {
      return this.selectDictLabel(this.timeUnits, row.timeUnit);
    },
    //向列表中添加规则
    addRule() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.currentIndex === undefined) { //如果没有，是新增
            this.rulesList.push({...this.ruleForm})
          } else {//修改
            //this.rulesList[this.currentIndex] = {}
            this.rulesList[this.currentIndex] = {...this.ruleForm}
            console.log(this.rulesList)
            this.$forceUpdate()
          }
          this.resetRule()
        }
      })
    },
    resetRule() {
      this.resetRuleForm()
      this.currentIndex = undefined
      this.operationBtnName = '添 加'
    },
    handleRuleCopy(row) {
      this.ruleForm = {...row}
    },
    handleRuleUpdate(index, row) {
      //这时变为修改状态
      this.currentIndex = index
      this.operationBtnName = '修 改'
      this.ruleForm = {...this.rulesList[index]}
    },
    handleRuleDelete(index, row) {
      if (this.rulesList.length > 0) {
        this.rulesList.splice(index, 1)
      }
    },
    //校验规则
    checkRules() {

    },
    //保存计费规则l
    saveRules() {
      if (this.rulesList.length > 0) {
        this.saveLoading = true
        //保存
        addCostRuleList(this.rulesList).then(response => {
          this.saveLoading = false
          if (response.code === 200) {
            this.$message.success(response.msg)
          } else {
            this.$message.error('保存失败，请重新尝试')
          }
        }).catch(e => {
          this.saveLoading = false
        })
      } else {
        this.$message.warning('请添加计费规则')
        return false
      }
    },
    billTypeChange(event) {
      this.baseRules = {}
      this.baseRules.billOption = this.rulesFormRules.billOption
      this.baseRules.billCycle = this.rulesFormRules.billCycle
      this.baseRules.billType = this.rulesFormRules.billType
      this.baseRules.billPrice = this.rulesFormRules.billPrice

      /*this.baseRules.billUnit = undefined
      this.baseRules.quantityUnit = undefined
      this.baseRules.quantityBegin = undefined
      this.baseRules.quantityEnd = undefined
      this.baseRules.timeUnit = undefined
      this.baseRules.timeBegin = undefined
      this.baseRules.timeEnd = undefined
      this.baseRules.conferPrice = undefined
      this.baseRules.billName = undefined*/

      switch (event) {
        case '1'://固定费
          this.baseRules.billName = this.rulesFormRules.billName
          this.baseRules.billUnit = undefined
          this.baseRules.quantityUnit = undefined
          this.baseRules.quantityBegin = undefined
          this.baseRules.quantityEnd = undefined
          this.baseRules.timeUnit = undefined
          this.baseRules.timeBegin = undefined
          this.baseRules.timeEnd = undefined
          this.baseRules.conferPrice = undefined

          this.ruleForm.billUnit = undefined
          this.ruleForm.quantityUnit = undefined
          this.ruleForm.quantityBegin = undefined
          this.ruleForm.quantityEnd = undefined
          this.ruleForm.timeUnit = undefined
          this.ruleForm.timeBegin = undefined
          this.ruleForm.timeEnd = undefined
          this.ruleForm.conferPrice = undefined
          break;
        case '2': //计量费
          this.baseRules.billUnit = this.rulesFormRules.billUnit
          this.baseRules.billName = undefined
          this.baseRules.quantityUnit = undefined
          this.baseRules.quantityBegin = undefined
          this.baseRules.quantityEnd = undefined
          this.baseRules.timeUnit = undefined
          this.baseRules.timeBegin = undefined
          this.baseRules.timeEnd = undefined
          this.baseRules.conferPrice = undefined

          this.ruleForm.billName = undefined
          this.ruleForm.billUnit = undefined
          this.ruleForm.quantityUnit = undefined
          this.ruleForm.quantityBegin = undefined
          this.ruleForm.quantityEnd = undefined
          this.ruleForm.timeUnit = undefined
          this.ruleForm.timeBegin = undefined
          this.ruleForm.timeEnd = undefined
          this.ruleForm.conferPrice = undefined
          break;
        case '3': //计量阶梯
          this.baseRules.billUnit = this.rulesFormRules.billUnit
          this.baseRules.quantityUnit = this.rulesFormRules.quantityUnit
          this.baseRules.quantityBegin = this.rulesFormRules.quantityBegin
          this.baseRules.quantityEnd = this.rulesFormRules.quantityEnd
          this.baseRules.timeUnit = undefined
          this.baseRules.timeBegin = undefined
          this.baseRules.timeEnd = undefined
          this.baseRules.conferPrice = undefined
          this.baseRules.billName = undefined

          this.ruleForm.timeUnit = undefined
          this.ruleForm.timeBegin = undefined
          this.ruleForm.timeEnd = undefined
          this.ruleForm.billName = undefined
          this.ruleForm.conferPrice = undefined
          break;
        case '4': //计时阶梯
          this.baseRules.billUnit = this.rulesFormRules.billUnit
          this.baseRules.timeUnit = this.rulesFormRules.timeUnit
          this.baseRules.timeBegin = this.rulesFormRules.timeBegin
          this.baseRules.timeEnd = this.rulesFormRules.timeEnd
          this.baseRules.quantityUnit = undefined
          this.baseRules.quantityBegin = undefined
          this.baseRules.quantityEnd = undefined
          this.baseRules.conferPrice = undefined
          this.baseRules.billName = undefined

          this.ruleForm.quantityUnit = undefined
          this.ruleForm.quantityBegin = undefined
          this.ruleForm.quantityEnd = undefined
          this.ruleForm.conferPrice = undefined
          this.ruleForm.billName = undefined
          break;
        case '5': //议价费
          this.baseRules.billUnit = this.rulesFormRules.billUnit
          this.baseRules.timeEnd = this.rulesFormRules.timeEnd
          this.baseRules.quantityEnd = this.rulesFormRules.quantityEnd
          this.baseRules.conferPrice = this.rulesFormRules.conferPrice
          this.baseRules.quantityUnit = undefined
          this.baseRules.quantityBegin = undefined
          this.baseRules.timeUnit = undefined
          this.baseRules.billName = undefined
          this.baseRules.timeBegin = undefined

          this.ruleForm.quantityUnit = undefined
          this.ruleForm.quantityBegin = undefined
          this.ruleForm.timeUnit = undefined
          this.ruleForm.billName = undefined
          this.ruleForm.timeBegin = undefined
          break;
      }
    },
    billOptionChange(event) {//计费项目变化时，给其他值默认值
      this.ruleForm.billCycle = '1'
      this.ruleForm.billType = '2'
      this.ruleForm.billUnit = '1'
      this.billTypeChange(this.ruleForm.billType)
    }
  }
}
</script>
<style scoped="scoped">
.el-drawer__container /deep/ .el-drawer__header {
  margin-bottom: 12px;
}
</style>
