import EntityDialog from '@components/framework/dialog/EntityDialog';
import QuestionRequest from '@api/question-manager/QuestionRequest';

export default class QuestionForm extends EntityDialog {

    static displayName = 'QuestionForm';

    handleSave = (formObject) => {
        var self = this;
        // 默认处理的saveEntity
        let object = {
            values: formObject,
            tableRrn: this.props.table.objectRrn,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.question);
                }
            }
        };
        QuestionRequest.sendMergeRequest(object);
    }

}


