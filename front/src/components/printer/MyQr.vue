<template>
    <div>
      <div ref="qrcode"></div>
    </div>
  </template>
  
  <script>
  import QRCode from 'qrcode-generator';
  
  export default {
    props: {
    location: String, // Declare the prop and specify its data type
  },
    mounted() {

      
      // Create a QRCode instance
      const qr = QRCode(0, 'M'); // (version, correction level)
  
      // Set the data you want to encode
      const qrData = "location:" + this.location;
  
      // Add the data to the QRCode instance
      qr.addData(qrData);
      qr.make();
  
      // Access the DOM element where you want to render the QR code
      const qrcodeElement = this.$refs.qrcode;
  
      // Create an HTML canvas element to render the QR code
      const canvas = document.createElement('canvas');
      
      // canvas.width = qr.getModuleCount() * 10;
      // canvas.height = qr.getModuleCount() * 10;


      const qrwidth = 150;
      canvas.width = qrwidth;
      canvas.height = qrwidth;

      const timesCount = qrwidth/qr.getModuleCount()
  
      // Get the 2D rendering context
      const ctx = canvas.getContext('2d');
  
      // Render the QR code on the canvas
      // for (let row = 0; row < qr.getModuleCount(); row++) {
      //   for (let col = 0; col < qr.getModuleCount(); col++) {
      //     ctx.fillStyle = qr.isDark(row, col) ? 'black' : 'white';
      //     ctx.fillRect(col * 10, row * 10, 10, 10);
      //   }
      // }

      for (let row = 0; row < qr.getModuleCount(); row++) {
        for (let col = 0; col < qr.getModuleCount(); col++) {
          ctx.fillStyle = qr.isDark(row, col) ? 'black' : 'white';
          ctx.fillRect(col * timesCount, row * timesCount, timesCount, timesCount);
        }
      }
      
  
      // Append the canvas to the DOM element
      qrcodeElement.appendChild(canvas);

      // document.querySelector("#qrcodeId").width = 150;
      // document.querySelector("#qrcodeId").height = 150;
    },
  };
  </script>
  <style scoped></style>