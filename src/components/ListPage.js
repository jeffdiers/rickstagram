import React from 'react'
import { Link } from 'react-router'
import Post from '../components/Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class ListPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.data.refetch()
    }
  }

  render () {
    if (this.props.data.loading) {
      return (<div className='flex w-100 h-100 items-center justify-center pt7'>
        <div>
          Loading
        </div>
      </div>)
    }

    let blurClass = ''

    if (this.props.location.pathname !== '/') {
      blurClass = ' blur'
    }

    return (
      <div>
        <h1 className="w-100 flex justify-center">Rickstagram</h1>
        <div className={'w-100 flex justify-center pa6' + blurClass}>
          <div className='w-100 flex flex-wrap' style={{maxWidth: 1150}}>
            <Link to='/create' className='ma3 box new-post br2 flex flex-column items-center justify-center ttu fw6 f20 black-30 no-underline'>
              <img src={require('../assets/plus.svg')} alt='' className='plus mb3' />
              <div>New Post</div>
            </Link>
            {this.props.data.allPosts.map((post) => (
              <Post
                key={post.id}
                post={post}
                refresh={() => this.props.data.refetch()}
              />
            ))}
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
}


const FeedQuery = gql`query allPosts {
  allPosts(orderBy: createdAt_DESC) {
    comments {
      id
      body
      author
    }
    id
    imageUrl
    description
  }
}`

const ListPageWithData = graphql(FeedQuery)(ListPage)

export default ListPageWithData
