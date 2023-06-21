
import _ from 'lodash';
import { REQUEST_TYPE } from '../constants';



const RequestTypeEnum = ({value}) => {
    return _.find(REQUEST_TYPE, {value}).label;
}



export const Enum = ({value, enumName}) => {

    switch(enumName) {
        case "REQUEST_TYPE":
            return RequestTypeEnum({value});
        default:
            return value;
    }

}