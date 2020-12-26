<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select
          @change="placeChange"
          v-model="queryParams.placeId" placeholder="请选择场所" clearable size="small">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="业务日期" prop="businessTime">
        <el-date-picker clearable size="small" style="width: 200px"
                        v-model="queryParams.businessTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择业务日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工分类型" prop="pointType">
        <el-select v-model="queryParams.pointType" placeholder="请选择工分类型" clearable size="small">
          <el-option
            v-for="dept in workpointTypeList"
            :key="dept.code"
            :label="dept.name +' ['+dept.code+']'"
            :value="dept.code"
          />
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="工分标准" prop="pointStandard">
              <el-select v-model="queryParams.pointStandard" placeholder="请选择工分标准">
                <el-option
                  v-for="dept in workpointStandardList"
                  :key="dept.code"
                  :label="dept.name+' ['+dept.score+'分]'"
                  :value="dept.code"
                />
              </el-select>
            </el-form-item>-->
      <!--      <el-form-item label="计分车数" prop="vehicleCount">
              <el-input
                v-model="queryParams.vehicleCount"
                placeholder="请输入计分车数"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>-->
      <!--      <el-form-item label="通知单号" prop="docNo">
              <el-input
                v-model="queryParams.docNo"
                placeholder="请输入通知单号"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>-->
      <!--<el-form-item label="通知单ID" prop="docId">
              <el-input
                v-model="queryParams.docId"
                placeholder="请输入通知单ID"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"/>
            </el-form-item>-->
      <el-form-item label="业务编号" prop="businessNo">
        <el-input
          v-model="queryParams.businessNo"
          placeholder="请输入业务编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单据类型" prop="docType">
        <el-select v-model="queryParams.docType" placeholder="请选择单据类型" clearable size="small">
          <el-option v-for="type in docTypeOptions"
                     :key="type.dictValue"
                     :value="type.dictValue"
                     :label="type.dictLabel"/>
        </el-select>
      </el-form-item>
      <el-form-item label="寄仓客户" prop="costumerName">
        <el-input
          v-model="queryParams.costumerName"
          placeholder="请输入寄仓客户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车牌号" prop="vehicleNo">
        <el-input
          v-model="queryParams.vehicleNo"
          placeholder="请输入车牌号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="车型" prop="vehicleType">
              <el-select v-model="queryParams.vehicleType" placeholder="请选择车型" clearable size="small">
                <el-option label="请选择字典生成" value=""/>
              </el-select>
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
      <el-form-item label="业务部门" prop="businessDept">
        <el-input
          v-model="queryParams.businessDept"
          placeholder="请输入业务部门"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审批状态" prop="approveState">
        <el-select v-model="queryParams.approveState"
                   placeholder="请输入审批状态"
                   clearable
                   size="small"
                   @change="handleQuery">
          <el-option
            v-for="dept in approveStateOptions"
            :key="dept.dictValue"
            :label="dept.dictLabel"
            :value="dept.dictValue"
          />
        </el-select>
      </el-form-item>
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
          v-hasPermi="['workpoint:head:add']"
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
                v-hasPermi="['workpoint:head:edit']"
              >修改
              </el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                :disabled="multiple"
                @click="handleDelete"
                v-hasPermi="['workpoint:head:remove']"
              >删除
              </el-button>
            </el-col>-->
      <!--<el-col :span="1.5">
              <el-button
                type="warning"
                icon="el-icon-download"
                size="mini"
                @click="handleExport"
                v-hasPermi="['workpoint:head:export']"
              >导出
              </el-button>
            </el-col>-->
    </el-row>

    <el-table v-loading="loading" :data="headList" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" align="center"/>-->
      <af-table-column label="单据号" align="center" prop="id"/>
      <!--      <af-table-column label="场所" align="center" prop="placeId"/>-->
      <af-table-column label="业务日期" align="center" prop="businessTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.businessTime, '{y}-{m}-{d}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="工分类型" align="center" prop="pointType" :formatter="pointTypeFormatter"/>
      <af-table-column label="工分标准" align="center" prop="pointStandard" :formatter="pointStandardFormatter"/>
      <af-table-column label="标准分值" align="center" prop="standardScore"/>
      <af-table-column label="计分车数" align="center" prop="vehicleCount"/>
      <af-table-column label="通知单号" align="center" prop="docNo"/>
      <af-table-column label="通知单ID" align="center" prop="docId"/>
      <af-table-column label="业务编号" align="center" prop="businessNo"/>
      <af-table-column label="单据类型" align="center" prop="docType" :formatter="docTypeFormatter"/>
      <af-table-column label="寄仓客户" align="center" prop="costumerName"/>
      <af-table-column label="车牌号" align="center" prop="vehicleNo"/>
      <af-table-column label="车型" align="center" prop="vehicleType"/>
      <!--<el-table-column label="状态" align="center" prop="state"/>-->
      <af-table-column label="业务部门" align="center" prop="businessDept"/>
      <af-table-column label="审批状态" align="center" prop="approveState" :formatter="approveStateFormatter"/>
      <af-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="140px">
        <template slot-scope="scope">
          <el-button v-show="scope.row.approveState === '0'"
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleUpdate(scope.row)"
                     v-hasPermi="['workpoint:head:edit']">修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleUpdateWorkers(scope.row)"
            v-hasPermi="['workpoint:record:add']">工分信息
          </el-button>
          <el-button v-show="scope.row.approveState === '0'"
                     size="mini"
                     type="text"
                     @click="handleApproveAdd(scope.row)"
                     v-hasPermi="['workpoint:approveHead:add']">提交审批
          </el-button>
          <el-button v-show="scope.row.approveState === '0'"
                     size="mini"
                     type="text"
                     icon="el-icon-delete"
                     @click="handleDelete(scope.row)"
                     v-hasPermi="['workpoint:head:remove']"
          >删除
          </el-button>

          <el-button v-show="scope.row.approveState === '1'"
                     size="mini"
                     type="text"
                     @click="handleApproveUpdate(scope.row)"
                     v-hasPermi="['workpoint:approveHead:edit']">审批
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"/>
    <!-- 添加或修改工分信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="单据类型" prop="docType">
              <el-select
                v-model="form.docType" placeholder="请选择单据类型" clearable size="small">
                <el-option
                  v-for="dic in docTypeOptions"
                  :key="dic.dictValue"
                  :label="dic.dictLabel"
                  :value="dic.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工分类型" prop="pointType">
              <el-select v-model="form.pointType" placeholder="请选择工分类型" @change="pointTypeChange">
                <el-option
                  v-for="dept in workpointTypeList"
                  :key="dept.code"
                  :label="dept.name"
                  :value="dept.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工分标准" prop="pointStandard">
              <el-select v-model="form.pointStandard" placeholder="请选择工分标准" @change="standardChange">
                <el-option
                  v-for="dept in workpointStandardList"
                  :key="dept.code"
                  :label="dept.name+' ['+dept.score+'分]'"
                  :value="dept.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="业务编号" prop="businessNo">
              <el-input v-model="form.businessNo" placeholder="请输入业务编号" @keyup.enter.native="getDocByBusinessNo"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="通知单号" prop="docNo">
              <el-input v-model="form.docNo" placeholder="请输入通知单号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务日期" prop="businessTime">
              <el-date-picker clearable size="small"
                              v-model="form.businessTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择业务日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="寄仓客户" prop="costumerName">
              <el-input v-model="form.costumerName" placeholder="请输入寄仓客户"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车牌号" prop="vehicleNo">
              <el-input v-model="form.vehicleNo" placeholder="请输入车牌号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车型">
              <el-input v-model="form.vehicleType" placeholder="请输入车型">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="计分车数" prop="vehicleCount">
              <el-input v-model="form.vehicleCount" placeholder="请输入计分车数"/>
            </el-form-item>
          </el-col>
          <!--          <el-col :span="8">
                      <el-form-item label="状态" prop="state">
                        <el-input v-model="form.state" placeholder="请输入状态"/>
                      </el-form-item>
                    </el-col>-->
          <el-col :span="8">
            <el-form-item label="业务部门" prop="businessDept">
              <el-input v-model="form.businessDept" placeholder="请输入业务部门"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!--        <el-form-item label="审批状态" prop="approveState">
                  <el-input v-model="form.approveState" placeholder="请输入审批状态"/>
                </el-form-item>-->
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
      <el-table v-show="form.docType==='1'" v-loading="loading" :data="instoreDocList" max-height="220px"
                style="cursor: pointer"
                @row-dblclick="copyToInDoc">
        <!--    <el-table-column label="ID" align="center" prop="id"/>-->
        <af-table-column label="入库单号" align="center" prop="inDocNo"/>
        <af-table-column label="业务编号" align="center" prop="businessNo"/>
        <af-table-column label="业务日期" align="center" prop="updateTime">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
          </template>
        </af-table-column>
        <af-table-column label="寄仓客户" align="center" prop="checkConsumer"/>
        <af-table-column label="车牌号" align="center" prop="vehicleNo"/>
        <af-table-column label="状态" align="center" prop="state"/>
      </el-table>
    </el-dialog>

    <!-- 提交审批信息对话框 -->
    <el-dialog title="提交审批" :visible.sync="approveOpen" append-to-body>
      <el-form ref="approveHead" :model="approveHead" :rules="approveRules" label-width="120px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="审批组" prop="auditGroup">
              <el-select v-model="approveHead.auditGroup" filterable placeholder="请选择审批组" @change="groupChange">
                <el-option
                  v-for="item in auditGroupList"
                  :key="item.groupCode"
                  :label="item.groupName"
                  :value="item.groupCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审批人" prop="approveUser">
              <el-select v-model="approveHead.approveUser" filterable placeholder="请选择审批人">
                <el-option
                  v-for="item in auditUserList"
                  :key="item.userName"
                  :label="item.nickName"
                  :value="item.userName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="提交说明" prop="remark">
          <el-input v-model="approveHead.applyReason" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitApproveForm">确 定</el-button>
        <el-button @click="approveCancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 修改审批信息对话框 -->
    <el-dialog title="修改审批" :visible.sync="approveUpdateOpen" append-to-body>
      <el-form ref="approveHead" :model="approveRecord" :rules="approveRules" label-width="120px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="审批组" prop="auditGroup">
              <el-select v-model="approveHead.auditGroup" filterable placeholder="请选择审批组" @change="groupChange">
                <el-option
                  v-for="item in auditGroupList"
                  :key="item.groupCode"
                  :label="item.groupName"
                  :value="item.groupCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审批人" prop="approveUser">
              <el-select v-model="approveHead.approveUser" filterable placeholder="请选择审批人">
                <el-option
                  v-for="item in auditUserList"
                  :key="item.userName"
                  :label="item.nickName"
                  :value="item.userName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="提交说明" prop="remark">
          <el-input v-model="approveHead.applyReason" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitApproveForm">确 定</el-button>
        <el-button @click="approveCancel">取 消</el-button>
      </div>
    </el-dialog>


    <el-drawer
      title="工分明细"
      :visible.sync="workerOpen"
      :append-to-body="true"
      :close-on-press-escape="true"
      direction="btt"
      size="500px"
      :wrapperClosable="true"
      :style="{marginLeft:'200px'}"
      style="padding:10px"
      :before-close="drawBeforeClose"
      :with-header="true">

      <el-form v-model="record" ref="record" :rules="rulesNew" :inline="true" label-width="68px">
        <el-tabs active-name="worker" v-loading="drawLoading" style="padding: 0 10px">
          <el-tab-pane label="作业人员" name="worker">
            <el-row style="padding-left: 10px;padding-bottom:0;margin-bottom: 0">
              <!--              <el-col :span="4" v-show="addFirst">-->
              <el-form-item label="作业小组" v-show="addFirst">
                <el-select v-model="workers.groupCode" placeholder="请选择作业小组" size="mini" @change="getWorkerList">
                  <el-option v-for="group in groupList"
                             :key="group.code"
                             :value="group.code"
                             :label="group.name"/>
                </el-select>
              </el-form-item>
              <!--              </el-col>-->
              <!--              <el-col :span="4" v-show="!addFirst">-->
              <el-form-item label="作业小组" v-show="!addFirst">
                <el-select v-model="workers.groupCode1" placeholder="请选择作业小组" size="mini" @change="getWorkerList2">
                  <el-option v-for="group in groupList"
                             :key="group.code"
                             :value="group.code"
                             :label="group.name"/>
                </el-select>
              </el-form-item>
              <!--              </el-col>-->
              <!--              <el-col :span="4" v-show="!addFirst">-->
              <el-form-item label="作业人员" v-show="!addFirst">
                <el-select v-model="workers.groupCode2" placeholder="请选择作业小组" size="mini" @change="addWorkerAgain">
                  <el-option v-for="worker in workerList"
                             :key="worker.workerCode"
                             :value="worker.workerCode"
                             :label="worker.workerName"/>
                </el-select>
              </el-form-item>
              <!--              </el-col>-->
              <!--              <el-col :span="3" v-show="workerRecordList.length>0" style="margin-top: 4px">-->
              <el-button style="margin-top: 5px" v-show="workerRecordList.length>0"
                         size="mini"
                         type="primary"
                         @click="calculatePoints">重算工分
              </el-button>
              <!--              </el-col>-->
            </el-row>
            <el-table v-loading="loading" :data="workerRecordList" @selection-change="handleSelectionChange"
                      max-height="280px">
              <!-- <el-table-column type="selection" width="55" align="center"/>-->
              <!--              <af-table-column label="单据号" align="center" prop="id"/>-->
              <el-table-column fixed label="作业组" align="center" prop="groupCode" width="120px"
                               :formatter="groupFormatter"/>
              <af-table-column label="作业人员" prop="workerCode" :formatter="workerFormatter"/>
              <!--              <el-table-column label="工分">-->
              <af-table-column label="核定工分" align="center" prop="vouchScore">
                <template slot-scope="scope">
                  <el-input type="number" v-model.number="scope.row.vouchScore" size="mini" :min="0"
                            disabled></el-input>
                </template>
              </af-table-column>
              <af-table-column label="扣除工分" align="center" prop="deductScore">
                <template slot-scope="scope">
                  <el-input type="number" v-model.number="scope.row.deductScore" size="mini" :min="0"></el-input>
                </template>
              </af-table-column>
              <af-table-column label="结余工分" align="center" prop="surplusScore">
                <template slot-scope="scope">
                  <!--                  <el-form-item prop="surplusScore">-->
                  <el-input type="number" v-model.number="scope.row.surplusScore" size="mini" :min="0"></el-input>
                  <!--                  </el-form-item>-->
                </template>
              </af-table-column>
              <!--              </el-table-column>-->
              <!-- <el-table-column label="通知单号" align="center" prop="docNo"/>
                        <el-table-column label="单据类型" align="center" prop="docType"/>
                        <el-table-column label="寄仓客户" align="center" prop="customerName"/>
                        <el-table-column label="车牌号" align="center" prop="vehicleNo"/>
                        <el-table-column label="业务日期" align="center" prop="businessTime" width="180">
                          <template slot-scope="scope">
                            <span>{{ parseTime(scope.row.businessTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
                          </template>
                        </el-table-column>-->
              <!-- <el-table-column label="工分类型" align="center" prop="pointTypeCode"/>
                        <el-table-column label="工分标准" align="center" prop="pointStandardCode"/>
                        <el-table-column label="标准分数" align="center" prop="standardScore"/>
                        <el-table-column label="计分车数" align="center" prop="vehicleCount"/>
                        <el-table-column label="业务编号" align="center" prop="businessNo"/>-->
              <af-table-column label="开始时间" align="center" prop="workStartTime" width="200">
                <template slot-scope="scope">
                  <el-date-picker v-model="scope.row.workStartTime" type="datetime"
                                  placeholder="选择日期时间" size="mini" style="width:190px">
                  </el-date-picker>
                </template>
              </af-table-column>
              <af-table-column label="结束时间" align="center" prop="workOverTime" width="200">
                <template slot-scope="scope">
                  <el-date-picker v-model="scope.row.workOverTime" type="datetime"
                                  placeholder="选择日期时间" size="mini" style="width:190px">
                  </el-date-picker>
                </template>
              </af-table-column>
              <af-table-column label="时间差(分钟)" align="center" prop="useTime"/>
              <af-table-column label="临时作业人员" align="center" prop="tempWorker">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.tempWorker" clearable filterable placeholder="请选择临时作业人员" size="mini">
                    <el-option v-for="worker in allWorkers"
                               :key="worker.workerCode"
                               :value="worker.workerCode"
                               :label="worker.workerName"/>
                  </el-select>
                </template>
              </af-table-column>
              <af-table-column label="理货人/安全员" align="center" prop="tallyWorker">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.tallyWorker" clearable filterable placeholder="请选择理货人/安全员" size="mini">
                    <el-option v-for="worker in allWorkers"
                               :key="worker.workerCode"
                               :value="worker.workerCode"
                               :label="worker.workerName"/>
                  </el-select>
                </template>
              </af-table-column>
              <el-table-column label="操作" align="center" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="reduceWorker(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

          </el-tab-pane>
          <el-tab-pane label="作业设备" name="device">
            <el-row :gutter="10" style="padding-left: 10px;padding-bottom: 10px">
              <el-form-item label="作业设备">
                <el-select v-model="workers.jobDevice" clearable filterable placeholder="请选择作业设备" size="mini"
                           @change="addDevice">
                  <el-option v-for="worker in jobDeviceList"
                             :key="worker.id"
                             :value="worker.id"
                             :label="worker.name"/>
                </el-select>
              </el-form-item>
              <!--              <el-button
                              size="mini"
                              type="primary"
                              @click="addDevice">添加设备
                            </el-button>-->
            </el-row>
            <el-table v-loading="loading" :data="deviceRecordList" max-height="280px">
              <!-- <el-table-column type="selection" width="55" align="center"/>-->
              <!--            <af-table-column label="ID" align="center" prop="id"/>-->
              <el-table-column label="作业设备" align="center" prop="jobDevice" width="160px" :formatter="deviceFormatter"/>
              <!--                <template slot-scope="scope">
                                <el-select v-model="scope.row.jobDevice" clearable filterable placeholder="请选择作业设备" size="mini">
                                  <el-option v-for="worker in jobDeviceList"
                                             :key="worker.id"
                                             :value="worker.id"
                                             :label="worker.name"/>
                                </el-select>
                              </template>-->
              <af-table-column label="设备作业人员" align="center" prop="jobDeviceWorker" width="180px">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.jobDeviceWorker" clearable filterable placeholder="请选择设备作业人员"
                             size="mini">
                    <el-option v-for="worker in allWorkers"
                               :key="worker.workerCode"
                               :value="worker.workerCode"
                               :label="worker.workerName"/>
                  </el-select>
                </template>
              </af-table-column>
              <af-table-column label="设备开始时间" align="center" prop="deviceStartTime" width="200px">
                <template slot-scope="scope">
                  <el-date-picker v-model="scope.row.deviceStartTime" type="datetime"
                                  placeholder="选择日期时间" size="mini" style="width:190px">
                  </el-date-picker>
                </template>
              </af-table-column>
              <af-table-column label="设备结束时间" align="center" prop="deviceOverTime" width="200px">
                <template slot-scope="scope">
                  <el-date-picker v-model="scope.row.deviceOverTime" type="datetime"
                                  placeholder="选择日期时间" size="mini" style="width:190px">
                  </el-date-picker>
                </template>
              </af-table-column>
              <af-table-column label="设备耗时(分钟)" align="center" prop="deviceUseTime"/>
              <af-table-column label="设备开始里程" align="center" prop="deviceStartMileage">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.deviceStartMileage" size="mini" :min="0"></el-input>
                </template>
              </af-table-column>
              <af-table-column label="设备结束里程" align="center" prop="deviceOverMileage">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.deviceOverMileage" size="mini" :min="0"></el-input>
                </template>
              </af-table-column>
              <af-table-column label="设备耗里程" align="center" prop="deviceUseMileage"/>
              <af-table-column label="设备开始油表" align="center" prop="deviceStartOil">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.deviceStartOil" size="mini" :min="0"></el-input>
                </template>
              </af-table-column>
              <af-table-column label="设备结束油表" align="center" prop="deviceOverOil">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.deviceOverOil" size="mini" :min="0"></el-input>
                </template>
              </af-table-column>
              <af-table-column label="设备耗油" align="center" prop="deviceUseOil"/>
              <el-table-column label="操作" align="center" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="reduceDevice(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <el-row :gutter="10" style="margin-top: 10px" v-show="currentRecord.approveState === '0'">
          <el-col :span="4" :offset="20">
            <el-button type="primary" @click="submitRecordForm" size="mini" :loading="btnLoading">确 定</el-button>
            <el-button @click="cancelRecord" size="mini">取 消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import {listHead, getHead, delHead, addHead, updateHead, getRecordCountByHeadId} from "@/api/workpoint/head";
import {getUserDepts} from "@/utils/charutils";
import {listType} from "@/api/workpoint/type";
import {listStandard} from "@/api/workpoint/standard";
import {listInstore_doc} from "@/api/tax/instore_doc";
import store from "@/store";
import {listGroup as listAuditGroup} from '@/api/place/group'
import {listGroup} from "@/api/workpoint/group";
import {listWorker} from "@/api/workpoint/worker";
import {parseTime} from "@/utils/common";
import {listDevice} from "@/api/workpoint/device";
import {addListRecord, listRecord} from "@/api/workpoint/record";
import {addApproveHead} from "@/api/workpoint/approveHead";
import {listUser} from "@/api/system/user";

export default {
  name: "Head",
  data() {
    return {
      sidebar: undefined,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      depts: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 工分信息表格数据
      headList: [],
      workerRecordList: [],//作业人员工分列表
      deviceRecordList: [],//作业设备列表
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      workerOpen: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        placeId: undefined,
        businessTime: undefined,
        pointType: undefined,
        pointStandard: undefined,
        vehicleCount: undefined,
        docNo: undefined,
        docId: undefined,
        businessNo: undefined,
        docType: undefined,
        costumerName: undefined,
        vehicleNo: undefined,
        vehicleType: undefined,
        state: undefined,
        businessDept: undefined,
        approveState: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      workpointTypeList: [],
      workpointStandardList: [],
      docTypeOptions: [],
      instoreDocList: [],
      outstoreDocList: [],
      approveStateOptions: [
        {'dictValue': '0', 'dictLabel': '未提交'},
        {'dictValue': '1', 'dictLabel': '待审核'},
        {'dictValue': '2', 'dictLabel': '审核通过'},
        {'dictValue': '3', 'dictLabel': '审核不通过'},
      ],
      allWorkers: [],
      workers: {
        groupCode: undefined,
        groupCode1: undefined,
        groupCode2: undefined,
      },
      groupList: [],
      record: {
        id: undefined,
        placeId: undefined,
        headId: undefined,
        groupCode: undefined,
        workerCode: undefined,
        vouchScore: undefined,
        deductScore: undefined,
        surplusScore: undefined,
        docNo: undefined,
        docType: undefined,
        customerName: undefined,
        vehicleNo: undefined,
        businessTime: undefined,
        pointTypeCode: undefined,
        pointStandardCode: undefined,
        standardScore: undefined,
        vehicleCount: undefined,
        businessNo: undefined,
        workStartTime: undefined,
        workOverTime: undefined,
        useTime: undefined,
        tempWorker: undefined,
        tallyWorker: undefined,
        jobDevice: undefined,
        jobDeviceWorker: undefined,
        deviceStartTime: undefined,
        deviceOverTime: undefined,
        deviceUseTime: undefined,
        deviceStartMileage: undefined,
        deviceOverMileage: undefined,
        deviceUseMileage: undefined,
        deviceStartOil: undefined,
        deviceOverOil: undefined,
        deviceUseOil: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        recordType: undefined,
      },
      currentRecord: {},
      addFirst: true, //是否是第一次加人
      workerList: [],
      jobDeviceList: [],
      rulesNew: {
        vouchScore: [
          {required: true, type: 'number', message: '核定工分不能为空', trigger: 'blur'}
        ],
        deductScore: [
          {required: true, message: '扣除工分不能为空', trigger: 'blur'}
        ],
        surplusScore: [
          {required: true, message: '结余工分不能为空', trigger: 'blur'}
        ],
      },
      btnLoading: false,
      drawLoading: false,
      workpointStandardOptions: [],
      approveHead: {
        id: undefined,
        className: undefined,
        classId: undefined,
        placeId: undefined,
        approveLevel: undefined,
        docNo: undefined,
        docId: undefined,
        approveState: undefined,
        applyUser: undefined,
        applyTime: undefined,
        applyReason: undefined,
        approveUser: undefined,
        attachments: undefined,
      },
      approveOpen: false,
      approveRules: {
        approveUser: [
          {required: true, message: '审批人不能为空', trigger: 'change'}
        ]
      },
      auditGroupList: [],
      userList: [],
      auditUserList: [],
      approveUpdateOpen: false,
      approveUpdateRules: {},
      approveRecord: {//审批记录的子对象
        id: undefined,
        parentId: undefined,
        approveState: undefined,
        isFinally: undefined,
        approveUser: undefined,
        approveResult: undefined,
        approveReason: undefined,
        remark: undefined
      },
    }
  },
  watch: { //监听表单数据变化，自动计算值
    workerRecordList: {
      deep: true,
      handler(val, oldValue) {
        console.log('watch-----------------')
        //console.log(val)
        //console.log(oldValue)
        for (let i = 0; i < this.workerRecordList.length; i++) {
          val[i].surplusScore = val[i].vouchScore - val[i].deductScore
          val[i].useTime = this.calculateMinutes(val[i].workStartTime, val[i].workOverTime)
        }
      }
    },
    deviceRecordList: {
      deep: true,
      handler(val, oldValue) {
        console.log('device-----------------')
        for (let i = 0; i < this.deviceRecordList.length; i++) {
          val[i].deviceUseTime = this.calculateMinutes(val[i].deviceStartTime, val[i].deviceOverTime)
          val[i].deviceUseMileage = val[i].deviceOverMileage - val[i].deviceStartMileage
          val[i].deviceUseOil = val[i].deviceOverOil - val[i].deviceStartOil
        }
      }
    }
  },
  created() {
    //单据类型
    this.getDicts('workpoint_doc_type').then(response => {
      this.docTypeOptions = response.data;
    });
    //获取工分类型
    this.getWorkpointTypeList()
    this.getWorkpointStandardDicList()
    this.depts = getUserDepts('')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.getList();
      //查询工分标准
      this.getGroupList()
      //this.getWorkpointStandardList()
    }
    this.sidebar = store.getters.sidebar
    //获取所有的工人名单
    listWorker({}).then(response => {
      this.allWorkers = response.rows
    })
    this.getDeviceList()
    this.getAuditGroupList()
    this.getUserList()
  },
  methods: {
    /** 查询工分信息列表 */
    getList() {
      this.loading = true;
      listHead(this.queryParams).then(response => {
        this.headList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
      this.instoreDocList = []
    },
    cancelRecord() {
      this.workerOpen = false
      this.workerRecordList = []
      this.deviceRecordList = []
      this.addFirst = true
      //this.currentRecord = undefined
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        placeId: undefined,
        businessTime: undefined,
        pointType: undefined,
        pointStandard: undefined,
        vehicleCount: undefined,
        docNo: undefined,
        docId: undefined,
        businessNo: undefined,
        docType: undefined,
        costumerName: undefined,
        vehicleNo: undefined,
        vehicleType: undefined,
        state: undefined,
        businessDept: undefined,
        approveState: undefined,
        createTime: undefined,
        createBy: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        standardScore: undefined,
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
      this.title = "添加工分信息";
      this.form.placeId = this.queryParams.placeId
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getHead(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改工分信息";
      });
    },
    /** 工作信息按钮操作 */
    handleUpdateWorkers(row) {
      //this.reset();
      this.drawLoading = true
      this.workerRecordList = []
      this.deviceRecordList = []

      this.currentRecord = row
      //设置表单内容
      listRecord({'headId': row.id}).then(response => {
        this.drawLoading = false
        if (response.rows.length > 0) {
          response.rows.forEach((item, index) => {
            item.id = undefined
            if (item.recordType === '1') {
              this.workerRecordList.push(item)
            } else if (item.recordType === '2') {
              this.deviceRecordList.push(item)
            }
          })
        }
      })
      this.workerOpen = true
      ///...
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateHead(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addHead(this.form).then(response => {
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
      this.$confirm('是否确认删除工分信息编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delHead(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('workpoint/head/export', {
        ...this.queryParams
      }, `workpoint_head.xlsx`)
    },
    //获取工分类型
    getWorkpointTypeList() {
      this.loading = true;
      listType({}).then(response => {
        this.workpointTypeList = response.rows;
        this.loading = false;
        //this.workpointStandardList = []
      });
    },
    //作业设备列表
    getDeviceList() {
      //jobDeviceList
      listDevice({'placeId': this.queryParams.placeId}).then(response => {
        if (response.code === 200) {
          this.jobDeviceList = response.rows
        }
      })
    },

    getWorkpointStandardDicList() {
      //this.loading = true
      this.workpointStandardOptions = []
      listStandard({'placeId': this.form.placeId, 'state': '1'}).then(response => {
        this.workpointStandardOptions = response.rows;
      });
    },
    /** 查询 工分标准列表 */
    getWorkpointStandardList(code) {
      //this.loading = true
      this.workpointStandardList = []
      listStandard({'placeId': this.form.placeId, 'state': '1', 'pointCode': code}).then(response => {
        this.workpointStandardList = response.rows;
        // this.loading = false;
      });
    },
    placeChange() { //场所变化
      //this.getWorkpointStandardList()
      this.getList()
      this.getGroupList()
      this.getDeviceList()
      this.getWorkpointStandardDicList()
      this.getAuditGroupList()
      this.getUserList()
    },
    //工分类型变化
    pointTypeChange(event) {
      this.getWorkpointStandardList(event)
    },
    //通过业务编号获取对应的通知单信息
    getDocByBusinessNo() {
      if (!this.form.placeId || !this.form.docType) {
        return false
      }
      if (this.form.placeId === 104) {//金航
        switch (this.form.docType) {
          case '1': //入库单
            listInstore_doc({
              'state': '1',
              'placeId': this.form.placeId,
              'businessNo': this.form.businessNo
            }).then(response => {
              if (response.code === 200) {
                console.log(response.rows)
                this.instoreDocList = response.rows
              }
            }).catch(err => {
              console.log(err)
              this.$message.error("未找到对应的单据")
              return false
            })
            break
          case '0':
            break
          default:
            break
        }
      }
    },
    //双击表格行，将row的信息赋值给工分信息表
    copyToInDoc(row) {
      this.form.docNo = row.inDocNo
      this.form.costumerName = row.checkConsumer
      this.form.vehicleNo = row.vehicleNo
      this.form.vehicleCount = 1
      this.form.state = row.state
      this.form.businessTime = row.updateTime
      this.form.businessNo = row.businessNo
      this.form.docId = row.id
    },
    standardChange(event) {
      let stand = this.workpointStandardList.find(item => item.code === event)
      if (stand) {
        this.form.standardScore = stand.score
      }
    },
    drawBeforeClose() {
      this.workerOpen = false
    },
    getGroupList() {//获取作业小组
      listGroup({'placeId': this.queryParams.placeId}).then(response => {
        this.groupList = response.rows;
        //console.log(response)
      });
    },
    getWorkerList(event) {//小组变化时，变更表格里面的人员
      //debugger
      let works = this.groupList.find(item => item.code === event)
      if (works != null) {
        //let workerList = works.jobWorkerList
        for (let work of works.jobWorkerList) {
          //console.log(work)
          let worker = this.initRecord(1)
          worker.workerCode = work.workerCode
          worker.groupCode = event
          /*worker.vouchScore = 0
          worker.deductScore = 0
          worker.surplusScore = 0
          worker.workStartTime = parseTime(this.currentRecord.businessTime)
          worker.workOverTime = parseTime(this.currentRecord.businessTime)*/
          //worker.placeId = this.queryParams.placeId
          console.log(worker)
          //this.workerRecordList.push(worker)
          this.plusWorker(worker)
        }
        if (this.workerRecordList.length > 0) {
          this.calculatePoints()
        }
      }
      if (this.workerRecordList.length > 0) {
        this.addFirst = false
      }
    },
    getWorkerList2(event) {//第二次选组
      this.workers.groupCode2 = ''
      let works = this.groupList.find(item => item.code === event)
      if (works != null) {
        this.workerList = works.jobWorkerList
      }
    },
    plusWorker(worker) {
      let workerIn = this.workerRecordList.find(item => item.workerCode === worker.workerCode)
      if (!workerIn) {
        this.workerRecordList.push(worker)
      }
    },
    addWorkerAgain(event) {//第二次加人
      let worker = this.initRecord(1)
      worker.workerCode = event
      worker.groupCode = this.workers.groupCode1
      /*worker.vouchScore = 0
      worker.deductScore = 0
      worker.surplusScore = 0
      worker.workStartTime = parseTime(this.currentRecord.businessTime)
      worker.workOverTime = parseTime(this.currentRecord.businessTime)*/
      this.plusWorker(worker)
      this.calculatePoints()
    },
    reduceWorker(index, worker) { //删除表格元素
      //获取index,然后删除
      if (this.workerRecordList.length > 0) {
        this.workerRecordList.splice(index, 1)
        if (this.workerRecordList.length === 0) {
          this.addFirst = true
          this.workers.groupCode = undefined
        }
        this.calculatePoints()
      }
    },
    reduceDevice(index, worker) { //删除表格元素
      //获取index,然后删除
      if (this.deviceRecordList.length > 0) {
        this.deviceRecordList.splice(index, 1)
      }
    },
    groupFormatter(row, column) {
      let group = this.groupList.find(item => item.code === row.groupCode)
      //console.log(group)
      if (group) {
        return group.name
      }
      return row.groupCode
    },
    workerFormatter(row, column) {
      let worker = this.allWorkers.find(item => item.workerCode === row.workerCode)
      if (worker) {
        return worker.workerName
      }
      return row.workerCode
    },
    deviceFormatter(row, column) {
      let device = this.jobDeviceList.find(item => item.id == row.jobDevice)
      if (device) {
        return device.name
      }
      return row.jobDevice
    },
    pointTypeFormatter(row, column) {
      let type = this.workpointTypeList.find(item => item.code === row.pointType)
      if (type) {
        return type.name
      }
      return row.pointType
    },
    pointStandardFormatter(row, column) {
      let standard = this.workpointStandardOptions.find(item => item.code === row.pointStandard)
      if (standard) {
        return standard.name
      }
      return row.pointStandard
    },
    docTypeFormatter(row, column) {
      return this.selectDictLabel(this.docTypeOptions, row.docType);
    },
    approveStateFormatter(row, column) {
      return this.selectDictLabel(this.approveStateOptions, row.approveState)
    },
    calculatePoints() {//计算工分
      let score = this.currentRecord.standardScore
      let number = this.workerRecordList.length
      let less = score % number //余数
      let perPoint = score / number
      perPoint = parseInt(perPoint)

      this.workerRecordList.forEach((item, index) => {
        item.vouchScore = perPoint
        item.deductScore = 0
        item.surplusScore = perPoint
      })
      if (less > 0) {//如果有余数
        //less 一定小于 list的长度
        for (let i = 0; i < less; i++) {
          this.workerRecordList[i].vouchScore = this.workerRecordList[i].vouchScore + 1;
          this.workerRecordList[i].surplusScore = this.workerRecordList[i].surplusScore + 1;
        }
      }
    },
    calculateMinutes(time1, time2) {//计算分钟差
      //debugger
      let date1 = new Date(time1) //转换成Data();
      let date2 = new Date(time2) //转换成Data();
      //let date1 = new Date(time1)
      //let date2 = new Date(time2)
      let minutes = (date2.getTime() - date1.getTime()) / 60000
      return parseInt(minutes)
    },
    addDevice(event) {
      if (!event) {
        return false
      }
      let device = this.initRecord(2)
      device.jobDevice = event
      let deviceIn = this.deviceRecordList.find(item => item.jobDevice === device.jobDevice)
      if (!deviceIn) {
        this.deviceRecordList.push(device)
      }
    },
    initRecord(type) {//初始化记录 type 1人员 2设备
      let record = {
        id: undefined,
        placeId: this.currentRecord.placeId,
        headId: this.currentRecord.id,
        groupCode: undefined,
        workerCode: undefined,
        vouchScore: undefined,
        deductScore: undefined,
        surplusScore: undefined,
        docNo: this.currentRecord.docNo,
        docType: this.currentRecord.docType,
        customerName: this.currentRecord.customerName,
        vehicleNo: undefined,
        businessTime: parseTime(this.currentRecord.businessTime),
        pointTypeCode: undefined,
        pointStandardCode: undefined,
        standardScore: undefined,
        vehicleCount: undefined,
        businessNo: this.currentRecord.businessNo,
        workStartTime: undefined,
        workOverTime: undefined,
        useTime: undefined,
        tempWorker: undefined,
        tallyWorker: undefined,
        jobDevice: undefined,
        jobDeviceWorker: undefined,
        deviceStartTime: undefined,
        deviceOverTime: undefined,
        deviceUseTime: undefined,
        deviceStartMileage: undefined,
        deviceOverMileage: undefined,
        deviceUseMileage: undefined,
        deviceStartOil: undefined,
        deviceOverOil: undefined,
        deviceUseOil: undefined,
        recordType: undefined,
      }
      if (type === 1) {
        record.vouchScore = 0
        record.deductScore = 0
        record.surplusScore = 0
        record.workStartTime = parseTime(this.currentRecord.businessTime)
        record.workOverTime = parseTime(this.currentRecord.businessTime)
        record.recordType = '1'
      } else if (type === 2) {
        record.deviceStartTime = parseTime(this.currentRecord.businessTime)
        record.deviceOverTime = parseTime(this.currentRecord.businessTime)
        record.deviceStartMileage = 0
        record.deviceOverMileage = 0
        record.deviceUseMileage = 0
        record.deviceStartOil = 0
        record.deviceOverOil = 0
        record.deviceUseOil = 0
        record.recordType = '2'
      }
      return record
    },
    submitRecordForm() {//提交两个列表
      if (this.workerRecordList.length === 0 && this.deviceRecordList.length === 0) {
        this.$message.warning('没有工分记录信息，不能提交')
        return false
      }
      let message = ''
      try {
        this.workerRecordList.forEach((item, index) => {
          if (item.surplusScore === undefined || item.deductScore === undefined || item.vouchScore === undefined) {
            message = '工分分值有空值，请检查'
            throw new Error('err')
          }
        })
      } catch (e) {
        this.$message.warning(message)
        return false
      }

      //作业人员验证
      if (this.workerRecordList.length > 0) {
        let totalPoint = 0
        for (let i = 0; i < this.workerRecordList.length; i++) {
          console.log(this.workerRecordList[i].vouchScore)
          totalPoint += parseInt(this.workerRecordList[i].vouchScore)
        }
        /*let totalPoint = this.workerRecordList.reduce(function (prev, next) {
          console.log(prev.vouchScore)
          console.log(next.vouchScore)
          return parseInt(prev.vouchScore) + parseInt(next.vouchScore)
        })*/
        console.log('工分总和：' + totalPoint + '，标准工分：' + this.currentRecord.standardScore)
        if (totalPoint !== parseInt(this.currentRecord.standardScore)) {
          this.$message.warning('核定工分总和与标准分值不等，请检查')
          return false
        }
        let totalPoint2 = 0
        for (let i = 0; i < this.workerRecordList.length; i++) {
          console.log(this.workerRecordList[i].vouchScore)
          totalPoint2 += parseInt(this.workerRecordList[i].deductScore) + parseInt(this.workerRecordList[i].surplusScore)
        }
        /*let totalPoint2 = this.workerRecordList.reduce(function (prev, next) {
          return parseInt(prev.deductScore) + parseInt(prev.surplusScore) + parseInt(next.deductScore) + parseInt(next.surplusScore)
        }, {deductScore: 0, surplusScore: 0})*/
        if (totalPoint2 !== parseInt(this.currentRecord.standardScore)) {
          this.$message.warning('扣除工分与结余工分的总和与标准分值不等，请检查')
          return false
        }

      }
      //设备列表验证
      if (this.deviceRecordList.length > 0) {
        let message = ''
        try {
          this.deviceRecordList.forEach((item, index) => {
            if (!item.jobDevice) {
              message = '作业设备有空值，请检查'
              throw new Error('err')
            }
            if (!item.jobDeviceWorker) {
              message = '作业设备人员有空值，请检查'
              throw new Error('err')
            }
            if (!item.deviceStartTime) {
              message = '设备开始时间有空值，请检查'
              throw new Error('err')
            }
            if (!item.deviceOverTime) {
              message = '设备结束时间有空值，请检查'
              throw new Error('err')
            }
          })
        } catch (e) {
          this.$message.warning(message)
          return false
        }
      }
      //都验证完，提交
      //合并两个数组
      let list = this.workerRecordList.concat(this.deviceRecordList);
      this.btnLoading = true
      addListRecord(list).then(response => {
        this.btnLoading = false
        if (response.code === 200) {
          this.$message.success(response.msg)
          this.cancelRecord()
        } else {
          this.$message.error(response.msg)
        }
      })
      /*this.workerRecordList.forEach((item, index) => {
        item.vouchScore = perPoint
        item.deductScore = 0
        item.surplusScore = perPoint
      })*/
    },
    //提交审批
    handleApproveAdd(row) {
      getRecordCountByHeadId(row.id).then(response => {
        if (response.data === 0) {
          this.$message.warning('请先添加工分信息')
          return false
        } else {
          this.approveOpen = true
          //生成提交数据
          this.approveHead.className = 'workPointHead'
          this.approveHead.classId = row.id
          this.approveHead.docNo = row.docNo
          this.approveHead.docId = row.docId
          this.approveHead.placeId = row.placeId
          this.approveHead.approveLevel = 2
          this.approveHead.approveState = '1'
        }
      })
      // addApproveHead(head)
    },
    submitApproveForm() {
      this.$refs["approveHead"].validate(valid => {
        if (valid) {
          addApproveHead(this.approveHead).then(response => {
            if (response.code === 200) {
              this.$message.success(response.msg)
              this.approveOpen = false
              this.getList()
            } else {
              this.$message.error(response.msg)
            }
          })
        }
      })
    },
    approveCancel() {
      this.approveOpen = false
      this.approveHead.applyReason = undefined
      this.approveHead.approveUser = undefined
      this.approveHead.auditGroup = undefined
      this.approveHead.className = undefined
      this.approveHead.classId = undefined
      this.approveHead.docNo = undefined
      this.approveHead.docId = undefined
      this.approveHead.placeId = undefined
      this.approveHead.approveLevel = undefined
      this.approveHead.approveState = undefined
    },
    getUserList() {
      listUser({'deptId': this.queryParams.placeId, 'delFlag': '0'}).then(response => {
        if (response.code === 200) {
          this.userList = response.rows
          console.log(this.userList)
        }
      })
    },
    getAuditGroupList() {
      listAuditGroup({'placeId': this.queryParams.placeId, 'state': '1'}).then(response => {
        if (response.code === 200) {
          this.auditGroupList = response.rows
        }
      })
    },
    groupChange(event) {
      this.auditUserList = []
      let group = this.auditGroupList.find(item => item.groupCode === event);
      if (group) {
        let users = group.userNames.split(',')
        for (let name of users) {
          this.auditUserList.push({
            'userName': name,
            'nickName': this.userList.find(item => item.userName === name).nickName
          })
        }
      }
    },
    handleApproveUpdate(row){
      //审批按钮
    }
  }
}
</script>
<style scoped>
/deep/ .el-drawer__header {
  align-items: center;
  color: #72767b;
  display: flex;
  margin-bottom: 0;
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
}
</style>
