import { sanity } from "../../lib/sanity";

export default async function likeHandler(req, res) {
    const { _id, like } = JSON.parse(req.body);
    if (like) {
        const data = await sanity.patch(_id)
        .setIfMissing({ like: 0 })
        .inc({ like: 1 })
        .commit()
        .catch(error=>console.log(error))
        res.status(200).json({ like: data.like, action: 'inc' })
    }else {
        const data = await sanity.patch(_id)
        .setIfMissing({ like: 0 })
        .dec({ like: 1 })
        .commit()
        .catch(error=>console.log(error))
        res.status(200).json({ like: data.like, action: 'dec' })
    }

}