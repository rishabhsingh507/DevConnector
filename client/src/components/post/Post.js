import React, { Fragment, useEffect } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layouts/Spinner'
import { getPost } from '../../actions/post'
import PostItem from '../posts/PostItem'
import { Link } from 'react-router-dom'

const Post = ({ getPost, post: { post, loading }, match }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost]);
    return (
        loading || post === null ? (
            <Spinner />
        ) : (
            <Fragment>
                <Link to='/posts' className='btn'>
                    Back To Posts
                    </Link>
                <PostItem post={post} showActions={false} />
            </Fragment>
        )
    )
}

Post.propTypes = {
    getPost: propTypes.func.isRequired,
    post: propTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)
