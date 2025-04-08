<template>
  <BackgroundAnimationParticleBackground />
  <div class="min-h-screen">
    <div class="container mx-auto px-4 pb-2 max-w-4xl">
      <div>
        <img src="/Logo-Expo.png" alt="" class="w-72 mx-auto mb-4" />
      </div>
      <div class="mb-8 text-center bg-gradient-to-r from-blue-600 to-pink-600 p-2 rounded-2xl" v-motion
        :initial="{ opacity: 0, y: -20 }" :enter="{ opacity: 1, y: 0 }">
        <h1 class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text text-white">
          {{ locale === 'en' ? 'Tech & Auto Expo 2025' : 'ពិព័រណ៍បច្ចេកវិទ្យា & យានយន្ត ២០២៥' }}
        </h1>
        <div class="mt-2 flex justify-center space-x-2">
          <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <span v-if="locale === 'en'">Innovation</span>
            <span v-else>ការច្នៃប្រឌិត</span>
          </span>
          <span class="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            <span v-if="locale === 'en'">Future Tech</span>
            <span v-else>បច្ចេកវិទ្យាអនាគត</span>
          </span>
        </div>
      </div>

      <div class="grid md:grid-cols-5 gap-6">
        <div class="md:col-span-2 space-y-6">
          <!-- User Form -->
          <div v-if="showForm" class="rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden" v-motion
            :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0, transition: { delay: 200 } }">
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
              <h2 class="text-white font-bold text-lg">
                {{ locale === 'en' ? 'Register Now' : 'ចុះឈ្មោះឥឡូវនេះ' }}
              </h2>
            </div>

            <form @submit.prevent="submitForm" class="p-6 space-y-5">
              <div>
                <label class="block text-sm font-semibold text-blue-500 mb-1">ឈ្មោះ (Name)</label>
                <div class="relative">
                  <span class="absolute inset-y-0 font-bold text-blue-500 left-0 flex items-center pl-3 ">
                    <Icon icon="heroicons:user" class="text-blue-500 font-bol"></Icon>
                  </span>
                  <input v-model="form.name" type="text" required
                    class="pl-10 w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-blue-500 mb-1">លេខទូរស័ព្ទ (Phone Number)</label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <Icon class="iconify text-blue-500 font-bol" icon="heroicons:phone"></Icon>
                  </span>
                  <input v-model="form.phone" type="tel" required
                    class="pl-10 w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                </div>
              </div>

              <!-- <div>
                <label class="block text-sm font-semibold text-blue-500 mb-1">អ៊ីមែល (Email)</label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <Icon class="iconify text-blue-500 font-bold" icon="heroicons:envelope"></Icon>
                  </span>
                  <input v-model="form.email" type="email"
                    class="pl-10 w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                </div>
              </div> -->

              <button type="submit"
                class="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 focus:ring-4 focus:ring-blue-300 transition-all flex items-center justify-center"
                :disabled="isCheckingLocation || !isFormValid">
                <span v-if="isCheckingLocation" class="flex items-center">
                  <i class="iconify animate-spin mr-2" data-icon="heroicons:arrow-path"></i>
                  កំពុងពិនិត្យទីតាំង...
                </span>
                <span v-else class="flex items-center">
                  <i class="iconify mr-2" data-icon="heroicons:paper-airplane"></i>
                  ដាក់ស្នើ
                </span>
              </button>
            </form>
          </div>

          <!-- Success Message -->
          <div v-if="showTicket" class="rounded-xl bg-white shadow-lg border border-green-100 overflow-hidden" v-motion
            :initial="{ opacity: 0, scale: 0.9 }" :enter="{ opacity: 1, scale: 1 }">
            <div class="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
              <h2 class="text-white font-bold text-lg flex items-center">
                <i class="iconify mr-2 text-xl" data-icon="heroicons:check-circle"></i>
                {{ locale === 'en' ? 'Registration Successful!' : 'ការចុះឈ្មោះជោគជ័យ!' }}
              </h2>
            </div>

            <div class="p-6 text-center">
              <div class="mb-4">សូមអរគុណសម្រាប់ការចុះឈ្មោះរបស់អ្នក</div>

              <div
                class="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6 mb-4 max-w-md mx-auto border border-blue-100">
                <div class="text-sm text-gray-600 mb-1">លេខឆ្នោតចាប់រង្វាន់របស់អ្នក៖</div>
                <div
                  class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 tracking-wider mb-2 flex justify-center">
                  <div class="flex space-x-2">
                    <span v-for="(digit, index) in ticketCode" :key="index"
                      class="inline-block text-blue-500 w-10 h-14 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                      {{ digit }}
                    </span>
                  </div>
                </div>
                <div class="text-sm text-gray-500 mt-3">សូមរក្សាទុកលេខនេះសម្រាប់ការផ្ទៀងផ្ទាត់</div>
              </div>

              <div class="flex space-x-4 justify-center">
                <button @click="resetForm" class="px-4 py-2 text-blue-600 hover:text-blue-800 flex items-center">
                  <i class="iconify mr-1" data-icon="heroicons:arrow-left"></i>
                  {{ locale === 'en' ? 'Go Back' : 'ត្រឡប់ក្រោយ' }}
                </button>
                <button @click="showInvoice" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center">
                  <i class="iconify mr-1" data-icon="heroicons:document-text"></i>
                  {{ locale === 'en' ? 'View Ticket' : 'មើលសំបុត្រ' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Out of Range Message -->
          <div v-if="showOutOfRangeMessage" class="rounded-xl bg-white shadow-lg border border-red-100 overflow-hidden"
            v-motion :initial="{ opacity: 0, scale: 0.9 }" :enter="{ opacity: 1, scale: 1 }">
            <div class="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-4">
              <h2 class="text-white font-bold text-lg flex items-center">
                <i class="iconify mr-2 text-xl" data-icon="heroicons:exclamation-circle"></i>
                {{ locale === 'en' ? 'Location Out of Range' : 'ទីតាំងមិនត្រឹមត្រូវ' }}
              </h2>
            </div>

            <div class="p-6 text-center">
              <div class="mb-6">
                សូមអញ្ជើញទៅកាន់ Chip Mong 271 Mega Mall ដើម្បីចុះឈ្មោះចូលរួមកម្មវិធីចាប់ឆ្នោត
              </div>

              <button @click="checkLocationAgain"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center mx-auto">
                <i class="iconify mr-1" data-icon="heroicons:map"></i>
                {{ locale === 'en' ? 'Check Location Again' : 'ពិនិត្យទីតាំងម្តងទៀត' }}
              </button>
            </div>
          </div>
        </div>

        <div class="md:col-span-3">
          <!-- Map -->
          <div class="rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-white" v-motion
            :initial="{ opacity: 0, x: 20 }" :enter="{ opacity: 1, x: 0, transition: { delay: 200 } }">
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
              <h2 class="text-white font-bold text-lg flex items-center">
                <i class="iconify mr-2" data-icon="heroicons:map"></i>
                {{ locale === 'en' ? 'Event Location' : 'ទីតាំងព្រឹត្តិការណ៍' }}
              </h2>
            </div>

            <ClientOnly>
              <div id="map" class="h-96 w-full"></div>
              <template #fallback>
                <div class="h-96 w-full flex items-center justify-center bg-gray-50">
                  <div class="flex flex-col items-center">
                    <i class="iconify text-3xl animate-pulse text-blue-400 mb-2" data-icon="heroicons:map"></i>
                    កំពុងដំណើរការផែនទី...
                  </div>
                </div>
              </template>
            </ClientOnly>

            <div class="p-4 bg-gray-50 border-t border-gray-100">
              <div class="flex items-center text-sm text-gray-600">
                <Icon name="iconify mr-2" data-icon="heroicons:information-circle"></Icon>
                {{ locale === 'en' ? 'Service area:' : 'តំបន់បម្រើសេវា:' }}
                <span class="text-blue-600 font-medium ml-1">រង្វង់ជុំវិញ Chip Mong 271 Mega Mall</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Invoice Modal Component -->
  <Invoice 
    :userData="form" 
    :ticketCode="ticketCode" 
    :visible="showInvoiceModal"
    @close="hideInvoice"
  />
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';
import Swal from 'sweetalert2'

const { t, locale } = useI18n();
// Constant coordinates for Chip Mong 271 Mega Mall
const CENTER_COORDS = { lat: 11.5249, lng: 104.9237 }
const RADIUS_METERS = 9000
// Add state for invoice modal
const showInvoiceModal = ref(false)

// Form state
const form = ref({ name: '', phone: '' })

// UI state
const showForm = ref(true)
const showTicket = ref(false)
const showOutOfRangeMessage = ref(false)
const isCheckingLocation = ref(false)
const ticketCode = ref('')
const userSubmissions = ref([])
const locationAccessDenied = ref(false)

let map = null
let L = null
let marker = null
let circle = null
let userMarker = null

// Generate random ticket code
const generateTicketCode = () => {
  const chars = '0123456789'
  let result = ''
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Distance between two coordinates using the Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3 // Earth's radius in meters
  const φ1 = lat1 * Math.PI / 180
  const φ2 = lat2 * Math.PI / 180
  const Δφ = (lat2 - lat1) * Math.PI / 180
  const Δλ = (lon2 - lon1) * Math.PI / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // Distance in meters
}

// Check if form is valid
const isFormValid = computed(() => {
  return form.value.name && form.value.phone
})

// Map initialization
const initMap = async () => {
  if (process.client) {
    try {
      L = await import('leaflet')

      // Add Leaflet CSS if not already present
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link')
        link.id = 'leaflet-css'
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)
      }

      // Wait for CSS to load
      await new Promise(resolve => setTimeout(resolve, 100))

      const mapEl = document.getElementById('map')
      if (!map && mapEl) {
        // Initialize map with center coordinates
        map = L.default.map('map').setView([CENTER_COORDS.lat, CENTER_COORDS.lng], 15)

        // Add tile layer
        L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map)

        // Add marker for mall location
        marker = L.default.marker([CENTER_COORDS.lat, CENTER_COORDS.lng])
          .addTo(map)
          .bindPopup('Chip Mong 271 Mega Mall')
          .openPopup()

        // Add circle showing the 250m radius
        circle = L.default.circle([CENTER_COORDS.lat, CENTER_COORDS.lng], {
          color: 'blue',
          fillColor: '#3388ff',
          fillOpacity: 0.2,
          radius: RADIUS_METERS
        }).addTo(map)

        // Try to get user's initial location
        checkUserLocation(true)
      }
    } catch (error) {
      console.error('Error initializing map:', error)
    }
  }
}

// Check user location and compare with center
const checkUserLocation = (initialLoad = false) => {
  return new Promise(resolve => {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported by this browser')
      isCheckingLocation.value = false
      locationAccessDenied.value = true
      return resolve(false)
    }

    isCheckingLocation.value = true

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        // Calculate distance between user and mall
        const distance = calculateDistance(
          CENTER_COORDS.lat, CENTER_COORDS.lng,
          latitude, longitude
        )

        // Update map with user location
        if (map && L) {
          if (userMarker) {
            userMarker.setLatLng([latitude, longitude])
          } else {
            // Custom marker for user location
            userMarker = L.default.marker([latitude, longitude], {
              icon: L.default.divIcon({
                className: 'user-marker',
                html: '<div style="background: red; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white;"></div>'
              })
            }).addTo(map).bindPopup('Your Location')
          }

          // Create a bounds object that includes both mall and user location
          const bounds = L.default.latLngBounds([
            [CENTER_COORDS.lat, CENTER_COORDS.lng],
            [latitude, longitude]
          ])
          map.fitBounds(bounds.pad(0.3))

          // Update line from user to mall center if it exists
          if (window.userToMallLine) {
            map.removeLayer(window.userToMallLine)
          }

          // Draw a line between user and mall for visual reference
          window.userToMallLine = L.default.polyline(
            [[latitude, longitude], [CENTER_COORDS.lat, CENTER_COORDS.lng]],
            { color: 'red', dashArray: '5, 5', weight: 2 }
          ).addTo(map)

          // Add distance label
          if (window.distanceLabel) {
            map.removeLayer(window.distanceLabel)
          }

          // Calculate midpoint for distance label
          const midLat = (latitude + CENTER_COORDS.lat) / 2
          const midLng = (longitude + CENTER_COORDS.lng) / 2

          window.distanceLabel = L.default.marker([midLat, midLng], {
            icon: L.default.divIcon({
              className: 'distance-label',
              html: `<div style="background: white; padding: 3px; border-radius: 3px; border: 1px solid gray;">
                    ${Math.round(distance)}m
                   </div>`,
              iconSize: [40, 20],
              iconAnchor: [20, 10]
            })
          }).addTo(map)
        }
        isCheckingLocation.value = false
        locationAccessDenied.value = false

        // Check if user is within radius
        const isInRange = distance <= RADIUS_METERS

        // Only show alert on non-initial checks
        if (!initialLoad && !isInRange) {
          showOutOfRangeMessage.value = true
        }

        resolve(isInRange)
      },
      (error) => {
        console.error('Geolocation error:', error)
        isCheckingLocation.value = false
        locationAccessDenied.value = true

        // Show appropriate error message based on error code
        let errorMsg = 'អ្នកមិនអាចចុះឈ្មោះបានទេ។ សូមអនុញ្ញាតឱ្យប្រើប្រាស់ទីតាំងរបស់អ្នក។'

        if (error.code === 1) {
          // Permission denied
          errorMsg = 'សូមអនុញ្ញាតឱ្យប្រើប្រាស់ទីតាំងរបស់អ្នក ដើម្បីចុះឈ្មោះ'
        } else if (error.code === 2) {
          // Position unavailable
          errorMsg = 'មិនអាចរកទីតាំងរបស់អ្នកបានទេ។ សូមព្យាយាមម្តងទៀត។'
        } else if (error.code === 3) {
          // Timeout
          errorMsg = 'ការរកទីតាំងប្រើពេលយូរពេក។ សូមព្យាយាមម្តងទៀត។'
        }

        if (!initialLoad) {
          Swal.fire({
            icon: 'error',
            title: 'កំហុសក្នុងការរកទីតាំង',
            text: errorMsg,
            confirmButtonText: 'យល់ព្រម'
          })
        }

        resolve(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  })
}

// Submit Form
const submitForm = async () => {
  const isInRange = await checkUserLocation()

  if (!isInRange) {
    showForm.value = false
    showTicket.value = false
    showOutOfRangeMessage.value = true

    // Show proper message depending on access
    Swal.fire({
      icon: locationAccessDenied.value ? 'warning' : 'info',
      title: locationAccessDenied.value ? 'ការអនុញ្ញាតទីតាំង!' : 'ទីតាំងខុស!',
      text: locationAccessDenied.value
        ? 'សូមអនុញ្ញាតឱ្យប្រើប្រាស់ទីតាំងរបស់អ្នក ដើម្បីចុះឈ្មោះ'
        : 'អ្នកមិនស្ថិតនៅក្នុងតំបន់ដែលអាចចុះឈ្មោះបានទេ។ សូមទៅកាន់ Chip Mong 271 Mega Mall។',
      confirmButtonText: 'យល់ព្រម'
    })

    return
  }

  try {
    // 🔥 Submit data to backend
    const response = await $fetch('/api/register', {
      method: 'POST',
      body: {
        name: form.value.name,
        phone: form.value.phone
      }
    })

    if (response.error) {
      throw new Error(response.error)
    }

    // ✅ Set ticket code from backend
    ticketCode.value = response.data.ticket_code

    // Optional: store locally
    userSubmissions.value.push({
      ...form.value,
      ticketCode: ticketCode.value,
      timestamp: new Date().toISOString()
    })

    // UI state
    showForm.value = false
    showTicket.value = true
    showOutOfRangeMessage.value = false

    // Show invoice
    showInvoice()

  } catch (error) {
    console.error('Registration failed:', error)
    Swal.fire({
      icon: 'error',
      title: 'បរាជ័យ',
      text: error?.message || 'មានបញ្ហាកើតឡើងក្នុងការចុះឈ្មោះ។ សូមព្យាយាមម្តងទៀត។',
      confirmButtonText: 'យល់ព្រម'
    })
  }
}


// Reset form
const resetForm = () => {
  form.value = { name: '', phone: '' }
  showForm.value = true
  showTicket.value = false
  showOutOfRangeMessage.value = false
}

// Retry location check
const checkLocationAgain = async () => {
  const isInRange = await checkUserLocation()

  if (isInRange) {
    showForm.value = true
    showOutOfRangeMessage.value = false
  }
}

// Show invoice modal
const showInvoice = () => {
  showInvoiceModal.value = true
}

// Hide invoice modal
const hideInvoice = () => {
  showInvoiceModal.value = false
}


onMounted(() => {
  initMap()
})
</script>
