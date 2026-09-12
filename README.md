# ArendaTexnika

Ustalar va qurilish brigadalari uchun elektr asboblarni kunlik ijaraga berish va olish marketplace interfeysi.

## Ishga tushirish

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Dizayn va lokal assetlar

Interfeys iOS 17 ruhida qayta ishlangan: oq va och kulrang qatlamlar, `backdrop-filter` blur, yumaloq kartalar, yengil shadow, ko‘k iOS aksent rangi va mobil-first responsive layout.

`public/assets/` ichida loyiha uchun maxsus yaratilgan lokal visual assetlar bor:

- ArendaTexnika app-logo
- Kategoriya ikonkalari: shurupovyor, perforator, bolgarka, arra, beton aralashtirgich, payvandlash
- Katalog kartalari uchun professional asbob rasmlari

## Ishlaydigan marketplace oqimlari

- Asbob kategoriyalari endi mahsulot fotosi emas, maxsus logo-uslubidagi ikonka bilan ko‘rsatiladi.
- OLX uslubidagi hudud tanlash oynasi: qidirish, viloyat/shahar bo‘yicha filtrlash va tanlangan hududni header’da ko‘rsatish.
- Asbob kartochkasi, batafsil sahifa, kunlik ijara, kalendar, narx hisoblash va Payme/Click/naqd to‘lov tanlovi.
- Band qilish yoki arendatorga yozishdan oldin login/ro‘yxatdan o‘tish oynasi ochiladi.
- Muvaffaqiyatli login’dan keyin foydalanuvchi kutgan amal davom etadi: bandlov yakunlanadi, arendator bilan chat ochiladi yoki e’lon formasi ochiladi.
- Chat/messenger: arendator va ijarachi aloqasi uchun tayyor interaktiv UI.
- E’lon egasi uchun soddalashtirilgan forma: kategoriya, viloyat, narx, quvvat, imkoniyat, tayyor tavsif shablonlari va rasm/video yuklash preview’i.
- O‘zbek, rus va ingliz tillari uchun ishlaydigan til almashtirish tugmasi; asosiy navigatsiya va bosh sahifa matnlari tarjima qilinadi.
- Responsive va animatsiyali UI: sahifa kirish animatsiyasi, hover states, yumshoq micro-interactions va mobil panel.
- Admin panel: foydalanuvchilar, e’lonlar, buyurtmalar, moderatsiya, daromad grafigi va kategoriyalar statistikasi.

Hozirgi versiya frontend MVP sifatida local state bilan ishlaydi. Real Payme/Click, SMS OTP, xarita API, fayl storage va backend ulanishi uchun server/API kalitlari qo‘shilishi kerak.
