import {Input, Row, Col, Tag, Form } from 'antd';
import TableManagerRequest from '../../../api/table-manager/TableManagerRequest';
import WltStockOutManagerRequest from '../../../api/gc/wlt-stock-out/WltStockOutManagerRequest';
import EntityListTable from '../EntityListTable';
import I18NUtils from '../../../api/utils/I18NUtils';
import RefListField from '../../Field/RefListField';
import { i18NCode } from '../../../api/const/i18n';
import { SystemRefListName, RefTableName } from '../../../api/const/ConstDefine';
import RefTableField from '../../Field/RefTableField';
import "../../Form/QueryForm.scss";
import FormItem from 'antd/lib/form/FormItem';


/**
 * 出货标注表格
 */
export default class GcStockOutTagMLotUnitTable extends EntityListTable {

    static displayName = 'GcStockOutTagMLotUnitTable';
    
    /**
     * 重写此方法。因为当前的Table不是从props传递。
     */
    componentWillReceiveProps = (props) => {
        const {visible, materialLots} = props;
        let self = this;
        if (visible) {
            self.setState({
                data: materialLots
            })
            // let requestObject = {
            //     materialLots : materialLots,
            //     success: function(responseBody) {
            //         self.setState({
            //             data: responseBody.materialLotList
            //         })
            //     }
            // }
            // WltStockOutManagerRequest.sendGetStockOutTagMLotUnits(requestObject);
        } else {
            self.setState({
                data: [],
                selectedRows: [],
                selectedRowKeys: []
            })
        }
    }   

    getMaterialLotUnits = () => {
        const {visible, materialLots} = this.props;
        let self = this;
        if (visible) {
            self.setState({
                data: materialLots
            })
            // let requestObject = {
            //     materialLots : materialLots,
            //     success: function(responseBody) {
            //         self.setState({
            //             data: responseBody.materialLotList
            //         })
            //     }
            // }
            // WltStockOutManagerRequest.sendGetStockOutTagMLotUnits(requestObject);
        } else {

        }
    }

    componentDidMount = () => {
        const self = this;
        self.getMaterialLotUnits();
        let requestObject = {
            tableRrn: 79133,
            success: function(responseBody) {
                let table = responseBody.table;
                let columnData = self.buildColumn(table);
                self.setState({
                    table: table,
                    columns: columnData.columns,
                    scrollX: columnData.scrollX,
                    loading: false
                }); 
            }
        }
        TableManagerRequest.sendGetByRrnRequest(requestObject);
    }

    buildOperationColumn = () => {
        
    }
    
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createExpressInput());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createStatistic());
        tags.push(this.createTotalNumber());
        return tags;
    }

    createExpressInput = () => {
        return  <FormItem>
                    <Row gutter={24}>
                        <Col span={4} >
                            <span>{I18NUtils.getClientMessage(i18NCode.CustomerName)}:</span>
                        </Col>
                        <Col span={8}>
                            <Input ref={(input) => { this.input = input }} key="customerName" disabled={true}  value={this.props.vender} placeholder="客户简称" />
                            {/* <RefTableField ref={(customerName) => { this.customerName = customerName }} field = {{refTableName : RefTableName.CustomerNameList}} /> */}
                        </Col>
                        <Col span={4} >
                            <span>{I18NUtils.getClientMessage(i18NCode.StockOutType)}:</span>
                        </Col>
                        <Col span={8}>
                            <RefListField ref={(stockOutType) => { this.stockOutType = stockOutType }} referenceName={SystemRefListName.StockOutType} />
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4} >
                            <span>PO：</span>
                        </Col>
                        <Col span={8}>
                            <RefTableField ref={(poId) => { this.poId = poId }} field = {{refTableName : RefTableName.POIdList}} />
                        </Col>
                        <Col span={4} >
                            <span>{I18NUtils.getClientMessage(i18NCode.PoName)}:</span>
                        </Col>
                        <Col span={8}>
                            <Input ref={(PoName) => { this.PoName = PoName }} key="PoName"  placeholder="Po名称" />
                        </Col>
                    </Row>
                </FormItem>
    }

    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}:{count}</Tag>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}:{this.state.data.length}</Tag>
    }
}
