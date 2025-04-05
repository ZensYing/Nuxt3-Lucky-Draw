<template>
  <div class="invoice-wrapper" v-if="visible">
    <div class="invoice-container" ref="invoiceContainer">
      <div class="logo-section">
        <img src="/Logo-Expo.png" alt="Expo Logo" class="logo" />
      </div>

      <div class="success-title">
        <h2>{{ locale === 'en' ? 'Success' : 'ជោគជ័យ' }}</h2>
      </div>

      <div class="ticket-section">
        <div class="ticket-header">
          <h3 class="text-center">{{ locale === 'en' ? 'Registration Confirmation' :
            'សូមអរគុណសម្រាប់ការចុះឈ្មោះរបស់អ្នក' }}</h3>
          <p class="text-center font-bold text-red-500">{{ locale === 'en' ? 'Your lottery number:' :
            'សូមរក្សាទុកលេខនេះសម្រាប់ការផ្ទៀងផ្ទាត់' }}</p>
        </div>

        <div class="ticket-number">
          <div class="ticket-number-circle">
            <span v-if="locale === 'en'">Your Code</span>
            <span v-else>លេខឆ្នោត</span>
          </div>
          <div class="digits">
            <span v-for="(digit, index) in ticketCodeArray" :key="index" class="digit">{{ digit }}</span>
          </div>
        </div>

        <div class="user-info">
          <div class="info-row">
            <div class="info-label">NAME</div>
            <div class="info-separator">:</div>
            <div class="info-value">{{ userData.name }}</div>
            <div class="expand-icon">
              <Icon icon="heroicons:chevron-up" />
            </div>
          </div>

          <div class="info-row">
            <div class="info-label">PHONE</div>
            <div class="info-separator">:</div>
            <div class="info-value">{{ userData.phone }}</div>
          </div>

          <div class="info-row">
            <div class="info-label">DATE</div>
            <div class="info-separator">:</div>
            <div class="info-value">{{ formattedDate }}</div>
          </div>
        </div>
      </div>

      <div class="actions">
        <button class="print-button" @click="saveAsImage">
          <Icon icon="heroicons:camera" class="icon" />
          {{ locale === 'en' ? 'Save Ticket' : 'រក្សាទុក' }}
        </button>
        <button class="close-button" @click="closeInvoice">
          <Icon icon="heroicons:x-mark" class="icon" />
          {{ locale === 'en' ? 'Close' : 'បិទ' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';
import Swal from 'sweetalert2';

const props = defineProps({
  userData: {
    type: Object,
    default: () => ({ name: '', phone: '', email: '' })
  },
  ticketCode: {
    type: String,
    default: ''
  },
  visible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);
const { locale } = useI18n();
const invoiceContainer = ref(null);
const isLoading = ref(false);
const canClose = ref(false)

// Format the ticket code into an array of digits for display
const ticketCodeArray = computed(() => {
  return props.ticketCode.split('');
});

// Format the current date
const formattedDate = computed(() => {
  const date = new Date();
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);
});

// Initialize html2canvas
let html2canvas;

onMounted(async () => {
  // Dynamically import html2canvas only when component is mounted
  try {
    html2canvas = (await import('html2canvas')).default;
  } catch (error) {
    console.error('Failed to load html2canvas:', error);
  }
});

// Save ticket as image
const saveAsImage = async () => {
  if (!html2canvas) {
    // Try loading html2canvas again if it failed during onMounted
    try {
      html2canvas = (await import('html2canvas')).default;

    } catch (error) {
      console.error('Failed to load html2canvas:', error);
      alert(locale.value === 'en'
        ? 'Unable to save as image. Please try again.'
        : 'មិនអាចរក្សាទុកជារូបភាពបានទេ។ សូមព្យាយាមម្តងទៀត។');
      return;
    }
  }

  if (isLoading.value) return;
  isLoading.value = true;

  try {
    // Remove buttons during screenshot
    const actionsEl = invoiceContainer.value.querySelector('.actions');
    const originalDisplay = actionsEl.style.display;
    actionsEl.style.display = 'none';

    // Create canvas from the invoice container
    const canvas = await html2canvas(invoiceContainer.value, {
      backgroundColor: '#ffffff',
      scale: 2, // Higher quality
      logging: false,
      useCORS: true
    });

    // Restore buttons display
    actionsEl.style.display = originalDisplay;

    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL('image/png');

    // Create temporary link to download the image
    const link = document.createElement('a');
    const fileName = `ticket-${props.ticketCode || 'expo'}-${Date.now()}.png`;
    link.download = fileName;
    link.href = dataUrl;
    link.click();
    canClose.value = true


  } catch (error) {
    console.error('Error generating image:', error);
    alert(locale.value === 'en'
      ? 'Error saving ticket as image'
      : 'មានបញ្ហាក្នុងការរក្សាទុកសំបុត្រជារូបភាព');
  } finally {
    isLoading.value = false;
  }
};

// Close the invoice
const closeInvoice = () => {
  if (!canClose.value) {
    Swal.fire({
      icon: 'warning',
      title: locale.value === 'en' ? 'Action Required' : 'ត្រូវការដំណើរការ',
      text: locale.value === 'en'
        ? 'Please save your ticket before closing.'
        : 'សូមរក្សាទុកសំបុត្រជាមុនសិន មុនពេលបិទ។',
      confirmButtonText: locale.value === 'en' ? 'OK' : 'យល់ព្រម'
    });
    return;
  }

  emit('close');
};

watch(() => props.visible, (visible) => {
  if (visible) {
    canClose.value = false
  }
})

</script>

<style scoped>
.invoice-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.invoice-container {
  background-color: white;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
}

.logo-section {
  display: flex;
  justify-content: center;
  padding: 24px 0;
  background-color: #f8f8f8;
}

.logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 50%;
  border: 4px solid #ffffff;
  background-color: #0b79e8;
  padding: 5px;
}

.success-title {
  text-align: center;
  padding: 12px 0;
  border-bottom: 1px dashed #ddd;
}

.success-title h2 {
  color: #1a365d;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.ticket-section {
  background-color: #f8f8f8;
  padding: 20px;
  position: relative;
}

.ticket-section:before,
.ticket-section:after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 50%;
  top: -10px;
}

.ticket-section:before {
  left: -10px;
}

.ticket-section:after {
  right: -10px;
}

.ticket-header {
  margin-bottom: 16px;
}

.ticket-header h3 {
  color: #2c5282;
  font-size: 18px;
  margin: 0 0 8px;
}

.ticket-header p {
  font-size: 14px;
  margin: 0;
}

.ticket-number {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.ticket-number-circle {
  width: 70px;
  height: 70px;
  background-color: #e53e3e;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 12px;
  line-height: 1.2;
  font-weight: bold;
}

.digits {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  gap: 8px;
}

.digit {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
  color: #2b6cb0;
}

.user-info {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
}

.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.info-row:last-child {
  margin-bottom: 0;
}

.info-label {
  width: 80px;
  font-weight: bold;
  color: #2d3748;
  font-size: 14px;
}

.info-separator {
  margin: 0 8px;
  color: #4a5568;
}

.info-value {
  flex-grow: 1;
  color: #2d3748;
  font-size: 14px;
}

.expand-icon {
  color: #ed8936;
}

.actions {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid #e2e8f0;
}

.print-button,
.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.print-button {
  background-color: #3182ce;
  color: white;
  border: none;
}

.print-button:hover {
  background-color: #2b6cb0;
}

.close-button {
  background-color: #e2e8f0;
  color: #4a5568;
  border: none;
}

.close-button:hover {
  background-color: #cbd5e0;
}

.icon {
  margin-right: 6px;
  font-size: 16px;
}

.text-center {
  text-align: center;
}
</style>