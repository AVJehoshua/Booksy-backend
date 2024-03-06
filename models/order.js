// const mongoose = require("mongoose");

// const ShippingAddressSchema = new mongoose.Schema({
//     street: String,
//     city: String,
//     postCode: String,
//     country: String,
//     // Add other fields as necessary
// });

// const OrderItemSchema = new mongoose.Schema({
//     item: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Book", // Ensure this matches your book model name
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: true,
//         min: 1
//     }
// });

// const OrderSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     items: [OrderItemSchema],
//     totalAmount: {
//         type: Number,
//         required: true
//     },
//     shippingAddress: ShippingAddressSchema,
//     paymentStatus: {
//         type: String,
//         required: true,
//         enum: ["pending", "completed", "failed"],
//         default: "pending"
//     },
//     orderStatus: {
//         type: String,
//         enum: ["pending", "shipped", "delivered", "cancelled"],
//         default: "pending"
//     },

//     orderDate: {
//         type: Date,
//         default: Date.now
//     }
// });

// const Order = mongoose.model("Order", OrderSchema);

// module.exports = Order;


// order.model.js
// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//     items: [{
//         book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
//         quantity: { type: Number, required: true }
//     }],
//     totalAmount: { type: Number, required: true },
//     shippingAddress: {
//         street: String,
//         city: String,
//         postCode: String,
//         country: String,
//     },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     // Additional fields like paymentStatus, orderStatus, etc.
//     });

// const Order = mongoose.model('Order', orderSchema);

// module.exports = Order;


const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
    }],
    totalAmount: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Include any other fields like shippingAddress, paymentStatus, etc.
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
