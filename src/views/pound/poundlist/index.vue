<template>
  <div class="app-container">
    <!-- 按钮组 -->
    <div class="mb20">
      <el-button type="success" icon="el-icon-edit" size="mini" @click="AllADD">暂存</el-button>
      <el-button type="success" icon="el-icon-edit" size="mini" @click="generateAdd">生成</el-button>

      <el-button type="primary" icon="el-icon-plus" size="mini" @click="headHandleAdd" v-if="this.form.netWeight == undefined" style="display:none" >打印</el-button>
      <el-button type="info" class="fa fa-print" size="mini" v-print="'#dayin'" @click="print" v-else>打印</el-button>

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
                  </el-select>-->
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
              <el-col :span="12">
                <el-form-item label="备注" prop="remark">
                  <el-input v-model="form.remark" placeholder="请输入备注" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="库位号" prop="LocationNumber">
                  <el-input v-model="form.LocationNumber" placeholder="请输入库位号" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card>
          <el-form :model="PoundForm" ref="PoundForm" :rules="ruless" label-width="80px" class="mb20">
            <input
              class="Pound"
              v-if="this.stable === 1"
              style="color:green"
              v-model="this.Poundweight"
              disabled
            />
            <input class="Pound" v-else style="color:red"  v-model="this.Poundweight" disabled />
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
        <el-table
        class="mb20"
        ref="sheetList"
        :data="sheetList"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="车号" align="center" prop="plateNum" />
        <el-table-column label="毛重" align="center" prop="grossWeight" />
        <el-table-column label="皮重" align="center" prop="tare" />
        <el-table-column label="净重" align="center" prop="netWeight" />
        <el-table-column label="库位号" align="center" prop="LocationNumber" />
        <el-table-column label="发货单位" align="center" prop="deliveryUnit" />
        <el-table-column label="收货单位" align="center" prop="receivingUnit" />
        <el-table-column label="货物名称" align="center" prop="goodsName" />
        <el-table-column label="规格型号" align="center" prop="specification" />
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
          <span>{{form.plateNum}}</span>
        </div>
        <br />
        <div id="area-style">
          <span class="area-in-style">{{form.receivingUnit}}</span>
        </div>
        <div id="area-right-style">
          <span>{{form.grossWeight}}</span>
        </div>
        <div id="area-style">
          <span class="area-in-style">{{form.goodsName}}</span>
        </div>
        <div id="area-right-style">
          <span>{{form.tare}}</span>
          <br />
        </div>
        <div id="area-style">
          <span class="area-in-style">{{form.specification}}</span>
        </div>
        <div id="area-right-style">
          <span>{{form.netWeight}}</span>
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
addSheet, 
updateSheet } from "@/api/pound/poundlist";
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
      //隐藏域
      Explicit:false,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      nowData:'',
      nowTime:'',
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
      // 地磅数据
      form: {
        //车号
        plateNum: undefined,
        //皮重
        tare: undefined,
        //毛重
        grossWeight: undefined,
        //净重
        netWeight: undefined,
        //库位号
        LocationNumber:undefined,
        //发货单位
        deliveryUnit:undefined,
        //收货单位
        receivingUnit:undefined,
        //货物名称
        goodsName:undefined,
        //规格型号
        specification:undefined,
        //备注
        remark:undefined,
        //通道号 (新增时 通过通道配置赋值)
        ChannelNumber:undefined,
        //更新时间
        updateTime:undefined,
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
        plateNum:[{ required: true, message: "不可为空", trigger: "blur" }],
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
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        poundSelect(event).then((response) => {
          console.log("进入反添重量方法");
          this.Poundweight = response.data.weight;
          this.stable = response.data.stable;
          console.log("后台返回内容:"+response.genTimeCode);
        });
      }, 1000);
      //离开当前页面定时器停止
      this.$once("hook:beforeDestroy", () => {
        clearInterval(this.timer);
      });
    },
    /** 暂存按钮 */
    AllADD(){
      //通道号赋值
      this.form.ChannelNumber=this.PoundForm.ChannelNumber;
      this.form.updateTime=genTimeCode(new Date(),"YYYY-MM-DD HH:mm:ss");
       this.$refs["form"].validate((valid) => {
         if(valid){
           if(this.PoundForm.flowDirection=="I"){
             //进场 新增
              addSheet(this.form).then((response) => {
                console.log(this.form);
             console.log("后台接口进入");
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.reset();
              } else {
                this.msgError(response.msg);
              }
            });
           }else if(this.PoundForm.flowDirection=="E"){
              //出场 修改
              this.msgError("功能待开发,请稍后...");
           }   
         }
      
       });
        // if(this.PoundForm.flowDirection=="I"){
        //     //调用后台接口 新增数据
        //      console.log(this.form);
        //      addSheet().then(response =>{
        //        this.msgSuccess("进入后台接口");
        //        console.log("进入后台接口");
        //        if(response === 200){
        //         this.msgSuccess("新增成功");
        //        }else{
        //          this.msgError(response.msg);
        //        }
        //      })
        //      console.log("我是进场");
        // }else if(this.PoundForm.flowDirection=="E"){
        //     //调用后台接口 新增数据
        //     console.log(this.form);
        //     console.log("我是出场");
        // }
            //清空地磅数据
            // this.reset();
    },
    // handleAdd: function () {
    //   this.form.finalInspectionTime = genTimeCode(
    //     new Date(),
    //     "YYYY-MM-DD HH:mm:ss"
    //   );
    //   this.$refs["form"].validate((valid) => {
    //     if (valid) {
    //       if (this.form.id != undefined) {
    //         updateSheet(this.form).then((response) => {
    //           if (response.code === 200) {
    //             this.msgSuccess("修改成功");
    //             this.reset();
    //           } else {
    //             this.msgError(response.msg);
    //           }
    //         });
    //       } else {
    //         addSheet(this.form).then((response) => {
    //           console.log(JSON.stringify(this.form));
    //           if (response.code === 200) {
    //             this.msgSuccess("新增成功");
    //             this.open = false;
    //             this.reset();
    //           } else {
    //             this.msgError(response.msg);
    //           }
    //         });
    //       }
    //     }
    //   });
    // },
    // 生成按钮
    generateAdd() {
      //进场
      if (this.stable == "1") {
        if (this.PoundForm.flowDirection == "I") {
          //重进空出 进场
          if ( this.PoundForm.stationViaType == "01" || this.PoundForm.stationViaType == "02" ) {
            //通过车辆类型 赋值毛重或皮重
            this.PoundForm.stationViaType == "01" ? (this.form.grossWeight = this.Poundweight) : (this.form.tare = this.Poundweight);
          } else {
            this.msgError("车辆类型不可为空或选择错误,请检查");
          }
          //出场
        } else if (this.PoundForm.flowDirection == "E") {
          //重进空出 出场
          if (this.PoundForm.stationViaType == "01") {
            //皮重
            this.form.tare = this.Poundweight;
            //判断出场时毛重是否未填写
            if (this.form.grossWeight >= 0) {
              //计算净重
              this.form.netWeight = this.form.grossWeight - this.form.tare;
            } else {
              this.msgError("净重计算失败,毛重不可为空");
            }
            //空进重出 出场
          } else if (this.PoundForm.stationViaType == "02") {
            //毛重
            this.form.grossWeight = this.Poundweight;
            //判断出场时皮重是否未填写
            if (this.form.tare >= 0) {
              //计算净重
              this.form.netWeight = this.form.grossWeight - this.form.tare;
            } else {
              this.msgError("净重计算失败,皮重不可为空");
            }
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
    //打印功能
    print() {
      this.print1();
      clearTimeout(this.timer); //清除延迟执行
      this.timer = setTimeout(() => {
        //设置延迟执行
        this.reset()
        this.nowData = '';
        this.nowTime = '';
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
    // 表单重置
    reset() {
      this.form = {
        tare: undefined,
        grossWeight: undefined,
        netWeight: undefined,
      };
      // this.resetForm("form");
    },
  },
};
</script>
<style scoped>
.el-select {
  width: 100%;
}
.Pound {
  font-size: 60px;
  width: 100%;
  color: red;
  margin-bottom: 15px;
  text-align: center;
  padding: 15px;
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
  float: left;
}

.area-in-style {
  padding-left: 3cm;
}
</style>