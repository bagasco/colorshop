export const getPalettes = `*[ _type=='palette' ] | order(_createdAt desc){
    _id,
    color,
    like,
    _createdAt
}`;

export const getPaletteById = (id) => {
    const query = `*[ _type=='palette' && _id=='${id}' ][0]{
        _id,
        color,
        like,
        _createdAt,
        tag[]->{
            color,
            'slug': slug.current,
            title,
        },
        'related': *[_type=='palette' && references(^.tag[]._ref) && _id != ^._id ]{
            _id,
            color,
            like,
            _createdAt,
            tag[]->{
                color,
                'slug': slug.current,
                title,
            }
        }
    }`
    return query;
}

export const getPaletteCollection = (array) => {
    const query = `*[ _type=='palette' && _id in ${array} ]{
        color,
        like,
        _createdAt,
        _id
    }`
    return query;
}

export const getPalettePopular = `*[ _type=='palette' ] | order(like desc){
    color,
    like,
    _createdAt,
    _id
  }`

export const getPaletteRandom = `*[ _type=='palette' ]{
    color,
    like,
    _createdAt,
    _id
  }`

export const getPaletteQuery = (query) => {
    const groq = `*[ _type == 'palette' && tag[]->slug.current match ${query} ] | order(_createdAt desc){
        color,
        like,
        _createdAt,
        _id
    }`
    return groq;
}
