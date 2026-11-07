import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";

dotenv.config();

const productsData = [
  {
    name: "Logitech B100 Mouse",
    category: "Accessories",
    condition: "New",
    price: 800,
    stock: "In Stock",
    description: "Simple, reliable USB wired optical mouse for everyday tasks and office work.",
    specs: "Wired USB / 800 DPI / 3 buttons",
    images: [{ url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80" }],
    featured: true,
  },
  {
    name: "Mechanical RGB Keyboard",
    category: "Accessories",
    condition: "New",
    price: 3500,
    stock: "In Stock",
    description: "Tactile mechanical switches with customizable RGB backlighting for gaming and fast typing.",
    specs: "Blue switches / Full size / Custom RGB lighting / Double-shot keycaps",
    images: [{ url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80" }],
    featured: true,
  },
  {
    name: "TP-Link Dual-Band Router",
    category: "Networking",
    condition: "New",
    price: 3500,
    stock: "In Stock",
    description: "High-speed AC1200 dual-band Wi-Fi router for smooth streaming and gaming.",
    specs: "4 external antennas / Dual-band 2.4GHz & 5GHz / 4 Ethernet ports",
    images: [{ url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80" }],
    featured: false,
  },
  {
    name: "HP Laptop, i5 11th Gen",
    category: "Laptop",
    condition: "New",
    price: 75000,
    stock: "In Stock",
    description: "Powerful HP laptop with Intel Core i5 11th Gen processor, perfect for professional work and study.",
    specs: "i5 11th Gen / 8GB DDR4 RAM / 512GB NVMe SSD / 15.6\" FHD",
    images: [{ url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80" }],
    featured: true,
  },
  {
    name: "Dell Latitude, i5 7th Gen",
    category: "Laptop",
    condition: "Refurbished",
    price: 35000,
    stock: "In Stock",
    description: "Durable business-class Dell laptop. Fully tested, cleaned, and updated.",
    specs: "i5 7th Gen / 8GB RAM / 256GB SSD / 14\" HD screen",
    images: [{ url: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80" }],
    featured: false,
  },
  {
    name: "Custom Gaming PC, Ryzen 5 / GTX 1660",
    category: "Desktop PC",
    condition: "New",
    price: 120000,
    stock: "In Stock",
    description: "High performance custom-built gaming system. Plays esports and AAA titles smoothly.",
    specs: "Ryzen 5 3600 / GTX 1660 Super / 16GB RAM / 512GB SSD / RGB Tempered Glass",
    images: [{ url: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80" }],
    featured: true,
  },
  {
    name: "Desktop PC, i3 8th Gen",
    category: "Desktop PC",
    condition: "Refurbished",
    price: 28000,
    stock: "In Stock",
    description: "Reliable and responsive refurbished desktop PC for home office, web browsing, and billing.",
    specs: "Intel Core i3 8th Gen / 8GB RAM / 240GB SSD / Slim Tower",
    images: [{ url: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=80" }],
    featured: false,
  },
  {
    name: "Motherboard, Intel H81",
    category: "Motherboard",
    condition: "Refurbished",
    price: 3500,
    stock: "In Stock",
    description: "Tested and fully operational Intel H81 socket LGA1150 motherboard. Ideal for budget PC builds or replacements.",
    specs: "LGA 1150 socket / Micro-ATX / DDR3 Dual Channel / USB 3.0",
    images: [{ url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80" }],
    featured: false,
  },
  {
    name: "24\" Full HD Monitor",
    category: "Monitor",
    condition: "New",
    price: 15000,
    stock: "In Stock",
    description: "Crisp and vibrant 24-inch Full HD monitor with slim bezels and eye protection technology.",
    specs: "24\" / 1080p Full HD / IPS Panel / 75Hz refresh rate / HDMI & VGA",
    images: [{ url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80" }],
    featured: false,
  },
  {
    name: "HP DeskJet All-in-One Printer",
    category: "Printer",
    condition: "New",
    price: 12000,
    stock: "In Stock",
    description: "Compact and easy-to-use color printer, scanner, and copier for home and small business use.",
    specs: "Color inkjet / Print, scan, copy / USB connectivity",
    images: [{ url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop&q=80" }],
    featured: false,
  },
];

const seed = async () => {
  try {
    await connectDB();

    for (const p of productsData) {
      const exists = await Product.findOne({ name: p.name });
      if (!exists) {
        await Product.create(p);
        console.log(`Successfully added product: ${p.name}`);
      } else {
        console.log(`Product already exists: ${p.name}`);
      }
    }

    console.log("Product seeding completed!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding products:", err);
    process.exit(1);
  }
};

seed();
