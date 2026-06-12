resource "azurerm_storage_account" "portfolio" {
  name                     = "fareedportfolio1234597"
  resource_group_name      = azurerm_resource_group.portfolio.name
  location                 = azurerm_resource_group.portfolio.location

  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_account_static_website" "portfolio" {
  storage_account_id = azurerm_storage_account.portfolio.id
  index_document     = "index.html"
}
