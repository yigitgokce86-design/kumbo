# Kumbo Dağıtım ve Kurulum Rehberi 🚀

Bu rehber, Kumbo projesini **GitHub**, **Supabase** ve **Netlify** kullanarak canlıya alma adımlarını içerir.

## 1. GitHub (Kod Deposu) 🐙

Proje hali hazırda GitHub'a yüklenmiştir.

*   **Repo Adresi:** `https://github.com/yigitgokce86-design/kumbo`
*   **İşlem:** Kodlarınız zaten burada güvende. Netlify bu adresi kullanarak sitenizi oluşturacak.

---

## 2. Supabase (Veritabanı ve Auth) ⚡

Kumbo'nun çalışması için bir arka uç (backend) servisine ihtiyacı vardır.

### Adım 2.1: Proje Oluşturma
1.  [supabase.com](https://supabase.com/) adresine gidin ve giriş yapın.
2.  **"New Project"** butonuna tıklayın.
3.  Bir isim verin (örn: `kumbo-app`), bir şifre belirleyin ve bölge olarak size en yakın olanı (örn: Frankfurt) seçin.
4.  **"Create New Project"** diyerek bekleyin.

### Adım 2.2: Tabloları Kurma (Migration)
1.  Supabase panelinde sol menüden **SQL Editor** ikonuna tıklayın.
2.  **"New query"** diyerek boş bir sayfa açın.
3.  Aşağıdaki SQL kodunu (veya projedeki `supabase/migrations/01_family_schema.sql` dosyasının içeriğini) kopyalayıp buraya yapıştırın:
    *(Dosya içeriğini buraya yapıştıracağım, bkz: SQL Dosyası)*
4.  Sağ alttaki **"Run"** butonuna tıklayın. "Success" mesajını görünce tablolarınız hazırdır.

### Adım 2.3: API Anahtarlarını Alma
1.  Sol menüden **Project Settings** (Dişli ikonu) -> **API** sekmesine gidin.
2.  `Project URL` ve `anon` (public) anahtarlarını not edin. Bunları Netlify'a gireceğiz.

### Adım 2.4: Auth Ayarları
1.  Sol menüden **Authentication** -> **Providers** sekmesine gidin.
2.  **Email** sağlayıcısının "Enabled" olduğundan emin olun.
3.  **Confirm email** seçeneğini geliştirme aşamasında kapatabilirsiniz (URL configuration altından).

---

## 3. Netlify (Canlı Yayın) 🌍

Uygulamayı internete açmak için Netlify kullanacağız.

### Adım 3.1: Proje İçe Aktarma
1.  [netlify.com](https://www.netlify.com/) adresine gidin ve GitHub ile giriş yapın.
2.  **"Add new site"** -> **"Import from an existing project"** seçeneğini seçin.
3.  **GitHub**'ı seçin ve `kumbo` reposunu bulun.

### Adım 3.2: Build Ayarları
Netlify genellikle Next.js projesini otomatik tanır. Şu ayarları kontrol edin:
*   **Build command:** `npm run build`
*   **Publish directory:** `.next` (Otomatik algılanmazsa `Next.js Runtime` plugin'i devreye girer, genellikle varsayılan ayarlar `next build` için yeterlidir).

### Adım 3.3: Çevresel Değişkenler (Environment Variables)
"Deploy settings" ekranında **"Environment variables"** butonuna tıklayın ve Supabase'den aldığınız değerleri ekleyin:

*   Key: `NEXT_PUBLIC_SUPABASE_URL`
    *   Value: `https://sizin-proje-id.supabase.co`
*   Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    *   Value: `eyJh... (uzun anon key)`

### Adım 3.4: Deploy
1.  **"Deploy kumba"** butonuna tıklayın.
2.  Netlify build işlemini başlatacak (yaklaşık 1-2 dakika sürer).
3.  Bittiğinde size `https://kumbo-app.netlify.app` gibi bir link verecektir.

Tebrikler! Kumbo artık canlıda. 🎉
