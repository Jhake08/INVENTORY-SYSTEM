export interface SystemSettings {
  currency: "PHP" | "USD"
  timezone: string
  dateFormat: string
  lowStockThreshold: number
  autoReorderEnabled: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  apiIntegrations: {
    googleSheets: {
      enabled: boolean
      spreadsheetId: string
      serviceAccountEmail: string
      privateKey: string
    }
    email: {
      enabled: boolean
      provider: "gmail" | "outlook" | "custom"
      smtpHost: string
      smtpPort: number
      username: string
      password: string
    }
    sms: {
      enabled: boolean
      provider: "twilio" | "semaphore" | "custom"
      apiKey: string
      senderId: string
    }
  }
  businessInfo: {
    name: string
    address: string
    phone: string
    email: string
    taxId: string
  }
}

const DEFAULT_SETTINGS: SystemSettings = {
  currency: "PHP",
  timezone: "Asia/Manila",
  dateFormat: "MM/dd/yyyy",
  lowStockThreshold: 10,
  autoReorderEnabled: false,
  emailNotifications: true,
  smsNotifications: false,
  apiIntegrations: {
    googleSheets: {
      enabled: false,
      spreadsheetId: "",
      serviceAccountEmail: "",
      privateKey: "",
    },
    email: {
      enabled: false,
      provider: "gmail",
      smtpHost: "",
      smtpPort: 587,
      username: "",
      password: "",
    },
    sms: {
      enabled: false,
      provider: "semaphore",
      apiKey: "",
      senderId: "",
    },
  },
  businessInfo: {
    name: "Your Business Name",
    address: "",
    phone: "",
    email: "",
    taxId: "",
  },
}

export class SettingsManager {
  private static instance: SettingsManager
  private settings: SystemSettings

  private constructor() {
    this.settings = this.loadSettings()
  }

  static getInstance(): SettingsManager {
    if (!SettingsManager.instance) {
      SettingsManager.instance = new SettingsManager()
    }
    return SettingsManager.instance
  }

  private loadSettings(): SystemSettings {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("inventory_settings")
      if (stored) {
        try {
          return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) }
        } catch (error) {
          console.error("Error loading settings:", error)
        }
      }
    }
    return DEFAULT_SETTINGS
  }

  getSettings(): SystemSettings {
    return { ...this.settings }
  }

  updateSettings(updates: Partial<SystemSettings>): void {
    this.settings = { ...this.settings, ...updates }
    if (typeof window !== "undefined") {
      localStorage.setItem("inventory_settings", JSON.stringify(this.settings))
    }
  }

  getCurrency() {
    return this.settings.currency
  }

  getTimezone() {
    return this.settings.timezone
  }

  isGoogleSheetsEnabled() {
    return this.settings.apiIntegrations.googleSheets.enabled
  }

  getGoogleSheetsConfig() {
    return this.settings.apiIntegrations.googleSheets
  }
}

export const settingsManager = SettingsManager.getInstance()
