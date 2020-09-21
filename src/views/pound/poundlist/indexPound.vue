<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="submitForm"
          v-hasPermi="['measurement:sheet:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['measurement:sheet:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" icon="el-icon-refresh-right" size="mini" @click="cancel">重置</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" class="fa fa-print" size="mini" v-print="'#dayin'" @click="print">打印</el-button>
      </el-col>
    </el-row>
    <el-card class="mb20">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="small">
        <!-- 左侧开始 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="发货单位" prop="deliveryUnit">
              <el-input v-model="form.deliveryUnit" placeholder="请输入发货单位" :class="{inputtte :ysl}" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="车牌号" prop="plateNum">
              <el-input v-model="form.plateNum" placeholder="请输入车牌号" />
            </el-form-item>
          </el-col>
          <!-- 蒙文键盘 -->
          <el-col :span="1">
            <el-popover placement="right" width="500" trigger="click">
              <SimpleKeyboard @onChange="onChange" :input="form.plateNum" />
              <el-button slot="reference" class="fa fa-keyboard-o" size="mini"></el-button>
            </el-popover>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货物名称" prop="specification">
              <el-input v-model="form.specification" placeholder="请输入货物名称" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="收货单位" prop="receivingUnit">
              <el-input v-model="form.receivingUnit" placeholder="请输收货单位" />
            </el-form-item>
          </el-col>
          <!-- 左侧结束 -->
        </el-row>
        <el-row>
          <!-- 右侧开始 -->
          <el-col :span="6">
            <el-form-item label="毛重" prop="grossWeight">
              <el-input v-model="form.grossWeight" placeholder="系统反填" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="皮重" prop="tare">
              <el-input v-model="form.tare" placeholder="请输入皮重" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="箱皮重" prop="NetTareWeight">
              <el-input v-model="form.NetTareWeight" placeholder="请输入箱皮重" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="净重" prop="netWeight">
              <el-input v-model="form.netWeight" placeholder="请输入净重" />
            </el-form-item>
          </el-col>
          <!-- 右侧结束 -->
        </el-row>
        <!-- 底部三个 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="箱 号" prop="CaseNumber">
              <el-input v-model="form.CaseNumber" placeholder="请输入箱号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通 道 号" prop="ChannelNumber">
              <el-select
                v-model="form.ChannelNumber"
                placeholder="请选择通道号"
                @change="ChannelNumberChange"
              >
                <el-option
                  v-for="dept in chnlConfigList"
                  :key="dept.cChnlNo"
                  :label="dept.cChnlName"
                  :value="dept.cChnlNo"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="提煤单号" prop="CoalMentionNumber">
              <el-input v-model="form.CoalMentionNumber" placeholder="请输入提煤单号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="Remarks">
              <el-input v-model="form.Remarks" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
     
      <!-- 底部结束 -->

      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="cancel"
          v-hasPermi="['measurement:sheet:export']"
        >导出</el-button>
      </el-col>-->

      <el-table :data="sheetList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="计量员" align="center" prop="id" />
        <el-table-column label="末检时间" align="center" prop="finalInspectionTime" />
        <el-table-column label="计量号" align="center" prop="measurementNum" />
        <el-table-column label="车牌号" align="center" prop="plateNum" />
        <el-table-column label="货物名称" align="center" prop="goodsName" />
        <el-table-column label="规格" align="center" prop="specification" />
        <el-table-column label="承运人" align="center" prop="carrier" />
        <el-table-column label="皮重" align="center" prop="tare" />
        <el-table-column label="毛重" align="center" prop="grossWeight" />
        <el-table-column label="净重" align="center" prop="netWeight" />
        <el-table-column label="供货单位" align="center" prop="deliveryUnit" />
        <el-table-column label="收货单位" align="center" prop="receivingUnit" />
        <el-table-column label="流向" align="center" prop="flowDirection" />
        <el-table-column label="计量员" align="center" prop="measurer" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['measurement:sheet:edit']"
            >修改</el-button>
            <el-button size="mini" type="text" icon="el-icon-edit" @click="preview(scope.row)">预览</el-button>
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

      <!-- 添加或修改计量单对话框 -->
      <el-dialog :title="title" :visible.sync="open" width="500px">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="末检时间" prop="finalInspectionTime">
                <el-input v-model="form.finalInspectionTime" placeholder="请输入末检时间" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="计量号" prop="measurementNum">
                <el-input v-model="form.measurementNum" placeholder="请输入计量号" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="车牌号" prop="plateNum">
                <el-input v-model="form.plateNum" placeholder="请输入车牌号" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="货物名称" prop="goodsName">
                <el-input v-model="form.goodsName" placeholder="请输入货物名称" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="规格" prop="specification">
                <el-input v-model="form.specification" placeholder="请输入规格" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="承运人" prop="carrier">
                <el-input v-model="form.carrier" placeholder="请输入承运人" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="皮重" prop="tare">
                <el-input v-model="form.tare" placeholder="请输入皮重" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="毛重" prop="grossWeight">
                <el-input v-model="form.grossWeight" placeholder="请输入毛重" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="净重" prop="netWeight">
                <el-input v-model="form.netWeight" placeholder="请输入净重" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="供货单位" prop="deliveryUnit">
                <el-input v-model="form.deliveryUnit" placeholder="请输入供货单位" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="收货单位" prop="receivingUnit">
                <el-input v-model="form.receivingUnit" placeholder="请输入收货单位" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="流向" prop="flowDirection">
                <el-input v-model="form.flowDirection" placeholder="请输入流向" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="计量员" prop="measurer">
            <el-input v-model="form.measurer" placeholder="请输入计量员" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>
    </el-card>
     <div id="dayin" v-show="Explicit ">
        <div id="test">
          <span class="area-in-style">{{nowData}}</span>
        </div>
        <div id="test1">
          <span>{{nowTime}}</span>
        </div>
        <div id="area-style">
          <span class="area-in-style">{{form.deliveryUnit}}</span>
        </div>
        <div id="area-right-style">
          <span>{{form.grossWeight}}</span>
        </div>
        <br />
        <div id="area-style">
          <span class="area-in-style">{{form.receivingUnit}}</span>
        </div>
        <div id="area-right-style">
          <span>{{form.tare}}</span>
        </div>
        <div id="area-style">
          <span class="area-in-style">{{form.specification}}</span>
        </div>
        <div id="area-right-style">
          <span>{{form.NetTareWeight}}</span>
          <br />
        </div>
        <div id="area-style">
          <span class="area-in-style">{{form.plateNum}}</span>
        </div>
        <div id="area-right-style">
          <span>{{form.netWeight}}</span>
          <br />
        </div>
        <div id="area-all-style">
          <span class="area-in-style">{{form.CaseNumber}}</span>
          <br />
        </div>
        <div id="area-all-style">
          <span class="area-in-style">{{form.CoalMentionNumber}}</span>
          <br />
        </div>
        <div id="area-all-style">
          <span class="area-in-style">{{form.Remarks}}</span>
          <br />
        </div>
      </div>
  </div>
</template>

<script>
import {
  listSheet,
  getSheet,
  delSheet,
  addSheet,
  updateSheet,
  exportSheet,
} from "@/api/pound/poundlist";
import SimpleKeyboard from "@/components/SimpleKeyboard/SimpleKeyboard";
import printTemplate from "print-template";
import { listChnlConfig } from "@/api/basis/chnlConfig";
import { getUserDepts } from "@/utils/charutils";
import { poundSelect } from "@/api/pound/poundlist";
export default {
  name: "Sheet",
  components: {
    SimpleKeyboard,
  },
  data() {
    return {
      name: { type: "text", x: 8, y: 45, fontSize: 3.5 },
      code: {
        type: "barcode",
        x: 7,
        y: 13,
        format: "CODE128A",
        width: 4,
        margin: 0,
        fontSize: 3.3,
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 通道配置表格数据
      chnlConfigList: [],
      // 非单个禁用
      single: true,
      timer: "",
      ysl: false,
      nowTime: "",
      nowData: "",
      // 非多个禁用
      multiple: true,
      //磅单隐藏域显示隐藏
      Explicit: false,
      // 总条数
      total: 0,
      // 计量单表格数据
      sheetList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //重量
      Poundweight: undefined,
      //
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        finalInspectionTime: undefined,
        measurementNum: undefined,
        plateNum: undefined,
        goodsName: undefined,

        specification: undefined,
        carrier: undefined,
        tare: undefined,
        grossWeight: undefined,
        netWeight: undefined,
        deliveryUnit: undefined,
        receivingUnit: undefined,
        flowDirection: undefined,
        measurer: undefined,
      },
      // 表单参数
      form: {
        plateNum: undefined,
        NetTareWeight: undefined,
        CaseNumber: undefined,
        CoalMentionNumber: undefined,
        Remarks: undefined,
        grossWeight: undefined,
        //通道号
        ChannelNumber: undefined,
      },
      // 表单校验
      rules: {},
    };
  },
  created() {
    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts("0");
    if (this.depts.length > 0) {
      this.queryParams.stationId = this.depts[0].deptId;
      this.created();
    }
    this.getList();
  },
  methods: {
    /** 查询通道配置列表 */
    created() {
      listChnlConfig(this.queryParams).then((response) => {
        this.chnlConfigList = response.rows;
        this.total = response.total;
      });
    },
    //下拉选 选择定时反添重量方法
    ChannelNumberChange(event) {
      this.timer = setInterval(() => {
        poundSelect(event).then((response) => {
          this.Poundweight = response.data.weight;
          if (this.Poundweight && this.Poundweight > 0) {
            this.form.grossWeight = this.Poundweight;
          } else {
            this.form.grossWeight = 0;
          }
        });
      }, 1000);
    },
    /** 查询计量单列表 */
    getList() {
      this.loading = true;
      listSheet(this.queryParams).then((response) => {
        this.sheetList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 关闭弹窗/清空表头
    cancel() {
      this.reset();
      this.open = false;
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        finalInspectionTime: undefined,
        measurementNum: undefined,
        plateNum: undefined,
        goodsName: undefined,
        NetTareWeight: undefined,
        specification: undefined,
        carrier: undefined,
        tare: undefined,
        grossWeight: undefined,
        netWeight: undefined,
        deliveryUnit: undefined,
        receivingUnit: undefined,
        flowDirection: undefined,
        measurer: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        ChannelNumber: this.Poundweight,
      };
      this.nowTime = "";
      this.nowData = "";
      // this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      // this.resetForm("queryForm");
      // this.handleQuery();
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
      this.title = "添加计量单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getSheet(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改计量单";
      });
    },
    preview(row) {
      const id = row.id || this.ids;
      getSheet(id).then((response) => {
        this.form = response.data;
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            updateSheet(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
                this.cancel();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addSheet(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
                this.cancel();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除计量单编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delSheet(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function () {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有计量单数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportSheet(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(function () {});
    },
    onChange(input) {
      this.form.plateNum = input;
    },
    //打印功能
    print() {
      this.print1();
      clearTimeout(this.timer); //清除延迟执行
      this.timer = setTimeout(() => {
        //设置延迟执行
        this.reset();
      }, 5000);
    },
    print1() {
      this.Explicit = true;
      var aData = new Date();
      this.nowData =
        aData.getFullYear() +
        "-" +
        (aData.getMonth() + 1) +
        "-" +
        aData.getDate();
      this.nowTime =
        aData.getHours() + ":" + aData.getMinutes() + ":" + aData.getSeconds();
    },
  },
  //销毁前清除定时器
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>



<style lang="scss" scoped>
.el-select {
  width: 100%;
}

// .textarea {
//   margin-left:3cm ;
//   margin-top: 2.5cm;
//   font-size:20px ;
// }
// .textarea1 {
//   margin-left:8cm ;
//   margin-top: 2.5cm;
//   font-size:20px ;
// }
// .textarea2 {
//   margin-left:3cm ;
//   margin-top: -20px;
//   font-size:20px ;
// }

// .inputtte .el-input__inner{
//   border: none;

// }

@page{
		margin: 8mm; 		
    }

#dayin {
  height: 400px;
  width: 800px;
}

#test {
  width: 300px;
  height: 40px;

  float: left;
}

#test1 {
  width: 300px;
  height: 40px;

  float: left;
}
#area-style {
  width: 480px;
  height: 40px;
  font-size: 20px;

  float: left;
}
#area-right-style {
  height: 40px;
  width: 300px;
  font-size: 20px;
  margin-top: 0px;

  float: right;
}

#area-all-style {
  width: 800px;
  height: 40px;
  font-size: 20px;
  // border: 1px solid;
  float: left;
}

.area-in-style {
  padding-left: 3cm;
}
</style>
