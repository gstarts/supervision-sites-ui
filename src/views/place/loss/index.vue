<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="所属场所" prop="placeId">
        <el-select v-model="queryParams.placeId" placeholder="请选择所属场所" @change="placeChange">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="亏吨日期" prop="odate">
        <el-date-picker clearable size="small" style="width: 200px"
                        v-model="queryParams.odate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择亏吨日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="寄仓客户" prop="customer">
        <el-input
          v-model="queryParams.customer"
          placeholder="请输入寄仓客户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同号" prop="contractNo">
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入合同号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="货物名称" prop="goodsName">
        <el-input
          v-model="queryParams.goodsName"
          placeholder="请输入货物名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库位号" prop="storeCode">
        <el-input
          v-model="queryParams.storeCode"
          placeholder="请输入库位号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请时间" prop="applyTime">
        <el-date-picker clearable size="small" style="width: 200px"
                        v-model="queryParams.applyTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择申请时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="申请用户" prop="applyUser">
        <el-input
          v-model="queryParams.applyUser"
          placeholder="请输入申请用户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审批人" prop="auditUser">
        <el-input
          v-model="queryParams.auditUser"
          placeholder="请输入审批人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['place:loss:add']"
        >新增
        </el-button>
      </el-col>
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="success"-->
      <!--          icon="el-icon-edit"-->
      <!--          size="mini"-->
      <!--          :disabled="single"-->
      <!--          @click="handleUpdate"-->
      <!--          v-hasPermi="['place:loss:edit']"-->
      <!--        >修改</el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="danger"-->
      <!--          icon="el-icon-delete"-->
      <!--          size="mini"-->
      <!--          :disabled="multiple"-->
      <!--          @click="handleDelete"-->
      <!--          v-hasPermi="['place:loss:remove']"-->
      <!--        >删除</el-button>-->
      <!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:loss:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="lossList" @selection-change="handleSelectionChange">
      <af-table-column type="selection" width="55" align="center"/>
      <af-table-column label="ID" align="center" prop="id"/>
      <af-table-column label="所属场所" align="center" prop="placeId" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ depts.find(dept => dept.deptId === scope.row.placeId).deptName }}
        </template>
      </af-table-column>
      <af-table-column label="亏吨日期" align="center" prop="odate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.odate, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="寄仓客户" align="center" prop="customer" :show-overflow-tooltip="true"/>
      <af-table-column label="合同号" align="center" prop="contractNo" :show-overflow-tooltip="true"/>
      <af-table-column label="货物名称" align="center" prop="goodsName" :show-overflow-tooltip="true"/>
      <af-table-column label="亏吨重量(KGS)" align="center" prop="netWeight"/>
      <af-table-column label="库位号" align="center" prop="storeCode"/>
      <af-table-column label="申请时间" align="center" prop="applyTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.applyTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="申请用户" align="center" prop="applyUser"/>
      <af-table-column label="审批状态" align="center" prop="auditState">
        <template slot-scope="scope">
          {{ auditStateTopDic.find(item => item.key === scope.row.auditState).value }}
        </template>
      </af-table-column>
      <af-table-column label="审批人" align="center" prop="auditUser"/>
      <af-table-column label="审批时间" align="center" prop="auditTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.auditTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="审批说明" align="center" prop="auditReason"/>
      <af-table-column label="备注" align="center" prop="remark"/>
      <af-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button v-show="scope.row.auditState === '2'"
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleUpdate(scope.row)"
                     v-hasPermi="['place:loss:edit']"
          >修改
          </el-button>
          <el-button v-show="scope.row.auditState === '2'"
                     size="mini"
                     type="text"
                     icon="el-icon-delete"
                     @click="handleDelete(scope.row)"
                     v-hasPermi="['place:loss:remove']"
          >删除
          </el-button>
          <el-button v-show="scope.row.auditState === '0'"
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="auditUpdate(scope.row)"
                     v-hasPermi="['place:modify:audit']"
          >审批
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

    <!-- 添加或修改亏吨对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <!--      <el-form ref="form" :model="form" :rules="form.title !='亏吨审批' ? 'rules' : 'audit_rules'" label-width="120px">-->
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属场所" prop="placeId">
              <el-select v-model="form.placeId" placeholder="请选择所属场所" @change="((val)=>{change(val, 'placeId')})"
                         :disabled="auditDisabled">
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
            <el-form-item label="寄仓客户" prop="customer">
              <el-select
                v-model="form.customer" placeholder="请选择寄仓客户" filterable @change="((val)=>{change(val, 'eName')})"
                :disabled="auditDisabled">
                <el-option
                  v-for="dict in consumerOptions"
                  :key="dict.eName"
                  :label="dict.eName"
                  :value="dict.eName"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="合同号" prop="contractNo">
              <el-select v-model="form.contractNo" placeholder="请输入仓储合同" filterable
                         @change="((val)=>{change(val, 'contractNo')})" :disabled="auditDisabled">
                <el-option
                  v-for="item in contractOptions"
                  :key="1+item.contractNo"
                  :label="item.contractNo"
                  :value="item.contractNo"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货物名称" prop="goodsName">
              <el-input v-model="form.goodsName" placeholder="请输入货物名称" :disabled="true"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="库位号" prop="storeCode">
              <el-select v-model="form.storeCode" placeholder="请输入库位号" @change="((val)=>{change(val, 'storeCode')})"
                         :disabled="auditDisabled">
                <el-option
                  v-for="type in storeIds"
                  :key="type.storeCode"
                  :label="type.storeCode"
                  :value="type.storeCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="库存数" prop="stockWeight">
              <el-input v-model="form.stockWeight" placeholder="库存数" :disabled="true"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="亏吨日期" prop="odate">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.odate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择亏吨日期"
                              :disabled="auditDisabled">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="亏吨重量(KGS)" prop="netWeight">
              <el-input v-model="form.netWeight" placeholder="请输入亏吨重量(t)" :disabled="auditDisabled"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="创建人" prop="createBy">
              <el-input v-model="form.createBy" placeholder="请输入创建人" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间" prop="createTime" :disabled="true">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.createTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择创建时间"
                              :disabled="true"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" :disabled="auditDisabled"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-left: 60px;margin-right: 40px">
          <!--上传图片或pdf附件用的上传组件-->
          <el-col :span="24">
            <el-upload
              ref="uploadTwo"
              style="width: 100%"
              :multiple="true"
              accept=".png, .jpg, .jpeg, .pdf"
              :action="upload.url"
              :headers="upload.headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              :before-remove="beforeRemove"
              :before-upload="beforeUpload"
              :limit="10"
              :on-exceed="handleExceed"
              list-type="text"
              :disabled="auditDisabled"
              :file-list="fileList">
              <el-button size="small" type="primary" plain>上传附件</el-button>
              <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“.png”或“.jpg”或“.jpeg”或“.pdf”格式文件！</div>
            </el-upload>
            <div>
              <span v-show="updateForm.minFileName">{{ updateForm.minBucketName }}{{ updateForm.minFileName }}</span>
              <el-button
                size="small"
                type="text"
                icon="el-icon-download"
                @click="handleDownload()"
                v-show="updateForm.minFileName"
              >下载
              </el-button>
              <el-button
                size="small"
                type="text"
                icon="el-icon-delete"
                @click="deleteBig()"
                v-show="updateForm.minFileName"
                v-hasPermi="['place:loss:remove']"
              >删除
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="审批" prop="auditState" v-if="this.title === '亏吨审批'">
            <el-select v-model="form.auditState" placeholder="请选择审批结果">
              <el-option
                v-for="dept in auditStateFormDic"
                :key="dept.key"
                :label="dept.value"
                :value="dept.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="审批说明" prop="auditReason" v-if="this.title === '亏吨审批'">
            <el-input v-model="form.auditReason" type="textarea" placeholder="请输入审批说明"/>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="btnLoading" @click="submitForm">提 交</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listLoss, getLoss, delLoss, addLoss, updateLoss, auditLoss, getPlaceWeight} from "@/api/place/loss";
import {getToken} from '@/utils/auth'
import {getUserDepts} from '@/utils/charutils'
import {listInfo} from '@/api/basis/enterpriseInfo'
import {listStoreContract} from '@/api/place/storeContract'
import {getStoreByIds} from '@/api/place/store'   //获取库位信息
import {delAttachment, getPreview} from "@/api/place/attachment";  //附件对象


export default {
  name: "Loss",
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
      // 亏吨表格数据
      lossList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //审批对话框字段只读
      auditDisabled: false,

      updateForm: {},
      fileList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        placeId: undefined,
        odate: undefined,
        customer: undefined,
        contractNo: undefined,
        goodsName: undefined,
        netWeight: undefined,
        storeCode: undefined,
        applyTime: undefined,
        applyUser: undefined,
        applyReason: undefined,
        auditUser: undefined,
        auditTime: undefined,
        auditState: undefined,
        auditReason: undefined,
        auditUser2: undefined,
        auditTime2: undefined,
        auditResult2: undefined,
        auditReason2: undefined,
        minBucketName: undefined,
        minFileName: undefined,
        minPath: undefined,
        minFileLength: undefined,
        minObjectName: undefined,
        orderByColumn: 'id',
        isAsc: 'desc'
      },
      // 表单参数
      form: {
        goodsName: undefined,
        auditState: undefined,
        placeId: undefined,
        stockWeight: undefined
      },
      // 文件上传
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: '',
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: {'Authorization': 'Bearer ' + getToken(), 'bucketName': 'place', 'pathName': 'loss'},
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + '/place/attachment/add'
      },
      attachmentList: [],//保存附件的id
      uploading: false,
      // 校验重量
      weightParams: {
        placeId: '',
        storeCode: ''
      },
      // 新增表单校验
      rules: {
        placeId: [
          {required: true, message: "所属场所id不能为空", trigger: "blur"}
        ],
        customer: [
          {required: true, message: "寄仓客户不能为空", trigger: "blur"}
        ],
        contractNo: [
          {required: true, message: "合同号不能为空", trigger: "blur"}
        ],
        goodsName: [
          {required: true, message: "货物名称不能为空", trigger: "blur"}
        ],
        odate: [
          {required: true, message: "亏吨日期不能为空", trigger: "blur"}
        ],
        netWeight: [
          {required: true, message: "亏吨重量不能为空", trigger: "blur"}
        ],
        storeCode: [
          {required: true, message: "库位不能为空", trigger: "blur"}
        ],
        auditState: [
          {required: true, message: "审批不能为空", trigger: "blur"}
        ],
        auditReason: [
          {required: true, message: "批示意见不能为空", trigger: "blur"}
        ]
      },
      btnLoading: false,
      // 场所名称列表
      depts: [],
      // 客户名称列表
      consumerOptions: [],
      // 合同
      contractOptions: [],
      // 库位号
      storeIds: [],
      auditStateTopDic: [
        {'key': '0', 'value': '申请中'},
        {'key': '1', 'value': '审批通过'},
        {'key': '2', 'value': '审批不通过'},
      ],
      auditStateFormDic: [
        {'key': '1', 'value': '通过'},
        {'key': '2', 'value': '不通过'},
      ]
    };
  },
  created() {
    // 获取场所
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId;
      this.getList();
    }
  },
  methods: {
    /** 客户信息列表 */
    getConsumerInfo(placeId) {
      let consumerParams = {eType: '2', deptId: placeId}
      listInfo(consumerParams).then(response => {
        this.consumerOptions = response.rows
      })
    },

    /** 查询亏吨列表 */
    getList() {
      this.loading = true;
      listLoss(this.queryParams).then(response => {
        this.lossList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      //如果是新增的时候，点了取消，则删除文件记录
      if (this.form.id === undefined) {
        if (this.attachmentList.length > 0) {
          delAttachment(this.attachmentList).then(response => {
            this.attachmentList = []
          }).catch(err => {
            this.attachmentList = []
          })
        }
      } else {
        this.attachmentList = []

      }
      this.open = false;
      this.storeIds = []
      this.contractOptions = [],
        this.consumerOptions = [],
        this.weightParams = {
          id: '',
          coalType: ''
        }
      this.fileList = []
      this.$refs.uploadTwo.clearFiles()
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        placeId: undefined,
        odate: undefined,
        customer: undefined,
        contractNo: undefined,
        goodsName: undefined,
        netWeight: undefined,
        storeCode: undefined,
        applyTime: undefined,
        applyUser: undefined,
        applyReason: undefined,
        auditUser: undefined,
        auditTime: undefined,
        auditState: undefined,
        auditReason: undefined,
        auditUser2: undefined,
        auditTime2: undefined,
        auditResult2: undefined,
        auditReason2: undefined,
        createTime: undefined,
        createBy: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        minBucketName: undefined,
        minFileName: undefined,
        minPath: undefined,
        minFileLength: undefined,
        minObjectName: undefined
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
      this.auditDisabled = false
      this.open = true;
      this.title = "添加亏吨";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.auditDisabled = false
      const id = row.id || this.ids
      getLoss(id).then(response => {
        this.form = response.data;
        this.getConsumerInfo(this.form.placeId)  //构造寄仓客户码表
        this.weightParams.placeId = this.form.placeId
        this.weightParams.storeCode = this.form.storeCode
        this.checkStoreWeight(this.weightParams)
        this.open = true;
        this.title = "修改亏吨";

        //加载附件内容
        if (response.data.attachementids) {
          this.attachmentList = response.data.attachementids.split(',')
        }
        this.fileList = []
        for (let file of response.data.attachmentList) {
          this.fileList.push({
            'name': file.originalName,
            'url': file.objectName,
            'bucketName': file.bucketName,
            'id': file.id
          })
        }
      });
    },

    /** 审批按钮操作 */
    auditUpdate(row) {
      this.reset();
      this.auditDisabled = true
      const id = row.id || this.ids
      getLoss(id).then(response => {
        this.form = response.data;
        this.form.auditReason = undefined
        this.open = true;
        this.title = "亏吨审批";
        this.form.auditState = undefined
        this.weightParams.placeId = this.form.placeId
        this.weightParams.storeCode = this.form.storeCode
        this.checkStoreWeight(this.weightParams)
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.btnLoading = true
          if (this.form.id != undefined) {
            if (this.title != "亏吨审批") {
              this.form.attachementids = this.attachmentList.join(',')
              updateLoss(this.form).then(response => {
                this.btnLoading = false
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                }
              });
            } else {
              if (this.form.auditReason == null || this.form.auditState == null) {
                this.msgError("请填写审批相关内容")
                this.btnLoading = false
                return
              }
              auditLoss(this.form).then(response => {
                this.btnLoading = false
                if (response.code === 200) {
                  this.msgSuccess("成功");
                  this.open = false;
                  this.getList();
                }
              });
            }
          } else {
            this.form.attachementids = this.attachmentList.join(',')
            addLoss(this.form).then(response => {
              this.btnLoading = false
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
      this.$confirm('是否确认删除亏吨编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delLoss(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/loss/export', {
        ...this.queryParams
      }, `place_loss.xlsx`)
    },
    /** 校验库存重量*/
    checkStoreWeight(weightParams) {
      //根据库位信息获取对应的库存数据
      getPlaceWeight(weightParams).then(response => {
        this.form.stockWeight = response.data.release
        this.$forceUpdate()
      })
    },
    // 下拉列表改变时激活
    change(val, name) {
      // 场所
      if (name === 'placeId') {
        this.queryParams.placeId = val
        this.weightParams.placeId = val
        this.form.customer = undefined
        this.form.contractNo = undefined
        this.form.storeCode = undefined
        this.form.goodsName = undefined
        this.storeIds = []
        this.contractOptions = []
        this.getConsumerInfo(val)
      }
      // 客户
      if (name === 'eName') {
        this.form.contractNo = undefined
        this.form.goodsName = undefined
        this.form.storeCode = undefined
        this.form.stockWeight = undefined
        this.consumerOptions.forEach(element => {
          if (element.eName === val) {
            this.queryParams.customerId = element.id
            this.queryParams.goodsName = undefined
            listStoreContract(this.queryParams).then((response) => {
              this.contractOptions = response.rows
            })
          }
        })
      }
      // 合同
      if (name === 'contractNo') {
        this.form.storeCode = undefined
        this.contractOptions.forEach(element => {
          if (element.contractNo === val) {
            // 品名
            this.form.goodsName = element.goodsName
            this.storeIds = element.params.contract
            const ids = element.storeIds
            getStoreByIds(ids).then(response => {
              this.storeIds = response.data
            })
          }
        })
      }
      // 库位
      if (name === 'storeCode') {
        this.storeIds.forEach(element => {
          if (element.storeCode === val) {
            this.weightParams.storeCode = val
            this.weightParams.placeId = this.form.placeId
            this.checkStoreWeight(this.weightParams)
            this.$forceUpdate()
          }
        })
      }
    },
    /***上传start ***/
    /** 限制上传pdf文件大小 */
    beforeUpload(file) {
      // var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
      // const extension = testmsg === 'png'
      // const extension2 = testmsg === 'jpg'
      // const extension3 = testmsg === 'jpeg'
      // const extension4 = testmsg === 'pdf'
      const isLt2M = file.size / 1024 / 1024 < 10     //这里做文件大小限制
      // if(!extension && !extension2 && !extension3 && !extension4) {
      // 	this.$message({
      // 		message: '上传文件只能是 png,jpg,jpeg,pdf格式!',
      // 		type: 'warning'
      // 	});
      // }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!请等待读条完毕,并重新上传',
          type: 'error'
        });
      }
      // return extension || extension2 && isLt2M
    },
    handleRemove() {

    },
    handlePreview(file) {
      let id = ''
      if (file.response) {
        id = file.response.data
      } else {
        id = file.id
      }
      // console.log(id)
      getPreview(id).then(response => {
        if (response.data) {
          window.open(response.data)
        }
      })
    },
    // 文件上传成功
    uploadSuccess(response) {
      if (response.code !== 200) {
        this.$message.error(response.msg)
        this.uploading = false
        return false
      }
      //this.$message.success("上传成功")
      this.uploading = true
      // this.$refs.uploadTwo.clearFiles()
      this.attachmentList.push(response.data)
    },
    beforeRemove(file, fileList) {
      let index = fileList.indexOf(file)
      let attachmentId = this.attachmentList[index];
      console.log(attachmentId)
      //删除指定位置的元素
      this.attachmentList.splice(index, 1)
      //删除文件 及附件记录
      if (attachmentId) {
        delAttachment(attachmentId)
      }
    },
    handleExceed() {
      this.$message.warning('最多只能上传10个附件')
    },
    //下载
    handleDownload() {
      console.log(this.updateForm)
      window.location.href = process.env.VUE_APP_BASE_API + '/smallo/files/download?bucketName=' + this.updateForm.minBucketName + '&objectName=' + this.updateForm.minObjectName
    },

    /***上传end ***/
    placeChange(event) {
      this.getList()
    }
  }
};
</script>
