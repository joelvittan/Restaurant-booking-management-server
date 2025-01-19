const QRCode = require("qrcode");

exports.generateQRCode = async (tableId, tableName, tableCapacity) => {
  try {
    // const data = JSON.stringify({
    //   tableId,
    //   tableName,
    //   tableCapacity,
    // });
    const data = `Table ID: ${tableId}\nTable Name: ${tableName}\nTable Capacity: ${tableCapacity}`;
    const qrCode = await QRCode.toDataURL(data);
    return qrCode;
  } catch (error) {
    throw new Error("Failed to generate QR code");
  }
};
