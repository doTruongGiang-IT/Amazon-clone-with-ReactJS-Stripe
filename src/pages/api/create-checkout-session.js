const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async(req, res) => {
    const {products, email} = req.body;
    const format = products.map((product) => ({
        price_data: {
            currency: 'gbp',
            product_data: {
                name: product.title,
                images: [product.image],
            },
            unit_amount: product.price * 100
        },  
        description: product.description,
        quantity: product.qty
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_rates: ['shr_1JGL9ABqDF3l7YfoHHP9dZl5'],
        shipping_address_collection: {
            allowed_countries: ['US', 'GB', 'VN'],
        },
        line_items: format,
        mode: 'payment',
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/cart`,
        metadata: {
            email,
            images: JSON.stringify(products.map((product) => product.image)),
        },
    });

    res.status(200).json({
        id: session.id
    });
};