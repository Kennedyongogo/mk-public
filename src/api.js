/**
 * Public API helpers for contact, quote, and consultation submissions.
 * Uses VITE_API_URL in production if set; otherwise same-origin (dev proxy).
 */
const getBaseUrl = () => {
  const env = typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL;
  return env ? String(env).replace(/\/$/, "") : "";
};

/**
 * Submit Contact Us form (public).
 * @param {{ fullName: string, email: string, phone?: string, serviceType?: string, message: string }} body
 * @returns {Promise<{ success: boolean, message?: string, data?: { id: string } }>}
 */
export async function postContact(body) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message || "Failed to send message");
    err.response = res;
    err.data = data;
    throw err;
  }
  return data;
}

/**
 * Submit Get Quotation form (public).
 * @param {{ projectType: string, location: string, scaleOfOperation: string, expectedOutcomes: string, service?: string }} body
 * @returns {Promise<{ success: boolean, message?: string, data?: { id: string } }>}
 */
export async function postQuote(body) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/quote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message || "Failed to submit quote request");
    err.response = res;
    err.data = data;
    throw err;
  }
  return data;
}

/**
 * Submit Book Consultation form (public).
 * @param {{ fullName: string, email: string, phone: string, consultationType: string, preferredDate?: string, preferredTime?: string, message?: string }} body
 * @returns {Promise<{ success: boolean, message?: string, data?: { id: string } }>}
 */
export async function postConsultation(body) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/consultation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message || "Failed to book consultation");
    err.response = res;
    err.data = data;
    throw err;
  }
  return data;
}

/**
 * Subscribe to newsletter (public).
 * @param {{ email: string, source?: string }} body
 * @returns {Promise<{ success: boolean, message?: string, data?: { id: string } }>}
 */
export async function postNewsletter(body) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/newsletter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message || "Failed to subscribe");
    err.response = res;
    err.data = data;
    throw err;
  }
  return data;
}

function getMarketplaceAuthHeaders() {
  const token = typeof localStorage !== "undefined" ? localStorage.getItem("marketplace_token") : null;
  const headers = { "Content-Type": "application/json", Accept: "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

/**
 * Register marketplace user (minimal: email, phone, password, fullName, termsAccepted, privacyAccepted).
 */
export async function registerMarketplaceUser(body) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/marketplace/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message || "Registration failed");
    err.response = res;
    err.data = data;
    throw err;
  }
  return data;
}

/**
 * Login marketplace user (email, password).
 */
export async function loginMarketplaceUser(body) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/marketplace/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message || "Login failed");
    err.response = res;
    err.data = data;
    throw err;
  }
  return data;
}

/**
 * Get current marketplace user + profile (requires token).
 */
export async function getMarketplaceMe() {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/marketplace/me`, {
    method: "GET",
    headers: getMarketplaceAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message || "Failed to fetch profile");
    err.response = res;
    err.data = data;
    throw err;
  }
  return data;
}

/**
 * Upload marketplace profile photo. Returns { profilePhotoUrl }. Requires token.
 * @param {File} file - Image file (e.g. from input type="file")
 */
export async function uploadMarketplaceProfilePhoto(file) {
  const base = getBaseUrl();
  const token = typeof localStorage !== "undefined" ? localStorage.getItem("marketplace_token") : null;
  const formData = new FormData();
  formData.append("profile_photo", file);
  const res = await fetch(`${base}/api/marketplace/upload-photo`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message || "Failed to upload profile photo");
    err.response = res;
    err.data = data;
    throw err;
  }
  return data;
}

/**
 * Complete marketplace profile (role + common + role-specific). Requires token.
 */
export async function completeMarketplaceProfile(body) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/marketplace/complete`, {
    method: "PUT",
    headers: getMarketplaceAuthHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message || "Failed to complete profile");
    err.response = res;
    err.data = data;
    throw err;
  }
  return data;
}

/**
 * Apply for a grant (requires marketplace auth).
 * Sends POST /api/grant-applications with body: { grantId, applicationData }.
 * @param {string} grantId - ID of the grant
 * @param {object} [applicationData] - Optional application form data (default {})
 * @returns {Promise<{ success: boolean, message?: string, data?: object }>}
 */
export async function applyForGrant(grantId, applicationData = {}) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/grant-applications`, {
    method: "POST",
    headers: getMarketplaceAuthHeaders(),
    body: JSON.stringify({ grantId, applicationData }),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message || "Application failed");
    err.response = res;
    err.data = data;
    throw err;
  }
  return data;
}

/**
 * Register for a training event (requires marketplace auth).
 * Sends POST /api/training-registrations with body: { trainingEventId }.
 * @param {string} trainingEventId - ID of the training event
 * @returns {Promise<{ success: boolean, message?: string, data?: object }>}
 */
export async function registerForTrainingEvent(trainingEventId) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/training-registrations`, {
    method: "POST",
    headers: getMarketplaceAuthHeaders(),
    body: JSON.stringify({ trainingEventId }),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message || "Registration failed");
    err.response = res;
    err.data = data;
    throw err;
  }
  return data;
}
