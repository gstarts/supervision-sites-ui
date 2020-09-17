<template>
  <div class="app-container">
    <!-- 按钮组 -->
    <div class="mb20">
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="headHandleAdd">打印</el-button>
      <el-button type="success" icon="el-icon-edit" size="mini" @click="handleAdd">暂存</el-button>
      <el-button type="success" icon="el-icon-edit" size="mini" @click="generateAdd">生成</el-button>
    </div>
    <el-row :gutter="10">
      <el-col :span="15">
        <el-card class="mb20">
          <el-form :model="form" ref="form" :rules="rules" label-width="160px">
            <el-row type="flex">
              <el-col :span="12">
                <el-form-item label="发货单位" prop="deliveryUnit">
                  <el-input v-model="form.deliveryUnit" placeholder="请输入发货单位" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="车号" prop="plateNum">
                  <el-input v-model="form.plateNum" placeholder="请输入车号" clearable></el-input>
                  <!-- <el-select v-model="form.plateNum" placeholder="请选择车号" prop="plateNum" filterable @change="CarNumberChange">
                    <el-option
                      v-for="dict in stationViaTypeOptions"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                    ></el-option>
                  </el-select> -->
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex">
              <el-col :span="12">
                <el-form-item label="收货单位" prop="receivingUnit">
                  <el-input v-model="form.receivingUnit" placeholder="请输入收货单位" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="毛重" prop="grossWeight">
                  <el-input
                    v-model.number="form.grossWeight"
                    placeholder="请输入毛重"
                    clearable
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex">
              <el-col :span="12">
                <el-form-item label="货物名称" prop="goodsName">
                  <el-input v-model="form.goodsName" placeholder="请输入货物名称" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="皮重" prop="tare">
                  <el-input v-model.number="form.tare" placeholder="请输入皮重" clearable disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex">
              <el-col :span="12">
                <el-form-item label="规格型号" prop="specification">
                  <el-input v-model="form.specification" placeholder="请输入规格型号" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="净重" prop="netWeight">
                  <el-input v-model.number="form.netWeight" placeholder="请输入净重" clearable disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex">
              <el-col :span="24">
                <el-form-item label="备注" prop="remark">
                  <el-input v-model="form.remark" placeholder="请输入备注" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card>
          <el-form :model="form" ref="form" :rules="ruless" label-width="80px" class="mb20">
            <input
              class="Pound"
              v-if="this.stable === 1"
              style="color:green"
              v-model="this.Poundweight"
              disabled
            />
            <input class="Pound" v-else style="color:red" v-model="this.Poundweight" disabled />
            <el-form-item label="流向">
              <el-select v-model="PoundForm.flowDirection" placeholder="请选择流向" prop="flowDirection">
                <el-option
                  v-for="dict in flowDirectionOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="通道号" prop="ChannelNumber">
              <el-select
                filterable
                v-model="PoundForm.ChannelNumber"
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
            <!-- -->
            <el-form-item label="车辆类型" prop="stationViaType">
              <el-select filterable v-model="PoundForm.stationViaType" placeholder="请选择车辆类型">
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
      <el-table :data="sheetList">
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
      />
    </el-card>
  </div>
</template>

<script>
import { addSheet, updateSheet } from "@/api/pound/poundlist";
import { genTimeCode } from "@/utils/common";
//获取实时重量
import { poundSelect } from "@/api/pound/poundlist";
import { listChnlConfig } from "@/api/basis/chnlConfig";
import { getUserDepts } from "@/utils/charutils";
export default {
  name: "Client",
  data() {
    return {
      //稳定标识
      stable: undefined,
      //地磅返回重量
      Poundweight: 0,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 通道配置表格数据
      chnlConfigList: [],
      //List统计列表
      sheetList: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 终端表格数据
      clientList: [],
      // 流向
      flowDirectionOptions: [],
      //过卡车辆类型
      stationViaTypeOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        clientId: undefined,
      },
      // 是否新增
      isAdd: false,
      // 地磅数值
      form: {
        //车号
        plateNum: undefined,
        //末检时间
        finalInspectionTime: undefined,
        time: undefined,
        stringTime: undefined,
        //皮重
        tare: undefined,
        //毛重
        grossWeight: undefined,
        //净重
        netWeight: undefined,
      },
      //通道配置
      PoundForm: {
        //流向
        flowDirection: undefined,
        //通道号
        ChannelNumber: undefined,
        //过卡车辆类型
        stationViaType: undefined,
      },
      // 重量类型效验
      rules: {
        grossWeight: [{ type: "number", message: "请输入数字" }],
        tare: [{ type: "number", message: "请输入数字" }],
        netWeight: [{ type: "number", message: "请输入数字" }],
      },
      ruless: {
        flowDirection: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  created() {
    //过卡车辆类型
    this.getDicts("station_via_type").then((response) => {
      this.stationViaTypeOptions = response.data;
    });
    /**流向  */
    this.getDicts("station_IO_flag").then((response) => {
      this.flowDirectionOptions = response.data;
    });
    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts("0");
    if (this.depts.length > 0) {
      this.queryParams.stationId = this.depts[0].deptId;
      this.created();
    }
  },
  methods: {
    // 打印按钮
    headHandleAdd() {
      this.reset();
    },
    /** 查询通道配置列表 */
    created() {
      listChnlConfig(this.queryParams).then((response) => {
        this.chnlConfigList = response.rows;
        this.total = response.total;
      });
    },
    //选择通道号定时反添重量方法
    ChannelNumberChange(event) {
      this.timer = setInterval(() => {
        poundSelect(event).then((response) => {
          this.Poundweight = response.data.weight;
          this.stable = response.data.stable;
        });
      }, 1000);
      //离开当前页面定时器停止
      this.$once("hook:beforeDestroy", () => {
        clearInterval(this.timer);
      });
    },
    /** 提交按钮 */
    handleAdd: function () {
      this.form.finalInspectionTime = genTimeCode(
        new Date(),
        "YYYY-MM-DD HH:mm:ss"
      );
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            updateSheet(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.reset();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addSheet(this.form).then((response) => {
              console.log(JSON.stringify(this.form));
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.reset();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    // 生成按钮
    generateAdd() {
      //进场
      if (this.stable == "1") {
        if (this.PoundForm.flowDirection == "I") {
          //重进空出 进场
          if (
            this.PoundForm.stationViaType == "01" ||
            this.PoundForm.stationViaType == "02"
          ) {
            //通过车辆类型 赋值毛重或皮重
            this.PoundForm.stationViaType == "01"
              ? (this.form.grossWeight = this.Poundweight)
              : (this.form.tare = this.Poundweight);
          } else {
            this.msgError("车辆类型不可为空或选择错误,请检查");
          }
          //出场
        } else if (this.PoundForm.flowDirection == "E") {
          //重进空出 出场
          if (this.PoundForm.stationViaType == "01") {
            //皮重
            this.form.tare = this.Poundweight;
            //计算净重
            this.form.netWeight = this.form.grossWeight - this.form.tare;
            //空进重出 出场
          } else if (this.PoundForm.stationViaType == "02") {
            //毛重
            this.form.grossWeight = this.Poundweight;
            //计算净重
            this.form.netWeight = this.form.grossWeight - this.form.tare;
          } else {
            this.msgError("车辆类型不可为空或选择错误,请检查");
          }
        } else {
          this.msgError("流向不可为空,请选择");
        }
      } else {
        this.msgError("地磅数值未稳定,请稍候....");
      }
    },
    // 取消按钮
    cancel() {
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        finalInspectionTime: undefined,
        time: undefined,
        stringTime: undefined,
        tare: undefined,
        grossWeight: undefined,
        netWeight: undefined,
      };
      this.resetForm("form");
    },
  },
};
</script>
<style scoped>
.el-select {
  width: 100%;
}
.Pound {
  font-size: 40px;
  width: 50%;
  color: red;
  margin-bottom: 15px;
  text-align: center;
  padding: 50px;
}
</style>