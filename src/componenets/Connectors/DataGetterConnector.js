import {connect} from 'react-redux' ;
import {withRouter} from 'react-router-dom' ;
import { getData } from "../../data/actionCreator";
import { DataGetterWrapper } from "./DataGetterWraper";

export const DataGetterConnector = (dataType , PresentedComponent) => {

    const mapStateToProps = ds => ({
        is_loading : typeof(ds[`${dataType}_loading`]) === "undefined" ? true :
                            ds[`${dataType}_loading`] ,
        data : ds[dataType] ,
        params : ds[`${dataType}_params`] ,
        limit : ds[`${dataType}_limit`] ,
    });

    const mapDispatchToProps = dispatch => ({
        getData : (type , params) => dispatch(getData(type , params))
    }) ;

    return withRouter(connect(mapStateToProps,
            mapDispatchToProps)(DataGetterWrapper(dataType , PresentedComponent))) ;
}