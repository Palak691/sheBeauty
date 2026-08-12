import PDFDocument from 'pdfkit';
import Order from '../models/orderSchema.js';
import pdf from 'pdfkit'
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoPath = path.join(__dirname, '../assets/image.png');

export const generateInvoice = async(req,res)=>{
    const order = await Order.findById(req.params.orderId)
      .populate("userId", "name email")
      .populate("items.product", "name price discountPercentage");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Only allow the owner or admin to download it
    if (req.user.role !== "admin" &&
      order.userId._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({message: "Not authorized"});
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition",`attachment; filename=invoice-${order._id}.pdf`);

    doc.pipe(res);
    
    // Header
    doc.image(logoPath, 50, 40, {width: 120, align : 'center'});
    doc.fontSize(24).text("sheBeauty", { align: "center" });

    doc.fontSize(10).text("Beauty & Skincare", { align: "center" });

    doc.moveDown();

    doc.fontSize(16).text("INVOICE");

    doc.moveDown();

    doc.fontSize(10);

    doc.text(`Invoice No: INV-${order._id}`);
    doc.text(`Order Date: ${order.createdAt.toDateString()}`);
    doc.text(`Payment Method: ${order.paymentMethod}`);
    doc.text(`Status: ${order.status}`);

    doc.moveDown();

    doc.text(`Customer: ${order.userId.name}`);
    doc.text(`Email: ${order.userId.email}`);

    doc.moveDown();

    doc.text("----------------------------------------");

    order.items.forEach((item) => {
      const product = item.product;

      const finalPrice =
        product.discountPercentage > 0
          ? Math.round(
              product.price -
                (product.price * product.discountPercentage) / 100
            )
          : product.price;

      const itemTotal = finalPrice * item.quantity;

      doc.text(`${product.name}  x ${item.quantity}    ₹${itemTotal}`);
    });

    doc.text("----------------------------------------");

    doc.moveDown();

    doc.text(`Subtotal: &#8377;${order.itemPrice}`);
    doc.text(`Shipping: &#8377;${order.shippingPrice}`);

    doc.fontSize(14).text(`Total: &#8377;${order.totalPrice}`);

    doc.moveDown();

    doc.fontSize(10).text("Thank you for shopping with sheBeauty!", {  align: "center"});

    doc.end();

  
}