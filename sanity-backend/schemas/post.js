export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'PostedAt',
      name: 'launchAt',
      type: 'string',
      
    },
    {
      name: 'TypeID',
      title: 'PostType',
      type: 'string',
    },
    {
      name: 'userId',
      title: 'UserId',
      type: 'string',
    },
    {
      name: 'postedBy',
      title: 'PostedBy',
      type: 'postedBy',
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'user' }],
        },
      ],
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [{ type: 'comment' }],
    },
    {
      name: 'topic',
      title: 'Topic',
      type: 'string',
    },
  ],
};
