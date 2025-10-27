# إعداد متغيرات البيئة لفيسبوك

## إنشاء ملف .env.local

أنشئ ملف `.env.local` في مجلد المشروع الرئيسي وأضف هذه المتغيرات:

```env
# Facebook Graph API Configuration
FACEBOOK_APP_ID=your_facebook_app_id_here
FACEBOOK_APP_SECRET=your_facebook_app_secret_here
FACEBOOK_PAGE_ID=Almarwazi252
FACEBOOK_ACCESS_TOKEN=your_facebook_access_token_here
```

## كيفية الحصول على القيم:

### 1. FACEBOOK_APP_ID و FACEBOOK_APP_SECRET
- اذهب إلى https://developers.facebook.com/apps/
- اختر تطبيقك
- اذهب إلى Settings → Basic
- انسخ App ID و App Secret

### 2. FACEBOOK_ACCESS_TOKEN
- اذهب إلى https://developers.facebook.com/tools/explorer/
- اختر تطبيقك
- اضغط "Generate Access Token"
- اختر الصلاحيات: pages_read_engagement, pages_manage_metadata, pages_read_user_content
- انسخ الرمز المُولد

### 3. FACEBOOK_PAGE_ID
- هذا هو معرف صفحة فيسبوك: Almarwazi252
- لا تحتاج لتغييره

## بعد إضافة المتغيرات:

1. احفظ الملف
2. أعد تشغيل الخادم: `npm run dev`
3. اذهب إلى الصفحة الرئيسية لرؤية منشورات فيسبوك الحقيقية

## ملاحظات مهمة:

- لا تشارك ملف .env.local مع أي شخص
- لا ترفعه إلى GitHub
- رموز الوصول تنتهي صلاحيتها، قد تحتاج لتجديدها

