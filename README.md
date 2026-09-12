# ArendaTexnika

Ustalar va qurilish brigadalari uchun elektr asboblarni kunlik ijaraga berish va olish marketplace interfeysi.

## Ishga tushirish

```bash
npm install
npm run dev
```

Production build va tekshiruv:

```bash
npm run build
npm audit --omit=dev
```

## Vercel Free deploy

Loyiha Vercel free hosting uchun tayyorlangan:

1. GitHub’dan `Muhammadyor324/Arendatexnika` reposini import qiling.
2. Branch: `arena/01a0952b-arendatexnika`.
3. Framework: `Vite` yoki `Other`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Install command: `npm install`.

`vercel.json` ichida SPA routing, PWA assetlar va production security header’lari tayyor.

## Dizayn va lokal assetlar

Interfeys iOS 17 ruhida qayta ishlangan: oq va och kulrang qatlamlar, `backdrop-filter` blur, yumaloq kartalar, yengil shadow, ko‘k iOS aksent rangi va mobil-first responsive layout.

`public/assets/` ichida loyiha uchun maxsus yaratilgan lokal visual assetlar bor:

- ArendaTexnika app-logo
- Logo-uslubidagi kategoriya ikonkalari
- Katalog kartalari uchun professional asbob rasmlari

## Marketplace imkoniyatlari

- Bosh sahifada 4 ta asosiy kategoriya: shurupovyor, perforator, bolgarka va beton uskunalari.
- Alohida “Boshqa arendalar” bo‘limi: diskli arra va payvandlash kabi qo‘shimcha asboblar.
- OLX uslubidagi hudud tanlash oynasi: qidirish, viloyat/shahar bo‘yicha filtrlash va tanlangan hududni header’da ko‘rsatish.
- Asbob kartochkasi, batafsil sahifa, kunlik ijara, kalendar, narx hisoblash va Payme/Click/naqd to‘lov tanlovi.
- Band qilish yoki arendatorga yozishdan oldin login/ro‘yxatdan o‘tish oynasi ochiladi.
- Muvaffaqiyatli login’dan keyin foydalanuvchi kutgan amal davom etadi: bandlov yakunlanadi, chat ochiladi yoki e’lon formasi ochiladi.
- Arendator uchun qulay e’lon formasi: kategoriya, viloyat, narx, quvvat, imkoniyat, tayyor tavsif shablonlari va rasm/video preview’i.
- O‘zbek, rus va ingliz tillari uchun til almashtirish.
- Desktop va mobil uchun alohida optimizatsiya: mobil bottom navigation, overflow himoyasi va touch-friendly tugmalar.
- PWA manifest va favicon.
- Admin panel: foydalanuvchilar, e’lonlar, buyurtmalar, moderatsiya, daromad grafigi va kategoriyalar statistikasi.

## Kod sifati va xavfsizlik

- React escaped rendering ishlatiladi; user kiritgan matn HTML sifatida inject qilinmaydi.
- Auth formasi bo‘sh ma’lumot va qisqa parollarni qabul qilmaydi.
- Media yuklash MIME turini va 10 MB limitni tekshiradi.
- Parol localStorage’ga yozilmaydi; sevimlilar, hudud, til va buyurtmalar namespaced localStorage’da saqlanadi.
- Buzilgan localStorage ma’lumotlari xavfsiz default qiymatga qaytariladi.
- Vite va Vercel uchun `nosniff`, `Referrer-Policy`, `Permissions-Policy`, COOP va CSP header’lari qo‘shilgan.
- Error boundary, keyboard focus, skip-link va reduced-motion qo‘llab-quvvatlashi bor.
- `npm audit --omit=dev`: 0 vulnerability.

Hozirgi versiya production-ready frontend sifatida ishlaydi. Real Payme/Click, SMS OTP, xarita API, fayl storage va backend ulanishi uchun server/API kalitlari qo‘shilishi kerak.
