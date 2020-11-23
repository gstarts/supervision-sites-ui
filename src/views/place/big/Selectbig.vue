<template>
  <div class="app-container">
    <el-row class="mb8">
      <el-button type="primary" v-hasPermi="['place:big:edit']" @click="updateBigForm" :disabled="form.status==='1'">执行完毕</el-button>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="14">
        <el-card class="mb20">
          <el-row>
            <el-form :model="queryParams" ref="queryForm" label-width="85px">
              <el-row>
                <el-form
                  ref="form"
                  :model="form"
                  :rules="rules"
                  label-width="120px"
                >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="提煤单号:" prop="coalBillNo">
                        <!-- <el-input
                          v-model="form.coalBillNo"
                          placeholder="请输入提煤单号"
                        /> -->
                        <span>{{ form.coalBillNo }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="合同编号:" prop="contractNo">
                        <!-- <el-input
                          v-model="form.contractNo"
                          placeholder="请输入合同编号"
                        /> -->
                        <span>{{ form.contractNo }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="提煤总量:" prop="coalWeight">
                        <!-- <el-input
                          v-model="form.coalWeight"
                          placeholder="请输入提煤重量"
                        /> -->
                        <span>{{ form.coalWeight }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="货物名称:" prop="goodsName">
                        <!-- <el-input
                          v-model="form.goodsName"
                          placeholder="请输入货物名称"
                        /> -->
                        <span>{{ form.goodsName }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="寄仓客户:" prop="customerName">
                        <!-- <el-input
                          v-model="form.customerName"
                          placeholder="请输入客户名称"
                        /> -->
                        <span>{{ form.customerName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="收货单位:" prop="receiveName">
                        <!-- <el-input
                          v-model="form.receiveName"
                          placeholder="请输入收货单位"
                        /> -->
                        <span>{{ form.receiveName }}</span>
                      </el-form-item>
                    </el-col>

                  </el-row>
                </el-form>
              </el-row>
            </el-form>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="mb20">
          <el-form
            :model="parameterForm"
            ref="parameterForm"
            label-width="85px"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="已提重量:"
                  prop="mentionedWeight"
                >
                  <!-- <el-input
                    v-model="parameterForm.mentionedWeight"
                    placeholder="请输入已提重量"
                    disabled
                  /> -->
                  <span>{{ parameterForm.mentionedWeight }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="未提重量:"
                  prop="notMentionedWeight"
                >
                  <!-- <el-input
                    v-model="parameterForm.notMentionedWeight"
                    placeholder="请输入未提重量"
                    disabled
                  /> -->
                  <span>{{ parameterForm.notMentionedWeight }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="有效车数:" prop="parameterForm.effective">
                  <!-- <el-input
                    v-model="parameterForm.effective"
                    placeholder="请输入有效车数"
                    disabled
                  /> -->
                  <span>{{ parameterForm.effective }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="已提车数:" prop="mentioned">
                  <!-- <el-input
                    v-model="parameterForm.mentioned"
                    placeholder="请输入已提车数"
                    disabled
                  /> -->
                  <span>{{ parameterForm.mentioned }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="未提车数"
                  prop="notMentioned"
                >
                  <!-- <el-input
                    v-model="parameterForm.notMentioned"
                    placeholder="请输入未提车数"
                    disabled
                  /> -->
                  <span>{{ parameterForm.notMentioned }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="作废车数" prop="void">
                  <!-- <el-input
                    v-model="parameterForm.void"
                    placeholder="请输入作废车数"
                    disabled
                  /> -->
                  <span>{{ parameterForm.void }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <!--    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">-->
    <!--      <el-form-item label="提煤单号" prop="coalBillNo">-->
    <!--        <el-input-->
    <!--          v-model="queryParams.coalBillNo"-->
    <!--          placeholder="请输入提煤单号"-->
    <!--          clearable-->
    <!--          size="small"-->
    <!--          @keyup.enter.native="handleQuery"-->
    <!--        />-->
    <!--      </el-form-item>-->
    <!--      <el-form-item label="合同编号" prop="contractNo">-->
    <!--        <el-input-->
    <!--          v-model="queryParams.contractNo"-->
    <!--          placeholder="请输入合同编号"-->
    <!--          clearable-->
    <!--          size="small"-->
    <!--          @keyup.enter.native="handleQuery"-->
    <!--        />-->
    <!--      </el-form-item>-->
    <!-- <el-form-item label="提煤重量" prop="coalWeight">
      <el-input
        v-model="queryParams.coalWeight"
        placeholder="请输入提煤重量"
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
    <el-form-item label="收货单位" prop="receiveName">
      <el-input
        v-model="queryParams.receiveName"
        placeholder="请输入收货单位"
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
    <el-form-item label="乐观锁" prop="revision">
      <el-input
        v-model="queryParams.revision"
        placeholder="请输入乐观锁"
        clearable
        size="small"
        @keyup.enter.native="handleQuery"
      />
    </el-form-item> -->
    <!--      <el-form-item>-->
    <!--        <el-button-->
    <!--          type="primary"-->
    <!--          icon="el-icon-search"-->
    <!--          size="mini"-->
    <!--          @click="handleQuery"-->
    <!--        >搜索</el-button-->
    <!--        >-->
    <!--        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"-->
    <!--        >重置</el-button-->
    <!--        >-->
    <!--      </el-form-item>-->
    <!--    </el-form>-->

    <!--<el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          :disabled="single"
          v-hasPermi="['place:big:add']"
          >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['place:big:edit']"
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
          v-hasPermi="['place:big:remove']"
          >删除
        </el-button>
      </el-col>
       <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:big:export']"
        >导出</el-button>
      </el-col>
    </el-row>-->

    <el-table v-loading="loading" :data="bigList">
      <!--<el-table-column type="selection" width="55" align="center"/>-->
      <!-- <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="提煤单号" align="center" prop="coalBillNo"/>
      <el-table-column label="合同编号" align="center" prop="contractNo"/>
      <el-table-column label="提煤重量" align="center" prop="coalWeight"/>
      <el-table-column label="货物名称" align="center" prop="goodsName"/>
      <el-table-column label="收货单位" align="center" prop="receiveName"/>-->
      <el-table-column label="提煤单号" align="center" prop="docNo"/>
      <el-table-column label="车牌号" align="center" prop="vehicleNo"/>
      <el-table-column label="库位号" align="center" prop="storeCode"/>
      <el-table-column label="毛重" align="center" prop="roughWeight"/>
      <el-table-column label="皮重" align="center" prop="tareWeight"/>
      <el-table-column label="净重" align="center" prop="netWeight"/>
      <el-table-column label="车辆状态" align="center" prop="storeState" :formatter="CarStatusFormat"
      />
      <!--<el-table-column label="唯一编号" align="center" prop="sureId" />-->
      <!-- <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="乐观锁" align="center" prop="revision" /> -->
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="scope">
          <!--<el-button
            size="mini"
            type="text"
            icon="el-icon-detail"
            @click="detail(scope.row)"
            v-hasPermi="['place:head:query']"
            >详情
          </el-button>-->
          <el-button v-show="scope.row.storeState === '0' && form.status === '0'"
                     size="mini"
                     type="text"
                     icon="el-icon-warning"
                     @click="voidUpdate(scope.row)"
                     v-hasPermi="['place:big:void']">作废
          </el-button>
          <!-- <el-button
            type="text"
            icon="el-icon-plus"
            size="mini"
            @click="handleImport"
            v-hasPermi="['place:big:add']"
          >导入
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['place:big:edit']"
          >修改
          </el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['place:big:remove']"
          >删除
          </el-button
          > -->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改大提煤单 大提煤单对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="提煤单号" prop="coalBillNo">
              <el-input
                v-model="form.coalBillNo"
                placeholder="请输入提煤单号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同编号" prop="contractNo">
              <el-input
                v-model="form.contractNo"
                placeholder="请输入合同编号"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="提煤重量" prop="coalWeight">
              <el-input
                v-model="form.coalWeight"
                placeholder="请输入提煤重量"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货物名称" prop="goodsName">
              <el-input v-model="form.goodsName" placeholder="请输入货物名称"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="收货单位" prop="receiveName">
              <el-input
                v-model="form.receiveName"
                placeholder="请输入收货单位"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称" prop="customerName">
              <el-input
                v-model="form.customerName"
                placeholder="请输入客户名称"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改导入文件记录 对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="openImport"
      append-to-body
      width="500px"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="50px">
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-row :gutter="10" style="text-align: center">
          <el-upload
            class="upload-demo"
            ref="upload"
            :limit="1"
            accept=".xlsx,.xls,.xlsm"
            drag
            :action="uploadAction"
            :headers="headers"
            :on-progress="uploadProcess"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="uploadBefore"
            :disabled="uploading"
            :file-list="fileList"
            :auto-upload="false"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击选择文件</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传xls/xlsx/xlsm文件
            </div>
          </el-upload>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancelImport">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addBig, delBig, detailsBig, getBig, updateBig, updateVoidCar} from "@/api/place/big";
import {updateHead} from "@/api/place/head";
import {delImport} from "@/api/place/import";

export default {
  name: "Big",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 回执状态
      declearStatus: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 大提煤单 大提煤单表格数据
      bigList: [],
      // 通关单类型与车辆信息
      typeList: [
        {value: "0", label: "通关单信息"},
        {value: "1", label: "车辆信息"},
      ],
      // 车辆状态
      carStatus: [
        {dictValue: "0", dictLabel: "无效"},
        {dictValue: "1", dictLabel: "有效"},
      ],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层
      openImport: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        coalBillNo: undefined,
        contractNo: undefined,
        coalWeight: undefined,
        goodsName: undefined,
        receiveName: undefined,
        customerName: undefined,
        revision: undefined,
      },
      // 表单参数
      form: {},
      //计算参数
      // 表单校验
      parameterForm: {
        //已提重量
        mentionedWeight: 0,
        //未提
        notMentionedWeight: 0,
        //有效车数
        effective: 0,
        //已提车数
        mentioned: 0,
        //未提车数
        notMentioned: 0,
        //作废车数
        void: 0,
      },
      rules: {},
      uploadAction: process.env.VUE_APP_BASE_API + "/place/big",
      uploadData: {},
      uploading: false,
      fileList: [],
      headers: {},
    };
  },
  created() {
    // this.$forceUpdate()
    let {coalBillNo} = this.$route.query;
    console.log(coalBillNo)
    if (coalBillNo) {
      this.getBigInfo(coalBillNo)
    }
  },
  watch: {
    '$route': function (to, from) {
      //执行数据更新查询
      console.log(to)
      console.log(from)
      if (to.name === 'Big/Selectbig') {
        console.log('路由变了')
        let {coalBillNo} = this.$route.query;
        console.log(coalBillNo)
        if (coalBillNo) {
          this.getBigInfo(coalBillNo)
        }
      }

    }
  },
  mounted() {
    //debugger
    /** 放行状态字典 */
    this.getDicts("station_declear_status").then((response) => {
      this.declearStatus = response.data;
    });
    //this.getList();
    //console.log(this.$route.query)
    let {coalBillNo} = this.$route.query;
    console.log(coalBillNo)

  },
  methods: {
    /** 查询大提煤单 大提煤单列表 */
    getList() {
      this.loading = true;
      detailsBig(this.queryParams).then((response) => {
        this.form = response.data.head;
        this.bigList = response.data.body;
        // this.total = response.total;
        this.loading = false;
      });
    },
    // 导入取消按钮
    cancelImport() {
      this.openImport = false;
      this.reset();
    },
    /**详情按钮 */
    detail(row) {
      console.log(row);
      this.reset();
      const id = row.id || this.ids;
      this.$router.push({path: "/place/head", query: {tableId: id}});
    },
    updateBigForm(){
      this.updateForm(this.form)
    },

    // 执行完毕按钮
    updateForm(form) {
      //console.log(this.form)
      if (form.id != undefined && form.status === '0') {
        this.$confirm('确认此提煤单执行完毕?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          form.status = "1"
          //console.log('确定了222')
          updateBig(form).then((response) => {
            if (response.code === 200) {
              //console.log('确定了2221111')
              //this.msgSuccess("修改成功");
              //this.getList();
            }
          });
        }).then(() => {
          //console.log('确定了')
          this.form.status = "1"
          this.msgSuccess("执行成功");
        }).catch(function (e) {
          console.log(e)
          //this.form.status = "0"
          console.log('取消了')
        });
      }
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
        coalBillNo: undefined,
        contractNo: undefined,
        coalWeight: undefined,
        goodsName: undefined,
        receiveName: undefined,
        customerName: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        revision: undefined,
        type: undefined
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
      this.ids = selection.map((item) => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加大提煤单 大提煤单";
    },
    /** 作废状态更改 */
    voidUpdate(row) {
      if (row.id != undefined) {
        //row.status = "0";
        this.$confirm('确认要作废"' + row.vehicleNo + '"的数据?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          updateVoidCar(row).then((response) => {
            if (response.code === 200) {
              this.$message.success(response.msg);
              //this.getList();
              //row.storeState = '3'
            }
          })
        }).then(() => {
          this.msgSuccess("设置成功");
          row.storeState = '3'
          //有效车数
          //this.parameterForm.effective -= 1
          //已提车数
          //未提车数
          this.parameterForm.notMentioned -= 1
          //作废车数
          this.parameterForm.void += 1
        }).catch(function () {
          console.log('取消了')
          console.log(row)
        });
      }
    },
    /** 导入按钮操作 */
    handleImport() {
      this.reset();
      this.openImport = true;
      this.title = "导入模板文件";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getBig(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改大提煤单 大提煤单";
      });
    },
    // 回执状态翻译
    DeclearStatusFormat(row, column) {
      return this.selectDictLabel(this.declearStatus, row.feedback);
    },
    // 车辆状态翻译
    CarStatusFormat(row, column) {
      if (row.storeState === '0') return '未入场'
      if (row.storeState === '2') return '已入场'
      if (row.storeState === '1') return '已出库'
      if (row.storeState === '3') return '已作废'
      // return this.selectDictLabel(this.carStatus, row.status);
    },
    uploadProcess() {
      this.uploading = true;
    },
    uploadError(err) {
      this.uploading = false;
      console.log(err);
      this.$message.error("文件上传失败");
    },

    uploadSuccess(response) {
    },

    uploadBefore(file) {
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            updateBig(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addBig(this.form).then((response) => {
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
      this.$confirm(
        '是否确认删除大提煤单 大提煤单编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delBig(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function () {
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "place/big/export",
        {
          ...this.queryParams,
        },
        `place_big.xlsx`
      );
    },
    getBigInfo(coalBillNo) {
      this.loading = true;
      //将表头id 保存
      this.queryParams.coalBillNo = coalBillNo;
      // 获取表详细信息
      detailsBig(this.queryParams).then((response) => {
        this.form = response.data.head;
        this.bigList = response.data.body;
        //已提重量
        this.parameterForm.mentionedWeight = response.data.hasUse
        //未提
        this.parameterForm.notMentionedWeight = response.data.noUse
        //有效车数
        this.parameterForm.effective = response.data.validVehicleCount
        //已提车数
        this.parameterForm.mentioned = response.data.hasUseVehicleCount
        //未提车数
        this.parameterForm.notMentioned = response.data.noUseVehicleCount
        //作废车数
        this.parameterForm.void = response.data.badVehicleCount
        this.loading = false

      }).catch(err => {
        this.loading = false
      })
    },
  }
};
</script>
<style scoped>
.el-select .el-input {
  width: 100%;
}
</style>
