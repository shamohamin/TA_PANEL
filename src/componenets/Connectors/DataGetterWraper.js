import React from 'react'

export const DataGetterWrapper = (dataType , PresentedComponent) => {
    return class extends React.Component {

        componentDidMount = () => this.getReuqest() ;

        componentDidUpdate = () => this.getReuqest() ;

        getReuqest = () => {

            const dsData = this.props.params || {} ;
            const params = {
                page :  Number(this.props.match.params.page) || 1,
                limit : Number(this.props.limit) || 5 ,
            };
            console.log(params)
            if(Object.keys(params).find(key => params[key] !== dsData[key])){
                this.props.getData(dataType , params) ;
            }

        }

        render(){
            return <PresentedComponent {...this.props} />
        }

    }
}