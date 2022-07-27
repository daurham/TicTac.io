import React from 'react'

type Props = {
  hidden: Boolean;
};

const Feed = ({hidden}: Props) => {
  return hidden ? null : (
    <div>Feed</div>
  )
}

export default Feed;