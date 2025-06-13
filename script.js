 
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream;
      });

    function takePhoto() {
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, 320, 240);
    }

    async function submitData() {
      const name = document.getElementById('name').value;
      const photo = canvas.toDataURL('image/png');

      const response = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, photo })
      });

      const result = await response.text();
      alert(result);
    }
