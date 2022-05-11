export default {
    name: 'tag',
    title: 'Tag',
    type: 'document',
    liveEdit: true,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'color',
            title: 'Color',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                slugify: input => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
            }
        },
    ]
}