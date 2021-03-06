import React from 'react'
import { fetchPost, increaseLike } from '../Redux/actions/MySteezActions'

import { connect } from 'react-redux'
import SteezProducts from './SteezProducts'

import CommentCont from '../Containers/CommentCont'


class SteezShow extends React.Component {

    componentDidMount(){
        let id = this.props.match.params.id
        this.props.fetchPost(id)
    }

    handleClick = () => {
        this.props.increaseLike(this.props.post)
    }

    handleButton = () => {
        this.props.history.push('/addpart')
    }

    render(){
        return(
            <div>
                <div className="product-show">
                    <h1>{this.props.post.name}</h1>
                    <br/>
                    <img className="show-img" src={this.props.post.img_url} alt=""/>
                    <br />
                    <p>Views: {this.props.post.views}</p>
                    <br />
                    {this.props.currentUser !== null
                    ? <button className="button" onClick={this.handleClick}>Likes: {this.props.post.likes}</button> 
                    : null}
                </div>
                <br />
                <div>
                    <p className="product-header"> Outfit Pieces </p>
                    <SteezProducts />
                    <div className="post-button-div">
                        {this.props.currentUser === null || this.props.post.user_id !== this.props.currentUser.id
                        ? null
                        : <button onClick={this.handleButton} className="button">+</button>}
                    </div>
                </div>
                <CommentCont />
            </div>

        )
    }
}

const stateToProps = state => {
    return {
        post: state.posts.currentPost,
        currentUser: state.users.currentUser
    }
}

export default connect(stateToProps, {fetchPost, increaseLike})(SteezShow);