# Facebook Graph API Setup Guide

## 1. Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Choose "Business" as the app type
4. Fill in your app details:
   - App Name: "Almarwazi University Website"
   - App Contact Email: your-email@example.com
   - Business Account: Select your business account

## 2. Get App Credentials

1. In your app dashboard, go to "Settings" → "Basic"
2. Copy your **App ID** and **App Secret**
3. Add your website domain to "App Domains"

## 3. Generate Access Token

### Option A: User Access Token (for testing)

1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app
3. Generate a User Access Token with these permissions:
   - `pages_read_engagement`
   - `pages_manage_metadata`
   - `pages_read_user_content`
4. Copy the generated token

### Option B: Page Access Token (recommended for production)

1. Use the User Access Token to get a Page Access Token
2. Make a GET request to:
   ```
   https://graph.facebook.com/v18.0/{page-id}?fields=access_token&access_token={user-access-token}
   ```

## 4. Environment Variables

Create a `.env.local` file in your project root with:

```env
# Facebook Graph API Configuration
FACEBOOK_APP_ID=your_facebook_app_id_here
FACEBOOK_APP_SECRET=your_facebook_app_secret_here
FACEBOOK_PAGE_ID=Almarwazi252
FACEBOOK_ACCESS_TOKEN=your_facebook_access_token_here
```

## 5. Update Your Code

Replace the API endpoint in `components/sections/FacebookPosts.tsx`:

```typescript
// Change this line:
const response = await fetch("/api/facebook-posts");

// To this:
const response = await fetch("/api/facebook-real");
```

## 6. Test the Integration

1. Start your development server: `npm run dev`
2. Visit your home page
3. Check the browser console for any errors
4. The posts should now load from your real Facebook page

## Troubleshooting

### Common Issues:

1. **"Invalid Access Token"**

   - Make sure your token has the correct permissions
   - Check if the token has expired

2. **"Page not found"**

   - Verify your PAGE_ID is correct
   - Make sure your app has access to the page

3. **"Rate limit exceeded"**
   - Facebook has rate limits on API calls
   - Consider implementing caching

### Rate Limits:

- Facebook allows 200 calls per hour per user
- For production, implement caching to reduce API calls

## Security Notes

- Never commit your `.env.local` file to version control
- Use Page Access Tokens for production (they don't expire)
- Consider implementing token refresh logic for long-term use
