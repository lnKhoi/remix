export const shopifyAuth = () => {
  const shop = "quickstart-36641c2f.myshopify.com"; 
  const clientId = "71f2940b866fa58c2caa598673e015e0";
  const redirectUri = "https://5012-42-114-90-29.ngrok-free.app/manager/campaigns/callback"
  const scopes = "read_products,write_products";

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;

  window.location.href = authUrl;
};
