export const getPalettes = (start,limit) => {
    const query = `*[ _type=='palette' ] | order(_createdAt desc)[${start}...${limit}]{
        _id,
        color,
        like,
        _createdAt
    }`;
    return query;    
} 
export const getPaletteById = (id,start,limit) => {
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
        'related': *[_type=='palette' && references(^.tag[]._ref) && _id != ^._id ][${start}...${limit}]{
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

export const getPalettePopular = (start,limit) => {
    const query = `*[ _type=='palette' ] | order(like desc)[${start}...${limit}]{
        color,
        like,
        _createdAt,
        _id
    }`
    return query;
} 

export const getPaletteRandom = (start,limit) => {
    const query = `*[ _type=='palette' ][${start}...${limit}]{
        color,
        like,
        _createdAt,
        _id
    }`
    return query;
} 

export const getPaletteQuery = (query,start,limit) => {
    const groq = `*[ _type == 'palette' && tag[]->slug.current match ${query} ] | order(_createdAt desc)[${start}...${limit}]{
        color,
        like,
        _createdAt,
        _id
    }`
    return groq;
}
