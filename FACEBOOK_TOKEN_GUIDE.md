# Quick Facebook Token Setup

## Get Your Facebook Access Token

### Method 1: Using Graph API Explorer (Easiest)

1. **Go to Facebook Graph API Explorer**: https://developers.facebook.com/tools/explorer/

2. **Select your app** (or create one if you don't have it)

3. **Generate a User Access Token** with these permissions:

   - `pages_read_engagement`
   - `pages_manage_metadata`
   - `pages_read_user_content`

4. **Copy the generated token**

5. **Create `.env.local` file** in your project root:

   ```env
   FACEBOOK_ACCESS_TOKEN=your_generated_token_here
   ```

6. **Restart your development server**:
   ```bash
   npm run dev
   ```

### Method 2: Using App Access Token (For Public Pages)

1. **Go to your Facebook App**: https://developers.facebook.com/apps/

2. **Go to Settings → Basic**

3. **Copy your App ID and App Secret**

4. **Generate App Access Token**:

   ```
   https://graph.facebook.com/oauth/access_token?client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&grant_type=client_credentials
   ```

5. **Add to `.env.local`**:
   ```env
   FACEBOOK_ACCESS_TOKEN=your_app_access_token_here
   ```

## Test Your Setup

1. **Visit your home page**: `http://localhost:3000`
2. **Check the Facebook posts section**
3. **If you see real posts from your page, it's working!**
4. **If you see an error, check the browser console for details**

## Troubleshooting

### "Invalid Access Token"

- Make sure your token has the correct permissions
- Check if the token has expired (user tokens expire)

### "Page not found"

- Verify your page ID is correct: `Almarwazi252`
- Make sure your page is public

### "Rate limit exceeded"

- Facebook has rate limits on API calls
- Wait a few minutes and try again

## Important Notes

- **User Access Tokens** expire after 1-2 hours
- **App Access Tokens** don't expire but have limited permissions
- For production, use a **Page Access Token** (long-lived)

## Need Help?

If you're still having issues, check:

1. Your page is public: https://www.facebook.com/Almarwazi252
2. Your token has the right permissions
3. Your `.env.local` file is in the project root
4. You restarted the development server after adding the token
