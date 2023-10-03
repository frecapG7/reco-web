
import _ from 'lodash';
import { DURATION, REQUEST_TYPE } from '../constants';



const RequestTypeEnum = (value) => {
    return _.find(REQUEST_TYPE, {value})?.label;
}

const DurationEnum = (value) => {
    return _.find(DURATION, {value})?.label;
}



export const Enum = ({value, enumName}) => {

    switch(enumName) {
        case "REQUEST_TYPE":
            return RequestTypeEnum(value);
        case "DURATION":
            return DurationEnum(value)
        default:
            return value;
    }

}