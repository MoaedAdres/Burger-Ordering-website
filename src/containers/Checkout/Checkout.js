import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from 'react-redux'
class CheckOut extends Component {
    // componentWillMount(){
    //     const query=new URLSearchParams(this.props.location.search);
    //     const ingredients={}
    //     let price=0
    //     for (let param of query.entries()){
    //         //['salad,1]
    //         if(param[0]==='price'){
    //             price=param[1]
    //         }
    //         else{
    //         ingredients[param[0]]=+param[1]
    //         }
    //     }
    //     this.setState({ingredients:ingredients,totalPrice:price})
    // }
    checkoutCancelHanlder = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
        this.props.history.push('/checkout/contact-data')
    }
    render() {
        let summary = (
            <Redirect to='/'></Redirect>
        )
        
        if (this.props.ings) {
            const purchasedRedirect=this.props.purchased ? <Redirect to='/'/> :null
            summary = (
                <div>
                {purchasedRedirect}

                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCanceld={this.checkoutCancelHanlder}
                        checkoutContinued={this.checkoutContinueHandler} />
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
        return summary
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}

export default connect(mapStateToProps)(CheckOut) 