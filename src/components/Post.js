import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {Link} from 'react-router'

class Post extends React.Component {

  static propTypes = {
    post: React.PropTypes.object,
    mutate: React.PropTypes.func,
    refresh: React.PropTypes.func,
  }

  render () {
    return (
      <Link
        className='bg-white ma3 box post flex flex-column no-underline br2'
        to={`/post/${this.props.post.id}`}
      >
        <div
          className='image'
          style={{
            backgroundImage: `url(${this.props.post.imageUrl})`,
            backgroundSize: 'cover',
            paddingBottom: '100%',
          }}
        />
        <div className=' items-center black-80 fw3 description'>
          <span className='description-content'>{this.props.post.description}</span>
          {this.props.post.comments.map((comment) => (
              <div key={comment.id} className='comments'>
                <span className='author'>{comment.author} <comment className='comment-body'>{comment.body}</comment></span>
              </div>
            ))}
        </div>
      </Link>
    )
  }
          //<span className='red f6 pointer dim' onClick={this.handleDelete}>Delete</span>



  handleDelete = async () => {
    await this.props.mutate({variables: {id: this.props.post.id}})

    this.props.refresh()
  }
}

const deleteMutation = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

const PostWithMutation = graphql(deleteMutation)(Post)

export default PostWithMutation

