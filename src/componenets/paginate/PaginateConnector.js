import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { setPageSize } from "../../data/actionCreator";


export const PaginateConnector = (dataType , PresentedComponent) => {
    const mapStateToProps = ds => ({
        limit : ds[`${dataType}_limit`] ,
        total : ds[`${dataType}_total`] ,
        loading : typeof(ds[`${dataType}_loading`]) === "undefined" ? 
                                true : ds[`${dataType}_loading`]
    });

    const mapDispatchToProps = dispatch => ({
        setPageSize : (newSize) => dispatch(setPageSize(newSize))
    });

    const mergeProps = (ds , functions , ownProps) => {
        const section = ownProps.match.params.section ;
        const page = ownProps.match.params.page ;

        const functionProps = {
            setPageSize : (newSize) => {
                functions.setPageSize(newSize) ;
                ownProps.history.push(`/${section}/1`) ;
            },
            navTo : (page) => ownProps.history.push(`/${section}/${page}`)
        };

        const props = {
            currentPage : page ,
            pageCount : Math.ceil(Number(ds.total) / Number(ds.limit)),
            limit : Number(ds.limit) ,
            loading : ds.loading 
        };

        return Object.assign({} , props , functionProps , ownProps)
    }

    return withRouter(connect(mapStateToProps ,
                        mapDispatchToProps , mergeProps)(PresentedComponent)) ;

}