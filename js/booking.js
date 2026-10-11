// Booking & WhatsApp Direct Integration for JR Odontologia (Dra. Jéssica Melo)
const CLINIC_WHATSAPP_NUMBER = '5511952290288'; // (11) 95229-0288

function initBooking() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('bookName')?.value.trim() || 'Paciente';
    const service = document.getElementById('bookService')?.value || 'Consulta Inicial / Avaliação';
    const shift = document.getElementById('bookShift')?.value || 'Manhã';
    const notes = document.getElementById('bookNotes')?.value.trim() || '';

    let message = `Olá, Dra. Jéssica Melo! 👋\n\n`;
    message += `Gostaria de solicitar um agendamento na *JR Odontologia Integrada*.\n\n`;
    message += `👤 *Nome:* ${name}\n`;
    message += `🦷 *Tratamento de interesse:* ${service}\n`;
    message += `🕒 *Preferência de horário:* ${shift}\n`;
    if (notes) {
      message += `📝 *Observação:* ${notes}\n`;
    }
    message += `\nAguardo confirmação de horários disponíveis. Muito obrigado(a)!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  });

  // Floating WhatsApp bubble auto-display after 4 seconds
  const bubble = document.querySelector('.floating-whatsapp-bubble');
  if (bubble) {
    setTimeout(() => {
      bubble.classList.add('show-bubble');
    }, 3500);
  }
}

document.addEventListener('DOMContentLoaded', initBooking);
