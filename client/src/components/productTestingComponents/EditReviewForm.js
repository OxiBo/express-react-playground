import React, { Component } from 'react'
import { reviewNewFormFields, reviewEditFormFields} from './reviewFormFields';

export default class EditReviewForm extends Component {
componentDidMount(){
    [...reviewNewFormFields, ...reviewEditFormFields].forEach(item => console.log(item))
}

    render() {
        return (
            <div className="ui main container ">
                edit review form
            </div>
        )
    }
}
