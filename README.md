# Bibilet

Bibilet kullanıcıların kaydolup otobüs bileti satın alabileceği bir uygulamadır.

## Özellikler

1. Kullanıcı kayıtlı değilse kayıt ol ekranına yönlendirir.
2. Kayıt olunurken alınan mail adresi ile kullanıcı firebase'de kayıt edilir.
3. Kayıt olunurken alınan tüm bilgiler firestore'da kullanıcıya özgü bir şekilde saklanır.
4. Kayıt olma başarılı ise giriş yap sayfasına yönlendirilir.
5. Başarılı bir şekilde giriş yapan kullanıcı anasayfaya yönlendirilir.
6. Anasayfada kullanıcı kriterlerine uygun sefer olup olmadığını girdiği bilgilerle sorgulayabilir.
7. Uygun sefer varsa ücret, boş koltuk gibi bilgilerle beraber gösterilir.
8. Uygun sefer yoksa kullanıcıya buna dair bir geri dönüş verilir.
9. Seferlerden birine basıldığında o seferin bilgilerine ait sayfaya yönlendirilir.
10. Kullanıcı bu sayfada cinsiyet seçerek koltuk seçimi yapabilir. ( En fazla 5 )
11. Koltuk seçiminin ardından devam et butonuna basıldığında ödeme sayfasına yönlendirilir.
12. Ödeme sayfasında gerekli bilgiler girildikten sonra ödeme sonucu gösterilir.
13. Ödeme sonucunu gören kullanıcı anasayfaya dön butonu ile tekrar sefer arama sayfasına gidebilir.

## Kullanılan temel teknolojiler ve sürümleri

- nextjs ( 13.5.4 )
- react ( 18 )
- firebase ( 10.4.0 )
- tailwindCSS ( 3 )
- typescript ( 5 )
- shadcn/ui
- zod ( 3.22.3 )
- react hook form ( 7.47.0 )
- framer motion ( 10.16.4 )
- next/ui ( 2.1.13 )

## Kurulum ve çalıştırma için gereklilikler

### .env dosyası

- NEXT_PUBLIC_FIREBASE_API_KEY=
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
- NEXT_PUBLIC_FIREBASE_PROJECT_ID=
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
- NEXT_PUBLIC_FIREBASE_APP_ID=

`npm install`
`npm run dev`
