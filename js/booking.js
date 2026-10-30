// Booking & WhatsApp Direct Integration for JR Odontologia (Dra. Jéssica Melo)
const CLINIC_WHATSAPP_NUMBER = '5511952290288'; // (11) 95229-0288

function initBooking() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('bookName')?.value.trim() || 'Paciente';
    const service = document.getElementById('bookService')?.value || 'Avaliação Geral';
    const shift = document.getElementById('bookShift')?.value || 'Manhã (8h às 12h)';
    const notes = document.getElementById('bookNotes')?.value.trim() || '';

    let message = `Olá, Dra. Jéssica! Vim pelo site e gostaria de agendar uma avaliação.\n\n`;
    message += `👤 *Nome:* ${name}\n`;
    message += `🦷 *Tratamento de interesse:* ${service}\n`;
    message += `🕒 *Preferência de horário:* ${shift}\n`;
    if (notes) {
      message += `📝 *Observação:* ${notes}\n`;
    }
    message += `\nAguardo confirmação de horários disponíveis. Muito obrigado(a)!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'form_whatsapp',
      servico: service,
      turno: shift
    });

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  });

  // Floating WhatsApp bubble auto-display after 3.5 seconds
  const bubble = document.querySelector('.floating-whatsapp-bubble');
  if (bubble) {
    setTimeout(() => {
      bubble.classList.add('show-bubble');
    }, 3500);
  }
}

document.addEventListener('DOMContentLoaded', initBooking);
