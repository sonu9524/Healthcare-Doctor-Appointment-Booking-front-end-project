const doctors = [
  { id: 1, name: "Dr. Asha Sharma", specialization: "Cardiologist", hospital: "City Hospital", img: "https://img.freepik.com/premium-vector/simple-female-doctor-cartoon-vector-art-illustration_1048368-426.jpg?w=2000" },
  { id: 2, name: "Dr. Raj Patel", specialization: "Dermatologist", hospital: "Green Valley Clinic", img: "https://static.vecteezy.com/system/resources/previews/024/585/326/original/3d-happy-cartoon-doctor-cartoon-doctor-on-transparent-background-generative-ai-png.png" },
  { id: 3, name: "Dr. Deepak Singh", specialization: "Pediatrician", hospital: "Sunrise Medical Center", img: "https://cdn5.vectorstock.com/i/1000x1000/50/14/cartoon-male-doctor-holding-a-clipboard-vector-25495014.jpg" },
  { id: 4, name: "Dr. Neha Joshi", specialization: "Neurologist", hospital: "Sunrise Medical Center", img: "https://img.freepik.com/premium-photo/cute-cartoon-3d-girl-ware-doctor-cloth-friendly-female-doctor-illustration_862994-64667.jpg?w=2000" },
  { id: 5, name: "Dr. Vikram Kumar", specialization: "Orthopedist", hospital: "City Hospital", img: "https://static.vecteezy.com/system/resources/previews/024/585/356/original/3d-happy-cartoon-doctor-cartoon-doctor-on-transparent-background-generative-ai-png.png" }
];

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];

const doctorsContainer = document.querySelector('.doctors-container');
const doctorListSection = document.getElementById('doctor-list');
const appointmentFormSection = document.getElementById('appointment-form');
const paymentSection = document.getElementById('payment-section');
const confirmationSection = document.getElementById('confirmation');
const bookingForm = document.getElementById('booking-form');
const appointmentTimeSelect = document.getElementById('appointment-time');
const cancelBookingBtn = document.getElementById('cancel-booking');
const backToListBtn = document.getElementById('back-to-list');
const paymentForm = document.getElementById('payment-form');
const cancelPaymentBtn = document.getElementById('cancel-payment');
const contactForm = document.getElementById('contact-form');

let selectedDoctor = null;
let appointmentData = {};

function renderDoctors() {
  doctorsContainer.innerHTML = '';
  doctors.forEach(doc => {
    const card = document.createElement('div');
    card.classList.add('doctor-card');
    card.innerHTML = `
      <img src="${doc.img}" alt="${doc.name}" />
      <h3>${doc.name}</h3>
      <p><strong>Specialization:</strong> ${doc.specialization}</p>
      <p><strong>Hospital:</strong> ${doc.hospital}</p>
    `;
    card.addEventListener('click', () => {
      selectedDoctor = doc;
      showBookingForm();
    });
    doctorsContainer.appendChild(card);
  });
}

function showBookingForm() {
  doctorListSection.classList.add('hidden');
  appointmentFormSection.classList.remove('hidden');
  confirmationSection.classList.add('hidden');
  paymentSection.classList.add('hidden');
  populateTimeSlots();
}

function populateTimeSlots() {
  appointmentTimeSelect.innerHTML = '<option value="">--Select--</option>';
  timeSlots.forEach(slot => {
    const opt = document.createElement('option');
    opt.value = slot;
    opt.textContent = slot;
    appointmentTimeSelect.appendChild(opt);
  });
}

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const patientName = document.getElementById('patient-name').value.trim();
  const patientContact = document.getElementById('patient-contact').value.trim();
  const appointmentDate = document.getElementById('appointment-date').value;
  const appointmentTime = appointmentTimeSelect.value;

  if (!patientName || !patientContact || !appointmentDate || !appointmentTime) {
    alert('Please fill all fields.');
    return;
  }

  appointmentData = { patientName, patientContact, appointmentDate, appointmentTime };
  showPaymentForm();
});

cancelBookingBtn.addEventListener('click', () => {
  bookingForm.reset();
  appointmentFormSection.classList.add('hidden');
  doctorListSection.classList.remove('hidden');
});

function showPaymentForm() {
  appointmentFormSection.classList.add('hidden');
  paymentSection.classList.remove('hidden');
}

paymentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert(`Payment successful! Appointment confirmed with ${selectedDoctor.name} on ${appointmentData.appointmentDate} at ${appointmentData.appointmentTime}.`);
  paymentForm.reset();
  showConfirmation();
});

cancelPaymentBtn.addEventListener('click', () => {
  paymentForm.reset();
  paymentSection.classList.add('hidden');
  doctorListSection.classList.remove('hidden');
});

function showConfirmation() {
  paymentSection.classList.add('hidden');
  confirmationSection.classList.remove('hidden');
  doctorListSection.classList.add('hidden');
}

backToListBtn.addEventListener('click', () => {
  confirmationSection.classList.add('hidden');
  doctorListSection.classList.remove('hidden');
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you! Your message has been sent successfully.');
  contactForm.reset();
});

renderDoctors();