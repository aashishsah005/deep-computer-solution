/**
 * Sends a WhatsApp notification to the shop owner in the background.
 *
 * Priority order:
 *  1. Meta WhatsApp Cloud API (Official — most secure, free tier)
 *  2. Green API (Unofficial — free, QR scan required)
 *  3. CallMeBot (Unofficial — free, activation required)
 *  4. Console fallback (logs message if no API is configured)
 *
 * @param {Object} details
 * @param {string} details.name       - Customer name
 * @param {string} details.phone      - Customer phone number
 * @param {string} details.deviceType - Device type
 * @param {string} details.issue      - Issue description
 */
export const sendWhatsAppNotification = async (details) => {
  const shopNumber = process.env.SHOP_WHATSAPP_NUMBER;

  if (!shopNumber) {
    console.warn("[WhatsApp] SHOP_WHATSAPP_NUMBER is not set in .env");
    return;
  }

  const plainText =
    `🛠️ New Repair Request\n\n` +
    `Name: ${details.name}\n` +
    `Phone: ${details.phone}\n` +
    `Device: ${details.deviceType}\n` +
    `Issue: ${details.issue}`;

  console.log(`\n--- [WhatsApp Notification] ---`);
  console.log(`To: +${shopNumber}`);
  console.log(plainText);
  console.log(`-------------------------------\n`);

  // ─── 1. Meta WhatsApp Cloud API (Official) ───────────────────────────────
  // How to get credentials:
  //   a) Go to https://developers.facebook.com → Create App → Business → Add WhatsApp product
  //   b) Note the Phone Number ID from the WhatsApp dashboard
  //   c) Create a System User in Business Settings and generate a permanent token
  //   d) Add your personal number as a verified test recipient in the dashboard
  // Docs: https://developers.facebook.com/docs/whatsapp/cloud-api/get-started
  const metaToken   = process.env.META_WA_TOKEN;
  const metaPhoneId = process.env.META_WA_PHONE_ID;

  if (metaToken && metaPhoneId) {
    try {
      // Recipient: shop owner's personal WhatsApp (with country code, no +)
      const cleanTo = shopNumber.replace(/\D/g, "");

      const payload = {
        messaging_product: "whatsapp",
        to: cleanTo,
        type: "text",
        text: { body: plainText },
      };

      console.log("[WhatsApp] Sending via Meta Cloud API...");

      const response = await fetch(
        `https://graph.facebook.com/v20.0/${metaPhoneId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${metaToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok && data.messages?.[0]?.id) {
        console.log(`[WhatsApp] ✅ Sent via Meta Cloud API! Message ID: ${data.messages[0].id}`);
      } else {
        console.warn("[WhatsApp] Meta Cloud API error:", JSON.stringify(data));
      }
      return;
    } catch (err) {
      console.error("[WhatsApp] Meta Cloud API exception:", err.message);
    }
  }

  // ─── 2. Green API (free — requires one-time QR scan) ─────────────────────
  // Sign up at https://green-api.com → create instance → scan QR with owner's phone
  const greenInstanceId = process.env.GREENAPI_INSTANCE_ID;
  const greenApiToken   = process.env.GREENAPI_API_TOKEN;

  if (greenInstanceId && greenApiToken) {
    try {
      const cleanPhone = shopNumber.replace(/\D/g, "");
      const url  = `https://api.green-api.com/waInstance${greenInstanceId}/sendMessage/${greenApiToken}`;
      const body = JSON.stringify({ chatId: `${cleanPhone}@c.us`, message: plainText });

      console.log("[WhatsApp] Sending via Green API...");
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (response.ok) {
        console.log("[WhatsApp] ✅ Sent via Green API!");
      } else {
        console.warn(`[WhatsApp] Green API ${response.status}: ${await response.text()}`);
      }
      return;
    } catch (err) {
      console.error("[WhatsApp] Green API exception:", err.message);
    }
  }

  // ─── 3. CallMeBot (free — requires activation) ───────────────────────────
  const callmebotKey = process.env.WHATSAPP_API_KEY || process.env.CALLMEBOT_API_KEY;

  if (callmebotKey) {
    try {
      const cleanPhone = shopNumber.replace(/\D/g, "");
      const url = `https://api.callmebot.com/whatsapp.php?phone=${cleanPhone}&text=${encodeURIComponent(plainText)}&apikey=${callmebotKey}`;

      console.log("[WhatsApp] Sending via CallMeBot...");
      const response = await fetch(url);

      if (response.ok) {
        console.log("[WhatsApp] ✅ Sent via CallMeBot!");
      } else {
        console.warn(`[WhatsApp] CallMeBot ${response.status}`);
      }
      return;
    } catch (err) {
      console.error("[WhatsApp] CallMeBot exception:", err.message);
    }
  }

  // ─── 4. Console fallback ─────────────────────────────────────────────────
  console.log("[WhatsApp] ⚠️  No API credentials found — message printed above only.");
  console.log("[WhatsApp] → Add META_WA_TOKEN + META_WA_PHONE_ID to .env to activate official sending.");
};
