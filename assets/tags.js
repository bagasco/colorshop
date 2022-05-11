const tags = [
    {
        "_id": "bea5236b-4643-469e-ae24-e10730c7b462",
        "color": "#53AFFF",
        "slug": "blue",
        "title": "Blue"
    },
    {
        "_id": "cd18fa3e-d6fb-4cba-88b7-66075d89bb9b",
        "color": "#9DE16F",
        "slug": "green",
        "title": "Green"
    },
    {
        "_id": "cd718be3-ca1b-4b01-8b2a-17c907841e31",
        "color": "#FF3737",
        "slug": "red",
        "title": "Red"
    },
    {
        "_id": "5a129570-d95f-450c-bf75-27933ebb577c",
        "color": "#FF74BC",
        "slug": "pink",
        "title": "Pink"
    },
    {
        "_id": "2dfeb037-7735-4635-99ba-74e362e74b32",
        "color": "#000000",
        "slug": "black",
        "title": "Black"
    },
    {
        "_id": "ea8c5e50-d827-4281-80fd-7f0325cd5278",
        "color": "#FFE272",
        "slug": "yellow",
        "title": "yellow"
    },
    {
        "_id": "536ca893-30f3-4f8a-b993-69cf16d0a577",
        "color": "#DCDCDC",
        "slug": "grey",
        "title": "Grey"
    },
    {
        "_id": "952149f2-6d82-46ba-a133-e5e5e7ad73c6",
        "color": "#FF9351",
        "slug": "orange",
        "title": "Orange"
    },
    {
        "_id": "871cd056-d478-430c-99ea-0ed2aab1c4a6",
        "color": "#FFFFFF",
        "slug": "white",
        "title": "White"
    },
    {
        "_id": "b9aa31fc-f580-4235-9688-97682dfc2d70",
        "color": "#976933",
        "slug": "brown",
        "title": "Brown"
    },
    {
        "_id": "764a1eee-5c88-41d2-987b-863606e1e18e",
        "color": "#DE6FFF",
        "slug": "purple",
        "title": "Purple"
    },
    {
        "_id": "3b40591f-0e4c-4118-b3d2-7b5a9d385add",
        "color": "#F1D299",
        "slug": "beige",
        "title": "Beige"
    },
    {
        "_id": "bf0e8ea8-2b13-4b0d-8ad0-15f3edd7b0a9",
        "color": "#414796",
        "slug": "navy",
        "title": "Navy"
    },
    {
        "_id": "cc29c67b-939b-440d-ac1c-cbba1b3529fd",
        "color": "#FF7567",
        "slug": "peach",
        "title": "Peach"
    },
    {
        "_id": "5c232417-a308-4065-a4be-84729a04fe97",
        "color": "#36D8B7",
        "slug": "teal",
        "title": "Teal"
    },
    {
        "_id": "4431055f-fb7f-4f59-9738-d32311469630",
        "color": "#A72626",
        "slug": "maroon",
        "title": "Maroon"
    },
    {
        "_id": "154a575b-fec9-4e28-ae8e-46b72bae2a77",
        "color": null,
        "slug": "gold",
        "title": "Gold"
    },
    {
        "_id": "3319faa0-32c2-4722-ba34-def830aae49f",
        "color": null,
        "slug": "pastel",
        "title": "Pastel"
    },
    {
        "_id": "1bf06fcb-e969-4776-9c6f-c2b0d7de8f80",
        "color": null,
        "slug": "dark",
        "title": "Dark"
    },
    {
        "_id": "501cdbc0-c2fa-4cb9-aeb2-e1c429efaf89",
        "color": null,
        "slug": "neon",
        "title": "Neon"
    },
    {
        "_id": "5369ecce-77a7-4275-8086-79260c8afdb4",
        "color": null,
        "slug": "skin",
        "title": "Skin"
    },
    {
        "_id": "643a901f-b2d9-43dc-84b4-dae21458337a",
        "color": null,
        "slug": "rainbow",
        "title": "Rainbow"
    },
    {
        "_id": "aedafe93-5505-4f68-a32e-d7029648eb6d",
        "color": null,
        "slug": "retro",
        "title": "Retro"
    },
    {
        "_id": "cb4da8e2-4b30-4c3d-961f-66a2174d00e5",
        "color": null,
        "slug": "vintage",
        "title": "Vintage"
    },
    {
        "_id": "bfd65247-7b88-40d7-a99a-c88ef6058f73",
        "color": null,
        "slug": "food",
        "title": "Food"
    },
    {
        "_id": "327f7883-2321-4037-8daa-98bfe8cec511",
        "color": null,
        "slug": "summer",
        "title": "Summer"
    },
    {
        "_id": "d347e488-c564-4465-bb6c-14c6be00cf59",
        "color": null,
        "slug": "light",
        "title": "Light"
    },
    {
        "_id": "a3595a59-20b4-4e97-a607-90cab9b52411",
        "color": null,
        "slug": "cream",
        "title": "Cream"
    },
    {
        "_id": "500454a0-a515-4787-ae44-10f02ad9b8a2",
        "color": null,
        "slug": "earth",
        "title": "Earth"
    },
    {
        "_id": "3f554fbe-eb92-4f99-90bb-1af2eb00e63d",
        "color": null,
        "slug": "coffee",
        "title": "Coffee"
    },
    {
        "_id": "91fdc96d-ca8f-43cb-ad29-8b2b12108e22",
        "color": null,
        "slug": "nature",
        "title": "Nature"
    },
    {
        "_id": "fc39e616-cdde-4f9d-b1e7-b6ef68766e98",
        "color": null,
        "slug": "warm",
        "title": "Warm"
    },
    {
        "_id": "743a473f-2d5e-4c3a-a95e-6d87bc9dc0d9",
        "color": null,
        "slug": "spring",
        "title": "Spring"
    },
    {
        "_id": "36cd3865-1a82-476c-bf4a-4c61c6964c32",
        "color": null,
        "slug": "night",
        "title": "Night"
    },
    {
        "_id": "2574650b-d32e-42f1-93fe-27766cc7bf87",
        "color": null,
        "slug": "space",
        "title": "Space"
    },
    {
        "_id": "215ae38d-5163-4644-8b62-6dc889414d2a",
        "color": null,
        "slug": "winter",
        "title": "Winter"
    },
    {
        "_id": "042e5acc-f230-4ee9-ade5-7a6bbb937171",
        "color": null,
        "slug": "sunset",
        "title": "Sunset"
    },
    {
        "_id": "72e006a8-5625-4677-9df5-895b750d857e",
        "color": null,
        "slug": "kids",
        "title": "Kids"
    },
    {
        "_id": "3f6945ef-0b26-4f50-818e-fc35c70182d1",
        "color": null,
        "slug": "happy",
        "title": "Happy"
    },
    {
        "_id": "dab1a5a4-eeeb-44a8-994a-0e2965516fdc",
        "color": null,
        "slug": "cold",
        "title": "Cold"
    },
    {
        "_id": "b698fb30-f142-4ec7-a219-1574cd869e43",
        "color": null,
        "slug": "fall",
        "title": "Fall"
    },
    {
        "_id": "53f5fa32-2ae9-4f36-8fcc-27db4b7fc5ed",
        "color": null,
        "slug": "wedding",
        "title": "Wedding"
    }
]

export default tags;