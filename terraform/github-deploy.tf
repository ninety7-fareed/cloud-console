variable "github_actions_principal_id" {
  description = "Object ID of the GitHub Actions service principal (az ad sp show --id <appId> --query id -o tsv)"
  type        = string
  default     = null
}

resource "azurerm_role_assignment" "github_blob_upload" {
  count                = var.github_actions_principal_id != null ? 1 : 0
  scope                = azurerm_storage_account.portfolio.id
  role_definition_name = "Storage Blob Data Contributor"
  principal_id         = var.github_actions_principal_id
}
