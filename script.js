
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyZVLtsG48-qsg0ZgMBlZvcojoS2j8ZAlMmj06o5omCmMr0hU9lQ2yWuqkVmjbLB5pp/exec";

// Preview Foto
const uploadInput = document.getElementById("uploadInput");
const previewFoto = document.getElementById("previewFoto");

uploadInput.addEventListener("change", (e) => {
  previewFoto.innerHTML = "";

  Array.from(e.target.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement("img");
      img.src = event.target.result;
      img.className = "rounded shadow-md hover-zoom";
      previewFoto.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

// Submit Booking Form
const bookingForm = document.getElementById("bookingForm");
const successMessage = document.getElementById("success");

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    nama: bookingForm.nama.value,
    email: bookingForm.email.value,
    tanggal: bookingForm.tanggal.value,
    jenis: bookingForm.jenis.value,
    catatan: bookingForm.catatan.value,
  };

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      bookingForm.reset();
      successMessage.classList.remove("hidden");
      setTimeout(() => successMessage.classList.add("hidden"), 4000);
    } else {
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  } catch (error) {
    alert("Gagal mengirim data. Periksa koneksi Anda.");
    console.error(error);
  }
});
