export default {
    name: 'palette',
    title: 'Palette',
    type: 'document',
    liveEdit: true,
    fields: [
        {
            name: 'color',
            title: 'Color',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'tag',
            title: 'Tag',
            type: 'array',
            of: [{
                type: 'reference',
                to: [{type: 'tag'}],
            }]
        },
        {
            name: 'like',
            title: 'Like',
            type: 'number',
            validation: Rule => Rule.required().min(0),
        }
    ],
    initialValue: {
        like: 0,
    }
}