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

## Dizayn yo‘nalishi

Interfeys iOS 17 ruhida qayta ishlangan: oq va och kulrang qatlamlar, `backdrop-filter` blur, yumaloq kartalar, yengil shadow, ko‘k iOS aksent rangi va mobil-first responsive layout.

Loyiha uchun vizual assetlar lokal ravishda yaratilgan va `public/assets/` ichida saqlangan:

- ArendaTexnika app-logo
- Akkumulyatorli shurupovyor
- Beton uchun perforator
- Bolgarka
- Diskli arra
- Beton aralashtirgich
- Payvandlash apparati

## Tayyorlangan modullar

- Bosh sahifa: asbob qidiruvi, joylashuv/sana maydonlari, asbob kategoriyalari va tavsiya etilgan e’lonlar.
- Katalog: qidiruv, kategoriya, hudud, narx oralig‘i va qo‘shimcha filtrlar; saralash va sevimlilar.
- Asbob sahifasi: lokal galereya, texnik xususiyatlar, kunlik narx, mavjudlik kalendari, egasi, xarita ko‘rinishi, sharhlar va bron qilish.
- Band qilish: sanalar bo‘yicha kunlarni hisoblash, umumiy narx va Payme, Click yoki naqd to‘lov tanlovi.
- Foydalanuvchi kabineti: e’lonlar, buyurtmalar, faoliyat, daromad grafigi, chat va to‘lovlar tarixi.
- Yangi e’lon joylash: asbob ma’lumotlari, narx, joylashuv, tavsif va media yuklash interfeysi.
- Admin panel: statistika, daromad grafigi, foydalanuvchilar, e’lonlar, buyurtmalar va moderatsiya navbati.
- Bildirishnomalar, profil menyusi, autentifikatsiya oynasi, sevimlilar va til almashtirish.
- Mobil, planshet va desktop ekranlarga mos iOS 17 uslubidagi responsive dizayn.

Hozirgi versiya frontend MVP sifatida local state bilan ishlaydi. Payme/Click, SMS OTP, xarita API, fayl storage va backend ulanishi uchun server/API kalitlari qo‘shilishi kerak.
