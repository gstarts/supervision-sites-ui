<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select v-model="queryParams.placeId" placeholder="请选择场所" @change="handleQuery">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <!--<el-form-item label="文件桶名称" prop="bucketName">
        <el-input
          v-model="queryParams.bucketName"
          placeholder="请输入文件桶名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->

      <!--<el-form-item label="是否生成报关数据" prop="isGenReport">
        <el-input
          v-model="queryParams.isGenReport"
          placeholder="请输入是否生成报关数据"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="是否生成出入库通知单" prop="isGenStoreNotice">
        <el-input
          v-model="queryParams.isGenStoreNotice"
          placeholder="请输入是否生成出入库通知单"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="对象名称" prop="objectName">
        <el-input
          v-model="queryParams.objectName"
          placeholder="请输入对象名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="文件路径" prop="path">
        <el-input
          v-model="queryParams.path"
          placeholder="请输入文件路径"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="场所编号" prop="placeId">
        <el-input
          v-model="queryParams.placeId"
          placeholder="请输入场所编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->

      <!--<el-form-item label="文件长度" prop="fileLength">
        <el-input
          v-model="queryParams.fileLength"
          placeholder="请输入文件长度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="寄舱合同ID" prop="storeContractId">
        <el-input
          v-model="queryParams.storeContractId"
          placeholder="请输入寄舱合同ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="寄舱客户" prop="storeCustomer">
        <el-input
          v-model="queryParams.storeCustomer"
          placeholder="请输入寄舱客户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="结算合同ID" prop="settlementContractId">
        <el-input
          v-model="queryParams.settlementContractId"
          placeholder="请输入结算合同ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="结算客户" prop="settlementCustomer">
        <el-input
          v-model="queryParams.settlementCustomer"
          placeholder="请输入结算客户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
      <el-form-item label="模板类型" prop="templateType">
        <el-select v-model="queryParams.templateType" placeholder="请选择模板类型" clearable size="small">
          <el-option
            v-for="type in importTypeDic"
            :key="type.value"
            :label="type.label"
            :value="type.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="文件名" prop="fileName">
        <el-input
          v-model="queryParams.fileName"
          placeholder="请输入文件名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label=" 发货单位" prop="sendName">
        <el-input
          v-model="queryParams.sendName"
          placeholder="请输入 发货单位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="收货单位" prop="receiveName">
        <el-input
          v-model="queryParams.receiveName"
          placeholder="请输入收货单位"
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
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['place:import:add']"
        >导入
        </el-button>
      </el-col>
      <!--<el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['place:import:edit']"
        >修改</el-button>
      </el-col>-->
      <!--<el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['place:import:remove']"
        >删除
        </el-button>
      </el-col>-->
      <!--<el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:import:export']"
        >导出</el-button>
      </el-col>-->
    </el-row>

    <el-table v-loading="loading" :data="importList">
      <!-- <af-table-column type="selection" width="55" align="center"/>-->
      <af-table-column label="ID" align="center" prop="id"/>

      <af-table-column label="文件桶名称" align="center" prop="bucketName"/>
      <af-table-column label="文件名" align="center" prop="fileName"/>
      <af-table-column label="是否生成报关数据" align="center" prop="isGenReport"/>
      <af-table-column label="是否生成出入库通知单" align="center" prop="isGenStoreNotice"/>
      <!--      <af-table-column label="对象名称" align="center" prop="objectName"/>-->
      <!--      <af-table-column label="文件路径" align="center" prop="path"/>-->
      <af-table-column label="场所编号" align="center" prop="placeId"/>
      <af-table-column label="模板类型" align="center">
        <template slot-scope="scope">
          {{ importTypeDic.find(item => item.value === scope.row.templateType).label }}
        </template>
      </af-table-column>
      <af-table-column label="文件长度" align="center" prop="fileLength"/>
      <!--<af-table-column label="寄舱合同ID" align="center" prop="storeContractId"/>-->
      <af-table-column label="寄舱客户" align="center" prop="storeCustomer"/>
      <!--      <af-table-column label="结算合同ID" align="center" prop="settlementContractId"/>-->
      <!--      <af-table-column label="结算客户" align="center" prop="settlementCustomer"/>-->
      <!--<af-table-column label="业务编号" align="center" prop="businessNo"/>-->
      <!-- <af-table-column label=" 发货单位" align="center" prop="sendName"/>
      <af-table-column label="收货单位" align="center" prop="receiveName"/>-->
      <!--      <af-table-column label="备注" align="center" prop="remark"/>-->
      <af-table-column label="导入结果" align="center" prop="importResult"/>
      <af-table-column label="导入用户" align="center" prop="createBy"/>
      <af-table-column label="导入时间" align="center" prop="createTime"/>
      <af-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <!--<el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['place:import:edit']"
          >修改
          </el-button>-->
          <el-button v-show="scope.row.isGenStoreNotice === 0 && scope.row.templateType ==='1' "
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     :loading="loading"
                     @click="handleGenNotice(scope.row)"
                     v-hasPermi="['place:import:genNotice']"
          >生成入库通知单
          </el-button>

          <!--<el-button v-show="scope.row.isGenStoreNotice=='' && scope.row.templateType ==='0' "
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     :loading="noticeGening"
                     @click="handleGenNotice(scope.row)"
                     v-hasPermi="['place:import:genNotice']"
          >生成出库派车单
          </el-button>-->

          <el-button
            v-show="scope.row.isGenStoreNotice === 0 && scope.row.templateType ==='1' "
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['place:import:remove']"
          >删除
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-download"
            @click="handleDownload(scope.row)"
            v-hasPermi="['place:import:download']"
          >下载
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

    <!-- 添加或修改导入文件记录 对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <!--        <el-form-item label="收货单位" prop="createBy">-->
        <!--          <el-input v-model="form.createBy" placeholder="请输入收货单位" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="收货单位" prop="createTime">-->
        <!--          <el-date-picker clearable size="small" style="width: 200px"-->
        <!--            v-model="form.createTime"-->
        <!--            type="date"-->
        <!--            value-format="yyyy-MM-dd"-->
        <!--            placeholder="选择收货单位">-->
        <!--          </el-date-picker>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="收货单位" prop="remark">-->
        <!--          <el-input v-model="form.remark" placeholder="请输入收货单位" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="收货单位" prop="updateBy">-->
        <!--          <el-input v-model="form.updateBy" placeholder="请输入收货单位" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="收货单位" prop="updateTime">-->
        <!--          <el-date-picker clearable size="small" style="width: 200px"-->
        <!--            v-model="form.updateTime"-->
        <!--            type="date"-->
        <!--            value-format="yyyy-MM-dd"-->
        <!--            placeholder="选择收货单位">-->
        <!--          </el-date-picker>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="文件桶名称" prop="bucketName">-->
        <!--          <el-input v-model="form.bucketName" placeholder="请输入文件桶名称" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="文件名" prop="fileName">-->
        <!--          <el-input v-model="form.fileName" placeholder="请输入文件名" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="是否生成报关数据" prop="isGenReport">-->
        <!--          <el-input v-model="form.isGenReport" placeholder="请输入是否生成报关数据" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="是否生成出入库通知单" prop="isGenStoreNotice">-->
        <!--          <el-input v-model="form.isGenStoreNotice" placeholder="请输入是否生成出入库通知单" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="对象名称" prop="objectName">-->
        <!--          <el-input v-model="form.objectName" placeholder="请输入对象名称" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="文件路径" prop="path">-->
        <!--          <el-input v-model="form.path" placeholder="请输入文件路径" />-->
        <!--        </el-form-item>-->
        <!--                <el-form-item label="场所编号" prop="placeId">-->
        <!--                  <el-input v-model="form.placeId" placeholder="请输入场所编号" />-->
        <!--                </el-form-item>-->
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="模板类型" prop="templateType">
              <el-select v-model="form.templateType" placeholder="请选择模板类型">
                <el-option
                  v-for="type in importTypeDic"
                  :key="type.value"
                  :label="type.label"
                  :value="type.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="寄舱合同" prop="storeContractId">
              <el-select v-model="form.storeContractId" placeholder="请选择寄舱合同" @change="changeContract">
                <el-option
                  v-for="type in contractSubList"
                  :key="type.id"
                  :label="type.contractNo"
                  :value="type.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="寄舱客户" prop="storeCustomer">
              <!--<el-input v-model="form.storeCustomer" placeholder="请输入寄舱客户" disabled/>-->
              <el-select
                filterable
                clearable
                v-model="form.storeCustomer" placeholder="请选择寄舱客户" @change="changeCustomer">
                <el-option
                  v-for="type in customerList"
                  :key="type.customerName"
                  :label="type.customerName"
                  :value="type.customerName"
                />
              </el-select>
            </el-form-item>
            <!--              <el-select v-model="form.storeCustomer" placeholder="请选择寄舱客户">-->
            <!--                <el-option-->
            <!--                  v-for="type in contractList"-->
            <!--                  :key="type.id"-->
            <!--                  :label="type.customerName"-->
            <!--                  :value="type.customerName"-->
            <!--                />-->
            <!--              </el-select>-->
          </el-col>
          <el-col :span="12">
            <el-form-item label="库位号" prop="businessNo">
              <el-select v-model="form.businessNo" placeholder="请输入库位号">
                <el-option
                  v-for="type in storeIds"
                  :key="type.storeCode"
                  :label="type.storeCode"
                  :value="type.storeCode"
                />
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <!--        <el-row :gutter="10">-->
        <!--          <el-col :span="12">-->
        <!--        <el-form-item label=" 发货单位" prop="sendName">-->
        <!--          <el-input v-model="form.sendName" placeholder="请输入 发货单位" />-->
        <!--        </el-form-item>-->
        <!--          </el-col>-->
        <!--          <el-col :span="12">-->
        <!--        <el-form-item label="收货单位" prop="receiveName">-->
        <!--          <el-input v-model="form.receiveName" placeholder="请输入收货单位" />-->
        <!--        </el-form-item>-->
        <!--          </el-col>-->
        <!--        </el-row>-->

        <!--        <el-form-item label="文件长度" prop="fileLength">-->
        <!--          <el-input v-model="form.fileLength" placeholder="请输入文件长度" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="寄舱合同ID" prop="storeContractId">-->
        <!--          <el-input v-model="form.storeContractId" placeholder="请输入寄舱合同ID" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="结算合同ID" prop="settlementContractId">-->
        <!--          <el-input v-model="form.settlementContractId" placeholder="请输入结算合同ID" />-->
        <!--        </el-form-item>-->
        <el-row :gutter="10" style="text-align: center">
          <a href="#" type="text">模板下载</a>
          <el-upload
            class="upload-demo"
            ref="upload"
            :limit="1"
            accept=".xlsx,.xls,.xlsm"
            drag
            :action=uploadAction
            :headers="headers"
            :on-progress="uploadProcess"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="uploadBefore"
            :disabled="uploading"
            :file-list="fileList"
            :auto-upload="false">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击选择文件</em></div>
            <div class="el-upload__tip" slot="tip">只能上传xls/xlsx/xlsm文件
              <el-button
                size="mini"
                type="text"
                icon="el-icon-download"
                @click="templateDownload"
              >模板下载
              </el-button>
            </div>
          </el-upload>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listImport, getImport, delImport, addImport, updateImport} from "@/api/place/import";
import {getUserDepts} from "@/utils/charutils";
import {listStoreContract} from '@/api/place/storeContract'
import {getToken} from '@/utils/auth'
import {genNotice} from "@/api/place/import";

export default {
  name: "Import",
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
      // 导入文件记录 表格数据
      importList: [],
      //寄仓合同id
      storeContract: [],
      storeIds: [],
      importTypeDic: [
        {value: '1', label: '入库通知单'},
        {value: '0', label: '出库派车单'}
        /*{value: '2', label: '报关数据单'}*/
      ],

      contractList: [],
      nameList: [
        {"value": "金航保税库 Jinhang Bonded Warehouse"},
        {"value": "奥云陶勒盖 Oyu Tolgoi Limited"},
        {"value": "金航保税库"},
        {"value": "飞尚铜业"},
      ],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        bucketName: undefined,
        fileName: undefined,
        isGenReport: undefined,
        isGenStoreNotice: undefined,
        objectName: undefined,
        path: undefined,
        placeId: undefined,
        templateType: undefined,
        fileLength: undefined,
        storeContractId: undefined,
        storeCustomer: undefined,
        settlementContractId: undefined,
        settlementCustomer: undefined,
        businessNo: undefined,
        sendName: undefined,
        receiveName: undefined,
        orderByColumn: 'id',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        templateType: [
          {type: "string", required: true, message: "模板类型不能为空", trigger: "change"}
        ],
        businessNo: [
          {type: "string", required: true, message: "库位号不能为空", trigger: "change"}
        ],
        storeCustomer: [
          {type: "string", required: true, message: "寄舱客户不能为空", trigger: "change"}
        ],
        storeContractId: [
          {required: true, message: "寄舱合同不能为空", trigger: "change"}
        ],

      },
      uploadAction: process.env.VUE_APP_BASE_API + '/minio/files/place/upload',
      uploadData: {},
      uploading: false,

      headers: {
        'Authorization': '',
        'templateType': '',
        'placeId': '',
        'bucketName': ''
      },
      fileList: [],
      customerList: [],//寄舱客户列表
      contractSubList: [] //合同子集，在选定寄舱客户时，从合同表里取出对应客户的合同放入到这个集合中
    };
  },
  created() {
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.getList();
    }

    //查找合同
    /*listStoreContract({'placeId': this.queryParams.placeId}).then(response => {
      this.contractList = response.rows;
    });*/
  },
  methods: {
    /** 查询导入文件记录 列表 */
    getList() {
      this.loading = true;
      listImport(this.queryParams).then(response => {
        this.importList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      //this.$refs.upload.$refs['upload-inner'].fileList = []
      this.$refs.upload.clearFiles()
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        createBy: undefined,
        createTime: undefined,
        remark: undefined,
        updateBy: undefined,
        updateTime: undefined,
        bucketName: undefined,
        fileName: undefined,
        isGenReport: undefined,
        isGenStoreNotice: undefined,
        objectName: undefined,
        path: undefined,
        placeId: this.queryParams.placeId,
        templateType: undefined,
        fileLength: undefined,
        storeContractId: undefined,
        storeCustomer: undefined,
        settlementContractId: undefined,
        settlementCustomer: undefined,
        businessNo: undefined,
        sendName: undefined,
        receiveName: undefined
      };
      this.resetForm("form");
      this.contractSubList = []
      this.customerList = []
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
    /** 导入按钮操作 */
    handleAdd() {
      //if (this.queryParams.placeId == 134) {
      this.reset();
      this.open = true;
      this.title = "导入模板文件";
      this.getContract(this.queryParams.placeId, '1') //加载这个场所下的合同

      /*} else {
        this.$message.info("请选择嘉亿达监管场所,其他场所功能未实现")
      }*/

    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getImport(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改导入文件记录 ";
      });
    },

    uploadProcess() {
      this.uploading = true
    },
    // 合同id取寄仓场所
    changeContract(event) {
      this.storeIds = []
      this.form.businessNo = '' //库位号对应的表单项
      this.contractSubList.forEach(element => {
        if (element.id === event) {
          //将得到的企业属性赋值到应用的对象中
          //this.form.storeCustomer = element.customerName
          this.storeIds = element.params.contract;
          if (this.storeIds.length > 0) {

          } else {
            this.$message.warning("此合同没有指定库位")
          }
          // this.form.businessNo = element.storeIds
        }
      })
    },
    uploadBefore(file) {
      /*alert("要上传")
              console.log(file)
              if(!file){
                  this.$message.error('请选择要上传的文件22')
                  return false
      }*/
    },
    uploadSuccess(response) {
      if (response.code !== 200) {
        this.$message.error(response.msg)
        this.uploading = false
        return false
      }
      this.uploading = true
      this.$refs.upload.clearFiles()
      this.form.createTime = response.data.createTime
      this.form.bucketName = this.headers.bucketName
      this.form.fileName = response.data.name
      this.form.objectName = response.data.objectName
      this.form.placeId = this.queryParams.placeId
      this.form.fileLength = response.data.length

      addImport(this.form).then(response => {

        //console.log("上传111" + this.form)
        //console.log('上传数据')
        if (response.code === 200) {
          this.$message.success("上传成功")
          //this.msgSuccess("上传成功");
          this.uploading = false
          this.open = false;
          this.cancel()
          this.getList();
        } else {
          this.uploading = false
          console.log(response)
          this.msgError('创建记录失败')
        }
      }).catch(err => {
        this.uploading = false
      })
    },
    uploadError(err) {
      this.uploading = false
      console.log(err)
      this.$message.error('文件上传失败')
    },
    /** 提交上传按钮 */
    submitForm: function () {
      //console.log(this.fileList)
      //console.log(this.$refs.upload.$refs['upload-inner'].fileList)
      //console.log(this.$refs.upload.fileList)
      /*if (this.$refs.upload.fileList.length === 0) {
                  this.$message.error('请选择要上传的文件')
                  return
              }*/
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.$refs.upload.$refs['upload-inner'].fileList.length === 0) {
            this.$message.error('请选择要上传的文件')
            return false
          }
          this.uploading = true
          this.headers.Authorization = 'Bearer ' + getToken()
          this.headers.placeId = this.queryParams.placeId
          console.log('this.form.templateType=' + this.form.templateType)
          this.headers.templateType = this.form.templateType
          this.headers.bucketName = 'place'
          this.$refs.upload.submit();
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除导入文件记录 编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delImport(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/import/export', {
        ...this.queryParams
      }, `place_import.xlsx`)
    },
    //生成出入库通知单
    handleGenNotice(row) {
      this.$confirm('生成通知单前请确认文件格式正确无误?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        genNotice(row.id).then(response => {
          this.loading = false
          if (response.code === 200) {
            if (response.data === 1) {
              this.msgSuccess(response.msg);
              row.isGenStoreNotice = 1
            } else {
              this.$message.error(response.msg)
            }
            //row.isGenStoreNotice = 1
          } else {
            this.msgError("通知单生成失败");
          }
        }).catch(err => {
          this.loading = false
          //this.msgError("通知单生成失败");
          console.log("取消生成通知单")
        })
      }).catch((err) => {
        this.loading = false
        console.log("取消生成通知单")
      });
    },
    //获取场所下有效的合同 列表
    getContract(placeId, status) {
      //查找合同
      listStoreContract({'placeId': placeId, 'status': status}).then(response => {
        if (response.code === 200) {
          this.contractList = response.rows;
          if (this.contractList.length === 0) {
            this.$message.warning('此场所没有有效的合同')
          } else {
            //重新给客户列表 赋值
            this.customerList = []
            for (let contract of this.contractList) {
              if (!this.customerList.find(cus => cus.customerId === contract.customerId)) {
                this.customerList.push(contract)
              }
            }
          }
        }
      });
    },
    //下载
    handleDownload(row) {
      window.location.href = process.env.VUE_APP_BASE_API + '/minio/files/download?bucketName=' + row.bucketName + '&objectName=' + row.objectName
    },
    templateDownload() {
      window.location.href = process.env.VUE_APP_BASE_API + '/minio/files/download?bucketName=place&objectName=普通场所入库通知单模板.xlsx'
    },
    changeCustomer(event) { //改变客户时
      //从合同列表中，把对应公司名字的合同都提取出来
      this.form.storeContractId = ''
      this.form.businessNo = ''
      this.contractSubList = this.contractList.filter(item => item.customerName === event)
      //并将第一个值指给定合同编号的默认值
      /*if (this.contractSubList.length > 0) {
        this.form.storeContractId = this.contractSubList[0].id
      } else {
        this.form.storeContractId = ''
      }*/
    }
  }
};
</script>
