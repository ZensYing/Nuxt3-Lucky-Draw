<template>
  <div class="invoice-wrapper" v-if="visible" v-motion-fade-visible-once>
    <div class="invoice-container" ref="invoiceContainer">
      <!-- Company Header -->
      <div class="header-section">
        <div class="company-info">
          <img src="/Logo-Expo.png" alt="Expo Logo" class="company-logo" />
          <div class="company-details">
            <h1 class="company-name">EXPO</h1>
            <p class="company-tagline">{{ locale === 'en' ? 'Official Registration' : 'ការចុះឈ្មោះផ្លូវការ' }}</p>
          </div>
        </div>
        <div class="invoice-badge">
          <span>{{ locale === 'en' ? 'CONFIRMED' : 'បានបញ្ជាក់' }}</span>
        </div>
      </div>

      <!-- Receipt Title -->
      <div class="receipt-title">
        <h2>{{ locale === 'en' ? 'Registration Receipt' : 'បង្កាន់ដៃចុះឈ្មោះ' }}</h2>
        <div class="receipt-date">{{ formattedDate }}</div>
      </div>

      <!-- Ticket Section -->
      <div class="ticket-section">
        <div class="lottery-info">
          <h3>{{ locale === 'en' ? 'Your Lottery Number' : 'លេខឆ្នោតរបស់អ្នក' }}</h3>
          <div class="lottery-digits">
            <span v-for="(digit, index) in ticketCodeArray" :key="index" class="lottery-digit">{{ digit }}</span>
          </div>
        </div>

        <!-- Separator with perforations -->
        <div class="perforation">
          <div v-for="i in 20" :key="i" class="perf-dot"></div>
        </div>

        <!-- Customer Information -->
        <div class="customer-info">
          <h3>{{ locale === 'en' ? 'Attendee Information' : 'ព័ត៌មានអ្នកចូលរួម' }}</h3>
          
          <div class="info-group">
            <div class="info-row">
              <div class="info-label">{{ locale === 'en' ? 'Full Name' : 'ឈ្មោះពេញ' }}</div>
              <div class="info-value">{{ userData.name }}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">{{ locale === 'en' ? 'Phone' : 'ទូរស័ព្ទ' }}</div>
              <div class="info-value">{{ userData.phone }}</div>
            </div>
            
            <div class="info-row" v-if="userData.email">
              <div class="info-label">{{ locale === 'en' ? 'Email' : 'អ៊ីមែល' }}</div>
              <div class="info-value">{{ userData.email }}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">{{ locale === 'en' ? 'Reg. ID' : 'លេខចុះឈ្មោះ' }}</div>
              <div class="info-value">#{{ generateRegId() }}</div>
            </div>
          </div>
        </div>

        <!-- Verification Section -->
        <div class="verification-section">
          <div class="qr-code">
            <div class="qr-placeholder">
              <div class="qr-inner"></div>
            </div>
          </div>
          <div class="verification-text">
            <p>{{ locale === 'en' ? 'Please keep this receipt for verification at entry.' : 'សូមរក្សាទុកបង្កាន់ដៃនេះសម្រាប់ការផ្ទៀងផ្ទាត់នៅពេលចូល។' }}</p>
          </div>
        </div>

        <!-- Branding Footer -->
        <div class="invoice-footer">
          <div class="thank-you">{{ locale === 'en' ? 'Thank you for registering!' : 'អរគុណសម្រាប់ការចុះឈ្មោះ!' }}</div>
          <div class="company-website">www.expo-event.com</div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="actions">
        <button class="save-button" @click="saveAsImage" :disabled="isLoading">
          <Icon icon="heroicons:camera" class="icon" />
          {{ isLoading ? (locale === 'en' ? 'Saving...' : 'កំពុងរក្សាទុក...') : (locale === 'en' ? 'Save Receipt' : 'រក្សាទុកបង្កាន់ដៃ') }}
        </button>
        <button class="close-button" @click="closeInvoice">
          <Icon icon="heroicons:x-mark" class="icon" />
          {{ locale === 'en' ? 'Close' : 'បិទ' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';
import Swal from 'sweetalert2';

interface UserData {
  name: string;
  phone: string;
  email?: string;
}

interface Props {
  userData: UserData;
  ticketCode: string;
  visible: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  userData: () => ({ name: '', phone: '', email: '' }),
  ticketCode: '',
  visible: false
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const { locale } = useI18n();
const invoiceContainer = ref<HTMLElement | null>(null);
const isLoading = ref(false);
const canClose = ref(false);

// Format the ticket code into an array of digits for display
const ticketCodeArray = computed(() => {
  return props.ticketCode.split('');
});

// Format the current date in a more invoice-like format
const formattedDate = computed(() => {
  const date = new Date();
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'km-KH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date);
});

// Generate a consistent registration ID based on ticket code
const generateRegId = () => {
  // Create a registration ID using first few chars of ticket code plus timestamp
  const prefix = props.ticketCode.substring(0, 3);
  const timestamp = Date.now().toString().substring(7);
  return `${prefix}${timestamp}`;
};

// Initialize html2canvas
let html2canvas: any;

onMounted(async () => {
  // Dynamically import html2canvas only when component is mounted
  try {
    const module = await import('html2canvas');
    html2canvas = module.default;
  } catch (error) {
    console.error('Failed to load html2canvas:', error);
  }
});

// Save receipt as image
const saveAsImage = async () => {
  if (!html2canvas) {
    // Try loading html2canvas again if it failed during onMounted
    try {
      const module = await import('html2canvas');
      html2canvas = module.default;
    } catch (error) {
      console.error('Failed to load html2canvas:', error);
      Swal.fire({
        icon: 'error',
        title: locale.value === 'en' ? 'Error' : 'បញ្ហា',
        text: locale.value === 'en'
          ? 'Unable to save as image. Please try again.'
          : 'មិនអាចរក្សាទុកជារូបភាពបានទេ។ សូមព្យាយាមម្តងទៀត។',
        confirmButtonText: locale.value === 'en' ? 'OK' : 'យល់ព្រម'
      });
      return;
    }
  }

  if (isLoading.value) return;
  isLoading.value = true;

  try {
    // Remove buttons during screenshot
    const actionsEl = invoiceContainer.value?.querySelector('.actions');
    if (actionsEl) {
      const originalDisplay = (actionsEl as HTMLElement).style.display;
      (actionsEl as HTMLElement).style.display = 'none';

      // Create canvas from the invoice container
      if (invoiceContainer.value) {
        const canvas = await html2canvas(invoiceContainer.value, {
          backgroundColor: '#ffffff',
          scale: 3, // Higher quality
          logging: false,
          useCORS: true
        });

        // Restore buttons display
        (actionsEl as HTMLElement).style.display = originalDisplay;

        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL('image/png');

        // Create temporary link to download the image
        const link = document.createElement('a');
        const fileName = `receipt-${props.ticketCode || 'expo'}-${Date.now()}.png`;
        link.download = fileName;
        link.href = dataUrl;
        link.click();
        canClose.value = true;

        Swal.fire({
          icon: 'success',
          title: locale.value === 'en' ? 'Success' : 'ជោគជ័យ',
          text: locale.value === 'en'
            ? 'Receipt saved successfully!'
            : 'បង្កាន់ដៃត្រូវបានរក្សាទុកដោយជោគជ័យ!',
          confirmButtonText: locale.value === 'en' ? 'OK' : 'យល់ព្រម',
          timer: 2000,
          timerProgressBar: true
        });
      }
    }
  } catch (error) {
    console.error('Error generating image:', error);
    Swal.fire({
      icon: 'error',
      title: locale.value === 'en' ? 'Error' : 'បញ្ហា',
      text: locale.value === 'en'
        ? 'Error saving receipt as image'
        : 'មានបញ្ហាក្នុងការរក្សាទុកបង្កាន់ដៃជារូបភាព',
      confirmButtonText: locale.value === 'en' ? 'OK' : 'យល់ព្រម'
    });
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
        ? 'Please save your receipt before closing.'
        : 'សូមរក្សាទុកបង្កាន់ដៃជាមុនសិន មុនពេលបិទ។',
      confirmButtonText: locale.value === 'en' ? 'OK' : 'យល់ព្រម'
    });
    return;
  }

  emit('close');
};

watch(() => props.visible, (visible) => {
  if (visible) {
    canClose.value = false;
  }
});
</script>

<style scoped>
.invoice-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.invoice-container {
  background-color: white;
  border-radius: 10px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Company Header Section */
.header-section {
  background-color: #f8f9fa;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
}

.company-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.company-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 50%;
  background-color: #0b79e8;
  padding: 8px;
  border: 3px solid #e7f2fd;
}

.company-details {
  display: flex;
  flex-direction: column;
}

.company-name {
  font-size: 22px;
  font-weight: 800;
  color: #0b79e8;
  margin: 0;
  letter-spacing: 1px;
}

.company-tagline {
  font-size: 12px;
  color: #6c757d;
  margin: 0;
}

.invoice-badge {
  background-color: #10b981;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 20px;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

/* Receipt Title Section */
.receipt-title {
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #e9ecef;
}

.receipt-title h2 {
  font-size: 18px;
  font-weight: 600;
  color: #1a365d;
  margin: 0;
}

.receipt-date {
  font-size: 12px;
  color: #6c757d;
  text-align: right;
}

/* Ticket Section */
.ticket-section {
  padding: 0;
  background-color: #ffffff;
  position: relative;
}

/* Lottery Section */
.lottery-info {
  padding: 16px 24px;
  background-color: #0e82ff;
  text-align: center;
}

.lottery-info h3 {
  font-size: 14px;
  color: #ffffff;
  margin: 0 0 12px 0;
  font-weight: 600;
}

.lottery-digits {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.lottery-digit {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 50px;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 24px;
  font-weight: 700;
  color: #1a365d;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

/* Perforation Line */
.perforation {
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  height: 2px;
  background-color: #f8f9fa;
  position: relative;
}

.perf-dot {
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  margin-top: -3px;
  box-shadow: 0 0 0 1px #e9ecef;
}

/* Customer Information */
.customer-info {
  padding: 20px 24px;
  border-bottom: 1px solid #e9ecef;
}

.customer-info h3 {
  font-size: 14px;
  color: #4a5568;
  margin: 0 0 12px 0;
  font-weight: 600;
}

.info-group {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 12px 16px;
}

.info-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #e2e8f0;
}

.info-row:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.info-label {
  width: 100px;
  font-size: 12px;
  font-weight: 600;
  color: #4a5568;
}

.info-value {
  flex-grow: 1;
  font-size: 12px;
  color: #1a202c;
  word-break: break-word;
}

/* Verification Section */
.verification-section {
  display: flex;
  padding: 20px 24px;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid #e9ecef;
}

.qr-code {
  flex-shrink: 0;
}

.qr-placeholder {
  width: 80px;
  height: 80px;
  background-color: #f8f9fa;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-inner {
  width: 60px;
  height: 60px;
  background-image: linear-gradient(to right, #000 25%, transparent 0%), 
                    linear-gradient(to right, #000 25%, transparent 0%),
                    linear-gradient(to bottom, #000 25%, transparent 0%),
                    linear-gradient(to bottom, #000 25%, transparent 0%);
  background-position: top, bottom, left, right;
  background-size: 4px 1px, 4px 1px, 1px 4px, 1px 4px;
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
}

.verification-text {
  flex-grow: 1;
}

.verification-text p {
  font-size: 12px;
  color: #007bff;
  font-weight: 600;
  margin: 0;
  line-height: 1.5;
}

/* Invoice Footer */
.invoice-footer {
  padding: 16px 24px;
  text-align: center;
  background-color: #f8f9fa;
  border-top: 1px dashed #e2e8f0;
}

.thank-you {
  font-size: 14px;
  font-weight: 600;
  color: #b02b2b;
  margin-bottom: 4px;
}

.company-website {
  font-size: 12px;
  color: #718096;
}

/* Action Buttons */
.actions {
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: #ffffff;
  border-top: 1px solid #e9ecef;
}

.save-button,
.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.save-button {
  background-color: #2563eb;
  color: white;
  border: none;
  flex-grow: 1;
  margin-right: 12px;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.3);
}

.save-button:hover {
  background-color: #1d4ed8;
}

.save-button:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

.close-button {
  background-color: #f3f4f6;
  color: #4b5563;
  border: 1px solid #e5e7eb;
}

.close-button:hover {
  background-color: #e5e7eb;
}

.icon {
  margin-right: 6px;
  font-size: 16px;
}

@media print {
  .actions {
    display: none;
  }
}
</style>