import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import RepairRequest from "./models/RepairRequest.js";

dotenv.config();

const genuineProducts = [
  // ─── Laptops ─────────────────────────────────────────────────────────────
  {
    name: "HP 15s (12th Gen Intel Core i5)",
    category: "Laptop",
    condition: "New",
    price: 76000,
    stock: "In Stock",
    description: "Brand new HP laptop built for professionals, university students, and business multitasking with all-day battery life and backlit keyboard.",
    specs: "Intel Core i5-1235U (10 Cores, up to 4.4 GHz) / 16GB DDR4 RAM / 512GB PCIe NVMe SSD / 15.6\" Full HD IPS Anti-Glare / Windows 11 Home",
    images: [{ url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80" }],
    featured: true,
  },
  {
    name: "Lenovo ThinkPad T480 (Core i5 8th Gen)",
    category: "Laptop",
    condition: "Refurbished",
    price: 38500,
    stock: "In Stock",
    description: "Legendary business durability and best-in-class keyboard. Certified Grade A refurbished ThinkPad, cleaned, repasted with thermal grease, 3-month shop warranty.",
    specs: "Intel Core i5-8350U Quad Core / 16GB DDR4 RAM / 256GB NVMe SSD / 14\" Full HD IPS Display / Dual Battery Bridge System / Original Lenovo 65W Type-C Charger",
    images: [{ url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900&auto=format&fit=crop&q=80" }],
    featured: true,
  },
  {
    name: "Dell Latitude 5490 (Core i5 8th Gen)",
    category: "Laptop",
    condition: "Refurbished",
    price: 34000,
    stock: "In Stock",
    description: "Rugged enterprise laptop perfect for billing, accounting software (Tally / Busy), school work, and daily internet use. Tested and certified.",
    specs: "Intel Core i5-8250U / 8GB DDR4 RAM / 256GB SSD / 14\" Anti-Glare HD / HDMI & USB 3.1 / Original Dell Adapter",
    images: [{ url: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=900&auto=format&fit=crop&q=80" }],
    featured: false,
  },
  {
    name: "Acer Aspire 5 (13th Gen Intel Core i5)",
    category: "Laptop",
    condition: "New",
    price: 82000,
    stock: "In Stock",
    description: "Modern, slim aluminum chassis featuring 13th Gen Intel 10-core processing power, Wi-Fi 6E, and crisp IPS narrow-bezel panel.",
    specs: "Intel Core i5-1335U / 16GB LPDDR5 RAM / 512GB Gen4 NVMe SSD / 15.6\" FHD IPS / Thunderbolt 4 / Backlit Keyboard",
    images: [{ url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&auto=format&fit=crop&q=80" }],
    featured: true,
  },
  {
    name: "Dell Inspiron 3520 (12th Gen Intel Core i3)",
    category: "Laptop",
    condition: "New",
    price: 52000,
    stock: "In Stock",
    description: "Reliable and responsive daily laptop with a smooth 120Hz Full HD display and rapid PCIe SSD.",
    specs: "Intel Core i3-1215U (6 Cores) / 8GB DDR4 RAM / 512GB M.2 SSD / 15.6\" FHD 120Hz / Windows 11",
    images: [{ url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=900&auto=format&fit=crop&q=80" }],
    featured: false,
  },

  // ─── Desktops & Gaming ───────────────────────────────────────────────────
  {
    name: "Deep Custom Gaming PC (Ryzen 5 5600 + RTX 3060 12GB)",
    category: "Desktop PC",
    condition: "New",
    price: 118000,
    stock: "In Stock",
    description: "Custom-built in our Biratnagar workshop. Smoothly plays all modern games (GTA V, Valorant, Cyberpunk 2077, PUBG) on high/ultra settings. Includes 1-year parts warranty.",
    specs: "AMD Ryzen 5 5600 6C/12T / B550M Motherboard / 16GB (8x2) 3200MHz DDR4 RAM / 500GB NVMe SSD / GeForce RTX 3060 12GB / 650W 80+ Bronze PSU / 4x ARGB Fan Mesh Case",
    images: [{ url: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=900&auto=format&fit=crop&q=80" }],
    featured: true,
  },
  {
    name: "Deep Office & Accounting Desktop PC (Core i3 10th Gen)",
    category: "Desktop PC",
    condition: "New",
    price: 32000,
    stock: "In Stock",
    description: "Rapid desktop computer designed for retail shops, offices, accounting software (Tally / Swastik), school labs, and daily office tasks.",
    specs: "Intel Core i3-10100 Quad Core / H510M Motherboard / 8GB DDR4 RAM / 256GB High-Speed SSD / 450W SMPS / Micro-ATX Cabinet",
    images: [{ url: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=900&auto=format&fit=crop&q=80" }],
    featured: false,
  },
  {
    name: "HP EliteDesk 800 G3 SFF (Refurbished)",
    category: "Desktop PC",
    condition: "Refurbished",
    price: 22500,
    stock: "In Stock",
    description: "Compact small-form-factor desktop from HP. Low power consumption, whisper quiet, certified grade A condition for office billing.",
    specs: "Intel Core i5-6500 / 8GB DDR4 RAM / 240GB High-Speed SSD / Small Form Factor / Windows 10 Pro",
    images: [{ url: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=900&auto=format&fit=crop&q=80" }],
    featured: false,
  },

  // ─── Monitors ────────────────────────────────────────────────────────────
  {
    name: "Dell 24\" Full HD IPS Monitor (SE2422HX)",
    category: "Monitor",
    condition: "New",
    price: 17500,
    stock: "In Stock",
    description: "Crisp Full HD IPS panel with slim borders, AMD FreeSync, and flicker-free screen with ComfortView to reduce blue light emissions.",
    specs: "23.8\" IPS Panel / 1920x1080 FHD / 75Hz refresh rate / HDMI & VGA ports / VESA mount compatible",
    images: [{ url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=900&auto=format&fit=crop&q=80" }],
    featured: true,
  },
  {
    name: "AOC 22\" Full HD LED Monitor (22B2HN)",
    category: "Monitor",
    condition: "New",
    price: 12500,
    stock: "In Stock",
    description: "Budget-friendly 22-inch display perfect for billing desks, student homework, security CCTV monitoring, and office PCs.",
    specs: "21.5\" VA Panel / 1080p FHD / 75Hz / Low Blue Mode / HDMI & VGA inputs",
    images: [{ url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900&auto=format&fit=crop&q=80" }],
    featured: false,
  },

  // ─── Printers ────────────────────────────────────────────────────────────
  {
    name: "Epson EcoTank L3210 All-in-One Ink Tank Printer",
    category: "Printer",
    condition: "New",
    price: 24500,
    stock: "In Stock",
    description: "Ultra-low-cost color printing solution with spill-free ink tank bottles. Yields up to 4,500 black and 7,500 color pages per refill. Best seller in Biratnagar.",
    specs: "Print, Scan, Copy / Color Inkjet / Up to 33 ppm black / 5760 x 1440 dpi resolution / USB 2.0",
    images: [{ url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=900&auto=format&fit=crop&q=80" }],
    featured: true,
  },
  {
    name: "Canon PIXMA G2010 Multi-Function Ink Tank",
    category: "Printer",
    condition: "New",
    price: 20500,
    stock: "In Stock",
    description: "Durable multi-function ink tank printer with integrated transparent ink tanks to easily monitor levels. High page yield with budget ink refills.",
    specs: "Print, Scan, Copy / Integrated Ink Tank / Borderless Photo Printing / USB 2.0 High Speed",
    images: [{ url: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=900&auto=format&fit=crop&q=80" }],
    featured: false,
  },
  {
    name: "HP LaserJet 1020 Plus (Refurbished Workhorse)",
    category: "Printer",
    condition: "Refurbished",
    price: 14500,
    stock: "In Stock",
    description: "The most trusted monochrome laser printer in Nepal. Fully serviced with brand new pickup roller, Teflon sleeve, and a fresh 12A cartridge.",
    specs: "Monochrome Laser / Up to 14 ppm / Crisp 600x600 dpi / Standard HP 12A / Canon 303 Toner",
    images: [{ url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=900&auto=format&fit=crop&q=80" }],
    featured: false,
  },

  // ─── Networking ──────────────────────────────────────────────────────────
  {
    name: "TP-Link Archer C6 AC1200 Gigabit Router",
    category: "Networking",
    condition: "New",
    price: 4200,
    stock: "In Stock",
    description: "Dual-band AC1200 router with 4 high-gain antennas and beamforming technology for strong wall penetration across multi-story houses.",
    specs: "867 Mbps on 5GHz + 300 Mbps on 2.4GHz / 4 External Antennas / 1 Full Gigabit WAN + 4 Gigabit LAN / MU-MIMO",
    images: [{ url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&auto=format&fit=crop&q=80" }],
    featured: true,
  },
  {
    name: "D-Link 8-Port Gigabit Desktop Switch (DGS-1008A)",
    category: "Networking",
    condition: "New",
    price: 2600,
    stock: "In Stock",
    description: "Expand your home, office, or cyber cafe wired network with 8 full 1000Mbps Gigabit Ethernet ports. Silent fanless design.",
    specs: "8x 10/100/1000 Mbps Gigabit Ports / Auto MDI/MDIX / Plug and Play / Green Ethernet Energy Saving",
    images: [{ url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&auto=format&fit=crop&q=80" }],
    featured: false,
  },

  // ─── Motherboards & Components ───────────────────────────────────────────
  {
    name: "Gigabyte H610M H V2 DDR4 Motherboard",
    category: "Motherboard",
    condition: "New",
    price: 11500,
    stock: "In Stock",
    description: "High-quality micro-ATX motherboard supporting 12th, 13th, and 14th Gen Intel Core processors with PCIe 4.0 NVMe slot and Smart Fan 6.",
    specs: "LGA1700 Socket / Dual DDR4 up to 3200MHz / NVMe PCIe 3.0 x4 M.2 / HDMI, D-Sub / GbE LAN",
    images: [{ url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80" }],
    featured: false,
  },
  {
    name: "Kingston NV2 500GB PCIe 4.0 NVMe M.2 SSD",
    category: "Other",
    condition: "New",
    price: 5200,
    stock: "In Stock",
    description: "Substantial upgrade for PCs and laptops. Lightning-fast boot times, instant application launches, and fast data transfers.",
    specs: "Read up to 3500 MB/s / Write up to 2100 MB/s / M.2 2280 form factor / 3-Year Shop Warranty",
    images: [{ url: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=900&auto=format&fit=crop&q=80" }],
    featured: false,
  },
  {
    name: "Crucial 8GB DDR4 3200MHz Desktop RAM",
    category: "Other",
    condition: "New",
    price: 3100,
    stock: "In Stock",
    description: "Genuine Crucial Micron memory module. Instantly eliminate multitasking lag and speed up system responsiveness.",
    specs: "8GB DDR4 / 3200 MT/s / CL22 / 1.2V / UDIMM 288-pin / Limited Lifetime Warranty",
    images: [{ url: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=900&auto=format&fit=crop&q=80" }],
    featured: false,
  },

  // ─── Accessories ─────────────────────────────────────────────────────────
  {
    name: "Logitech MK270 Wireless Keyboard & Mouse Combo",
    category: "Accessories",
    condition: "New",
    price: 3400,
    stock: "In Stock",
    description: "Reliable plug-and-play wireless combo with 10-meter range, 8 media shortcut keys, and long battery life.",
    specs: "2.4GHz Wireless with Nano USB Receiver / Full-size keyboard / Spill-resistant / Optical mouse",
    images: [{ url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=900&auto=format&fit=crop&q=80" }],
    featured: true,
  },
  {
    name: "Logitech B100 Optical USB Mouse",
    category: "Accessories",
    condition: "New",
    price: 800,
    stock: "In Stock",
    description: "Simple, durable, and comfortable ambidextrous wired USB optical mouse for daily office and home computing.",
    specs: "Wired USB / 800 DPI Optical Tracking / 3 Buttons / 1.8m Cable / Plug and Play",
    images: [{ url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=900&auto=format&fit=crop&q=80" }],
    featured: false,
  },
  {
    name: "Fantech HG11 Captain 7.1 Surround Gaming Headset",
    category: "Accessories",
    condition: "New",
    price: 3600,
    stock: "In Stock",
    description: "True 7.1 virtual surround sound headset with rich bass, flexible noise-cancelling microphone, and RGB lighting.",
    specs: "50mm Speaker Drivers / Virtual 7.1 Surround / Over-Ear Cushions / USB Plug / In-line Audio Control",
    images: [{ url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=900&auto=format&fit=crop&q=80" }],
    featured: true,
  },
  {
    name: "SanDisk Ultra Flair 64GB USB 3.0 Metal Flash Drive",
    category: "Accessories",
    condition: "New",
    price: 1100,
    stock: "In Stock",
    description: "Fast USB 3.0 performance with high-speed file transfers up to 150MB/s encased in an elegant, durable metal casing.",
    specs: "64GB Storage / USB 3.0 (Backwards compatible USB 2.0) / Up to 150MB/s Read / SanDisk SecureAccess",
    images: [{ url: "https://images.unsplash.com/photo-1624823183493-ed5832f45750?w=900&auto=format&fit=crop&q=80" }],
    featured: false,
  },
];

const sampleRepairs = [
  {
    name: "Bikash Adhikari",
    phone: "9812345678",
    deviceType: "Laptop",
    issue: "Laptop display flickering when opening lid; right hinge is loose and cracked.",
    status: "In Progress",
    notes: "Hinges fabricated, ordered 15.6 FHD 30-pin EDP screen.",
  },
  {
    name: "Sunita Shrestha",
    phone: "9809876543",
    deviceType: "Printer",
    issue: "Epson L3210 red light blinking and paper feed error.",
    status: "Completed",
    notes: "Paper pickup roller cleaned, waste ink pad reset executed.",
  },
  {
    name: "Ramesh Thapa",
    phone: "9842011223",
    deviceType: "Desktop PC",
    issue: "Computer powers on, fans spin, but there is no display on the monitor.",
    status: "Pending",
    notes: "Customer dropped off CPU cabinet. Needs RAM slot cleaning and CMOS test.",
  },
];

const seedData = async () => {
  try {
    await connectDB();

    console.log("Clearing existing products and sample repairs...");
    await Product.deleteMany({});
    await RepairRequest.deleteMany({});

    console.log(`Inserting ${genuineProducts.length} genuine products...`);
    await Product.insertMany(genuineProducts);
    console.log("Products inserted successfully!");

    console.log(`Inserting ${sampleRepairs.length} sample repair inquiries...`);
    await RepairRequest.insertMany(sampleRepairs);
    console.log("Repair requests inserted successfully!");

    console.log("\n--- Database Seeding Complete ---");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seedData();
