terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
}

provider "azurerm" {
  features {}

  # Avoid registering every Azure RP on plan/apply (slow; easy to interrupt).
  # Storage + Resource Group only need core providers.
  resource_provider_registrations = "core"
}
